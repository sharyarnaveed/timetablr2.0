import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userauth = await checkAuth(req);
    if (!userauth.success) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const { completed } = await req.json();
    const { id: taskId } = await params;

    const { error } = await supabase
      .from("planner")        // adjust to your table name
      .update({ completed })
      .eq("id", taskId)
      .eq("userid", userauth.user.userid); 

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Task updated" });
  } catch (e) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}