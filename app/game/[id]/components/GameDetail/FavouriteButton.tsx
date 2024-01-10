"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import useAddFavouriteGame from "@/app/hooks/client/useAddFavouriteGame";
import usefetchIsGameFavourite from "@/app/hooks/client/useFetchIsGameFavourite";
import { useContext, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

interface FavouriteButtonProps {
  id: number;
}

const FavouriteButton = ({ id }: FavouriteButtonProps) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { data: isFavourite } = usefetchIsGameFavourite(id);
  const { mutate: addFavouriteGame } = useAddFavouriteGame(id);
  const [isLiked, setIsLiked] = useState<boolean>(isFavourite || false);

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

  if (!isLiked) {
    return (
      <button className="btn btn-circle btn-error" onClick={handleLike}>
        <IoMdHeartEmpty className="text-3xl" />
      </button>
    );
  }

  return (
    <button className="btn btn-circle btn-error">
      <IoHeart className="text-3xl" />
    </button>
  );
};

export default FavouriteButton;
