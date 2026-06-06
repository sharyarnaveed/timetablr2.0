import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";



export async function POST(request: NextRequest) {

try {
    const userdatatoken = await checkAuth(request);
    
    if (!userdatatoken.success) {
      return NextResponse.json(
        { error: userdatatoken.message, success: false },
        { status: 401 },
      );
    }
    const {skillid} = await request.json();
     if(!skillid){
        return NextResponse.json(
            { message: "Skill ID is required.", success: false },
            { status: 400 },
        );
     }

    const { data, error } = await supabase
        .from("skill_enrollments")
        .insert({ user_id: userdatatoken.user.userid, skill_id: skillid })
        .select("*")
        .single();
    if (error || !data) {
        console.error("Error enrolling in skill:", error);
        return NextResponse.json(
            { message: "Failed to enroll in skill.", success: false },
            { status: 500 },
        );
    }
    
    
    return NextResponse.json({ data, message:"Enrolled in skill successfully", success: true });
}
catch (error) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
        { message: "Failed to fetch skills.", success: false },
        { status: 500 },
    );
}
}