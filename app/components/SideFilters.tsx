"use client";

import RangeFilter from "./filters/RangeFilter";

const SideFilters = () => {
  const currentYear = new Date().getFullYear();

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
    </aside>
  );
};

export default SideFilters;
