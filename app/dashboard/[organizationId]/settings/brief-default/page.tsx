import {BriefDefaultForm} from "@/components/brief/brief-default-form";
import {getBriefDefaultByOrgId} from "@/db/query/brief-default.query";

export default async function BriefDefaultPage({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const {organizationId} = await params;
  const defaults = await getBriefDefaultByOrgId(organizationId);

  return (
    <BriefDefaultForm
      organizationId={organizationId}
      defaultCurrency={defaults?.currency ?? "USD"}
      defaultPrice={defaults?.price as unknown as number ?? 0}
      defaultWordCount={defaults?.wordCount ?? 0}
    />
  );
}
