import client from "../../../../utils/db"; // DynamoDB client instance
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

export const POST = async (req) => {
  let data;
  try {
    data = await req.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON input" }), {
      status: 400,
    });
  }

  const { prompt, tag, userId, response } = data;
  console.log(prompt, tag, userId, response);

  const params = {
    TableName: "blog_info", // DynamoDB table name
    Item: {
      blog_id: { S: `${Date.now()}` }, // Unique ID for each prompt
      prompt: { S: prompt },
      tag: { S: tag },
      creator: { S: userId },
      response: { S: response },
    },
  };

  try {
    const command = new PutItemCommand(params);
    await client.send(command);

    // Return the saved item in the response
    return new Response(JSON.stringify({ prompt, tag, userId, response }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save item" }), {
      status: 500,
    });
  }
};