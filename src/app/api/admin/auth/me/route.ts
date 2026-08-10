import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminUser } from '@/lib/data/repository';

export async function GET() {
  try {
    const cookieStore = cookies();
    const sessionCookie = cookieStore.get('lumina_admin_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const sessionData = JSON.parse(sessionCookie.value);
    const adminUser = await getAdminUser(sessionData.id);

    if (!adminUser) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: adminUser
    });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
