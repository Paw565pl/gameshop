"use client";

import RadioFilter from "./filters/RadioFilter";
import RangeFilter from "./filters/RangeFilter";

const SideFilters = () => {
  const currentYear = new Date().getFullYear();

  const testArray = [
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
    {
      id: 3,
      name: "RPG",
      slug: "role-playing-games-rpg",
      background_image:
        "https://media.rawg.io/media/games/00d/00d374f12a3ab5f96c500a2cfa901e15.jpg",
    },
    {
      id: 4,
      name: "Shooter",
      slug: "shooter",
      background_image:
        "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
    },
  ];

  return (
    <aside className="w-1/6">
      <h3 className="text-center mb-6">Filters</h3>
      <RangeFilter title="Price" min={0} max={1000} onChange={() => {}} />
      <RangeFilter title="Metacritic" min={0} max={100} onChange={() => {}} />
      <RangeFilter
        title="Release Year"
        min={1970}
        max={currentYear}
        onChange={() => {}}
      />
      <RadioFilter title="Genre" items={testArray} onChange={() => {}} />
    </aside>
  );
};

export default SideFilters;
