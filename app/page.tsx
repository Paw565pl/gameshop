import SideFilters from "./components/SideFilters";
import GameCard from "./components/gameCard";

const RootPage = () => {
  return (
    <div className="flex gap-10">
      <SideFilters />
      <main className="w-full">
        <GameCard />
      </main>
    </div>
  );
};

export default RootPage;
