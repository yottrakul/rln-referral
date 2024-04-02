import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  // get parameter from the request
  // redirect to the google
  return NextResponse.redirect(
    "https://pub-86f2b9071bf145ddb0445805d25618ee.r2.dev/_a6886f5f-70c7-49f6-ad95-413da3d30d5b.jpg"
  );
}
