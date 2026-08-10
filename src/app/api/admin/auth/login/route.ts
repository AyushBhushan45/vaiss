import { NextResponse } from 'next/server';
import { authenticateAdmin } from '@/lib/data/repository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required' }, { status: 400 });
    }

    const result = await authenticateAdmin(email, password);

    if (!result.success || !result.user) {
      return NextResponse.json({ success: false, error: result.error || 'Authentication failed' }, { status: 401 });
    }

    const response = NextResponse.json({
      success: true,
      user: result.user
    });

    // Set secure HTTP-only session cookie
    response.cookies.set({
      name: 'lumina_admin_session',
      value: JSON.stringify({ id: result.user.id, role: result.user.role, email: result.user.email }),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error: any) {
    console.error('Admin Auth Error:', error);
    return NextResponse.json({ success: false, error: 'Internal server authentication error' }, { status: 500 });
  }
}
