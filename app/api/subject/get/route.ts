import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

export async function GET(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: getprorgam, error: programerror } = await supabase
      .from("users")
      .select("program")
      .eq("user_id", userauth.user.userid)
      .single();

    if (programerror) {
      console.error("Supabase error:", programerror);
      return NextResponse.json(
        { message: "Failed to fetch user program" },
        { status: 500 },
      );
    }
    const userProgramName = getprorgam.program;

    if (!userProgramName) {
      return NextResponse.json(
        { message: "User program not found" },
        { status: 404 },
      );
    }

    const { data, error } = await supabase
      .from("programs")
      .select(
        `program_id,program_name,timetable(
            course_name)`,
      )
      .eq("program_name", userProgramName)
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to fetch subjects" },
        { status: 500 },
      );
    }

    const timetableRows = data?.timetable || [];
    const uniqueSubjects = [
      ...new Set(timetableRows.map((t) => t.course_name)),
    ];

    return NextResponse.json({ subjects: uniqueSubjects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { message: "Failed to fetch subjects" },
      { status: 500 },
    );
  }
}
