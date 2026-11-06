"use server";

import { authenticatePortalUser } from "@/lib/portal-auth";
import { createSession } from "@/lib/session";

export async function loginAction(
  _: any,
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await authenticatePortalUser(email, password);
  if (!user) {
    return { error: "Invalid credentials" };
  }

  await createSession(user);
  return { success: true };
}
