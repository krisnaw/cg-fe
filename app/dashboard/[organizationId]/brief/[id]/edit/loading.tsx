import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const DESCRIPTION_BLOCKS = ["w-full", "w-full", "w-11/12", "w-10/12"] as const;
const ASSIGNEE_FIELD_LABEL_WIDTH = "w-16";
const PRICE_FIELD_LABEL_WIDTH = "w-20";

export default function Loading() {
  return (
    <div className="space-y-10">
      <form className="space-y-6" aria-hidden>
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-7 w-32" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-64" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-6 grid gap-2">
                <Skeleton className={`h-4 ${ASSIGNEE_FIELD_LABEL_WIDTH}`} />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="col-span-6 grid gap-2">
                <Skeleton className="h-4 w-20" />
                <div className="space-y-2">
                  {DESCRIPTION_BLOCKS.map((width, index) => (
                    <Skeleton key={index} className={`h-4 ${width}`} />
                  ))}
                  <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-3 w-40" />
              </div>

              <div className="col-span-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[0, 1].map((index) => (
                  <div key={index} className="grid gap-2">
                    <Skeleton className={`h-4 ${ASSIGNEE_FIELD_LABEL_WIDTH}`} />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="col-span-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div className="sm:col-span-2 grid gap-4">
                  <div className="grid gap-2">
                    <Skeleton className={`h-4 ${PRICE_FIELD_LABEL_WIDTH}`} />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                      <Skeleton className="h-10 w-full sm:col-span-1" />
                      <Skeleton className="h-10 w-full sm:col-span-3" />
                    </div>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-end gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
          </CardFooter>
        </Card>
      </form>

      <div className="max-w-xl">
        <div className="border-destructive flex flex-wrap items-center justify-between gap-4 rounded-md border p-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-10 w-36" />
        </div>
      </div>
    </div>
  );
}

