import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";

interface SkillRequestBody {
  skill: string;
  description: string;
}

export async function POST(request: NextRequest) {
  try {
    const checkauth = await checkAuth(request);
    if (!checkauth.success) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { skill, description }: SkillRequestBody = await request.json();

    if (!skill || !description) {
      return NextResponse.json(
        { message: "Skill and description are required." },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("skill_requests")
      .insert({
        user_id: checkauth.user.userid,
        title: skill,
        reason: description,
      })
      .select("*")
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { message: "Failed to submit skill request.", success: false },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Skill request submitted successfully.", data, success: true },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in POST /api/skills/request:", error);
    return NextResponse.json(
      { message: "An unexpected error occurred.", success: false },
      { status: 500 },
    );
  }
}
