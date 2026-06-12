import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

export async function GET(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

 const { data, error } = await supabase.rpc("get_program_courses", {
  p_uniid: userauth.user.university,
});


    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to fetch subjects" },
        { status: 500 },
      );
    }
    console.log("Courses fetched:", data);

    return NextResponse.json({ courses: data }, { status: 200 });
    


}
    catch (error) {
      console.error("Error checking authentication:", error);
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }}