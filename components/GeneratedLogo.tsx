"use client";

import {
  hashSeed,
  initialsFromName,
  pickPalette,
} from "@/lib/generatedLogoUtils";

export type GeneratedLogoProps = {
  /** Valeur stable pour un rendu donné (ex. nom vendeur + n° facture). */
  seed: string;
  companyName: string;
  width?: number;
  height?: number;
  className?: string;
};

/**
 * Logo fictif généré en SVG (dégradé + initiales + motif léger), couleurs hex uniquement.
 */
export function GeneratedLogo({
  seed,
  companyName,
  width = 144,
  height = 64,
  className = "",
}: GeneratedLogoProps) {
  const h = hashSeed(seed);
  const [c1, c2, c3] = pickPalette(seed);
  const initials = initialsFromName(companyName);
  const variant = h % 4;
  const gradId = `lg-${h.toString(36)}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Logo généré ${initials}`}
    >
      <defs>
        <linearGradient
          id={gradId}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>

      <rect
        width={width}
        height={height}
        rx={height * 0.12}
        fill={`url(#${gradId})`}
      />

      {variant === 0 && (
        <circle
          cx={width * 0.78}
          cy={height * 0.22}
          r={height * 0.35}
          fill={c3}
          opacity={0.35}
        />
      )}
      {variant === 1 && (
        <>
          <rect
            x={width * 0.55}
            y={height * 0.15}
            width={width * 0.35}
            height={height * 0.35}
            rx={4}
            fill={c3}
            opacity={0.4}
            transform={`rotate(-12 ${width * 0.72} ${height * 0.32})`}
          />
        </>
      )}
      {variant === 2 && (
        <>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={width * (0.55 + i * 0.1)}
              y={height * 0.2}
              width={width * 0.06}
              height={height * 0.55}
              rx={2}
              fill={c3}
              opacity={0.25 + i * 0.12}
            />
          ))}
        </>
      )}
      {variant === 3 && (
        <path
          d={`M ${width * 0.55} ${height * 0.5} L ${width * 0.72} ${height * 0.18} L ${width * 0.89} ${height * 0.5} Z`}
          fill={c3}
          opacity={0.35}
        />
      )}

      <text
        x={width * 0.5}
        y={height * 0.62}
        textAnchor="middle"
        fill="#ffffff"
        style={{
          fontFamily: "system-ui, Segoe UI, Helvetica, Arial, sans-serif",
          fontSize: Math.min(height * 0.38, width * 0.14),
          fontWeight: 700,
          letterSpacing: "0.02em",
        }}
      >
        {initials}
      </text>
    </svg>
  );
}
