import SideFilters from "./components/SideFilters";
import GameCard from "./components/gameCard";

const RootPage = () => {
  return (
    <div className="flex gap-10">
      <SideFilters />
      <section className="w-full">
        <GameCard />
      </section>
    </div>
  );
};

export default RootPage;
