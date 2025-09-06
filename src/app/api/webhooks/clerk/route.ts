import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  const authorization = req.headers.get("authorization");
  const svix_id = req.headers.get("svix-id");
  const svix_timestamp = req.headers.get("svix-timestamp");
  const svix_signature = req.headers.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- missing required svix headers", { status: 400 });
  }

  if (!authorization && !svix_signature) {
    return new Response("Error occured -- webhook signature verification failed", { status: 400 });
  }


  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
      "authorization": authorization ?? "",
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured: Signature verification failed", { status: 400 });
  }

  const eventType = evt.type;

  console.log(`✅ Webhook received: ${eventType}`);

  if (eventType === "user.created" || eventType === "user.updated") {
    const { id, email_addresses } = evt.data;
    const email = email_addresses[ 0 ]?.email_address;

    if (!email) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }

    await prisma.user.upsert({
      where: { id },
      update: { email },
      create: {
        id,
        email,
      },
    });

    console.log(`User ${id} was successfully created or updated in the database.`);
    return NextResponse.json(
      { message: "User created/updated successfully" },
      { status: 200 }
    );
  }

  return new Response("", { status: 200 });
}
