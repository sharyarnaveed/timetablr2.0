import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

const TOKEN_SECRET = process.env.TOKRENVALUE!;

interface AuthTokenPayload extends JwtPayload {
  userid: string | number;
}

type AuthSuccess = {
  success: true;
  user: AuthTokenPayload;
};

type AuthFailure = {
  success: false;
  message: string;
};

export const checkAuth = (req: NextRequest): AuthSuccess | AuthFailure => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        success: false,
        message: "No token provided",
      };
    }
  

    const token = authHeader.split(" ")[1];

   
    const decoded = jwt.verify(token, TOKEN_SECRET);
  
    if (typeof decoded === "string") {
      return {
        success: false,
        message: "Invalid token",
      };
    }

    if (
      typeof decoded.userid !== "string" &&
      typeof decoded.userid !== "number"
    ) {
      return {
        success: false,
        message: "Invalid token",
      };
    }

    return {
      success: true,
      user: decoded as AuthTokenPayload,
    };
  } catch (error) {
    console.log("Authentication error:", error);
    return {
      success: false,
      message: "Invalid token",
    };
  }
};