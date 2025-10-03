"use client"
import {useQueryState} from "nuqs";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {BRIEF_STATUS_TEXT} from "@/lib/brief-status";
import {InputGroup, InputGroupAddon, InputGroupInput} from "@/components/ui/input-group";
import {SearchIcon} from "lucide-react";

const sortOptions = [
   {label: "Due Soon", value: "asc"},
   {label: "Due Latest", value: "desc"},
]

const statusOptions = [
   {label: "All Statuses", value: "all"},
   ...Object.entries(BRIEF_STATUS_TEXT).map(([value, label]) => ({value, label})),
]

export default function SearchInput() {
   const [name, setName] = useQueryState("search", {shallow: false})
   const [sort, setSort] = useQueryState("sort", {shallow: false})
   const [status, setStatus] = useQueryState("status", {shallow: false})

   return (
       <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <label className="sr-only" htmlFor="brief-search">Search briefs</label>
         <InputGroup>
           <InputGroupInput

             id="brief-search"
             value={name ?? ""}
             onChange={(event) => setName(event.target.value)}
             placeholder="Search briefs..."
           />
           <InputGroupAddon>
             <SearchIcon />
           </InputGroupAddon>
         </InputGroup>

          <Select value={sort ?? "asc"} onValueChange={(value) => setSort(value)}>
             <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
             </SelectTrigger>
             <SelectContent>
                {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                       {option.label}
                    </SelectItem>
                ))}
             </SelectContent>
          </Select>

          <Select
              value={status ?? "all"}
              onValueChange={(value) => {
                 void setStatus(value === "all" ? null : value)
              }}
          >
             <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
             </SelectTrigger>
             <SelectContent>
                {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                       {option.label}
                    </SelectItem>
                ))}
             </SelectContent>
          </Select>
       </div>
   )
}
