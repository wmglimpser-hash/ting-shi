export default function Icon({ name, size = 18, strokeWidth = 1.7 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "arrow")
    return (
      <svg {...common}>
        <path d="M4 12h15" />
        <path d="m13 6 6 6-6 6" />
      </svg>
    );
  if (name === "play")
    return (
      <svg {...common} fill="currentColor" stroke="none">
        <path d="M8 5.2c0-1 1.1-1.6 2-1l8.8 6.3c.8.6.8 1.8 0 2.4L10 19.2c-.9.6-2-.1-2-1V5.2Z" />
      </svg>
    );
  if (name === "pause")
    return (
      <svg {...common}>
        <rect x="7" y="5" width="3" height="14" rx="1" />
        <rect x="14" y="5" width="3" height="14" rx="1" />
      </svg>
    );
  if (name === "heart")
    return (
      <svg {...common}>
        <path d="M20.8 8.6c0 5.2-8.8 10.2-8.8 10.2S3.2 13.8 3.2 8.6A4.6 4.6 0 0 1 12 6.2a4.6 4.6 0 0 1 8.8 2.4Z" />
      </svg>
    );
  if (name === "search")
    return (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m16 16 4 4" />
      </svg>
    );
  if (name === "menu")
    return (
      <svg {...common}>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    );
  if (name === "volume")
    return (
      <svg {...common}>
        <path d="M5 10v4h3l4 3V7l-4 3H5Z" />
        <path d="M16 9.4a4 4 0 0 1 0 5.2" />
        <path d="M18.4 7a7.3 7.3 0 0 1 0 10" />
      </svg>
    );
  if (name === "spark")
    return (
      <svg {...common}>
        <path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3Z" />
        <path d="m19 15 .6 2.4L22 18l-2.4.6L19 21l-.6-2.4L16 18l2.4-.6L19 15Z" />
      </svg>
    );
  if (name === "layers")
    return (
      <svg {...common}>
        <path d="m12 4 8 4-8 4-8-4 8-4Z" />
        <path d="m4 12 8 4 8-4" />
        <path d="m4 16 8 4 8-4" />
      </svg>
    );
  if (name === "focus")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="6.5" />
        <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
      </svg>
    );
  if (name === "bookmark")
    return (
      <svg {...common}>
        <path d="M6.5 4.5A1.5 1.5 0 0 1 8 3h8a1.5 1.5 0 0 1 1.5 1.5V21L12 17.7 6.5 21V4.5Z" />
      </svg>
    );
  if (name === "clock")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3.2 2" />
      </svg>
    );
  if (name === "repeat")
    return (
      <svg {...common}>
        <path d="m17 3 3 3-3 3" />
        <path d="M4 6h12a4 4 0 0 1 4 4" />
        <path d="m7 21-3-3 3-3" />
        <path d="M20 18H8a4 4 0 0 1-4-4" />
      </svg>
    );
  if (name === "close")
    return (
      <svg {...common}>
        <path d="m6 6 12 12M18 6 6 18" />
      </svg>
    );
  return null;
}
