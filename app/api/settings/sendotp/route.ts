import { NextRequest, NextResponse } from "next/server";
const { sendEmail } = await import("@/utils/emailservice");
import { checkAuth } from "@/utils/checkauth";

import { supabase } from "@/lib/SupabaseClient";

interface sendotp {
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const userdatatoken = await checkAuth(request);

    if (!userdatatoken.success) {
      return NextResponse.json(
        { error: userdatatoken.message, success: false },
        { status: 401 },
      );
    }
    const otp = Math.floor(100000 + Math.random() * 900000);

    const { email }: sendotp = await request.json();
    console.log(email)
    if (!email) {
      return NextResponse.json(
        { message: "Email is required.", success: false },
        { status: 400 },
      );
    }
    console.log(userdatatoken.user.userid);
    

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("user_id", userdatatoken.user.userid)
      .single();

    if (error || !user) {
      console.log(error);
      
      return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 },
      );
    }

    const { data, error: otpError } = await supabase
      .from("users")
      .update({ otp })
      .select("*")
      .eq("user_id", userdatatoken.user.userid)
      .single();
    if (otpError || !data) {
      console.log(otpError);

      return NextResponse.json(
        { message: "Failed to set OTP.", success: false },
        { status: 500 },
      );
    }
    const emailSent = await sendEmail(
      "Your OTP for email change is:",
      otp,
      email,
    );
    if (!emailSent) {
      return NextResponse.json(
        { message: "Failed to send OTP email.", success: false },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "OTP sent successfully.", success: true },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred.", success: false },
      { status: 500 },
    );
  }
}
