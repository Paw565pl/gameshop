"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useDeleteGameReview from "@/app/hooks/client/useDeleteGameReview";
import { useContext } from "react";
import { FaTrash } from "react-icons/fa";

interface ReviewButtonsProps {
  author: string;
  gameId: number;
  reviewId: number;
}

const ReviewDeleteButton = ({
  author,
  gameId,
  reviewId,
}: ReviewButtonsProps) => {
  const { isAuthenticated, getUser } = useContext(AuthContext);
  const username = getUser();
  const { mutate: deleteReview } = useDeleteGameReview(gameId, reviewId);

  if (!isAuthenticated || author !== username) return null;

  return (
    <div className="card-actions justify-end">
      <button
        className="btn btn-error flex items-center gap-1"
        onClick={() => deleteReview()}
      >
        <FaTrash /> Delete
      </button>
    </div>
  );
};

export default ReviewDeleteButton;
