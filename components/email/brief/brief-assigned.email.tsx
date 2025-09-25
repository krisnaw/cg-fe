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

const BriefAssignmentEmail = (props: { userName?: "there" | undefined; companyName?: "Company Name" | undefined; briefTitle?: "BriefTitle" | undefined; dueDate?: "Date" | undefined; price?: "Price" | undefined; projectUrl?: "https://example.com/project-dashboard" | undefined; clientContactEmail?: "client@company.com" | undefined; }) => {
   const {
      userName = 'there',
      companyName = 'Company Name',
      briefTitle = 'BriefTitle',
      dueDate = 'Date',
      price = 'Price',
      projectUrl = 'https://example.com/project-dashboard',
      clientContactEmail = 'client@company.com'
   } = props;

   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             <Preview>Congratulations! You've been assigned to: {briefTitle}</Preview>
             <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                   {/* Header */}
                   <Section>
                      <Heading className="text-[28px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                         Congratulations! 🎉
                      </Heading>
                      <Text className="text-[20px] text-center text-gray-700 mb-[32px] mt-0">
                         You've been assigned to a new brief
                      </Text>
                   </Section>

                   {/* Main Content */}
                   <Section>
                      <Text className="text-[18px] text-gray-700 leading-[28px] mb-[24px]">
                         Hi {userName},
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[32px]">
                         Great news! You have been successfully assigned to work on the following brief. This project is now exclusively yours to complete.
                      </Text>
                   </Section>

                   {/* Brief Details */}
                   <Section>
                      <Section className="bg-green-50 border border-green-200 rounded-[12px] p-[24px] mb-[32px]">
                         <Text className="text-[12px] text-green-600 font-semibold uppercase tracking-wide mb-[8px] mt-0">
                            ASSIGNED PROJECT
                         </Text>

                         <Text className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                            {briefTitle}
                         </Text>

                         <Text className="text-[16px] text-gray-700 mb-[12px] mt-0">
                            <strong>Client:</strong> {companyName}
                         </Text>

                         <Text className="text-[16px] text-gray-700 mb-[12px] mt-0">
                            <strong>Due Date:</strong> {dueDate}
                         </Text>

                         <Text className="text-[16px] text-gray-700 mb-[16px] mt-0">
                            <strong>Contact:</strong>{' '}
                            <Link href={`mailto:${clientContactEmail}`} className="text-blue-600 no-underline">
                               {clientContactEmail}
                            </Link>
                         </Text>

                         <Text className="text-[24px] font-bold text-green-600 m-0">
                            💰 {price}
                         </Text>
                      </Section>

                      {/* CTA Button */}
                      <Section className="text-center mb-[32px]">
                         <Button
                             href={projectUrl}
                             className="bg-green-600 text-white px-[40px] py-[18px] rounded-[8px] text-[18px] font-bold no-underline box-border inline-block"
                         >
                            Access Project Dashboard
                         </Button>
                      </Section>
                   </Section>

                   {/* Project Guidelines */}
                   <Section>
                      <Hr className="border-gray-200 my-[32px]" />

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>Your next steps:</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         1. Access the project dashboard using the button above
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         2. Review the complete brief and project requirements
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         3. Reach out to the client if you need any clarifications
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         4. Begin working on the project deliverables
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] ml-[16px]">
                         5. Submit your work before the due date
                      </Text>

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>Important reminders:</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                         • <strong>Communication:</strong> Keep the client updated on your progress regularly
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                         • <strong>Quality:</strong> Deliver work that meets or exceeds the brief requirements
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px]">
                         • <strong>Timeline:</strong> Manage your time effectively to meet the deadline
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         • <strong>Revisions:</strong> Be prepared to incorporate client feedback
                      </Text>

                      <Section className="bg-blue-50 p-[20px] rounded-[8px] mb-[24px] border border-blue-200">
                         <Text className="text-[14px] text-blue-800 leading-[20px] mb-[12px] mt-0">
                            <strong>💡 Pro Tip:</strong>
                         </Text>
                         <Text className="text-[14px] text-blue-700 leading-[20px] m-0">
                            Start by introducing yourself to the client and confirming your understanding of the project scope. This helps build trust and ensures you're aligned from the beginning.
                         </Text>
                      </Section>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you're having trouble accessing the project dashboard, copy and paste the following link into your browser:
                      </Text>

                      <Text className="text-[12px] text-gray-500 leading-[16px] mb-[24px] break-all bg-gray-50 p-[12px] rounded-[4px] border border-gray-200">
                         {projectUrl}
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         Need help or have questions about this assignment? Contact our support team at{' '}
                         <Link href="mailto:support@example.com" className="text-blue-600 no-underline">
                            support@example.com
                         </Link>
                         {' '}and we'll assist you promptly.
                      </Text>

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>Payment Information:</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         Your payment of <strong>{price}</strong> will be processed automatically upon successful completion and client approval of the project deliverables.
                      </Text>
                   </Section>

                   {/* Footer */}
                   <Hr className="border-gray-200 my-[32px]" />
                   <Section>
                      <Text className="text-[14px] text-gray-700 leading-[20px] mb-[16px] text-center">
                         Best of luck with your project! We're excited to see what you create. 🚀
                      </Text>

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

BriefAssignmentEmail.PreviewProps = {
   userName: 'Sarah Johnson',
   companyName: 'TechStart Solutions',
   briefTitle: 'Mobile App UI/UX Design for E-commerce Platform',
   dueDate: 'January 15, 2025',
   price: '$2,500 USD',
   projectUrl: 'https://example.com/project-dashboard?id=proj123',
   clientContactEmail: 'john.doe@techstart.com',
};

export default BriefAssignmentEmail;