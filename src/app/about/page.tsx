import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: `Artist statement and biography for ${site.name}.`,
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[640px] px-4 pb-24 pt-[72px] sm:px-6">
      {site.headshot && (
        <div className="mb-10 max-w-[320px]">
          <Image
            src={site.headshot}
            alt={site.name}
            width={320}
            height={400}
            className="h-auto w-full"
          />
        </div>
      )}

      <div className="space-y-5">
        {site.about.map((paragraph, i) => (
          <p
            key={i}
            className="text-base leading-relaxed"
            style={{ color: "var(--color-fg)" }}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </main>
  );
}
