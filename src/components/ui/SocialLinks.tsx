type Social = {
  id: string;
  label: string;
  href: string;
};

function SocialIcon({ id }: { id: string }) {
  if (id === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M14 8.5h2.2V5.8H14c-2 0-3.3 1.2-3.3 3.4v1.5H8.5v2.7h2.2V20h2.8v-6.6H16l.5-2.7h-2.7V9.3c0-.5.2-.8.7-.8Z" />
      </svg>
    );
  }
  if (id === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
        <path d="M16.4 4c.5 1.7 1.7 3.1 3.4 3.7v2.5a6.6 6.6 0 0 1-3.4-1v5.5a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.7a2.9 2.9 0 1 0 2 2.8V4h2.7Z" />
      </svg>
    );
  }
  return null;
}

export function SocialLinks({
  socials,
  title,
  tone = "light",
}: {
  socials: Social[];
  title: string;
  tone?: "light" | "dark";
}) {
  if (!socials.length) return null;

  const titleClass =
    tone === "dark"
      ? "text-sm font-semibold uppercase tracking-[0.12em] text-white/55"
      : "font-[family-name:var(--font-syne)] text-xl font-semibold text-ink";
  const linkClass =
    tone === "dark"
      ? "inline-flex items-center gap-2 text-sm text-white/80 transition hover:text-white"
      : "inline-flex items-center gap-2 font-medium text-ink underline-offset-2 hover:text-primary hover:underline";

  return (
    <div>
      <h2 className={titleClass}>{title}</h2>
      <ul className={tone === "dark" ? "mt-4 space-y-2" : "mt-3 space-y-2"}>
        {socials.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              <SocialIcon id={social.id} />
              {social.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
