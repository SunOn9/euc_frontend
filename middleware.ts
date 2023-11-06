import { NextResponse, type NextRequest } from "next/server";
import { SimpleReply } from "./generated/common";

export async function middleware(request: NextRequest) {
  let cookies: string | undefined = undefined;

  if (request.url === "/login") {
    cookies = request.cookies.get("euc.sessionid")?.value;
    if (!cookies) {
      return;
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  const data: SimpleReply = await (
    await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/check", {
      headers: {
        "Content-Type": "application/json",
        sessionId: cookies ?? "",
      },
    })
  ).json();

  if (data.statusCode !== 200) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
