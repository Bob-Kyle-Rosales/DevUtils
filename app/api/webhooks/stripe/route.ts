import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed.", message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    if (userId) {
      await db.user.update({
        where: { id: userId },
        data: {
          plan: "pro",
          stripeCustomerId: session.customer as string,
        },
      });
    }
  }
  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;
    await db.user.update({
      where: { stripeCustomerId: subscription.customer as string },
      data: { plan: "free" },
    });
  }

  return NextResponse.json({ received: true });
}
