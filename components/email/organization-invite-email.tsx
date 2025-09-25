import * as React from 'react';
import {
   Body,
   Button,
   Container,
   Head,
   Heading,
   Hr,
   Html,
   Link,
   Preview,
   Section,
   Tailwind,
   Text,
} from '@react-email/components';

const OrganizationInvitationEmail = (props: { inviteeName?: "there" | undefined; inviterName?: "Team Lead" | undefined; organizationName?: "Acme Corporation" | undefined; role?: "Team Member" | undefined; inviteUrl?: "https://example.com/accept-invitation" | undefined; }) => {
   const {
      inviteeName = 'there',
      inviterName = 'Team Lead',
      organizationName = 'Acme Corporation',
      role = 'Team Member',
      inviteUrl = 'https://example.com/accept-invitation'
   } = props;

   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             <Preview>You've been invited to join {organizationName} - Accept your invitation</Preview>
             <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                   {/* Header */}
                   <Section>
                      <Heading className="text-[28px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                         You're Invited! 🎉
                      </Heading>
                   </Section>

                   {/* Main Content */}
                   <Section>
                      <Text className="text-[18px] text-gray-700 leading-[28px] mb-[24px]">
                         Hi {inviteeName},
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[24px]">
                         <strong>{inviterName}</strong> has invited you to join <strong>{organizationName}</strong> as a <strong>{role}</strong>. We're excited to have you as part of our team!
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[32px]">
                         Click the button below to accept your invitation and get started with your new team.
                      </Text>

                      {/* CTA Button */}
                      <Section className="text-center mb-[32px]">
                         <Button
                             href={inviteUrl}
                             className="bg-green-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                         >
                            Accept Invitation
                         </Button>
                      </Section>

                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[32px] text-center">
                         This invitation will expire in 7 days.
                      </Text>
                   </Section>

                   {/* Organization Details */}
                   <Section>
                      <Hr className="border-gray-200 my-[32px]" />

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>Invitation Details:</strong>
                      </Text>

                      <Section className="bg-gray-50 p-[20px] rounded-[8px] mb-[24px]">
                         <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                            <strong>Organization:</strong> {organizationName}
                         </Text>
                         <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] m-0">
                            <strong>Your Role:</strong> {role}
                         </Text>
                         <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                            <strong>Invited by:</strong> {inviterName}
                         </Text>
                      </Section>

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>What happens next?</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • Accept your invitation using the button above
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • Complete your profile setup
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • Access your team workspace and tools
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] ml-[16px]">
                         • Start collaborating with your new team
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you're having trouble with the button above, copy and paste the following link into your browser:
                      </Text>

                      <Text className="text-[12px] text-gray-500 leading-[16px] mb-[24px] break-all bg-gray-50 p-[12px] rounded-[4px] border border-gray-200">
                         {inviteUrl}
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you have any questions about this invitation or need assistance, please contact us at{' '}
                         <Link href="mailto:support@example.com" className="text-blue-600 no-underline">
                            support@example.com
                         </Link>
                         {' '}or reach out to {inviterName} directly.
                      </Text>

                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[24px]">
                         <strong>Note:</strong> If you don't recognize this organization or believe you received this invitation in error, you can safely ignore this email.
                      </Text>
                   </Section>

                   {/* Footer */}
                   <Hr className="border-gray-200 my-[32px]" />
                   <Section>
                      <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0">
                         © 2025 Your Company Name. All rights reserved.
                      </Text>
                      <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0 mt-[8px]">
                         123 Business Street, Suite 100, Jakarta, ID 12345
                      </Text>
                      <Text className="text-[12px] text-gray-500 leading-[16px] text-center m-0 mt-[8px]">
                         <Link href="https://example.com/unsubscribe" className="text-gray-500 no-underline">
                            Unsubscribe
                         </Link>
                      </Text>
                   </Section>
                </Container>
             </Body>
          </Tailwind>
       </Html>
   );
};

OrganizationInvitationEmail.PreviewProps = {
   inviteeName: 'Sarah Johnson',
   inviterName: 'Michael Chen',
   organizationName: 'TechCorp Solutions',
   role: 'Senior Developer',
   inviteUrl: 'https://example.com/accept-invitation?token=inv123xyz789',
};

export default OrganizationInvitationEmail;