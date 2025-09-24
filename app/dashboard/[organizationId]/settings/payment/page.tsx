import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function PaymentPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment</CardTitle>
                <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <p>Your payment methods will be displayed here.</p>
                </div>
            </CardContent>
        </Card>
    )
}