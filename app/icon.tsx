import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#071723",
          color: "#21b8e8",
          border: "18px solid #102d3d",
          fontFamily: "Arial, sans-serif",
          fontSize: 176,
          fontWeight: 800,
          letterSpacing: "-18px",
          paddingRight: 18,
        }}
      >
        AW
      </div>
    ),
    size,
  );
}
