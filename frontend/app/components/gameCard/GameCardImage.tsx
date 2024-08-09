import noImagePlaceholder from "@/public/no_image_placeholder.png";
import Image from "next/image";
import Link from "next/link";

interface GameCardImageProps {
  src: string | null;
  name: string;
  id: number;
}

const GameCardImage = ({ src, name, id }: GameCardImageProps) => {
  return (
    <figure className="md:w-3/4">
      <Link href={`/game/${id}`} className="h-min w-full">
        <Image
          src={src || noImagePlaceholder}
          alt={src ? `${name} image` : "no image placeholder"}
          width={600}
          height={400}
          className="w-full"
        />
      </Link>
    </figure>
  );
};

export default GameCardImage;
