import { NextRequest, NextResponse } from "next/server";
interface forgotPasswordRequestBody {
  email: string;
  otp: number;
  newpassword: string;
  confirmnewpassword: string;
}
const { sendEmail } = await import("@/utils/emailservice");
import redis from "@/lib/Rediscon";
import { supabase } from "@/lib/SupabaseClient";
import hashPassword from "@/utils/hashpassword";

export async function POST(request: NextRequest) {
  try {
    const {
      email,
      otp,
      newpassword,
      confirmnewpassword,
    }: forgotPasswordRequestBody = await request.json();
    if (!email || !otp || !newpassword || !confirmnewpassword) {
      // console.log("Missing fields in request body:", { email, otp, newpassword, confirmnewpassword });
      return NextResponse.json(
        { message: "All fields are required.", success: false },
        { status: 400 },
      );
    }

const {data: user, error} = await supabase
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
    return NextResponse.json(
        { message: "Email is not verified. Please verify your email first.", success: false },
        { status: 400 },
        );
    }



    if (newpassword !== confirmnewpassword) {
      // console.log("Password mismatch:", { newpassword, confirmnewpassword });
      return NextResponse.json(
        { message: "Passwords do not match.", success: false },
        { status: 400 },
      );
    }

    const getdataredis = await redis.get(`forgot:${email}`);

    if (!getdataredis) {
      return NextResponse.json(
        {
          message: "OTP expired or not found. Please request a new one.",
          success: false,
        },
        { status: 400 },
      );
    }

    if (getdataredis != otp) {
      return NextResponse.json(
        { message: "Invalid OTP. Please try again.", success: false },
        { status: 400 },
      );
    }

    const hashedpassword = await hashPassword(newpassword);
    const deleteFromRedis = await redis.del(`forgot:${email}`);
    console.log("Deleted OTP from Redis:", deleteFromRedis);
    if (!deleteFromRedis) {
      console.warn("Failed to delete OTP from Redis, but proceeding with password update.");
    }
    const { data, error: updateError } = await supabase
      .from("users")
      .update({ password: hashedpassword })
      .eq("email", email)
      

    if (updateError || !data) {
      return NextResponse.json(
        { message: "Failed to update password.", success: false },
        { status: 500 },
      );
    }
    await sendEmail(
      "Your password has been successfully reset. If you did not initiate this change, please contact support immediately.",
      undefined,
      email,
    );
    return NextResponse.json(
      { message: "Password reset successful.", success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during forgot password:", error);
    return NextResponse.json(
      {
        message: "An error occurred during the forgot password process.",
        success: false,
      },
      { status: 500 },
    );
  }
}
