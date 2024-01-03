import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeSwitch from "./ThemeSwitch";
import UserPanel from "./UserPanel";

const Navbar = () => {
  return (
    <nav className="py-1 flex justify-between items-center">
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
