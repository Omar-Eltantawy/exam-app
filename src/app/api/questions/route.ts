import { QuestionsResponse } from "@/lib/types/questions";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token?.accessToken) {
      return NextResponse.json({ message: "Unauthorized ❌" }, { status: 401 });
    }

    const examId = request.nextUrl.searchParams.get("exam");

    if (!examId) {
      return NextResponse.json(
        { message: "Exam ID is required" },
        { status: 400 }
      );
    }

    // Fetch questions from external API
    const res = await fetch(
      `https://exam.elevateegy.com/api/v1/questions?exam=${examId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: token.accessToken,
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch questions" },
        { status: res.status }
      );
    }

    const payload: QuestionsResponse = await res.json();

    return NextResponse.json({
      message: "success",
      questions: payload.questions,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
