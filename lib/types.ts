import {auth} from "@/lib/auth";

export type ActionResponse = {
   success: boolean,
   message: string,
   error?: object,
   id?: string,
}

export const initialState: ActionResponse = {
  success: false,
  message: "",
}

export const currencyOptions = [
   {value: 'USD', label: 'US$'},
   {value: 'SGD', label: 'S$'},
   {value: 'IDR', label: 'Rp'},
   {value: 'AUD', label: 'AUD$'},
]
export type SessionUserType = typeof auth.$Infer.Session.user
export type OrganizationType = typeof auth.$Infer.Organization
export type SessionType = typeof auth.$Infer.Session.session
export type MemberType = typeof auth.$Infer.Member
export type InvitationType = typeof auth.$Infer.Invitation


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