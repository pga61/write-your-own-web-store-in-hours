const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { NetlifyJwtVerifier } = require('@serverless-jwt/netlify');

const verifyJwt = NetlifyJwtVerifier({
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
});

exports.handler = verifyJwt(async function (event, context) {
  // Get Stripe Customer ID from Access Token
  const stripeCustomerId =
    context.identityContext.claims[
      process.env.REACT_APP_AUTH0_STRIPE_CUSTOM_CLAIM
    ];
  console.log('verifyJwt() stripeCustomerId :>> ', stripeCustomerId);

  // Decode the payload
  const payload = JSON.parse(event.body);

  // Create a new Stripe Checkout Session
  //
  // See Stripe docs: https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.REACT_APP_AUTH0_REDIRECT_URI}/success`,
    cancel_url: process.env.REACT_APP_AUTH0_REDIRECT_URI,
    payment_method_types: ['card'],
    locale: 'fr',
    customer: stripeCustomerId,
    line_items: [
      {
        price: payload.priceId,
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  return {
    statusCode: 200,
    body: JSON.stringify(session),
  };
});
