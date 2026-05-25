"use server";

import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const baseUrl = process.env.AUTH_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${baseUrl}/upgrade/success`,
    cancel_url: `${baseUrl}/tools/sql`,
    metadata: { userId: session.user.id },
  });

  redirect(checkoutSession.url!);
}
