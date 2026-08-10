type IconProps = { className?: string };

const base = "h-5 w-5 stroke-current fill-none";
const strokeProps = {
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SolutionIcon({ slug, className = "" }: { slug: string } & IconProps) {
  const cls = `${base} ${className}`;

  switch (slug) {
    case "asiscole":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <path d="M12 4 3 8.5 12 13l9-4.5L12 4Z" />
          <path d="M6.5 10.8v4.4c0 1.2 2.5 2.6 5.5 2.6s5.5-1.4 5.5-2.6v-4.4" />
          <path d="M21 9v5" />
        </svg>
      );
    case "asis-academy":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15Z" />
          <path d="M20 18v3H6.5A2.5 2.5 0 0 1 4 18.5" />
          <path d="M9 7.5h7M9 11h5" />
        </svg>
      );
    case "software":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5 10.5 19" />
        </svg>
      );
    case "web":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.6 2.6 4 5.6 4 9s-1.4 6.4-4 9c-2.6-2.6-4-5.6-4-9s1.4-6.4 4-9Z" />
        </svg>
      );
    case "consultoria":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <path d="M9 18h6M10 21h4" />
          <path d="M12 3a6 6 0 0 0-3.5 10.9c.8.6 1.5 1.3 1.5 2.1h4c0-.8.7-1.5 1.5-2.1A6 6 0 0 0 12 3Z" />
        </svg>
      );
    case "redes":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <circle cx="12" cy="5" r="2.2" />
          <circle cx="5" cy="18" r="2.2" />
          <circle cx="19" cy="18" r="2.2" />
          <path d="M10.8 6.9 6.2 16.1M13.2 6.9l4.6 9.2M7.2 18h9.6" />
        </svg>
      );
    case "telecomunicaciones":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <path d="M12 21v-8M12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
          <path d="M7.8 15.2a6 6 0 0 1 0-8.4M16.2 6.8a6 6 0 0 1 0 8.4" />
          <path d="M5 18a10 10 0 0 1 0-14M19 4a10 10 0 0 1 0 14" />
        </svg>
      );
    case "hardware":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <rect x="7" y="7" width="10" height="10" rx="1.5" />
          <path d="M10 10.5h4v3h-4zM9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" />
        </svg>
      );
    case "integracion":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <path d="M9 6.5A2.5 2.5 0 1 1 6.5 4v0A2.5 2.5 0 0 1 9 6.5ZM20 17.5a2.5 2.5 0 1 1-2.5-2.5 2.5 2.5 0 0 1 2.5 2.5Z" />
          <path d="M8.3 8.3 15.7 15.7" />
          <path d="M15 4h5v5M4 15v5h5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
          <rect x="4" y="4" width="16" height="16" rx="3" />
          <path d="M9 12h6" />
        </svg>
      );
  }
}

export function ValueIcon({ index, className = "" }: { index: number } & IconProps) {
  const cls = `${base} ${className}`;
  const icons = [
    // Innovación: chispa
    <svg key="0" viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.8 2.8M16.2 16.2 19 19M19 5l-2.8 2.8M7.8 16.2 5 19" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    // Personalización: sliders
    <svg key="1" viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
      <path d="M4 8h10M18 8h2M4 16h4M12 16h8" />
      <circle cx="16" cy="8" r="2.2" />
      <circle cx="10" cy="16" r="2.2" />
    </svg>,
    // Compromiso: escudo
    <svg key="2" viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
      <path d="M12 3 5 6v5c0 4.4 3 8.4 7 10 4-1.6 7-5.6 7-10V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>,
    // Transparencia: ojo
    <svg key="3" viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>,
    // Colaboración: personas
    <svg key="4" viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15.5 5.4a3 3 0 0 1 0 5.2M17.5 14.3c2.3.8 4 3 4 5.7" />
    </svg>,
    // Evolución: tendencia
    <svg key="5" viewBox="0 0 24 24" className={cls} {...strokeProps} aria-hidden>
      <path d="M3 17 9.5 10.5l3.5 3.5L21 6" />
      <path d="M15.5 6H21v5.5" />
    </svg>,
  ];

  return icons[index % icons.length];
}
