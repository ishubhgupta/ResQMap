import { resend } from "./config.js";
import { verificationTemplate , confirmationTemplate} from "./emailTemplate.js";
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification',
    text: `Your verification code is: ${token}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};

export const sendConfirmationEmail = async (email, name) => {
  try{
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Sahej - Confirmation Email ",
      html: confirmationTemplate.replace("{userName}", name),
    });
  } catch(error){
    throw new Error("Error sending welcome email");
  }
}

export const sendResetPasswordEmail = async (email, resetURL) => {
  try{
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Password",
      html: `Click <a href="${resetURL}"> here </a> to reset your password`,
    });
  } catch(error){
    throw new Error("Error sending reset password email");
  }
}

export const sendResetPasswordSuccessEmail = async (email) => {
  try{
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Password was Successful",
      html: `Password was reset Successfully`,
    });
  } catch(error){
    throw new Error("Error sending reset password success email");
  }
}

