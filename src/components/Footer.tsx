import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="flex min-h-20 flex-col items-center justify-center gap-1.5 px-4 py-6 text-center"
      style={{ color: "var(--color-muted)" }}
    >
      {/* Email */}
      <a
        href={`mailto:${site.email}`}
        className="caps text-[11px] transition-opacity hover:opacity-100"
        style={{ opacity: 0.7 }}
      >
        {site.email}
      </a>

      {/* Social links */}
      {site.socials.length > 0 && (
        <p className="caps text-[11px]" style={{ opacity: 0.5 }}>
          {site.socials.map(({ label, href }, i) => (
            <span key={label}>
              {i > 0 && <span className="mx-2">·</span>}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-100"
                style={{ opacity: 0.7 }}
              >
                [{label}]
              </a>
            </span>
          ))}
        </p>
      )}

      {/* Copyright */}
      <p className="caps text-[11px]" style={{ opacity: 0.4 }}>
        © {year} {site.name}
      </p>
    </footer>
  );
}
