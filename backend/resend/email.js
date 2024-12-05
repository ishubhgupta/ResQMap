import { resend } from "./config.js";
import { verificationTemplate , confirmationTemplate} from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try{
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Sahej - Email verification",
      html: verificationTemplate.replace("{verificationToken}", verificationToken),
    });
  } catch(error){
    throw new Error("Error sending verification email");
  }
}

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

