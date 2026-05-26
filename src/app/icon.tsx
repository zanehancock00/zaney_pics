import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 20,
          fontWeight: 700,
          fontFamily: "serif",
          letterSpacing: "-0.02em",
        }}
      >
        Z
      </div>
    ),
    { width: 32, height: 32 },
  );
}
