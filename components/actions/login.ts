"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/session";

export async function login(initialState:any,formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");
  // Replace with DB check
  if (
    email !== "SouthernTrusts" ||
    password !== "Asap@247"
  ) {
    return {
        error:"Email or Password Invalid"
    }
  }

  const session = createSession("user_123");

  const cookieStore = await cookies();

 cookieStore.set("session", session, {
  httpOnly: true,
  secure: false, // <- must be false on http
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24,
});
  redirect("/");
}