import ConditionalComponent from "../common/ConditionalComponent";
import AuthPanel from "./AuthPanel";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import UserPanel from "./UserPanel";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between gap-4 py-2">
      <Logo />
      <SearchBar />
      <ConditionalComponent
        authenticatedComponent={<UserPanel />}
        anonymousComponent={<AuthPanel />}
      />
      <ThemeSwitch />
    </nav>
  );
};

export default Navbar;
