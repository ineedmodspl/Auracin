const Stripe = require('stripe');

exports.handler = async (event) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = event.headers['stripe-signature'];
  let stripeEvent;
  try {
    stripeEvent = stripe.webhooks.constructEvent(
      event.body, sig, process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: `Webhook Error: ${err.message}` };
  }
  if (stripeEvent.type === 'payment_intent.succeeded') {
    const intent = stripeEvent.data.object;
    const meta = intent.metadata;
    console.log('✅ Payment succeeded for', meta.email, '-', meta.cartSummary);
  }
  return { statusCode: 200, body: 'OK' };
};
