import noImagePlaceholder from "@/public/no_image_placeholder.png";
import Image from "next/image";
import Link from "next/link";

interface GameCardImageProps {
  src: string | null;
  alt: string;
  slug: string;
}

const GameCardImage = ({ src, alt, slug }: GameCardImageProps) => {
  return (
    <figure className="md:w-3/4">
      <Link href={`/game/${slug}`} className="h-min w-full">
        <Image
          src={src || noImagePlaceholder}
          alt={alt}
          width={400}
          height={400}
          className="w-full"
        />
      </Link>
    </figure>
  );
};

export default GameCardImage;
