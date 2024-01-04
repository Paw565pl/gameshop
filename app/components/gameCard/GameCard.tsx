import spiderman from "@/public/spiderman.jpg";
import Image from "next/image";
import { CgDetailsMore } from "react-icons/cg";
import MetacriticBadge from "../common/MetacriticBadge";

const GameCard = () => {
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure>
        <Image src={spiderman} alt="game image" />
      </figure>
      <div className="card-body gap-0">
        <h2 className="card-title text-4xl">Marvel&apos;s Spider-Man</h2>
        <div className="text-xs text-base-300">(Marvel&apos;s Spider-Man)</div>
        <dl className="mt-2 grid w-full grid-cols-2 gap-0 text-xs sm:w-3/4 sm:text-base lg:w-full xl:w-1/2">
          <dt>Release date:</dt>
          <dd>2018-09-07</dd>
          <dt>Main developer:</dt>
          <dd>Insomniac Games</dd>
          <dt>Main genre:</dt>
          <dd>Action</dd>
        </dl>
        <div className="card-actions mb-1 mt-2 h-full items-end justify-end sm:text-xl">
          20.99 PLN
        </div>
        <div className="card-actions justify-between">
          <MetacriticBadge metacritic={87} />
          <button className="btn btn-primary btn-xs h-full rounded sm:btn-md">
            <CgDetailsMore className="text-xl" />
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
