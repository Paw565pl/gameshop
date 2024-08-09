"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useDeleteGameReview from "@/app/hooks/client/useDeleteGameReview";
import useFetchUserInfo from "@/app/hooks/client/useFetchUserInfo";
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
  const { isAuthenticated } = useContext(AuthContext);
  const { mutate: deleteReview } = useDeleteGameReview(gameId, reviewId);
  const { data: userInfo } = useFetchUserInfo();
  const currentUsername = userInfo?.username;

  if (!isAuthenticated || author !== currentUsername) return null;

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
