import { NextResponse } from "next/server";
import { getSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await getSettings();
    const rawId = settings?.adsense_client || process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-9602292967626980";
    const pubId = rawId.replace(/^ca-/, "").trim();

    if (!pubId) {
      return new NextResponse(
        "# Google AdSense ads.txt\n# Enter your AdSense publisher ID in Admin > Settings to automatically populate this file.\n",
        {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
          },
        }
      );
    }

    const content = `google.com, ${pubId}, DIRECT, f08c47fec0942fa0\n`;

    return new NextResponse(content, {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch {
    return new NextResponse("# Google AdSense ads.txt\n", {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }
}
