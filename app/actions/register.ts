"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function register(
  formData: FormData,
): Promise<{ success: true } | { error: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required." };
  }

  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "An account with that email already exists." };
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  await db.user.create({
    data: { email, name, password: hashedPassword },
  });

  return { success: true };
}
