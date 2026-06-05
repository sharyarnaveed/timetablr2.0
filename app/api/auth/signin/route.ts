import { supabase } from "@/lib/SupabaseClient";
import { createtoken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

interface SigninRequestBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const { email, password }: SigninRequestBody = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required.", success: false },
        { status: 400 },
      );
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("*, universities(uniname)")
      .eq("email", email)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { message: "Invalid email or password.", success: false },
        { status: 401 },
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password.", success: false },
        { status: 401 },
      );
    }

    const token = createtoken(user.user_id);
    return NextResponse.json(
      {
        token,
        success: true,
        user: {
          fullname: user.full_name,
          email: user.email,
          university: user.universities.uniname,
          program: user.program,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "An error occurred during sign-in.", success: false },
      { status: 500 },
    );
  }
}
