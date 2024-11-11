import { NextResponse } from "next/server";
import client from "../../../utils/db";
import { PutItemCommand, GetItemCommand } from "@aws-sdk/client-dynamodb";

export async function POST(req) {
  const { email, name, password, url } = await req.json();
  console.log(email, name, password, url);
  const getUserParams = {
    TableName: "aws_proj",
    Key: {
      email: { S: email },
    },
  };

  try {
    // Check if the user already exists
    const getUserCommand = new GetItemCommand(getUserParams);
    const userData = await client.send(getUserCommand);

    if (userData.Item) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    // Create a new user
    const putUserParams = {
      TableName: "aws_proj",
      Item: {
        email: { S: email },
        password: { S: password }, // In production, hash the password before saving it
        name: { S: name },
        url: { S: url },
      },
    };

    const putUserCommand = new PutItemCommand(putUserParams);
    await client.send(putUserCommand);

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
