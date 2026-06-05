import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    try {
        const {searchParams} = new URL(request.url);
        const universityId = searchParams.get("universityId");

        const {data:programsname,error} = await supabase.from("programs").select("*").eq("unid", universityId);

        if (error) {
            console.error("Error fetching programs:", error);
            return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
        }

        return NextResponse.json(programsname);
        
    } catch (error) {
        console.error("Error fetching programs:", error);
        return NextResponse.json({ error: "Failed to fetch programs" }, { status: 500 });
    }
}