import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";

export async function GET(request: NextRequest) {
try{
    const auth = await checkAuth(request);
    if (!auth.success) {
        return NextResponse.json(
            { success: false },
            { status: 401 }
        );
    }

    const { data, error: fetchError } = await supabase
        .from("users")
        .select("full_name,email,isverified,universities(uniname)")
        .eq("user_id", auth.user.userid)
        .single();
 console.log(data)
    if (fetchError) {
        console.log("Error fetching user info from database:", fetchError);
    return NextResponse.json(  
        { success: false },
        { status: 500 }
    );
    };
    
    return NextResponse.json({
        success: true,
        userInfo: {
            name: data.full_name,
            email: data.email,
            isVerified: data.isverified,
            program: auth.user.program,
            university: data.universities[0]?.uniname as string || null
        }
    });

}
catch (err) {
    console.log("Error fetching user info:", err);
    return NextResponse.json(
        { success: false },
        { status: 500 }
    );  
}

}