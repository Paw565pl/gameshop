import { FaAddressCard, FaShoppingCart } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import NavbarLink from "./NavbarLink";

const UserPanel = () => {
  return (
    <>
      <NavbarLink
        title="Cart"
        icon={<FaShoppingCart className="text-2xl" />}
        href={"/cart"}
      />
      <NavbarLink
        title="Profile"
        icon={<FaAddressCard className="text-2xl" />}
        href={"/profile"}
      />
      <LogoutButton />
    </>
  );
};

export default UserPanel;
