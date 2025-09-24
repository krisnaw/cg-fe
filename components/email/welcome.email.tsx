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

const Welcome = ({ name = "there" } : {name: string}) => {


   return (
       <Html lang="en" dir="ltr">
          <Tailwind>
             <Head />
             <Preview>Welcome to our platform! Let's get you started.</Preview>
             <Body className="bg-gray-100 font-sans py-[40px]">
                <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                   {/* Header */}
                   <Section>
                      <Heading className="text-[32px] font-bold text-gray-900 text-center mb-[32px] mt-0">
                         Welcome aboard, {name}! 🎉
                      </Heading>
                   </Section>

                   {/* Main Content */}
                   <Section>
                      <Text className="text-[18px] text-gray-700 leading-[28px] mb-[24px]">
                         We're thrilled to have you join our community! Thank you for choosing us as your trusted partner.
                      </Text>

                      <Text className="text-[16px] text-gray-600 leading-[24px] mb-[32px]">
                         To get the most out of your experience, we recommend completing your account setup. It only takes a few minutes and will unlock all the amazing features we have to offer.
                      </Text>

                      {/* CTA Button */}
                      <Section className="text-center mb-[32px]">
                         <Button
                             href="https://example.com/setup"
                             className="bg-blue-600 text-white px-[32px] py-[16px] rounded-[8px] text-[16px] font-semibold no-underline box-border inline-block"
                         >
                            Complete Your Setup
                         </Button>
                      </Section>

                      <Text className="text-[14px] text-gray-500 leading-[20px] mb-[24px] text-center">
                         This will only take 2-3 minutes and helps us personalize your experience.
                      </Text>
                   </Section>

                   {/* Additional Info */}
                   <Section>
                      <Hr className="border-gray-200 my-[32px]" />

                      <Text className="text-[16px] text-gray-700 leading-[24px] mb-[16px]">
                         <strong>What's next?</strong>
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • Complete your profile setup
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[8px] ml-[16px]">
                         • Explore our key features
                      </Text>
                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px] ml-[16px]">
                         • Connect with our community
                      </Text>

                      <Text className="text-[14px] text-gray-600 leading-[20px] mb-[24px]">
                         If you have any questions, feel free to reach out to our support team at{' '}
                         <Link href="mailto:support@example.com" className="text-blue-600 no-underline">
                            support@example.com
                         </Link>
                         . We're here to help!
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

Welcome.PreviewProps = {
   name: 'Sarah',
};

export default Welcome;