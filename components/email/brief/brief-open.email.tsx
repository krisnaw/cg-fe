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

const NewBriefEmail = (props: { companyName?: "Company Name" | undefined; briefTitle?: "BriefTitle" | undefined; dueDate?: "Date" | undefined; price?: "Price" | undefined; claimUrl?: "https://example.com/claim-brief" | undefined; }) => {
   const {
      companyName = 'Company Name',
      briefTitle = 'BriefTitle',
      dueDate = 'Date',
      price = 'Price',
      claimUrl = 'https://example.com/claim-brief'
   } = props;

   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             <Preview>New brief available: {briefTitle} - {price} | Claim now!</Preview>
             <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                   {/* Header */}
                   <Section>
                      <Heading className="text-[28px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                         New Brief Available! 🚀
                      </Heading>
                   </Section>

                   {/* Main Content */}
                   <Section>
                      <Text className="text-[18px] text-gray-700 leading-[28px] mb-[24px]">
                         A new brief is now open and ready to be claimed! This could be your next exciting project opportunity.
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[32px]">
                         Review the details below and claim this brief before someone else does. First come, first served!
                      </Text>
                   </Section>

                   {/* Brief Details */}
                   <Section>
                      <Section className="bg-blue-50 p-[24px] rounded-[8px] mb-[32px] border border-blue-200">
                         <Text className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                            {briefTitle}
                         </Text>

                         <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px] m-0">
                            <strong>Company:</strong> {companyName}
                         </Text>
                         <Text className="text-[14px] text-gray-600 leading-[20px] mb-[12px] m-0">
                            <strong>Due Date:</strong> {dueDate}
                         </Text>
                         <Text className="text-[16px] font-semibold text-green-600 leading-[20px] m-0">
                            <strong>Budget:</strong> {price}
                         </Text>
                      </Section>

                      {/* CTA Button */}
                      <Section className="text-center mb-[32px]">
                         <Button
                             href={claimUrl}
                             className="bg-blue-600 text-white px-[40px] py-[18px] rounded-[8px] text-[18px] font-bold no-underline box-border inline-block"
                         >
                            Claim This Brief Now
                         </Button>
                      </Section>

                      <Text className="text-[14px] text-red-600 leading-[20px] mb-[32px] text-center font-semibold">
                         ⚡ Act fast! This brief is available on a first-come, first-served basis.
                      </Text>
                   </Section>

                   {/* Additional Information */}
                   <Section>
                      <Hr className="border-gray-200 my-[32px]" />

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>What happens after you claim?</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • The brief will be exclusively assigned to you
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • You'll receive full project details and requirements
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • Direct communication channel with {companyName}
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] ml-[16px]">
                         • Project timeline and milestone tracking
                      </Text>

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>Important Notes:</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                         • Make sure you can meet the specified due date before claiming
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                         • Review all requirements carefully once you claim the brief
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         • Communicate promptly with the client to ensure project success
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you're having trouble with the button above, copy and paste the following link into your browser:
                      </Text>

                      <Text className="text-[12px] text-gray-500 leading-[16px] mb-[24px] break-all bg-gray-50 p-[12px] rounded-[4px] border border-gray-200">
                         {claimUrl}
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         Questions about this brief? Contact our support team at{' '}
                         <Link href="mailto:support@example.com" className="text-blue-600 no-underline">
                            support@example.com
                         </Link>
                         {' '}for assistance.
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

NewBriefEmail.PreviewProps = {
   companyName: 'TechStart Inc.',
   briefTitle: 'Mobile App UI/UX Design for E-commerce Platform',
   dueDate: 'January 15, 2025',
   price: '$2,500 - $3,500',
   claimUrl: 'https://example.com/claim-brief?id=brief123',
};

export default NewBriefEmail;