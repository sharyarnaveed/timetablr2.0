import nodemailer from "nodemailer";

export const sendEmail=async(message:string, otp?:number,email?:string)=>{
try {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email || process.env.EMAIL_USER,
        subject: "Password Reset OTP",
        text: `${message} ${otp}`,
        };
    await transporter.sendMail(mailOptions);
    return true;
} catch (error) {

    console.log("error in senmding the mail");
    return false;
}
}