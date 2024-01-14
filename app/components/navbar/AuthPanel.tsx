import { RiDoorLockFill, RiHealthBookFill } from "react-icons/ri";
import NavbarLink from "./NavbarLink";

const AuthPanel = () => {
  return (
    <div className="flex items-center gap-2">
      <NavbarLink
        title="Login"
        icon={<RiDoorLockFill className="text-2xl" />}
        href="/login"
      />
      <NavbarLink
        title="Register"
        icon={<RiHealthBookFill className="text-2xl" />}
        href="/register"
      />
    </div>
  );
};

export default AuthPanel;
