"use client";

import useFetchGames from "@/app/hooks/client/useFetchGames";
import { Fragment, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GameCard from "../gameCard";
import GameCardSkeleton from "../gameCardSkeleton";

const GameCardGrid = () => {
  const {
    data: games,
    isSuccess,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useFetchGames();

  const skeletons = Array.from(Array(5).keys());
  const fetchedGamesCount = useMemo(
    () => games?.pages.reduce((acc, page) => acc + page.results.length, 0),
    [games],
  );

  if (isError) return <div>Something went wrong!</div>;

  return (
    <section className="w-full">
      <InfiniteScroll
        dataLength={fetchedGamesCount || 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<GameCardSkeleton />}
        className="space-y-4 px-2 pb-4"
      >
        {isFetching &&
          skeletons.map((_, index) => <GameCardSkeleton key={index} />)}
        {isSuccess &&
          games.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </Fragment>
          ))}
      </InfiniteScroll>
    </section>
  );
};

export default GameCardGrid;
