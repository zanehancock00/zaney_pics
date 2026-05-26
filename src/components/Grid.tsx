"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import GridImage from "./GridImage";
import type { Photo } from "@/data/photos";

// Lightbox (and its ~80 KB bundle) loads only when first opened
const LightboxPanel = dynamic(() => import("./LightboxPanel"), { ssr: false });

interface Props {
  photos: Photo[];
}

export default function Grid({ photos }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  // Lock body scroll; compensate for scrollbar width to prevent layout shift
  useEffect(() => {
    if (open) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [open]);

  const slides = photos.map((photo) => ({
    src: photo.src.src,
    width: photo.src.width,
    height: photo.src.height,
    alt: photo.alt,
  }));

  if (photos.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-56px)] items-center justify-center">
        <p
          className="caps text-xs"
          style={{ color: "var(--color-muted)", opacity: 0.6 }}
        >
          NO STILLS YET
        </p>
      </main>
    );
  }

  return (
    <>
      {/* ── Grid ───────────────────────────────────────────────── */}
      <main className="mx-auto max-w-[1600px] px-4 pb-24 pt-[72px] sm:px-6 lg:px-8">
        <div className="columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3 lg:gap-6 2xl:columns-4">
          {photos.map((photo, i) => (
            <GridImage
              key={`${photo.src.src}-${i}`}
              photo={photo}
              index={i}
              total={photos.length}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            />
          ))}
        </div>
      </main>

      {/* ── Framer-motion fade backdrop ────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            aria-hidden="true"
            className="fixed inset-0"
            style={{ backgroundColor: "rgba(20,20,20,0.96)", zIndex: 9998 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={
              prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }
            }
          />
        )}
      </AnimatePresence>

      {/* ── Lightbox (lazy) ────────────────────────────────────── */}
      {open && (
        <LightboxPanel
          open={open}
          index={index}
          slides={slides}
          onClose={() => setOpen(false)}
          onIndexChange={setIndex}
        />
      )}
    </>
  );
}
