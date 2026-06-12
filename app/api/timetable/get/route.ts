import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

export async function GET(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { data: getprogram, error: programerror } = await supabase
      .from("users")
      .select("program")
      .eq("user_id", userauth.user.userid)
      .single();

    if (programerror || !getprogram?.program) {
      return NextResponse.json(
        { message: "User program not found" },
        { status: 404 },
      );
    }

    const userProgramName = getprogram.program;

    const [timetableResult, repeatResult] = await Promise.all([
      supabase
        .from("programs")
        .select(`program_id, program_name, timetable(*)`)
        .eq("program_name", userProgramName)
        .single(),
      supabase
        .from("repeatcourse")
        .select("coursename, prorgamname")      // grab both cols
        .eq("userid", userauth.user.userid),
    ]);

    if (timetableResult.error) {
      console.error("Timetable fetch error:", timetableResult.error);
      return NextResponse.json(
        { message: "Failed to fetch timetable" },
        { status: 500 },
      );
    }

    if (repeatResult.error) {
      console.error("Repeat courses fetch error:", repeatResult.error);
      return NextResponse.json(
        { message: "Failed to fetch repeat courses" },
        { status: 500 },
      );
    }

    const timetableRows = timetableResult.data?.timetable || [];
    const repeatCourses = repeatResult.data ?? [];
    const repeatCourseNames = new Set(repeatCourses.map((r) => r.coursename));

    // Tag normal timetable rows — mark any that overlap with repeat courses
    const taggedTimetable = timetableRows.map((row) => ({
      ...row,
      isRepeating: repeatCourseNames.has(row.course_name),
    }));

    // Only fetch repeat courses NOT already in the user's own program timetable
    const timetableCourseNames = new Set(timetableRows.map((r) => r.course_name));
    const missingRepeatCourses = repeatCourses.filter(
      (r) => !timetableCourseNames.has(r.coursename),
    );

    // For each missing repeat course, fetch from the program the user selected
    let extraRepeatRows: any[] = [];
    if (missingRepeatCourses.length > 0) {
      const repeatFetches = missingRepeatCourses.map((r) =>
        supabase
          .from("timetable")
          .select(`*, programs!inner(program_name)`)
          .eq("course_name", r.coursename)
          .eq("programs.program_name", r.prorgamname),  // match exact program user picked
      );

      const repeatResults = await Promise.all(repeatFetches);

      for (const result of repeatResults) {
        if (result.error) {
          console.error("Repeat course timetable fetch error:", result.error);
          continue; // skip broken ones, don't crash the whole request
        }
        const rows = (result.data ?? []).map((row) => ({
          ...row,
          isRepeating: true,
        }));
        extraRepeatRows.push(...rows);
      }
    }

    return NextResponse.json(
      { timetable: [...taggedTimetable, ...extraRepeatRows] },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching timetable:", error);
    return NextResponse.json(
      { message: "Failed to fetch timetable" },
      { status: 500 },
    );
  }
}