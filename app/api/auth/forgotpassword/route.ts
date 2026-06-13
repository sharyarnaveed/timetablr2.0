import { NextRequest, NextResponse } from "next/server";
interface forgotPasswordRequestBody {
  email: string;
}
const { sendEmail } = await import("@/utils/emailservice");

import { supabase } from "@/lib/SupabaseClient";
import redis from "@/lib/Rediscon";

export async function POST(request: NextRequest) {
  try {
    const { email }: forgotPasswordRequestBody = await request.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email is required.", success: false },
        { status: 400 },
      );
    }

const { data: user, error } = await supabase
  .from("users")
  .select("isverified")
  .eq("email", email)
  .single();

  if (error) {
    console.error("Error fetching user from Supabase:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user data.", success: false },
      { status: 500 },
    );
  }

  if (!user) {
    return NextResponse.json(
      { message: "User with this email does not exist.", success: false },
      { status: 404 },
    );
  }

  if (!user.isverified) {
    console.log("Email is not verified for user:", email);
    return NextResponse.json(
      { message: "Email is not verified. Please verify your email first.", success: false },
      { status: 400 },
    );
  }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const saveinredis = await redis.set(`forgot:${email}`, otp, {
      ex: 120,
    });
    console.log("OTP saved in Redis:", saveinredis);
    if (!saveinredis) {
      return NextResponse.json(
        { message: "Failed to save OTP in Redis.", success: false },
        { status: 500 },
      );
    }

    const emailSent = await sendEmail(
      "Your OTP for password reset is:",
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
    console.error("Error during forgot password:", error);
    return NextResponse.json(
      { message: "An error occurred during forgot password.", success: false },
      { status: 500 },
    );
  }
}
