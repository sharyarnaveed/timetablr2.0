import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

export async function GET(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const course = searchParams.get("course");

    if (!course) {
      return NextResponse.json(
        { message: "Course parameter is required" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("timetable")
      .select("*,programs(program_name)")
      .eq("course_name", course)
      .eq("uniid", userauth.user.university);
      

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to fetch subjects" },
        { status: 500 },
      );
    }

  const { data:usertimetable, error: userTimetableError } = await supabase
      .from("programs")
      .select(
        `program_id,program_name,timetable(
           *)`,
      )
      .eq("program_name", userauth.user.program)
      .single();
    if (userTimetableError) {
        console.error("Supabase error:", userTimetableError);
        return NextResponse.json(
            { message: "Failed to fetch user timetable" },
            { status: 500 },
            );
        }


    return NextResponse.json({ timetable: data, userTimetable: usertimetable }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { message: "Failed to fetch subjects" },
      { status: 500 },
    );
  }
}
