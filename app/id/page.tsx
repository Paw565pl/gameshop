import Game from "../entities/Game";
import GameDetail from "./components";

const GameDetailPage = () => {
  const sampleData: Game = {
    id: 56,
    name: "Marvel's Spider-Man",
    name_original: "Marvel's Spider-Man",
    slug: "marvels-spider-man",
    released: "2018-09-07",
    metacritic: 87,
    background_image:
      "https://media.rawg.io/media/games/9aa/9aa42d16d425fa6f179fc9dc2f763647.jpg",
    website: "https://insomniac.games/game/spider-man-ps4/",
    description_raw:
      "Marvel's Spider-Man offers the player to take on the role of the most famous Marvel superhero.\r\n\r\n###Plot\r\nThe game introduces Spider-Man as an already experienced superhero. By the time the game begins, Peter has captured the infamous Kingpin as well as several other supervillains. Now, a gang that goes by the name of Demons poses a new danger to New York. Meanwhile, Peter is working for the scientist Otto Octavius, who didn't yet become Dr. Octopus, on their science project. Throughout the game, Spidey has to deal with multiple enemies, such as Norman Osbourne, Electro, Vulture, Rhino and Kingpin, among others.\r\n\r\n###Gameplay\r\nThe player controls Peter Parker, aka Spider-Man, from the third person view. There are also sections of the game in which the player controls other protagonists, namely Mary Jane and Miles Morales. The game is set in a 3D environment that is modeled after New York City. The player can travel the city using web slings, running, jumping, and crawling the walls. The setting includes numerous high-rise buildings designed specifically for Spider-Man's movements.\r\n\r\nAs the player progresses, he or she unlocks new suits that grant Spider-Man new abilities, such as additional attacks or enhanced Spider-Sense. The abilities are not tied to the suits, however, and the player can use the suit of his or her choice without losing the ability. The combat system is similar to that in Batman: Arkham, in that Spider-Man fights many opponents in hand-to-hand combat but avoids killing them.",
    price: "335.99",
    genres: [
      {
        id: 1,
        name: "Action",
        slug: "action",
        background_image:
          "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
      },
      {
        id: 2,
        name: "Adventure",
        slug: "adventure",
        background_image:
          "https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg",
      },
    ],
    platforms: [
      {
        id: 1,
        name: "PlayStation 5",
        slug: "playstation5",
      },
      {
        id: 3,
        name: "PC",
        slug: "pc",
      },
      {
        id: 4,
        name: "PlayStation 4",
        slug: "playstation4",
      },
    ],
    developers: [
      {
        id: 71,
        name: "Insomniac Games",
        slug: "insomniac-games",
      },
    ],
  };

  return <GameDetail game={sampleData} />;
};

export default GameDetailPage;
