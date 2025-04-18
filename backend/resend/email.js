import { resend } from "./config.js";
import { verificationTemplate, confirmationTemplate } from "./emailTemplate.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Sahej - Email verification",
      html: verificationTemplate.replace("{verificationToken}", verificationToken),
    });

    if (error) {
      console.error("Resend API Error (Verification Email):", error);
      throw new Error("Failed to send verification email");
    }

    console.log("Verification email sent successfully:", data);
  } catch (error) {
    console.error("Error sending verification email:", error.message);
    throw error;
  }
};

export const sendConfirmationEmail = async (email, name) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Sahej - Confirmation Email",
      html: confirmationTemplate.replace("{userName}", name),
    });

    if (error) {
      console.error("Resend API Error (Confirmation Email):", error);
      throw new Error("Failed to send confirmation email");
    }

    console.log("Confirmation email sent successfully:", data);
  } catch (error) {
    console.error("Error sending confirmation email:", error.message);
    throw error;
  }
};

export const sendResetPasswordEmail = async (email, resetURL) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Password",
      html: `Click <a href="${resetURL}">here</a> to reset your password`,
    });

    if (error) {
      console.error("Resend API Error (Reset Password Email):", error);
      throw new Error("Failed to send reset password email");
    }

    console.log("Reset password email sent successfully:", data);
  } catch (error) {
    console.error("Error sending reset password email:", error.message);
    throw error;
  }
};

export const sendResetPasswordSuccessEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Password was Successful",
      html: `Password was reset successfully.`,
    });

    if (error) {
      console.error("Resend API Error (Reset Password Success Email):", error);
      throw new Error("Failed to send reset password success email");
    }

    console.log("Reset password success email sent successfully:", data);
  } catch (error) {
    console.error("Error sending reset password success email:", error.message);
    throw error;
  }
};
