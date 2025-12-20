import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const mailer = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    if (emailType == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyExpiryToken: Date.now() + 3600000,
      });
    } else if (emailType == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetPasswordToken: hashedToken,
        forgetPasswordExpiryToken: Date.now() + 3600000,
      });
    }
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ae1307a02e8183",
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: "maajb1122@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "verify your email" : "reset the password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      } / verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your email"
      }</p>`,
    };

    const mailRes = await transport.sendMail(mailOptions);
    return mailRes;
  } catch (error: any) {
    throw new error(error.message);
  }
};
