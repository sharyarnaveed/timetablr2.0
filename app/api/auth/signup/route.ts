import { supabase } from "@/lib/SupabaseClient";
import hashPassword from "@/utils/hashpassword";
import { createtoken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

interface SignupRequestBody {
  fullname: string;
  email: string;
  password: string;
  repassword: string;
  university: string;
  program: string;
  agreed: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const {
      fullname,
      email,
      password,
      repassword,
      university,
      program,
        agreed, 
    }: SignupRequestBody = await request.json();

    if (
      !fullname ||
      !email ||
      !password ||
      !repassword ||
      !university ||
      !program ||
      !agreed
    ) {     
     
      console.log("Validation error: Missing required fields.");
      return NextResponse.json(
        { error: "All fields are required.",success:false },
        { status: 400 },
      );
    }
    if (password !== repassword) {
      return NextResponse.json(
        { error: "Passwords do not match.",success:false },
        { status: 400 },
      );

    }

    const { data: universitiesname, error: unierror } = await supabase
      .from("universities")
      .select("*")
      .eq("id",university).single();

    if (unierror) {
      console.error("Error gertting  universities data:", unierror);
      return NextResponse.json(
        { error: "Error gertting  universities data:", success: false },
        { status: 500 },
      );
    }

    if (universitiesname.length < 0) {
      console.log("No universities data:", unierror);
      return NextResponse.json(
        { error: "No universities data", success: false },
        { status: 500 },
      );
    }



     const {data:duplicate,error:duplicateerror}=await supabase
     .from("users")
     .select("email")
     .eq("email",email)

     if (Array.isArray(duplicate) && duplicate.length > 0) {
        console.log("Validation error: Email already exists.");
        return NextResponse.json(
            { error: "Email already exists.", success: false  },
            { status: 400 },
            );
            
     }

     if(duplicateerror){
        console.log("Error checking for duplicate email:", duplicateerror);
        return NextResponse.json(
          { error: "Error checking for duplicate email.", success: false },
          { status: 500 },
        );
     }

     const hashedpassword= await hashPassword(password)

     const {data:newuser,error} = await supabase.from("users").insert({
        full_name:fullname,
        email,
        password:hashedpassword,
        university,
        program,
        agree:true
     })
     .select("user_id")
     .single()

     if (error){
        console.error("Error inserting user data:", error);
        return NextResponse.json(
          { error: "Error inserting user data.", success: false },
          { status: 500 },
        );
      }

      const token=createtoken(newuser.user_id,program,university)


     return NextResponse.json(
        { message: "Signup successful.", success: true, token:token },
        { status: 200 },
      );            
     

  } catch (error) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: "An error occurred during signup.", success: false },
      { status: 500 },
    );
  }
}