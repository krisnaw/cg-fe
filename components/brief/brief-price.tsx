"use client"
import {useState} from "react";
import {ChevronDownIcon} from "lucide-react";
import {Label} from "@/components/ui/label";
import {currencyOptions} from "@/lib/types";

export type Currency = "USD" | "SGD" | "IDR";

type BriefPriceProps = {
   defaultCurrency?: string,
   defaultPrice?: string
}
export default function BriefPrice({
   defaultCurrency,
   defaultPrice = "100",
}: BriefPriceProps) {
   const [currency, setCurrency] = useState<string>(defaultCurrency ?? "USD");
   const currencySymbols = currencyOptions.find((item) => item.value == currency)
   return (
       <div className="grid gap-2">
          <Label htmlFor="price">
             Price
          </Label>
          <div>
             <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-ring">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                   {currencySymbols?.label}
                </div>
                <input
                    required
                    id="price"
                    name="price"
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    defaultValue={parseInt(defaultPrice)}
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 text-right"
                />
                <div className="grid shrink-0 grid-cols-1 focus-within:relative">
                   <select
                       id="currency"
                       name="currency"
                       aria-label="Currency"
                       className="col-start-1 row-start-1 w-full appearance-none rounded-md py-1.5 pr-7 pl-3 text-base text-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-ring sm:text-sm/6"
                       defaultValue={defaultCurrency}
                       value={currency}
                       onChange={(event) => setCurrency(event.target.value as Currency)}
                   >
                      {currencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>{option.value}</option>
                      ))}
                   </select>
                   <ChevronDownIcon
                       aria-hidden="true"
                       className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                   />
                </div>
             </div>
          </div>
       </div>
   )
}
