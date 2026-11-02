// Web Whizz mark ("Whizz kid"): a face on the violet tile — one open eye, one wink, and a gold W as the smile.
// Same artwork as public/favicon.svg and public/webwhizz-logo.png; change all three together.
export function Mark({ size = 32 }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <linearGradient id="ww-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3a2a9a" />
          <stop offset="1" stopColor="#7a3fe0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#ww-mark)" />
      <circle cx="23" cy="23" r="4.3" fill="#fff" />
      <path d="M37.5 24 Q41.5 19 45.5 24" fill="none" stroke="#fff" strokeWidth="3.8" strokeLinecap="round" />
      <path
        d="M13 33 Q19.5 53 26.5 41 Q32 31.5 37.5 41 Q44.5 53 51 33"
        fill="none"
        stroke="#fbbc04"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({ size = 30 }) {
  return (
    <a className="brand" href="/" aria-label="Web Whizz home">
      <Mark size={size} />
      <span>Web Whizz</span>
    </a>
  );
}
