import { FaAddressCard, FaShoppingCart } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import NavbarLink from "./NavbarLink";

const UserPanel = () => {
  return (
    <div className="flex items-center gap-2">
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
    </div>
  );
};

export default UserPanel;
