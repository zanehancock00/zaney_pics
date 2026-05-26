"use client";

import Lightbox from "yet-another-react-lightbox";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";

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
      zoom={{ maxZoomPixelRatio: 1 }}
      styles={{
        root: {
          "--yarl__color_backdrop": "transparent",
        },
      }}
      carousel={{ finite: false }}
      controller={{ closeOnBackdropClick: true }}
      render={{
        slideHeader: () => null,
        slideFooter: () => null,
      }}
    />
  );
}
