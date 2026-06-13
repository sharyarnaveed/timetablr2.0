import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";
import redis from "@/lib/Rediscon";
interface verifyemail {
  email: string;
  otp: string;
}
export async function POST(request: NextRequest) {
try{
    const checktheuth = await checkAuth(request);
    if (!checktheuth.success) {
        return NextResponse.json(
            { success: false },
            { status: 401 }
        );
    }
    
    const { email, otp }: verifyemail = await request.json();

    if (!email || !otp) {
       
        return NextResponse.json(
            { success: false, message: "Email and OTP are required." },
            { status: 400 }
        );
    }

    const getotp = await redis.get(`otp:${email}`);

    if (!getotp) {
       
        return NextResponse.json(
            { success: false, message: "OTP has expired or does not exist." },
            { status: 400 }
        );
    }

    if (getotp != otp) {
        return NextResponse.json(
            { success: false, message: "Invalid OTP." },
            { status: 400 }
        );
    }

    const { error } = await supabase
        .from("users")
        .update({ isverified: true })
        .eq("user_id", checktheuth.user.userid);

    if (error) {
        console.error("Error updating user verification status:", error);
        return NextResponse.json(
            { success: false, message: "Failed to verify email." },
            { status: 500 }
        );
    }

    await redis.del(`otp:${email}`);

    return NextResponse.json(
        { success: true, message: "Email verified successfully." },
        { status: 200 }
     );

}
catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
        { success: false, message: "An error occurred while verifying email." },
        { status: 500 }
    );

}
}