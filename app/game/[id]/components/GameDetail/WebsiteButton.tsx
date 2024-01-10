import Link from "next/link";
import { IoEarth } from "react-icons/io5";

interface WebsiteButtonProps {
  href: string | null;
}

const WebsiteButton = ({ href }: WebsiteButtonProps) => {
  if (!href) return null;

  return (
    <Link href={href} target="_blank" className="btn btn-circle btn-info">
      <IoEarth className="text-3xl" />
    </Link>
  );
};

export default WebsiteButton;
