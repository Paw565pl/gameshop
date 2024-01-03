import SideFilters from "./components/SideFilters";

const RootPage = () => {
  return (
    <div className="flex gap-2">
      <SideFilters />
      <main>RootPage</main>
    </div>
  );
};

export default RootPage;
