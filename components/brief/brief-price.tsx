import * as React from "react"
import {ButtonGroup} from "@/components/ui/button-group"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger,} from "@/components/ui/select"
import {Label} from "@/components/ui/label";

const CURRENCIES = [ "USD", "IDR"];

type Props = {
  currency: string
  setCurrency: (value: string) => void
  price: number
}

export default function BriefPrice({currency, setCurrency, price} : Props ) {
  return (
    <div>
      <Label>
        Brief Price
      </Label>
      <div className="mt-2">
        <ButtonGroup className="w-full">
          <Select name="currency" value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="font-mono">{currency}</SelectTrigger>
            <SelectContent className="min-w-24">
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency} value={currency}>
                  {currency}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input defaultValue={price} name="price" placeholder="10.00" pattern="[0-9]*"/>
        </ButtonGroup>
      </div>
    </div>
  )
}
