import MetacriticBadge from "@/app/components/common/MetacriticBadge";
import Screenshot from "@/app/entities/Screenshot";
import useFetchGame from "@/app/hooks/server/useFetchGame";
import useFetchGameScreenshots from "@/app/hooks/server/useFetchGameScreenshots";
import GameAttributes from "./GameAttributes";
import ImageSlider from "./ImageSlider";

interface GameDetailProps {
  id: number;
}

const GameDetail = async ({ id }: GameDetailProps) => {
  const fetchGame = useFetchGame(id);
  const fetchGameScreenshots = useFetchGameScreenshots(id);

  const [gameResponse, screenshotsResponse] = await Promise.all([
    fetchGame,
    fetchGameScreenshots,
  ]);

  const { data: game } = gameResponse;
  const {
    data: { results: screenshots },
  } = screenshotsResponse;

  const images: Screenshot[] = [
    { id: 0, image: game.background_image || "", width: 1920, height: 1080 },
    ...screenshots,
  ];

  return (
    <article className="space-y-8">
      <ImageSlider images={images} name={game.name} />
      <div className="xl:flex xl:justify-between">
        <header>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-semibold sm:text-5xl">{game.name}</h2>
            <MetacriticBadge metacritic={game.metacritic} />
          </div>
          <div className="pl-1 text-xs text-base-300">{game.name_original}</div>
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
