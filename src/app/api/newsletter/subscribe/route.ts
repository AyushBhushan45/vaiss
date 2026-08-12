import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && supabaseUrl !== 'https://your-supabase-url.supabase.co') {
      try {
        const supabase = createClient();
        const { error } = await supabase
          .from('newsletter_subscribers')
          .insert({ email: normalizedEmail });

        if (error && error.code === '23505') {
          return NextResponse.json(
            { message: "You're already subscribed to our VIP Digest!", alreadySubscribed: true },
            { status: 200 }
          );
        }
      } catch (e) {
        console.warn('Supabase newsletter insert error:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: "You're in! Check your inbox for the next VIP Reader Digest."
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process newsletter subscription.' },
      { status: 500 }
    );
  }
}
