import type { Metadata } from "next";
import { photos } from "@/data/photos";
import { site } from "@/data/site";
import Grid from "@/components/Grid";

export const metadata: Metadata = {
  title: `${site.name} — Stills`,
  description: `Photographs by ${site.name}.`,
};

export default function HomePage() {
  return <Grid photos={photos} />;
}
