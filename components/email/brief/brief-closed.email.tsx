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
import {FooterEmail} from "@/components/email/common/footer.email";

type Props = {
   userName: string,
   briefTitle: string,
   companyName: string,
   closureDate: string,
   closureReason: string,
   finalPayment: string,
   dashboardUrl: string,
   supportEmail: string,
}


const BriefClosedNotificationEmail = (props: Props) => {
   const {
      userName = 'User',
      briefTitle = 'Brief Title',
      companyName = 'Company Name',
      closureDate = new Date().toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      }),
      closureReason = 'Project completed successfully',
      finalPayment = '$0',
      dashboardUrl = 'https://example.com/dashboard',
      supportEmail = 'support@example.com'
   } = props;

   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             <Preview>Brief closed: {briefTitle}</Preview>
             <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                   {/* Header */}
                   <Section>
                      <Heading className="text-[28px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                         Brief Closed ✅
                      </Heading>
                   </Section>

                   {/* Main Content */}
                   <Section>
                      <Text className="text-[18px] text-gray-700 leading-[28px] mb-[24px]">
                         Hi {userName},
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[32px]">
                         We're writing to inform you that the following brief has been officially closed.
                      </Text>
                   </Section>

                   {/* Brief Details */}
                   <Section>
                      <Section className="bg-gray-50 border border-gray-200 rounded-[12px] p-[24px] mb-[32px]">
                         <Text className="text-[12px] text-gray-600 font-semibold uppercase tracking-wide mb-[8px] mt-0">
                            CLOSED BRIEF
                         </Text>

                         <Text className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                            {briefTitle}
                         </Text>

                         <Text className="text-[16px] text-gray-700 mb-[12px] mt-0">
                            <strong>Client:</strong> {companyName}
                         </Text>

                         <Text className="text-[16px] text-gray-700 mb-[12px] mt-0">
                            <strong>Closed Date:</strong> {closureDate}
                         </Text>

                         <Text className="text-[16px] text-gray-700 mb-[16px] mt-0">
                            <strong>Reason:</strong> {closureReason}
                         </Text>

                         {finalPayment !== '$0' && (
                             <Text className="text-[18px] font-bold text-green-600 m-0">
                                Final Payment: {finalPayment}
                             </Text>
                         )}
                      </Section>

                      {/* CTA Button */}
                      <Section className="text-center mb-[32px]">
                         <Button
                             href={dashboardUrl}
                             className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                         >
                            View Dashboard
                         </Button>
                      </Section>
                   </Section>

                   {/* Additional Information */}
                   <Section>
                      <Hr className="border-gray-200 my-[32px]" />

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>What happens next:</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                         • All project files and communications remain accessible in your dashboard
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                         • Final payment processing will be completed within 3-5 business days
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                         • You can download project deliverables for your records
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         • The brief will be marked as completed in your project history
                      </Text>

                      <Section className="bg-blue-50 p-[20px] rounded-[8px] mb-[24px] border border-blue-200">
                         <Text className="text-[14px] text-blue-800 leading-[20px] mb-[12px] mt-0">
                            <strong>📁 Project Archive:</strong>
                         </Text>
                         <Text className="text-[14px] text-blue-700 leading-[20px] m-0">
                            All project materials will remain available in your dashboard for future reference. We recommend downloading important files for your personal records.
                         </Text>
                      </Section>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you have any questions about this closure or need access to project materials, please contact our support team at{' '}
                         <Link href={`mailto:${supportEmail}`} className="text-blue-600 no-underline">
                            {supportEmail}
                         </Link>
                         {' '}and we'll be happy to assist you.
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         Thank you for your work on this project. We appreciate your professionalism and look forward to collaborating with you on future briefs.
                      </Text>
                   </Section>

                   {/* Footer */}
                   <FooterEmail />


                </Container>
             </Body>
          </Tailwind>
       </Html>
   );
};

BriefClosedNotificationEmail.PreviewProps = {
   userName: 'Sarah Johnson',
   briefTitle: 'Mobile App UI/UX Design for E-commerce Platform',
   companyName: 'TechStart Solutions',
   closureDate: 'December 28, 2024',
   closureReason: 'Project completed successfully and approved by client',
   finalPayment: '$2,500 USD',
   dashboardUrl: 'https://example.com/dashboard?tab=completed',
   supportEmail: 'support@example.com',
};

export default BriefClosedNotificationEmail;