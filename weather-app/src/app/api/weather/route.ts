import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const apiKey = process.env.WEATHERSTACK_API_KEY;

  const { searchParams } = new URL(req.url);
  const location = searchParams.get("location");

  try {
    const response = await axios.get("http://api.weatherstack.com/current", {
      params: {
        access_key: apiKey,
        query: location,
      },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: error || "Error fetching data" },
      { status: 500 }
    );
  }
}
