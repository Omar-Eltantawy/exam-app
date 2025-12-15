import { DiplomasAPIResponse } from "@/lib/types/diplomas";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "Unauthorized ❌❌" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "2");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/subjects?page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token.accessToken,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch subjects....." },
        { status: response.status }
      );
    }

    const payload: DiplomasAPIResponse = await response.json();

    return NextResponse.json({
      diplomas: payload.subjects,
      metadata: payload.metadata,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
