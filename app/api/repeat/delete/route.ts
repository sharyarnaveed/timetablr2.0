import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
interface RepeatCourseData {
  coursename: string;
  programname: string;
}
export async function DELETE(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);  
    if (!userauth.success) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    const { coursename, programname }: RepeatCourseData = await request.json();
    if (!coursename || !programname) {
      return NextResponse.json(
        { message: "Course name and program name are required",success:false },
        { status: 400 },
      );
    }
    const { data, error } = await supabase
      .from("repeatcourse")
      .delete()
      .eq("coursename", coursename)
      .eq("prorgamname", programname)
      .eq("userid", userauth.user.userid);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to delete repeat course",success:false },
        { status: 500 },
      );
    }
    return NextResponse.json(
        { message: "Repeat course deleted successfully", success: true },
        { status: 200 },
        );


  }
  catch(error) {
    console.error("Error deleting repeat course:", error);
    return NextResponse.json({ message: "Unauthorized",success:false }, { status: 401 });
  }
}