import client from "@/utils/db"; // DynamoDB client instance
import { ScanCommand } from "@aws-sdk/client-dynamodb";

export const GET = async (req) => {
  try {
    const params = {
      TableName: "blog_info", // Replace with your DynamoDB table name
    };

    // Fetch all items from DynamoDB using ScanCommand
    const command = new ScanCommand(params);
    const data = await client.send(command);

    // Transform the data to make it more usable by converting DynamoDB attribute types
    const prompts = data.Items.map((item) => ({
      id: item.blog_id.S,
      prompt: item.prompt.S,
      tag: item.tag.S,
      creator: item.creator.S,
      response: item.response.S,
    }));
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
