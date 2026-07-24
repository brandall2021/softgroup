import { ImageResponse } from "next/og";

export const alt = "SoftGroup | Soluciones Digitales Inteligentes";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #1E293B 100%)",
          color: "white",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.05,
            backgroundImage:
              "linear-gradient(rgba(37, 99, 235, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37, 99, 235, 0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#F8FAFC",
            }}
          >
            Soft
          </span>
          <span
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              background: "linear-gradient(135deg, #2563EB, #06B6D4)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Group
          </span>
        </div>

        {/* Slogan */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 18,
            color: "#94A3B8",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            zIndex: 1,
          }}
        >
          <span>Desarrollo</span>
          <span style={{ color: "#2563EB" }}>|</span>
          <span>Inteligencia Artificial</span>
          <span style={{ color: "#2563EB" }}>|</span>
          <span>Infraestructura</span>
          <span style={{ color: "#2563EB" }}>|</span>
          <span>Networking</span>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #2563EB, #06B6D4, #8B5CF6)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
