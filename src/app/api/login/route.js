// /pages/api/auth/signin.js
import { NextResponse } from "next/server";
import client from "../../../utils/db";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";

export async function POST(req) {
  const { email, password } = await req.json();

  const params = {
    TableName: "aws_proj",
    Key: {
      email: { S: email },
    },
  };

  try {
    // Fetch the user by email
    const command = new GetItemCommand(params);
    const data = await client.send(command);

    if (!data.Item) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the password matches
    if (data.Item.password.S !== password) {
      return NextResponse.json(
        { message: "Incorrect password" },
        { status: 401 }
      );
    }

    // Return success message (in production, return a token or session)
    return NextResponse.json({
      message: "Signed in successfully",
      data: data.Item,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
