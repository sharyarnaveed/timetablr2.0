import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
interface updateprofile {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}
import { sendEmail } from "@/utils/emailservice";
import bcrypt from "bcryptjs";
export async function PATCH(request: NextRequest) {
  try {
    const userdatatoken = await checkAuth(request);
    console.log(userdatatoken);
    if (!userdatatoken.success) {
      return NextResponse.json(
        { error: userdatatoken.message, success: false },
        { status: 401 },
      );
    }

    const { email, password, confirmPassword, otp }: updateprofile =
      await request.json();

    if (email) {
      const { data: OtpData, error: OtpError } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userdatatoken.user.userid)
        .single();

      if (OtpError || !OtpData) {
        return NextResponse.json(
          { message: "Failed to fetch OTP data.", success: false },
          { status: 500 },
        );
      }

      if (OtpData.otp != otp) {
        return NextResponse.json(
          { message: "Invalid OTP.", success: false },
          { status: 400 },
        );
      }

      const { data: updateuser, error: updateError } = await supabase
        .from("users")
        .update({ email: email, otp: null })
        .eq("user_id", userdatatoken.user.userid)
        .select("*")
        .single();

      if (updateError || !updateuser) {
        return NextResponse.json(
          { message: "Failed to update email.", success: false },
          { status: 500 },
        );
      }

      const mailsend = await sendEmail("Your Email Has been Updated");
      if (!mailsend) {
        return NextResponse.json(
          { message: "Email not sent successfully.", success: false },
          { status: 401 },
        );
      }
      return NextResponse.json(
        {
          message: "Email updated successfully.",
          success: true,
          user: updateuser,
        },
        { status: 200 },
      );
    }

    if (password) {
      if (password != confirmPassword) {
        console.log("Password and confirm password do not match.");
        return NextResponse.json(
          { message: "Passwords do not match.", success: false },
          { status: 400 },
        );
      }
      const { data: getpassword, error: getpassworderror } = await supabase
        .from("users")
        .select("password")
        .eq("user_id", userdatatoken.user.userid)
        .single();

      if (getpassworderror || !getpassword) {
        return NextResponse.json(
          { message: "Failed to fetch user password.", success: false },
          { status: 500 },
        );
      }

      const isPasswordValid = await bcrypt.compare(
        password,
        getpassword?.password,
      );

      if (isPasswordValid) {
        return NextResponse.json(
          {
            message: "New password cannot be the same as the old password.",
            success: false,
          },
          { status: 400 },
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const { data: updatepassword, error: updatepassworderror } =
        await supabase
          .from("users")
          .update({ password: hashedPassword })
          .eq("user_id", userdatatoken.user.userid)
          .select("*")
          .single();

      if (updatepassworderror || !updatepassword) {
        return NextResponse.json(
          { message: "Failed to update password.", success: false },
          { status: 500 },
        );
      }

      const mailsend = await sendEmail("Your Password Has been Updated");
      if (!mailsend) {
        return NextResponse.json(
          { message: "Email not sent successfully.", success: false },
          { status: 401 },
        );
      }

      return NextResponse.json(
        { message: "Password updated successfully.", success: true },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error updating program:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred.", success: false },
      { status: 500 },
    );
  }
}
