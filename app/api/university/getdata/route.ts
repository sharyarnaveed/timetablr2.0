import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    try {

        const {data:universitydata,error} = await supabase.from("universities").select("*");
console.log(universitydata);
        if (error) {
            console.error("Error fetching university data:", error);
            return NextResponse.json({ error: "Failed to fetch university data" }, { status: 500 });
        }

        return NextResponse.json(universitydata);
        
    } catch (error) {
        console.error("Error fetching university data:", error);
        return NextResponse.json({ error: "Failed to fetch university data" }, { status: 500 });
    }
}