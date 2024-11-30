import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

async function verifyToken(token: string) {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	try {
		const response = await fetch(`${apiUrl}/api/auth/valid`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`, // Token is sent in the Authorization header
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			console.log("token verified");
			const data = await response.json();
			return data.valid;
		} else {
			throw new Error(
				`Token verification failed with status: ${response.status}`
			);
		}
	} catch (error) {
		console.error("Token verification error:", error);
		return false;
	}
}

export async function middleware(req: NextRequest) {
	const token = req.cookies.get("auth_token")?.value;
	const url = req.url;
	if (!token) {
		if (!url.includes("/login")) {
			const redirectUrl = new URL("/login", url);
			redirectUrl.searchParams.set("redirectTo", url);
			return NextResponse.redirect(redirectUrl);
		}
		return NextResponse.next();
	}

	const isTokenValid = await verifyToken(token);

	if (isTokenValid) {
		console.log("token valid");
		return NextResponse.next();
	} else {
		console.log("Invalid token, redirecting to login...");
		const redirectUrl = new URL("/login", url);
		redirectUrl.searchParams.set("redirectTo", url);
		return NextResponse.redirect(redirectUrl);
	}
}

export const config = {
	matcher: ["/dashboard/:path*"],
};
