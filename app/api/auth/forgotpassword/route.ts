
import { NextRequest, NextResponse } from "next/server";
interface forgotPasswordRequestBody {
  email: string;
}
    const { sendEmail } = await import("@/utils/emailservice");

import { supabase } from "@/lib/SupabaseClient";

export async function POST(request: NextRequest) {
try{
    const { email }: forgotPasswordRequestBody = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required.", success: false },
        { status: 400 },
      );
    }
    
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
        return NextResponse.json(
            { message: "User not found.", success: false },
            { status: 404 },
        );
        }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const { data, error: otpError } = await supabase
      .from("users")
      .update({ otp })
      .select("*")
      .eq("email", email)
      .single()
    if (otpError || !data) {
        return NextResponse.json(
            { message: "Failed to set OTP.", success: false },
            { status: 500 },
        );
        }
    const emailSent = await sendEmail("Your OTP for password reset is:", otp, email);
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
    
}
catch(error){
    console.error("Error during forgot password:", error);
    return NextResponse.json(
      { message: "An error occurred during forgot password.", success: false },
      { status: 500 },
    );
}
}