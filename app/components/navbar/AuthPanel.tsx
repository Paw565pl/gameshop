import { RiDoorLockFill, RiHealthBookFill } from "react-icons/ri";
import NavbarLink from "./NavbarLink";

const AuthPanel = () => {
  return (
    <>
      <NavbarLink title="Login" icon={<RiDoorLockFill className="text-2xl"/>} href="/login" />
      <NavbarLink
        title="Register"
        icon={<RiHealthBookFill className="text-2xl"/>}
        href="/register"
      />
    </>
  );
};

export default AuthPanel;
