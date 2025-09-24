import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
   return (
       <Card>
          <CardHeader>
             <CardTitle>
                <Skeleton className="h-8 w-40" />
             </CardTitle>
             <CardDescription>
                <Skeleton className="mt-2 h-4 w-72" />
             </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                   {Array.from({length: 2}).map((_, index) => (
                       <div key={index} className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-10 w-full" />
                       </div>
                   ))}
                </div>

                <div className="col-span-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                   <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-full" />
                   </div>
                   <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-10 w-full" />
                   </div>
                   <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-10 w-full" />
                   </div>
                </div>

                <div className="col-span-6 space-y-2">
                   <Skeleton className="h-4 w-24" />
                   <Skeleton className="h-10 w-full" />
                </div>

                <div className="col-span-6 space-y-2">
                   <Skeleton className="h-4 w-32" />
                   <Skeleton className="h-40 w-full" />
                </div>
             </div>
          </CardContent>
          <CardFooter className="justify-end">
             <Skeleton className="h-10 w-32" />
          </CardFooter>
       </Card>
   )
}
