import { NextResponse, type NextRequest } from "next/server";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { env } from "@/env";
import { s3 } from "@/server/s3client";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, { params }: { params: { objectid: string } }) {
  // get parameter from the request
  // redirect to the google
  const { objectid } = params;

  // get signed url
  const command = new GetObjectCommand({
    Bucket: env.AWS_BUCKET_NAME,
    Key: objectid,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 30 });

  return NextResponse.redirect(signedUrl);
}
