// Placeholder for secondary modules — keeps navigation coherent in the demo.
export function Stub({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className="content">
      <div className="card card-pad" style={{ textAlign: "center", padding: "64px 24px" }}>
        <div
          style={{
            width: 54,
            height: 54,
            margin: "0 auto 16px",
            borderRadius: 14,
            display: "grid",
            placeItems: "center",
            background: "rgba(91,141,239,0.12)",
            border: "1px solid rgba(91,141,239,0.25)",
            color: "#7aa6ff",
            fontSize: 22,
          }}
        >
          ◴
        </div>
        <h2 style={{ margin: "0 0 8px", fontSize: 18 }}>{title}</h2>
        <p style={{ color: "var(--txt-3)", fontSize: 13, maxWidth: 440, margin: "0 auto" }}>{blurb}</p>
      </div>
    </div>
  );
}
