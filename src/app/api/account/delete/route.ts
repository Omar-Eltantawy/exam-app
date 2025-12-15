import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token?.accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/deleteMe`,
      {
        method: "DELETE",
        headers: {
          token: token.accessToken,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to delete account" },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Account deleted successfully" });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
