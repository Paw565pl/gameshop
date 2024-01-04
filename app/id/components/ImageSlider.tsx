import spiderman from "@/public/spiderman.jpg";
import Image from "next/image";

const ImageSlider = () => {
  return <Image src={spiderman} alt="game image" className="mx-auto w-80" />;
};

export default ImageSlider;
