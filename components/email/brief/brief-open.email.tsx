import * as React from 'react';
import {Body, Button, Container, Preview, Section, Text,} from '@react-email/components';
import {LayoutEmail} from "@/components/email/common/layout.email";
import {FooterEmail} from "@/components/email/common/footer.email";

type Props = {
   companyName: string
   briefTitle: string
   dueDate: string
   price: string
   claimUrl: string
};

const NewBriefEmail = (props : Props) => {
   const {
      companyName,
      briefTitle,
      dueDate,
      price,
      claimUrl
   } = props;

   return (
       <LayoutEmail>
          <Preview>New brief available: {briefTitle} - {price} | Claim now!</Preview>
          <Body className="bg-gray-100 font-sans py-[40px] px-1 sm:px-0">
             <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">

                {/* Main Content */}
                <Section>
                   <Text className="text-[18px] font-bold text-gray-700 leading-[28px] mb-[24px]">
                      Hello!
                   </Text>
                   
                   <Text className="text-base text-gray-700 leading-[28px] mb-[24px]">
                      A new brief is available for claim.
                   </Text>

                   <Text className="text-base text-gray-500 leading-[24px] mb-[32px]">
                      Review the details below and claim this brief before someone else does. First come, first served!
                   </Text>
                </Section>

                {/* Brief Details */}
                <Section>
                   <Section className="bg-blue-50 p-[24px] rounded-[8px] mb-[32px] border border-blue-200">
                      <Text className="text-[20px] font-bold text-gray-900 mb-[16px] mt-0">
                         {briefTitle}
                      </Text>

                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[12px] m-0">
                         <strong>Company:</strong> {companyName}
                      </Text>
                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[12px] m-0">
                         <strong>Due Date:</strong> {dueDate}
                      </Text>
                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[12px] m-0">
                         <strong>Price:</strong> {price}
                      </Text>
                   </Section>

                   {/* CTA Button */}
                   <Section className="text-center mb-[32px]">
                      <Button href={claimUrl} className="bg-blue-600 text-white px-[40px] py-[18px] rounded-[8px] text-base font-bold no-underline box-border inline-block">
                         Claim This Brief Now
                      </Button>
                   </Section>

                </Section>

                {/* Footer */}
                <FooterEmail />
             </Container>
          </Body>
       </LayoutEmail>
   );
};

export default NewBriefEmail;