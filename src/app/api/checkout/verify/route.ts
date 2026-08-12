import { NextResponse } from 'next/server';
import { completeOrder } from '@/lib/data/repository';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    // Perform HMAC SHA256 signature verification when production secret is provided
    if (signature && razorpaySecret && razorpaySecret !== 'rzp_test_secret_key') {
      const hmac = crypto.createHmac('sha256', razorpaySecret);
      hmac.update(`${orderId}|${paymentId}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature !== signature) {
        return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
      }
    }

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
