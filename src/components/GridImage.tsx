import Image from "next/image";
import type { Photo } from "@/data/photos";

interface Props {
  photo: Photo;
  index: number;
  total: number;
  onClick: () => void;
}

export default function GridImage({ photo, index, total, onClick }: Props) {
  return (
    <div className="break-inside-avoid">
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open image ${index + 1} of ${total}`}
        className="block w-full focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ outlineColor: "var(--color-fg)" }}
      >
        <Image
          src={photo.src}
          alt={photo.alt}
          sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={85}
          placeholder="blur"
          priority={index < 4}
          className="mb-3 h-auto w-full cursor-zoom-in md:mb-4 lg:mb-6"
        />
      </button>
    </div>
  );
}
