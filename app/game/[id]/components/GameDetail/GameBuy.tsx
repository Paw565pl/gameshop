"use client";

import Platform from "@/app/entities/Platform";

interface GameBuyProps {
  platforms: Platform[];
}

const GameBuy = ({ platforms }: GameBuyProps) => {
  return (
    <div>
      <select
        name="platform"
        id="platform"
        className="select select-bordered select-md mb-2 block w-full rounded focus:border-accent focus:outline-none"
      >
        {platforms.map((platform) => (
          <option value={platform.id} key={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
      <button className="btn btn-md w-full">Add to cart</button>
    </div>
  );
};

export default GameBuy;
