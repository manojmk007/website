import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Dizilo — Stores, Agents & Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
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
          background: "#0a090a",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Red glow centre */}
        <div
          style={{
            position: "absolute",
            width: 640,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(199,35,35,0.22) 0%, rgba(199,35,35,0.06) 45%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        />

        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 2,
            background: "linear-gradient(90deg, transparent, #c72323, transparent)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Brand name */}
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-5px",
              lineHeight: 1,
              marginBottom: 20,
            }}
          >
            dizilo
          </div>

          {/* Divider */}
          <div
            style={{
              width: 48,
              height: 2,
              background: "#c72323",
              borderRadius: 2,
              marginBottom: 24,
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 26,
              color: "rgba(255,255,255,0.50)",
              letterSpacing: "0.5px",
              textAlign: "center",
            }}
          >
            Stores · AI Agents · Workflow Automation
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 36,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#c72323",
            }}
          />
          <span
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.5px",
            }}
          >
            dizilo.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
