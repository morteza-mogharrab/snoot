import type { SVGProps } from 'react';

/** Snoot logo mark: a sunset squircle with a friendly nose. */
export function LogoMark({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={`logo-mark ${className}`} width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="Snoot">
      <defs>
        <linearGradient id="snoot-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF5B4A" />
          <stop offset="0.55" stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#FFB935" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="20" fill="url(#snoot-g)" />
      <path d="M16 27c0-6.6 7.2-10 16-10s16 3.4 16 10c0 8.6-8.4 17-16 17s-16-8.4-16-17z" fill="#fff" />
      <ellipse cx="25.5" cy="29" rx="3.6" ry="4.6" fill="#1F1B2D" transform="rotate(-18 25.5 29)" />
      <ellipse cx="38.5" cy="29" rx="3.6" ry="4.6" fill="#1F1B2D" transform="rotate(18 38.5 29)" />
      <path d="M28 38.5c2.4 1.6 5.6 1.6 8 0" stroke="#1F1B2D" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="46" cy="16" r="3" fill="#fff" opacity=".55" />
    </svg>
  );
}

export function Wordmark({ size = 30 }: { size?: number }) {
  return <span className="wordmark" style={{ fontSize: size }}>snoot</span>;
}

/** Our own "boop" icon — a nose. Filled when booped. */
export function BoopIcon({ filled, size = 24, ...rest }: SVGProps<SVGSVGElement> & { filled?: boolean; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round" aria-hidden="true" {...rest}>
      <path d="M3.5 10.5C3.5 6.6 7.4 4.5 12 4.5s8.5 2.1 8.5 6c0 5-4.6 9.5-8.5 9.5s-8.5-4.5-8.5-9.5z" fill={filled ? 'currentColor' : 'none'} />
      <ellipse cx="8.8" cy="11.2" rx="1.6" ry="2.1" transform="rotate(-18 8.8 11.2)" fill={filled ? 'var(--surface)' : 'currentColor'} stroke="none" />
      <ellipse cx="15.2" cy="11.2" rx="1.6" ry="2.1" transform="rotate(18 15.2 11.2)" fill={filled ? 'var(--surface)' : 'currentColor'} stroke="none" />
    </svg>
  );
}

/** Treat (bone) icon used for the currency. */
export function TreatIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <linearGradient id="treat-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFB935" /><stop offset="1" stopColor="#FF8A3D" /></linearGradient>
      </defs>
      <path fill="url(#treat-g)" d="M7.2 3.6a3 3 0 0 1 2.6 4.4l6.2 6.2a3 3 0 1 1 2 4.8 3 3 0 1 1-4.8 2l-6.2-6.2a3 3 0 1 1-4.4-2.6 3 3 0 0 1 4.6-8.6z" transform="rotate(-8 12 12)" />
    </svg>
  );
}
