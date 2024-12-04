// utils-server.ts
"use server";
import { cookies } from "next/headers";

export async function signOut() {
	const cookieStore = cookies();

	// Delete the auth token cookie
	cookieStore.set("auth_token", "", {
		path: "/",
		maxAge: 0,
	});

	return { success: true }; // Return success response
}
