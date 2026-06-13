import { NextRequest, NextResponse } from "next/server";

interface reviewRequestBody {
  productId: string;
  rating: number;
  comment: string;
}
import gplay from "google-play-scraper";

export async function GET(request: NextRequest) {
  try {

    const reviews = await gplay.reviews({
      appId: "com.sharyar_naveed.timetablr",
       sort: (gplay.sort as any).RATING,
      num: 3,
    });

    return NextResponse.json(
      { message: "Reviews fetched successfully.", success: true, reviews },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching reviews.", success: false },
      { status: 500 },
    );
  }
}
