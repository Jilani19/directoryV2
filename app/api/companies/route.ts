import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://directoryv2-backend.onrender.com";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const response = await fetch(
      `${BACKEND_URL}/company?${searchParams.toString()}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const contentType = response.headers.get("content-type");

    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: `Backend returned ${response.status}`,
        },
        {
          status: response.status,
        }
      );
    }

    if (!contentType?.includes("application/json")) {
      const text = await response.text();

      return NextResponse.json(
        {
          success: false,
          message: "Backend did not return JSON",
          response: text,
        },
        {
          status: 500,
        }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy Error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to connect to backend",
      },
      {
        status: 500,
      }
    );
  }
}
