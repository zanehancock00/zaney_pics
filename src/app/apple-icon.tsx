import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1A1A1A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#FAFAF8",
          fontSize: 110,
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: "-0.02em",
        }}
      >
        Z
      </div>
    ),
    { width: 180, height: 180 },
  );
}
