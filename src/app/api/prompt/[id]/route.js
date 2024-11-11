import { NextResponse } from "next/server";
import client from "@/utils/db";
import {
  GetItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";

// GET (read)
export const GET = async (req, { params }) => {
  const { id } = params;
  const param = {
    TableName: "blog_info",
    Key: {
      blog_id: { S: id },
    },
  };

  try {
    const command = new GetItemCommand(param);
    const data = await client.send(command);
    console.log(data);
    const prompts = {
      id: data.Item.blog_id.S,
      prompt: data.Item.prompt.S,
      tag: data.Item.tag.S,
      creator: data.Item.creator.S,
      response: data.Item.response.S,
    };
    if (!data.Item) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { prompt, tag, response } = await req.json();

  const param = {
    TableName: "blog_info",
    Key: {
      blog_id: { S: id },
    },
    UpdateExpression: "SET #p = :prompt, #t = :tag, #r = :response",
    ExpressionAttributeNames: {
      "#p": "prompt",
      "#t": "tag",
      "#r": "response",
    },
    ExpressionAttributeValues: {
      ":prompt": { S: prompt },
      ":tag": { S: tag },
      ":response": { S: response },
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const command = new UpdateItemCommand(param);
    const data = await client.send(command);
    return new Response(JSON.stringify(data.Attributes), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  const { id } = params;
  const param = {
    TableName: "blog_info",
    Key: {
      blog_id: { S: id },
    },
    ReturnValues: "ALL_OLD",
  };

  try {
    const command = new DeleteItemCommand(param);
    const data = await client.send(command);
    if (!data.Attributes) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(data.Attributes), { status: 200 });
  } catch (e) {
    console.log(e.message);
    return new Response(e.message, { status: 500 });
  }
};
