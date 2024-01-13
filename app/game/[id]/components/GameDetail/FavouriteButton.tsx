"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useAddFavouriteGame from "@/app/hooks/client/useAddFavouriteGame";
import useDeleteFavouriteGame from "@/app/hooks/client/useDeleteFavouriteGame";
import useFetchIsGameFavourite from "@/app/hooks/client/useFetchIsGameFavourite";
import { useContext, useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

interface FavouriteButtonProps {
  id: number;
}

const FavouriteButton = ({ id }: FavouriteButtonProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { data: isFavourite } = useFetchIsGameFavourite(id);
  const { mutate: addFavouriteGame } = useAddFavouriteGame(id);
  const { mutate: deleteFavouriteGame } = useDeleteFavouriteGame(id);
  const [isLiked, setIsLiked] = useState<boolean>(isFavourite || false);

  useEffect(() => {
    setIsLiked(isFavourite || false);
  }, [isFavourite]);

  if (!isAuthenticated)
    return (
      <button className="btn btn-circle btn-error">
        <IoMdHeartEmpty className="text-3xl" />
      </button>
    );

  const handleLike = () => {
    const prevState = isLiked;
    setIsLiked((prevIsLiked) => !prevIsLiked);
    addFavouriteGame(undefined, {
      onError: () => {
        setIsLiked(prevState);
      },
    });
  };

  const handleDisLike = () => {
    const prevState = isLiked;
    setIsLiked((prevIsLiked) => !prevIsLiked);
    deleteFavouriteGame(undefined, {
      onError: () => {
        setIsLiked(prevState);
      },
    });
  };

  if (!isLiked) {
    return (
      <button className="btn btn-circle btn-error" onClick={handleLike}>
        <IoMdHeartEmpty className="text-3xl" />
      </button>
    );
  }

  return (
    <button className="btn btn-circle btn-error" onClick={handleDisLike}>
      <IoHeart className="text-3xl" />
    </button>
  );
};

export default FavouriteButton;
