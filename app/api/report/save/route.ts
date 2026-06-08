import { supabase } from "@/lib/SupabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { checkAuth } from "@/utils/checkauth";


export async function POST(request: NextRequest) {
  try {
    const userdatatoken = await checkAuth(request);

    if (!userdatatoken.success) {
      return NextResponse.json(
        { error: userdatatoken.message, success: false },
        { status: 401 },
      );
    }
 const formData = await request.formData();
    const issue = formData.get("issue_type") as string;
    const description = formData.get("description") as string;
    const attachmentFiles = formData.getAll("attachments") as File[];

 if (!issue || !description) {
  console.log("Missing required fields:", { issue, description });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
        const uploadedUrls: string[] = [];
          const ticketId = `TT-${Date.now().toString().slice(-6)}`;
      

               for (let i = 0; i < attachmentFiles.length; i++) {
      const file = attachmentFiles[i];
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `reports/${ticketId}/attachment_${i}.${ext}`;

      const buffer = await file.arrayBuffer();

      const { error: uploadError } = await supabase.storage
        .from("report-attachments")
        .upload(path, buffer, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("report-attachments")
        .getPublicUrl(path);

      uploadedUrls.push(urlData.publicUrl);
    }

  const { data, error: insertError } = await supabase
      .from("report")
      .insert({
        ticket_id: ticketId,
        issue_type: issue,
        description,
        attachments: uploadedUrls,
        status: "open",
        userid: userdatatoken.user.userid,
      })
      .select()
      .single();

    if (insertError || !data) {
      console.error("Error saving report:", insertError);
      return NextResponse.json(
        { message: "Failed to save report" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "Report saved successfully",
      success: true,
      report: data,
    });
  } catch (error) {
    console.error("Error fetching report:", error);
    return NextResponse.json(
      { message: "Failed to fetch report",success: false },
      { status: 500 },
    );
  }
}
