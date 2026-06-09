import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";

interface SavePlannerRequestBody {
  task: string;
  priority: "Hard"| "Medium" | "Low";
    duedate: string;
    subject?: string;
}

export async function POST(request: NextRequest) {
  try {
    const userauth = await checkAuth(request);
    if (!userauth.success) {
      return NextResponse.json({ message: "Unauthorized", success: false }, { status: 401 });
    }

    const { task, priority, duedate, subject }: SavePlannerRequestBody = await request.json();
    console.log("Received data:", { task, priority, duedate, subject });
if (!task || !priority || !duedate) {
        return NextResponse.json({ message: "Missing required fields", success: false }, { status: 400 });
    }
    if (!["Hard", "Medium", "Low"].includes(priority)) {
        return NextResponse.json({ message: "Invalid priority value", success: false }, { status: 400 });
    }

    const { data, error } = await supabase
        .from("planner")
        .insert({
            userid: userauth.user.userid,
            task,
            priority,
            duedate,
            subject,
        })
        .select("*")
        .single();
    if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ message: "Failed to save plan", success: false }, { status: 500 });
    }

    return NextResponse.json({ message: "Plan saved successfully", success: true, data }, { status: 200 });

  }
    catch (error) {
        console.error("Error saving route:", error);
        return NextResponse.json({ message: "Failed to save plan", success: false }, { status: 500 });
    }
}