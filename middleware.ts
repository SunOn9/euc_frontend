import { NextResponse, type NextRequest } from "next/server";
import { SimpleReply } from "./generated/common";

export async function middleware(request: NextRequest) {
  let cookies = request.cookies.get("euc.sessionid")?.value;

  const data: SimpleReply = await (
    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/check", {
      headers: {
        "Content-Type": "application/json",
        sessionId: cookies ?? "",
      },
    })
  ).json();

  if (data.statusCode !== 200) {
    if (
      request.nextUrl.pathname !== "/login" &&
      request.nextUrl.pathname !== "/"
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } else if (request.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
