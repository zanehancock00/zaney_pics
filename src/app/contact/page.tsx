import type { Metadata } from "next";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[480px] px-4 pb-24 pt-[72px] sm:px-6">
      <p
        className="mb-8 text-base leading-relaxed"
        style={{ color: "var(--color-muted)" }}
      >
        Reach out with any inquiries or just to say hi.
      </p>

      <a
        href={`mailto:${site.email}`}
        className="mb-10 block text-lg underline underline-offset-4"
        style={{ color: "var(--color-fg)" }}
      >
        {site.email}
      </a>

      {site.socials.length > 0 && (
        <div className="flex flex-wrap gap-6">
          {site.socials.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="caps text-xs underline underline-offset-4 transition-opacity hover:opacity-100"
              style={{ color: "var(--color-muted)", opacity: 0.7 }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}
