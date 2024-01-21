import GameCardSkeleton from "@/app/components/gameCardSkeleton";
import useFetchFavouriteGames from "@/app/hooks/client/useFetchFavouriteGames";
import { Fragment, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import FavouriteGameCard from "./FavouriteGameCard";

const Favourites = () => {
  const {
    data: favouriteGames,
    isSuccess,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useFetchFavouriteGames();

  const skeletons = Array.from(Array(5).keys());
  const fetchedFavouriteGamesCount = useMemo(
    () =>
      favouriteGames?.pages.reduce((acc, page) => acc + page.results.length, 0),
    [favouriteGames],
  );

  if (isError) return <div>Something went wrong!</div>;

  if (fetchedFavouriteGamesCount === 0) {
    return <div>No favourites yet.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={fetchedFavouriteGamesCount || 0}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<GameCardSkeleton />}
      className="space-y-4 px-1 pb-4"
    >
      {isLoading &&
        skeletons.map((_, index) => <GameCardSkeleton key={index} />)}
      {isSuccess &&
        favouriteGames?.pages.map((page, index) => (
          <Fragment key={index}>
            {page.results.map((favouriteGame) => (
              <FavouriteGameCard key={favouriteGame.id} game={favouriteGame} />
            ))}
          </Fragment>
        ))}
    </InfiniteScroll>
  );
};

export default Favourites;
