import Game from "@/app/entities/Game";
import noImagePlaceholder from "@/public/no_image_placeholder.png";
import Image from "next/image";
import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";
import MetacriticBadge from "../common/MetacriticBadge";

interface GameCardProps {
  game: Game;
}

const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="card bg-base-100 shadow-xl md:card-side">
      <figure className="md:w-3/4">
        <Link href={`/game/${game.slug}`} className="h-min w-full">
          <Image
            src={game.background_image || noImagePlaceholder}
            alt={`${game.name} image`}
            width={400}
            height={400}
            className="w-full"
          />
        </Link>
      </figure>
      <div className="card-body w-full gap-0">
        <h2 className="card-title text-4xl sm:text-5xl">
          <Link href={`/game/${game.slug}`}>{game.name}</Link>
        </h2>
        <div className="text-xs text-base-300">{game.name_original}</div>
        <dl className="my-4 grid w-full grid-cols-2 gap-0 text-sm sm:w-3/4 sm:text-base md:w-full xl:w-2/3">
          <dt>Release date:</dt>
          <dd>{game.released ? game.released : "N/A"}</dd>
          <dt>Main developer:</dt>
          <dd>{game.developers[0].name}</dd>
          <dt>Main genre:</dt>
          <dd>{game.genres[0].name}</dd>
        </dl>
        <div className="card-actions mb-1 h-full items-end justify-end sm:text-xl">
          {game.price} PLN
        </div>
        <div className="card-actions justify-between">
          <MetacriticBadge metacritic={game.metacritic} />
          <Link href={`/game/${game.slug}`}>
            <button className="btn btn-primary btn-sm h-full rounded sm:btn-md">
              <CgDetailsMore className="text-xl" />
              Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
