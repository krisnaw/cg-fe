"use client"

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button";
import {Elements} from "@stripe/react-stripe-js";
import React from "react";
import SetupForm from "@/components/stripe/setup-form";
import getStripe from "@/lib/stripe-client";

export function ButtonAddCard({ secret } : { secret: string }) {
    const stripePromise = getStripe();

    const options = {clientSecret: secret};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Add payment methods</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add payment methods</DialogTitle>
                </DialogHeader>
                <Elements stripe={stripePromise} options={options}>
                    <SetupForm />
                </Elements>
            </DialogContent>
        </Dialog>

    )
}