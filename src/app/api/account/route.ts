import { AccountResponse } from "@/lib/types/account";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function PUT(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token?.accessToken) {
      return NextResponse.json(
        { message: "Unauthorized ❌❌" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/editProfile`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: token.accessToken,
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to Update" },
        { status: response.status }
      );
    }

    const payload: AccountResponse = await response.json();

    return NextResponse.json(payload);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
