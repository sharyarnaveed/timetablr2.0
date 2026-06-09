import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

export async function GET(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json(
        { message: "Unauthorized", success: false },
        { status: 401 },
      );
    }

    const { data, error } = await supabase
      .from("planner")
      .select("*")
      .eq("userid", userauth.user.userid)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to fetch plan", success: false },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { message: "Plan fetched successfully", success: true, tasks:data },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json(
      { message: "Failed to fetch plan", success: false },
      { status: 500 },
    );
  }
}
