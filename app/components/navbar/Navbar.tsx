import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import UserPanel from "./UserPanel";

const Navbar = () => {
  return (
    <nav className="mb-10 flex items-center justify-between py-1">
      <Logo />
      <SearchBar />
      <div className="flex items-center gap-2">
        <UserPanel />
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
