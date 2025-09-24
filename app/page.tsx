import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-semibold">Next.js on Railway</h1>
       <Button>
          <Link href="/dashboard">
             Dashboard
          </Link>
       </Button>
    </main>
  );
}
