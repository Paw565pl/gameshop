import Link from "next/link";
import { ReactNode } from "react";

interface NavbarLinkProps {
  title: string;
  icon?: ReactNode;
  href: string;
}

const NavbarLink = ({ title, icon, href }: NavbarLinkProps) => {
  return (
    <Link href={href} className="flex items-center gap-1 hover:text-gray-600">
      {icon ? icon : null}
      <span>{title}</span>
    </Link>
  );
};

export default NavbarLink;
