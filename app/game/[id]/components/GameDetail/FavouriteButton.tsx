"use client";

import { AuthContext } from "@/app/contexts/AuthContextProvider";
import usefetchIsGameFavourite from "@/app/hooks/client/useFetchIsGameFavourite";
import { useContext } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

interface FavouriteButtonProps {
  id: number;
}

const FavouriteButton = ({ id }: FavouriteButtonProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated)
    return (
      <button className="btn btn-circle btn-error">
        <IoMdHeartEmpty className="text-3xl" />
      </button>
    );

  const { data: isLiked } = usefetchIsGameFavourite(id);

  const icon = isLiked ? (
    <IoHeart className="text-3xl" />
  ) : (
    <IoMdHeartEmpty className="text-3xl" />
  );

  return <button className="btn btn-circle btn-error">{icon}</button>;
};

export default FavouriteButton;
