import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";

const allowedKeys = [
  "classreminders",
  "assignmentrreminders",
  "attendancereminder",
  "quizreminder",
  "crmsg",
] as const;

type NotificationKey = (typeof allowedKeys)[number];

export async function PATCH(request: NextRequest) {
  try {
    const auth = await checkAuth(request);
    if (!auth.success) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const body = await request.json() as Record<NotificationKey, unknown>;

    const updates: Record<string, boolean> = {};
    for (const key of allowedKeys) {
      if (typeof body[key] === "boolean") {
        updates[key] = body[key];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { success: false, message: "No valid notification settings provided" },
        { status: 400 },
      );
    }

    const { error } = await supabase
      .from("users")
      .update(updates)
      .eq("user_id", auth.user.userid);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error updating notification settings:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}