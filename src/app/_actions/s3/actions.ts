"use server";
import { generateUUID } from "@/app/_lib";
import { type PromiseResponse } from "@/app/_lib/definition";
import { env } from "@/env";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "@/server/s3client";

export async function getSignedURL(key: string): PromiseResponse<string> {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
    return {
      message: "Success create signed URL",
      success: true,
      data: signedUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      message: { error: "Failed to create signed URL" },
      success: false,
    };
  }
}

export async function getFile(key: string): PromiseResponse<{
  type?: string;
  body: Buffer;
}> {
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: key,
  });

  try {
    const { Body, ContentType } = await s3.send(command);
    if (Body instanceof Uint8Array) {
      return {
        message: "Success get file",
        success: true,
        data: {
          type: ContentType,
          body: Buffer.from(Body),
        },
      };
    } else {
      return {
        message: { error: "Failed to get file" },
        success: false,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: { error: "Failed to get file" },
      success: false,
    };
  }
}

export async function uploadFile(form: FormData): PromiseResponse<string> {
  const file = form.get("image") as File;
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  const Key = generateUUID();
  const command = new PutObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key,
    Body: fileBuffer,
    ContentType: file.type,
  });

  try {
    await s3.send(command);
    return {
      message: `Success upload file ${Key}`,
      success: true,
      data: Key,
    };
  } catch (error) {
    console.error(error);
    return {
      message: { error: "Failed to upload file" },
      success: false,
    };
  }
}
