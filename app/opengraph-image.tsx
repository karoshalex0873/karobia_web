import { ImageResponse } from "next/og";

export const alt = "Karobia Dev portfolio preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8fafc",
          color: "#111827",
          padding: "72px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 30,
            color: "#475569",
          }}
        >
          <span>Karobia Dev</span>
          <span>Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: 0 }}>
            Alex Karobia
          </div>
          <div style={{ maxWidth: 880, fontSize: 38, lineHeight: 1.25 }}>
            Software engineer and AI/ML enthusiast building modern web
            applications and practical technology projects.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 26,
            color: "#1f2937",
          }}
        >
          <span>Next.js</span>
          <span>React</span>
          <span>AI/ML</span>
          <span>Software Engineering</span>
        </div>
      </div>
    ),
    size,
  );
}
