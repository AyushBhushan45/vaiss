import { NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/data/repository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, amount } = body;

    if (!code) {
      return NextResponse.json({ valid: false, message: 'Coupon code is required' }, { status: 400 });
    }

    const result = await validateCoupon(code, Number(amount) || 0);

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ valid: false, message: 'Coupon validation error' }, { status: 500 });
  }
}
