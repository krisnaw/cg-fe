import {auth} from "@/lib/auth";

export type ActionResponse = {
   success: boolean,
   message: string,
   error?: object,
   id?: string,
}

export const currencyOptions = [
   {value: 'USD', label: 'US$'},
   {value: 'SGD', label: 'S$'},
   {value: 'IDR', label: 'Rp'},
   {value: 'AUD', label: 'AUD$'},
]
export type OrganizationType = typeof auth.$Infer.Organization

export type OrganizationMember = {
   id: string;
   organizationId: string;
   userId: string;
   role: string;
   createdAt: Date | string;
   user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null | undefined;
   };
};