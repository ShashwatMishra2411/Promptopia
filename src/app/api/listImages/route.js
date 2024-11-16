import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(req, res) {
  const bucketName = "hello123hi";

  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
    });
    const response = await s3Client.send(command);

    // Check if response contents exist and map over them
    const imageUrls = response.Contents
      ? await Promise.all(
          response.Contents.map(async (item) => {
            const getObjectCommand = new GetObjectCommand({
              Bucket: bucketName,
              Key: item.Key,
            });
            const url = await getSignedUrl(s3Client, getObjectCommand, {
              expiresIn: 3600,
            }); // URL expires in 1 hour
            return url;
          })
        )
      : [];

    return NextResponse.json(imageUrls);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Error fetching images" },
      { status: 500 }
    );
  }
}
