import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {createStripeClient} from "@/lib/stripe-server";
import Stripe from "stripe";
import {ButtonAddCard} from "@/components/stripe/button-add-card";

export default async function PaymentPage() {

   const stripe = await createStripeClient()

   const customer_id = "cus_12345"

   const { data } = await stripe.customers.listPaymentMethods(customer_id)

   const intent = await stripe.setupIntents.create({customer: customer_id})
   const customer = await stripe.customers.retrieve(customer_id) as Stripe.Response<Stripe.Customer>;
   const default_pm = customer.invoice_settings.default_payment_method;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>

               <CardAction>
                  {intent.client_secret &&  <ButtonAddCard secret={intent.client_secret} />}
               </CardAction>
            </CardHeader>
            <CardContent>
                <div>
                    <p>Your payment methods will be displayed here.</p>
                </div>
            </CardContent>
        </Card>
    )
}