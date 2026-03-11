const Stripe = require('stripe');

exports.handler = async (event) => {
  const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
  const { amount } = JSON.parse(event.body);

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: 'usd',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
  };
};
