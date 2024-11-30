import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token");
	const url = req.url;
	// Jeśli token nie istnieje, przekierowujemy na stronę logowania
	if (!token && !req.url.includes("/login")) {
		const redirectUrl = new URL("/login", url);
		redirectUrl.searchParams.set("redirectTo", url); // Zapisujemy URL do parametru redirectTo
		return NextResponse.redirect(redirectUrl);
	}

	// Jeśli token jest obecny, możemy przejść dalej
	return NextResponse.next();
}

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ["/dashboard/:path*"],
};
