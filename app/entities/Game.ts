import Developer from "./Developer";
import Genre from "./Genre";
import Platform from "./Platform";

interface Game {
  id: number;
  name: string;
  name_original: string;
  slug: string;
  released: string;
  metacritic: number;
  background_image: string;
  website: string;
  description_raw: string;
  price: string;
  genres: Genre[];
  platforms: Platform[];
  developers: Developer[];
}

export default Game;
