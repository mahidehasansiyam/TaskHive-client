import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { getUserSession } from '@/lib/core/session';




export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get('origin');

    const userSession = await getUserSession();
    const user = userSession;
    console.log(user);

    const formData = await request.formData();

    const proposalId = formData.get('proposalId');
    const freelancerEmail = formData.get('email');
    const budget = formData.get('budget');
    const title = formData.get('title');
    

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
        freelancerEmail,
        clientEmail: user.email,
        title,
        finalBudget: Number(budget),
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
