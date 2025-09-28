'use server'

import {revalidatePath} from "next/cache";
import {createStripeClient} from "@/lib/stripe-server";

export async function setDefaultPaymentMethod(formData: FormData) {
    const {customer_id, pm_id} = Object.fromEntries(formData.entries()) as { customer_id: string, pm_id: string };

    if (!pm_id || !customer_id) {
        throw new Error('Payment method ID and customer ID are required');
    }
    const stripe = await createStripeClient();
    await stripe.customers.update(customer_id, {
        invoice_settings: {
            default_payment_method: pm_id,
        },
    });
    revalidatePath('/dashboard/');
}

export async function deletePM(formData: FormData) {
    const {pm_id} = Object.fromEntries(formData.entries()) as { pm_id: string };
    const stripe = await createStripeClient();
    await stripe.paymentMethods.detach(pm_id);
    revalidatePath('/dashboard/settings/payment-method');
}