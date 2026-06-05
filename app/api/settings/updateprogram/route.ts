import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
interface program {
  program: string;
}
import { sendEmail } from "@/utils/emailservice";
export async function PATCH(request: NextRequest) {
  try {
    const userdatatoken = await checkAuth(request);

    if (!userdatatoken.success) {
      return NextResponse.json(
        { error: userdatatoken.message, success: false },
        { status: 401 },
      );
    }

    const { program }: program = await request.json();

    if (!program) {
      return NextResponse.json(
        { error: "Program field is required.", success: false },
        { status: 400 },
      );
    }

    const { data: programs, error } = await supabase
      .from("programs")
      .select("*")
      .eq("program_name", program)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Error getting program data.", success: false },
        { status: 500 },
      );
    }
    if (!programs) {
      return NextResponse.json(
        { error: "Program not found.", success: false },
        { status: 404 },
      );
    }

    const { data: updateuser, error: updateerror } = await supabase
      .from("users")
      .update({ program: programs.program_name })
      .eq("user_id", userdatatoken.user.userid)
      .select()
      .single();

      const send=await sendEmail("Your  program has been changed if it was not you kindly change your password.")

      if(!send){
        console.log("Error sending email notification.");
      }

    if (updateerror) {
      return NextResponse.json(
        { error: "Error updating user program.", success: false },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        message: "User program updated successfully.",
        success: true,
        data: updateuser,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating user program.", success: false },
      { status: 500 },
    );
  }
}
