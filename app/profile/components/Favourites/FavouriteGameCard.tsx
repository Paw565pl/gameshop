import MetacriticBadge from "@/app/components/common/MetacriticBadge";
import GameCardAttributes from "@/app/components/gameCard/GameCardAttributes";
import GameCardImage from "@/app/components/gameCard/GameCardImage";
import GameCardPrice from "@/app/components/gameCard/GameCardPrice";
import GameCardSecondaryTitle from "@/app/components/gameCard/GameCardSecondaryTitle";
import GameCardTitle from "@/app/components/gameCard/GameCardTitle";
import Game from "@/app/entities/Game";
import useDeleteFavouriteGame from "@/app/hooks/client/useDeleteFavouriteGame";
import { FaTrash } from "react-icons/fa";

interface FavouriteGameCardProps {
  game: Game;
}

const FavouriteGameCard = ({ game }: FavouriteGameCardProps) => {
  const { mutate: deleteFavouriteGame } = useDeleteFavouriteGame(game.id);

  return (
    <div className="card bg-base-100 shadow-xl md:card-side">
      <GameCardImage
        src={game.background_image}
        name={game.name}
        id={game.id}
      />
      <div className="card-body w-full gap-0">
        <GameCardTitle name={game.name} id={game.id} />
        <GameCardSecondaryTitle nameOriginal={game.name_original} />
        <GameCardAttributes
          released={game.released}
          mainDeveloper={game.developers[0].name}
          mainGenre={game.genres[0].name}
        />
        <GameCardPrice price={game.price} />
        <div className="card-actions justify-between">
          <MetacriticBadge metacritic={game.metacritic} />
          <button
            className="btn btn-error btn-sm flex items-center gap-1 sm:btn-md"
            onClick={() => deleteFavouriteGame()}
          >
            <FaTrash /> Delete from favourites
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavouriteGameCard;
