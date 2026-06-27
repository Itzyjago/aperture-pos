// Minimal stroke-icon set (no icon-font dependency — keeps the demo self-contained).
import type { CSSProperties } from "react";

type P = { className?: string; style?: CSSProperties };
const S = (children: React.ReactNode) =>
  function Icon({ className, style }: P) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden="true">
        {children}
      </svg>
    );
  };

const s = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export const IcGrid = S(
  <>
    <rect x="3" y="3" width="7" height="9" rx="1.5" {...s} />
    <rect x="14" y="3" width="7" height="5" rx="1.5" {...s} />
    <rect x="14" y="12" width="7" height="9" rx="1.5" {...s} />
    <rect x="3" y="16" width="7" height="5" rx="1.5" {...s} />
  </>
);
export const IcPulse = S(
  <path d="M3 12h3l2.5-6 4 13 2.5-7H21" {...s} />
);
export const IcChart = S(
  <>
    <path d="M4 4v16h16" {...s} />
    <path d="M8 14l3-4 3 2 4-6" {...s} />
  </>
);
export const IcStore = S(
  <>
    <path d="M4 9l1.2-4h13.6L20 9" {...s} />
    <path d="M4 9v10h16V9" {...s} />
    <path d="M9 19v-5h6v5" {...s} />
  </>
);
export const IcCart = S(
  <>
    <circle cx="9" cy="20" r="1.4" {...s} />
    <circle cx="18" cy="20" r="1.4" {...s} />
    <path d="M3 4h2l2.2 11h11l1.8-8H6" {...s} />
  </>
);
export const IcBox = S(
  <>
    <path d="M12 3 21 7.5v9L12 21 3 16.5v-9L12 3Z" {...s} />
    <path d="M3 7.5 12 12l9-4.5M12 12v9" {...s} />
  </>
);
export const IcTag = S(
  <>
    <path d="M3 12V4h8l9 9-8 8-9-9Z" {...s} />
    <circle cx="7.5" cy="7.5" r="1.3" {...s} />
  </>
);
export const IcUsers = S(
  <>
    <circle cx="9" cy="8" r="3" {...s} />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.8M21 20a5.5 5.5 0 0 0-4-5.3" {...s} />
  </>
);
export const IcGear = S(
  <>
    <circle cx="12" cy="12" r="3" {...s} />
    <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" {...s} />
  </>
);
export const IcBell = S(
  <>
    <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" {...s} />
    <path d="M10 19a2 2 0 0 0 4 0" {...s} />
  </>
);
export const IcSearch = S(
  <>
    <circle cx="11" cy="11" r="6.5" {...s} />
    <path d="M20 20l-3.5-3.5" {...s} />
  </>
);
export const IcUp = S(<path d="M7 14l5-5 5 5" {...s} />);
export const IcDown = S(<path d="M7 10l5 5 5-5" {...s} />);
export const IcDollar = S(
  <>
    <path d="M12 3v18" {...s} />
    <path d="M16 7.5C16 5.6 14.2 4.5 12 4.5S8 5.6 8 7.5 9.8 10 12 10.5s4 1.2 4 3.5-1.8 3.5-4 3.5-4-1.1-4-3" {...s} />
  </>
);
export const IcReceipt = S(
  <>
    <path d="M6 3h12v18l-2-1.3L14 21l-2-1.3L10 21l-2-1.3L6 21V3Z" {...s} />
    <path d="M9 8h6M9 12h6" {...s} />
  </>
);
export const IcBasket = S(
  <>
    <path d="M5 9h14l-1.3 9.5a2 2 0 0 1-2 1.5H8.3a2 2 0 0 1-2-1.5L5 9Z" {...s} />
    <path d="M9 9 12 4l3 5" {...s} />
  </>
);
export const IcMargin = S(
  <>
    <circle cx="12" cy="12" r="8.5" {...s} />
    <path d="M12 3.5v8.5l6 3" {...s} />
  </>
);
export const IcTarget = S(
  <>
    <circle cx="12" cy="12" r="8.5" {...s} />
    <circle cx="12" cy="12" r="4.5" {...s} />
    <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
  </>
);
export const IcLayers = S(
  <>
    <path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" {...s} />
    <path d="M3 12l9 4.5L21 12M3 16.5 12 21l9-4.5" {...s} />
  </>
);
export const IcShield = S(
  <>
    <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" {...s} />
    <path d="M9 12l2 2 4-4" {...s} />
  </>
);
export const IcRuler = S(
  <>
    <rect x="3" y="8" width="18" height="8" rx="1.5" {...s} />
    <path d="M7 8v3M11 8v4M15 8v3M19 8v4" {...s} />
  </>
);
