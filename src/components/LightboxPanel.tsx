"use client";

import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
// CSS is imported in Grid.tsx so it's always bundled, not lazy-loaded

interface Slide {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface Props {
  open: boolean;
  index: number;
  slides: Slide[];
  onClose: () => void;
  onIndexChange: (i: number) => void;
}

export default function LightboxPanel({
  open,
  index,
  slides,
  onClose,
  onIndexChange,
}: Props) {
  return (
    <Lightbox
      open={open}
      close={onClose}
      index={index}
      on={{ view: ({ index: i }) => onIndexChange(i) }}
      slides={slides}
      plugins={[Counter, Zoom]}
      zoom={{
        maxZoomPixelRatio: 1,   // cap zoom at natural pixel size
        scrollToZoom: true,
      }}
      styles={{
        root: {
          "--yarl__color_backdrop": "transparent",
        },
      }}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
    />
  );
}
