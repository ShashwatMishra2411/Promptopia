import { NextResponse } from "next/server";
import client from "@/utils/db";
import { ScanCommand } from "@aws-sdk/client-dynamodb";

export async function GET(req, { params }) {
  const { id } = params; // `id` here represents the creator ID

  const param = {
    TableName: "blog_info",
  };

  try {
    const command = new ScanCommand(param);
    const data = await client.send(command);
    // Filter items locally based on the `creator` attribute
    const items = data.Items.filter((item) => item.creator?.S === id);
    const prompts = items.map((item) => ({
      id: item.blog_id.S,
      prompt: item.prompt.S,
      tag: item.tag.S,
      creator: item.creator.S,
      response: item.response.S,
    }));
    // Check if items are found
    if (items.length > 0) {
      return new Response(JSON.stringify(prompts), { status: 200 });
    } else {
      return NextResponse.json({ message: "No items found" }, { status: 404 });
    }
  } catch (error) {
    console.error("DynamoDB scan error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
