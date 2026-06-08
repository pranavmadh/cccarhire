import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const BUCKET = 'license-photos';
const EXPIRY_MS = 48 * 60 * 60 * 1000;

export async function GET(request: Request) {
  // Vercel Cron sends: Authorization: Bearer {CRON_SECRET}
  const cronSecret = process.env.CRON_SECRET;
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get('authorization');
  const querySecret = new URL(request.url).searchParams.get('secret');

  const validCron = cronSecret && authHeader === `Bearer ${cronSecret}`;
  const validAdmin = adminSecret && querySecret === adminSecret;
  const open = !cronSecret && !adminSecret;

  if (!validCron && !validAdmin && !open) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: files, error } = await supabase.storage.from(BUCKET).list('', { limit: 1000 });
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const cutoff = Date.now() - EXPIRY_MS;
  const toDelete = (files ?? [])
    .filter((f) => {
      const ts = parseInt(f.name.split('_')[0], 10);
      return !isNaN(ts) && ts < cutoff;
    })
    .map((f) => f.name);

  if (toDelete.length === 0) {
    return NextResponse.json({ deleted: 0, message: 'No expired files found' });
  }

  const { error: deleteError } = await supabase.storage.from(BUCKET).remove(toDelete);
  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ deleted: toDelete.length, files: toDelete });
}
