import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

const BUCKET = 'license-photos';
const EXPIRY_SECONDS = 48 * 60 * 60;
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File must be under 10 MB' }, { status: 400 });
    }

    const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase();
    const path = `${Date.now()}_${crypto.randomUUID()}.${ext}`;

    const bytes = await file.arrayBuffer();
    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: file.type, upsert: false });

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data, error: urlError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(path, EXPIRY_SECONDS);

    if (urlError || !data) {
      return NextResponse.json(
        { error: urlError?.message ?? 'Failed to create signed URL' },
        { status: 500 }
      );
    }

    let url = data.signedUrl;
    try {
      const tiny = await fetch(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
      );
      if (tiny.ok) url = await tiny.text();
    } catch {
      // fall back to full URL if shortener is unavailable
    }

    return NextResponse.json({ url });
  } catch (err) {
    console.error('POST /api/upload-license:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
