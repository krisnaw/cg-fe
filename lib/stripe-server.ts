import 'server-only';

import Stripe from 'stripe';

export async function createStripeClient() {
   return new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      typescript: true,
   });
}
