import AccountForm from "@/components/account/account-form";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export default async function AccountPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <AccountForm user={session?.user} />
    </div>
  );
}
