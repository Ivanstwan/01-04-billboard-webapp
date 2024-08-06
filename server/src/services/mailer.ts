import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { z } from 'zod';

dotenv.config();

// Function to send a password reset email using nodemailer
function sendLinkToEmail(email: string, resetLink: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'id.samael1@gmail.com',
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: 'Create Account Submittion',
    to: email,
    subject: 'Register - Create Password',
    text: `Click the following link to create your password: ${resetLink}`,
    html: `<div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: #0066cc;">Hi,</h1>
        <p style="font-size: 16px;">You have requested to create a new password for your account. Please click the link below to create your password:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; margin-top: 10px; font-size: 16px; color: #ffffff; background-color: #28a745; text-decoration: none; border-radius: 5px;">Create Password</a>
        <p style="margin-top: 20px; font-size: 14px; color: #777;">If you did not request this, please ignore this email.</p>
    </div>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

export { sendLinkToEmail };
