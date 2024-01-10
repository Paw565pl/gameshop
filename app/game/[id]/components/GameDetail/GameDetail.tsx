import Screenshot from "@/app/entities/Screenshot";
import useFetchGame from "@/app/hooks/server/useFetchGame";
import useFetchGameScreenshots from "@/app/hooks/server/useFetchGameScreenshots";
import FavouriteButton from "./FavouriteButton";
import GameAttributes from "./GameAttributes";
import GameBuy from "./GameBuy";
import GameTitle from "./GameTitle";
import ImageSlider from "./ImageSlider";
import WebsiteButton from "./WebsiteButton";

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
          <GameTitle
            name={game.name}
            nameOriginal={game.name_original}
            metacritic={game.metacritic}
          />
          <div className="mt-2 flex items-center gap-2">
            <FavouriteButton id={game.id} />
            <WebsiteButton href={game.website} />
          </div>
        </header>
        <div className="mt-4 space-y-2 xl:mt-0 xl:text-right">
          <div className="text-xl">{game.price} PLN</div>
          <GameBuy platforms={game.platforms} />
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
