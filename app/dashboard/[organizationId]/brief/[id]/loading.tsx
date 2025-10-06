import {Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";

const DESCRIPTION_LINE_WIDTHS = [
  "w-full",
  "w-11/12",
  "w-10/12",
  "w-11/12",
  "w-9/12",
];

export default function Loading() {
  return (
    <div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <div className="grid gap-8 lg:col-span-2 lg:row-span-2 lg:row-end-2">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-8 w-3/4" />
              </CardTitle>
              <CardAction>
                <Skeleton className="h-9 w-20" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {DESCRIPTION_LINE_WIDTHS.map((width, index) => (
                  <Skeleton key={index} className={`h-4 ${width}`} />
                ))}
                <Skeleton className="h-4 w-8/12" />
                <Skeleton className="h-4 w-9/12" />
                <Skeleton className="h-4 w-10/12" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-32" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-10/12" />
                <Skeleton className="h-48 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:col-start-3 lg:row-end-1">
          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-40" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {["w-24", "w-32", "w-20", "w-28"].map((width, index) => (
                <div key={index} className="flex w-full flex-none gap-x-4">
                  <Skeleton className="h-6 w-5" />
                  <Skeleton className={`h-4 ${width}`} />
                </div>
              ))}
            </CardContent>
            <CardFooter className="gap-2">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-28" />
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-24" />
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {[0, 1].map((value) => (
                <div key={value} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-28" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative max-h-80 space-y-6 overflow-hidden border-l pl-6 pr-4">
                {Array.from({length: 5}).map((_, index) => (
                  <div key={index} className="relative space-y-2">
                    <span className="absolute -left-[30px] top-1/2 h-[13px] w-[13px] -translate-y-1/2 rounded-full border-2 border-background bg-muted" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-3 w-56" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

