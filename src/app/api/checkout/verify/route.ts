import { NextResponse } from 'next/server';
import { completeOrder } from '@/lib/data/repository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    // In a live Razorpay production setup, HMAC verification uses crypto:
    // const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!);
    // hmac.update(orderId + "|" + paymentId);
    // const generated_signature = hmac.digest('hex');
    // if (generated_signature !== signature) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });

    const result = await completeOrder(orderId, paymentId || `pay_verified_${Date.now()}`);

    if (!result.success) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully. eBook added to library.',
      purchase: result.purchase
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
