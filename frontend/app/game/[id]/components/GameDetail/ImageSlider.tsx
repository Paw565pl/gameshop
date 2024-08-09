"use client";

import Screenshot from "@/app/entities/Screenshot";
import noImagePlaceholder from "@/public/no_image_placeholder.png";
import ms from "ms";
import Image from "next/image";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface ImageSliderProps {
  images: Screenshot[];
  name: string;
}

const ImageSlider = ({ images, name }: ImageSliderProps) => {
  if (images.length === 0)
    return (
      <Image
        src={noImagePlaceholder}
        alt="no image placeholder"
        className="mx-auto lg:w-3/4"
      />
    );

  const duration = images.length * ms("2s");

  return (
    <div className="slide-container mx-auto lg:w-3/4">
      <Slide
        pauseOnHover={true}
        duration={duration}
        infinite={true}
        canSwipe={true}
      >
        {images.map((image) => (
          <Image
            key={image.id}
            src={image.image}
            alt={`${name} image ${image.id}`}
            width={image.width}
            height={image.height}
            className="mx-auto w-full"
          />
        ))}
      </Slide>
    </div>
  );
};

export default ImageSlider;
