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
            .select("notoficationid,classreminders,assignmentrreminders,quizreminder,crmsg,attendancereminder")
            .eq("user_id", auth.user.userid)
            .single();
            
        if (fetchError) throw fetchError;

        return NextResponse.json({
            success: true,
            notificationSettings: {
                notificationId: data.notoficationid,
                classReminders: data.classreminders,
                assignmentReminders: data.assignmentrreminders,
                quizReminders: data.quizreminder,
                crMsg: data.crmsg,
                attendanceReminders: data.attendancereminder
            }
        });


    }
    catch (err) {
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }

}