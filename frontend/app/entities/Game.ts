import Developer from "./Developer";
import Genre from "./Genre";
import Platform from "./Platform";

interface Game {
  id: number;
  name: string;
  name_original: string;
  slug: string;
  released: string | null;
  metacritic: number | null;
  background_image: string | null;
  website: string | null;
  description_raw: string | null;
  price: string;
  genres: Genre[];
  platforms: Platform[];
  developers: Developer[];
}

export default Game;
