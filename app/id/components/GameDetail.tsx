import MetacriticBadge from "@/app/components/common/MetacriticBadge";
import Game from "@/app/entities/Game";
import GameAttributes from "./GameAttributes";
import ImageSlider from "./ImageSlider";

interface GameDetailProps {
  game: Game;
}

const GameDetail = ({ game }: GameDetailProps) => {
  return (
    <article className="space-y-8">
      <ImageSlider />
      <div className="xl:flex xl:justify-between">
        <header>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-semibold sm:text-5xl">{game.name}</h2>
            <MetacriticBadge metacritic={game.metacritic} />
          </div>
          <div className="text-xs text-base-300">{game.name_original}</div>
        </header>
        <div className="mt-4 space-y-2 xl:mt-0 xl:text-right">
          <div className="text-xl">{game.price} PLN</div>
          <div>
            <select
              name="platform"
              id="platform"
              className="select select-bordered select-md mb-2 block w-full rounded focus:border-accent focus:outline-none"
            >
              {game.platforms.map((platform) => (
                <option value={platform.id} key={platform.id}>
                  {platform.name}
                </option>
              ))}
            </select>
            <button className="btn btn-md w-full">Add to cart</button>
          </div>
        </div>
      </div>
      <GameAttributes
        released={game.released}
        genres={game.genres}
        platforms={game.platforms}
        developers={game.developers}
      />
      <div>
        <h4 className="mb-2 text-xl font-medium">Description</h4>
        <p>{game.description_raw}</p>
      </div>
    </article>
  );
};

export default GameDetail;
