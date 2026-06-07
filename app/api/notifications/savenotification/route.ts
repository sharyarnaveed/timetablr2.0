import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";
import { supabase } from "@/lib/SupabaseClient";

export async function POST(request: NextRequest) {

    try{
        const auth = await checkAuth(request);
        
        if (!auth.success) {
            return NextResponse.json(
                { success: false },
                { status: 401 }
            );
        }
        const {notificationid}=await request.json();
        console.log(notificationid);

        if(!notificationid){
            return NextResponse.json(
                { success: false, message: "Notification ID is required" },
                { status: 400 }
            );
        }

        const { data, error: fetchError } = await supabase
            .from("users")
            .select("notoficationid,classreminders,assignmentrreminders,quizreminder,crmsg,attendancereminder")
            .eq("user_id", auth.user.userid)
            .single();
            
        if (fetchError) throw fetchError;

        if(data.notoficationid === notificationid){
            return NextResponse.json({
                success: true,
                message: "Notification ID is already up to date"
            });
        }
        

        const { error } = await supabase
            .from("users")
            .update({ notoficationid: notificationid, classreminders: true, assignmentrreminders: true, quizreminder: true, crmsg: true, attendancereminder: true })
            .eq("user_id", auth.user.userid);
            
            console.log(error);
        if (error) throw error;


        return NextResponse.json({
            success: true,
        });
    }
    catch (err) {
        return NextResponse.json(
            { success: false },
            { status: 500 }
        );
    }
}