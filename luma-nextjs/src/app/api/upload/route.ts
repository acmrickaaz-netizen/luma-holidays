import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Ensure a filename was provided in the query string
  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  try {
    // 1. Get the raw file body from the request
    const body = request.body;

    if (!body) {
      return NextResponse.json({ error: 'No file body provided' }, { status: 400 });
    }

    // 2. Use Vercel Blob's 'put' command to upload securely on the server
    // 'access: public' makes the file readable by everyone (essential for Google SEO)
    const blob = await put(filename, body, {
      access: 'public',
    });

    // 3. Return the new public URL to the frontend
    return NextResponse.json(blob);
  } catch (error) {
    console.error('Vercel Blob Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}