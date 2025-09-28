import {Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {createStripeClient} from "@/lib/stripe-server";
import {ButtonAddCard} from "@/components/stripe/button-add-card";
import Stripe from "stripe";
import {Button} from "@/components/ui/button";
import {deletePM, setDefaultPaymentMethod} from "@/app/dashboard/[organizationId]/settings/payment/pm-actions";

export default async function PaymentPage() {

   const stripe = await createStripeClient()

   const customer_id = "cus_T0A7ppXLk4jwmq"

   const { data } = await stripe.customers.listPaymentMethods(customer_id);

   const intent = await stripe.setupIntents.create({customer: customer_id})
   const customer = await stripe.customers.retrieve(customer_id) as Stripe.Response<Stripe.Customer>;
   const default_pm = customer.invoice_settings.default_payment_method;

    return (
        <Card className="max-w-lg">
            <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>

               <CardAction>
                  {intent.client_secret &&  <ButtonAddCard secret={intent.client_secret} />}
               </CardAction>
            </CardHeader>
            <CardContent className="max-h-96 overflow-scroll">
               <div className="divide-y divide-gray-200">
                  {data.map((pm: Stripe.PaymentMethod) => pm.card && (
                      <div key={pm.id} className="py-2.5">
                         <div className="rounded-md sm:flex sm:items-start sm:justify-between">
                            <h4 className="sr-only">{pm.card.brand}</h4>
                            <div className="sm:flex sm:items-start">
                               <img src={`/pm/${pm.card.brand}.svg`} className="h-12 w-auto" alt={pm.card.brand} width={36} height={24}/>
                               <div className="mt-3 sm:mt-0 sm:ml-4">
                                  <div className="text-sm font-medium ">Ending with {pm.card.last4}</div>
                                  <div className="mt-1 text-sm text-gray-600 sm:flex sm:items-center">
                                     <div>Expires {pm.card.exp_month}/{pm.card.exp_year}</div>
                                     {/*<span aria-hidden="true" className="hidden sm:mx-2 sm:inline">*/}
                                     {/*    &middot;*/}
                                     {/*</span>*/}
                                     {/*<div className="mt-1 sm:mt-0">Last updated on 22 Aug 2017</div>*/}
                                  </div>
                               </div>
                            </div>
                            <div className="mt-4 sm:mt-0 sm:ml-6 sm:shrink-0">
                               {pm.id !== default_pm ? (
                                   <div className="flex items-center space-x-4">
                                      <form action={setDefaultPaymentMethod}>
                                         <input type="hidden" name="customer_id" value={customer_id} />
                                         <input type="hidden" name="pm_id" value={pm.id} />
                                         <Button > Set default </Button>
                                      </form>

                                      <form action={deletePM}>
                                         <input type="hidden" name="pm_id" value={pm.id} />
                                         <Button > Delete PM </Button>
                                      </form>
                                   </div>
                               ): (

                                   <span className="text-lg bg-blue-100 text-blue-700 px-3.5 py-0.5 rounded-md">Default</span>
                               )}
                            </div>
                         </div>
                      </div>
                  ))}
               </div>

            </CardContent>
        </Card>
    )
}