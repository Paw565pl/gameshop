import Game from "@/app/entities/Game";
import MetacriticBadge from "../common/MetacriticBadge";
import GameCardAttributes from "./GameCardAttributes";
import GameCardButton from "./GameCardButton";
import GameCardImage from "./GameCardImage";
import GameCardPrice from "./GameCardPrice";
import GameCardSecondaryTitle from "./GameCardSecondaryTitle";
import GameCardTitle from "./GameCardTitle";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl md:card-side">
      <GameCardImage
        src={game.background_image}
        alt={`${game.name} image`}
        slug={game.slug}
      />
      <div className="card-body w-full gap-0">
        <GameCardTitle name={game.name} slug={game.slug} />
        <GameCardSecondaryTitle nameOriginal={game.name_original} />
        <GameCardAttributes
          released={game.released}
          mainDeveloper={game.developers[0].name}
          mainGenre={game.genres[0].name}
        />
        <GameCardPrice price={game.price} />
        <div className="card-actions justify-between">
          <MetacriticBadge metacritic={game.metacritic} />
          <GameCardButton slug={game.slug} />
        </div>
      </div>
    </div>
  );
};

export default GameCard;
