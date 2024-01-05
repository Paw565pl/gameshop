import MetacriticBadgeSkeleton from "../common/MetacriticBadge/MetacriticBadgeSkeleton";
import GameCardAttributeSkeleton from "./GameCardAttributeSkeleton";
import GameCardButtonSkeleton from "./GameCardButtonSkeleton";
import GameCardImageSkeleton from "./GameCardImageSkeleton";
import GameCardPriceSkeleton from "./GameCardPriceSkeleton";
import GameCardSecondaryTitleSkeleton from "./GameCardSecondaryTitleSkeleton";
import GameCardTitleSkeleton from "./GameCardTitleSkeleton";

const GameCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl md:card-side">
      <GameCardImageSkeleton />
      <div className="card-body gap-0">
        <GameCardTitleSkeleton />
        <GameCardSecondaryTitleSkeleton />
        <GameCardAttributeSkeleton />
        <GameCardAttributeSkeleton />
        <GameCardAttributeSkeleton />
        <div className="card-actions mb-1 items-end justify-end sm:text-xl">
          <GameCardPriceSkeleton />
        </div>
        <div className="card-actions justify-between">
          <MetacriticBadgeSkeleton />
          <GameCardButtonSkeleton />
        </div>
      </div>
    </div>
  );
};

export default GameCardSkeleton;
