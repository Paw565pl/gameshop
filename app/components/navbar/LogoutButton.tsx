"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import { useContext } from "react";
import { TbDoorExit } from "react-icons/tb";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);
  return (
    <button
      className="flex items-center gap-1 hover:text-gray-600"
      onClick={logoutUser}
    >
      <TbDoorExit className="text-2xl" />
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
