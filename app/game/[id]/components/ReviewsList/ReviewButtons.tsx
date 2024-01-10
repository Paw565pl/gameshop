"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

interface ReviewButtonsProps {
  author: string;
  handleEdit: () => void;
  handleDelete: () => void;
}

const ReviewButtons = ({
  author,
  handleEdit,
  handleDelete,
}: ReviewButtonsProps) => {
  const { isAuthenticated, getUser } = useContext(AuthContext);
  const username = getUser();

  if (!isAuthenticated || author !== username) return null;

  return (
    <div className="card-actions justify-end">
      <button
        className="btn btn-info flex items-center gap-1"
        onClick={handleEdit}
      >
        <FaPencil /> Edit
      </button>
      <button
        className="btn btn-error flex items-center gap-1"
        onClick={handleDelete}
      >
        <FaTrash /> Delete
      </button>
    </div>
  );
};

export default ReviewButtons;
