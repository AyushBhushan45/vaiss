import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/data/repository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, userEmail, ebookId, couponCode } = body;

    if (!userId || !ebookId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { order, ebook } = await createOrder({
      userId,
      userEmail: userEmail || 'customer@example.com',
      ebookId,
      couponCode
    });

    const rzpKey = process.env.RAZORPAY_KEY_ID || 'rzp_test_lumina_demo_key';

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.order_number,
      amount: Math.round(order.total_amount * 100), // in paise
      amountFormatted: order.total_amount,
      currency: order.currency,
      keyId: rzpKey,
      ebookTitle: ebook.title,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
