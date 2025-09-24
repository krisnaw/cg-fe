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

const ResetPasswordEmail = (props: { name?: "there" | undefined; resetUrl?: "https://example.com/reset-password" | undefined; }) => {
   const { name = 'there', resetUrl = 'https://example.com/reset-password' } = props;

   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             <Preview>Reset your password - Action required</Preview>
             <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                   {/* Header */}
                   <Section>
                      <Heading className="text-[28px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                         Password Reset Request 🔐
                      </Heading>
                   </Section>

                   {/* Main Content */}
                   <Section>
                      <Text className="text-[18px] text-gray-700 leading-[28px] mb-[24px]">
                         Hi {name},
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[24px]">
                         We received a request to reset the password for your account. If you made this request, click the button below to create a new password.
                      </Text>

                      {/* CTA Button */}
                      <Section className="text-center mb-[32px]">
                         <Button
                             href={resetUrl}
                             className="bg-red-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                         >
                            Reset Your Password
                         </Button>
                      </Section>

                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[24px] text-center">
                         This link will expire in 24 hours for security reasons.
                      </Text>
                   </Section>

                   {/* Security Notice */}
                   <Section>
                      <Hr className="border-gray-200 my-[32px]" />

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>Important Security Information:</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                         • If you didn't request this password reset, please ignore this email - your password will remain unchanged
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[16px]">
                         • Never share your password with anyone
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         • Choose a strong password that includes letters, numbers, and special characters
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you're having trouble with the button above, copy and paste the following link into your browser:
                      </Text>

                      <Text className="text-[12px] text-gray-500 leading-[16px] mb-[24px] break-all bg-gray-50 p-[12px] rounded-[4px] border border-gray-200">
                         {resetUrl}
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you continue to have problems or didn't request this reset, please contact our support team at{' '}
                         <Link href="mailto:support@example.com" className="text-blue-600 no-underline">
                            support@example.com
                         </Link>
                         .
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

ResetPasswordEmail.PreviewProps = {
   name: 'John',
   resetUrl: 'https://example.com/reset-password?token=abc123xyz789',
};

export default ResetPasswordEmail;