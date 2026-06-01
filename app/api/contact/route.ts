import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, date, message } = await req.json();

  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    return NextResponse.json({ success: false, error: "WEB3FORMS_KEY not set" }, { status: 500 });
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New Enquiry from ${name} — CC CarHire`,
      name,
      email,
      date: date || "Not specified",
      message,
    }),
  });

  const data = await res.json();
  if (data.success) {
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ success: false, error: data.message }, { status: 500 });
}
