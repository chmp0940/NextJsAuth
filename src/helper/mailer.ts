/* eslint-disable @typescript-eslint/no-explicit-any */
import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';


export const sendEmail =async ({email,emailType,userId}:any)=>{
  try {
    // creating hash token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 minutes
      });
    }

    // create reusable transporter object using the default SMTP transport
    // Looking to send emails in production? Check out our Email API/SMTP product!
    // Looking to send emails in production? Check out our Email API/SMTP product!
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "53200f3d93cf13",
        pass: "260aaaaed39d24",
      },
    });

    const mailOptions = {
      from: "mukund@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
        or copy paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`,
    };

    // const mailOptions = {
    //   from: "test@example.com",
    //   to: "test@example.com",
    //   subject: "Test Email",
    //   text: "This is a test email.",
    // };

    try {
      const mailresponse = await transport.sendMail(mailOptions);
      console.log("Mailtrap response:", mailresponse);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sending email:", error.message);
      } else {
        console.error("Error sending email:", error);
      }
    }
    const mailresponse = await transport.sendMail(mailOptions);
    // console.log("Mailtrap response:", mailresponse);
    // console.log("Mail sent successfully:", mailresponse);
    return mailresponse;
  } catch (error:unknown) {
    if (error instanceof Error) {
      console.error("Error in sendEmail function:", error.message);
    } else {
      console.error("Error in sendEmail function:", error);
    }
  }
}