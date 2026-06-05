import { NextRequest, NextResponse } from "next/server";
interface forgotPasswordRequestBody {
  email: string;
  otp: number;
  newpassword: string;
  confirmnewpassword: string;

}
    const { sendEmail } = await import("@/utils/emailservice");

import { supabase } from "@/lib/SupabaseClient";
import hashPassword from "@/utils/hashpassword";

export async function POST(request: NextRequest) {
    try{
    const { email, otp, newpassword, confirmnewpassword }: forgotPasswordRequestBody = await request.json();
    if (!email || !otp || !newpassword || !confirmnewpassword) {
        // console.log("Missing fields in request body:", { email, otp, newpassword, confirmnewpassword });
      return NextResponse.json(
        { message: "All fields are required.", success: false },
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
          
    const { data: user, error } = await supabase
      .from("users")
      .select("otp")
      .eq("email", email)
      .single();

if (error || !user) {
    return NextResponse.json(
        { message: "User not found.", success: false },
        { status: 404 },
    );
}
if (user.otp !== Number(otp)) {
    console.log("OTP mismatch:", { providedOtp: otp, storedOtp: user.otp });
    return NextResponse.json(
        { message: "Invalid OTP.", success: false },
        { status: 400 },
    );
}
const hashedpassword =await hashPassword(newpassword);
const { data, error: updateError } = await supabase
  .from("users")
  .update({ password: hashedpassword, otp: null })
  .eq("email", email)
  .select("*")
  .single();

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
    }
catch(error){
    console.error("Error during forgot password:", error);
    return NextResponse.json(
        { message: "An error occurred during the forgot password process.", success: false },
        { status: 500 },
    );
}
}