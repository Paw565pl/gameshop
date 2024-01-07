import ConditionalComponent from "../common/ConditionalComponent";
import AuthPanel from "./AuthPanel";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import UserPanel from "./UserPanel";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between py-2">
      <Logo />
      <SearchBar />
      <div className="flex items-center gap-2">
        <ConditionalComponent
          authenticatedComponent={<UserPanel />}
          anonymousComponent={<AuthPanel />}
        />
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
