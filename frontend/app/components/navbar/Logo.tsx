import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="w-3/4 sm:w-1/2 md:w-1/3">
      <Image src={logo} alt="logo"></Image>
    </Link>
  );
};

export default Logo;
