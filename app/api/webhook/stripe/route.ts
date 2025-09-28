import {NextRequest, NextResponse} from "next/server";

export async function POST(Request : NextRequest) {
   const body = await Request.json();



   //
   // const sig = Request.headers.get('stripe-signature') || '';
   // const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
   // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
   // const event = stripe.webhooks.constructEvent(body, sig, webhookSecret);

   console.log(body)
   return NextResponse.json('Ok', {status: 200});
}


