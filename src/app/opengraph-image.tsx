import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const SITE_NAME = "ZANE HANCOCK";

export default async function OpenGraphImage() {
  // Try to use the first sample photo as a background
  let bgStyle: Record<string, string> = { backgroundColor: "#1A1A1A" };

  try {
    const buf = await readFile(
      join(process.cwd(), "public/photos/001.jpg"),
    );
    const b64 = buf.toString("base64");
    bgStyle = {
      backgroundImage: `url(data:image/jpeg;base64,${b64})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  } catch {
    // no photo available — solid background fallback
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px",
          position: "relative",
          ...bgStyle,
        }}
      >
        {/* gradient vignette so the name is always readable */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 55%)",
          }}
        />
        <span
          style={{
            position: "relative",
            color: "#FAFAF8",
            fontSize: 34,
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontFamily: "sans-serif",
          }}
        >
          {SITE_NAME}
        </span>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
