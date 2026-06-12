import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
interface RepeatCourseData {
  coursename: string;
  programname: string;
}
export async function POST(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { coursename, programname }: RepeatCourseData = await request.json();
    if (!coursename || !programname) {
      return NextResponse.json(
        { message: "Course name and program name are required" },
        { status: 400 },
      );
    }
    const { data, error } = await supabase
      .from("repeatcourse")
      .insert({
        coursename: coursename,
        prorgamname: programname,
        userid: userauth.user.userid,
      })
      .select("*")
      .single();
    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to save repeat course" },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Repeat course saved successfully", repeat: data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving repeat course:", error);
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
