import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";

export async function POST(request: NextRequest) {
  try {
    const auth = await checkAuth(request);

    if (!auth.success) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    const { rows } = await request.json();

    const { error } = await supabase
      .from("node_progress")
      .upsert(rows, {
        onConflict: "enrollment_id,node_id",
      });

    if (error) throw error;

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}