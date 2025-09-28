import React, {useState} from 'react';
import {PaymentElement, useElements, useStripe} from '@stripe/react-stripe-js';
import {Button} from "@/components/ui/button";

const SetupForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return null
        }


        const {error} = await stripe.confirmSetup({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: `https://localhost:3000/dashboard/stripe/pm/success`,
            },
        });


        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message || 'An unknown error occurred');
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />

            <div className="flex justify-end mt-4">
                <Button type="submit">Save</Button>
            </div>

            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default SetupForm;