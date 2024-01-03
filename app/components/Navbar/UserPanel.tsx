import Link from "next/link";

const UserPanel = () => {
  // TODO: if user logged in return profile and cart link

  return (
    <div>
      <Link href={"/login"} className="hover:text-gray-600">
        Login
      </Link>
      <Link href={"/register"} className="ml-2 hover:text-slate-600">
        Register
      </Link>
    </div>
  );
};

export default UserPanel;
