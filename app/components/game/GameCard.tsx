import spiderman from "@/public/spiderman.jpg";
import Image from "next/image";
import MetacriticBadge from "../common/MetacriticBadge";

const GameCard = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image src={spiderman} alt="game image" />
      </figure>
      <div className="card-body gap-0">
        <h2 className="card-title text-4xl">Marvel&apos;s Spider-Man</h2>
        <div className="text-base-300 text-xs">(Marvel&apos;s Spider-Man)</div>
        <dl className="mt-2 grid grid-cols-2 gap-0 w-full sm:w-3/4 lg:w-full xl:w-1/2 text-xs sm:text-base">
          <dt>Release date:</dt>
          <dd>2018-09-07</dd>
          <dt>Main developer:</dt>
          <dd>Insomniac Games</dd>
          <dt>Main genre:</dt>
          <dd>Action</dd>
        </dl>
        <div className="card-actions justify-end items-end sm:text-xl h-full mt-2 mb-1">
          20.99 PLN
        </div>
        <div className="card-actions justify-between">
          <MetacriticBadge metacritic={87} />
          <button className="btn btn-primary btn-xs sm:btn-md rounded h-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
