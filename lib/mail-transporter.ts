import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "a24ede2e86872e",
    pass: "05375d85ad4dad"
  }
});

// export const transporter = nodemailer.createTransport({
//    host: 'smtp.resend.com',
//    secure: true,
//    port: 465,
//    auth: {
//       user: 'resend',
//       pass: 're_7Cxee49D_MJuwFJh8xxvtb1xk11DNiuFr',
//    },
// });