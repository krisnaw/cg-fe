import * as React from 'react';
import {Body, Button, Container, Hr, Preview, Section, Text,} from '@react-email/components';
import {FooterEmail} from "@/components/email/common/footer.email";
import {LayoutEmail} from "@/components/email/common/layout.email";

const ResetPasswordEmail = ({resetUrl} : { resetUrl: string}) => {

   return (
       <LayoutEmail>
          <Preview>Reset your password - Action required</Preview>
          <Body className="bg-gray-100 font-sans py-[40px] px-1 sm:px-0">
             <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                {/* Main Content */}
                <Section>
                   <Text className="text-[18px] font-bold text-gray-700 leading-[28px] mb-[24px]">
                      Hello!
                   </Text>

                   <Text className="text-base font-normal text-gray-500 leading-[24px] mb-[24px]">
                      You are receiving this email because we received a password reset request for your account.
                   </Text>

                   {/* CTA Button */}
                   <Section className="text-center mb-[32px]">
                      <Button
                          href={resetUrl}
                          className="bg-green-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                      >
                         Reset Password
                      </Button>
                   </Section>

                   <Text className="text-[16px] text-gray-500 leading-[24px] mb-[24px]">
                      This password reset link will expire in 15 minutes.
                   </Text>

                   <Text className="text-[16px] text-gray-500 leading-[24px] mb-[24px]">
                      If you did not request a password reset, no further action is required.
                   </Text>
                </Section>

                <Hr className="border-gray-200 my-1" />
                {/* Security Notice */}
                <Section>

                   <Text className="text-[14px] text-gray-500 leading-[20px] mb-[24px]">
                      If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:
                   </Text>

                   <Text className="text-[12px] text-gray-500 leading-[16px] mb-[24px] break-all bg-gray-50 p-[12px] rounded-[4px] border border-gray-200">
                      {resetUrl}
                   </Text>

                </Section>

                {/* Footer */}
                <FooterEmail />

             </Container>
          </Body>
       </LayoutEmail>
   );
};


export default ResetPasswordEmail;