"use client";

import useFetchGames from "@/app/hooks/useFetchGames";
import { Fragment, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import GameCard from "../gameCard";
import GameCardSkeleton from "../gameCardSkeleton";

const GameCardGrid = () => {
  const {
    data: games,
    isSuccess,
    fetchNextPage,
    hasNextPage,
  } = useFetchGames();

  const fetchedGamesCount = useMemo(
    () => games?.pages.reduce((acc, page) => acc + page.results.length, 0),
    [games],
  );

  return (
    <section className="w-full">
      <InfiniteScroll
        dataLength={fetchedGamesCount || 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<GameCardSkeleton />}
        className="space-y-4 px-1"
      >
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
