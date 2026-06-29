import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getSession } from 'better-auth/api';



export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const userSession = await getSession();
    const user = userSession;
    const formData = await request.formData();

    const proposalId = formData.get('proposalId');
    const budget = formData.get('budget');
    const title = formData.get('title');
    const freelancerEmail = formData.get('email');
    console.log(user);
    

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: freelancerEmail || "example@example.com",
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: Number(budget) * 100,
            product_data: {
              name: title,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        proposalId,
        title,
        freelancerEmail,
        budget: Number(budget),
        userId: user.id,
        userEmail: user.email,
      },
      mode: 'payment',
      success_url: `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
