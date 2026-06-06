import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";



export async function GET(request: NextRequest) {

try {
    const userdatatoken = await checkAuth(request);
    
    if (!userdatatoken.success) {
      return NextResponse.json(
        { error: userdatatoken.message, success: false },
        { status: 401 },
      );
    }

    const { data, error } = await supabase.rpc(
  "get_skills_with_stats"
);

console.log(data);


    if (error) {
        console.error("Error fetching skills:", error);
        return NextResponse.json(
            { message: "Failed to fetch skills.", success: false },
            { status: 500 },
        );
    }
    
    
    return NextResponse.json({ skills:data, success: true });
    
}catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
        { message: "Failed to fetch skills.", success: false },
        { status: 500 },
    );
}

}
