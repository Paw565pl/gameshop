import GameDetail from "./components";

interface GameDetailPageProps {
  params: { id: number };
}

const GameDetailPage = async ({ params: { id } }: GameDetailPageProps) => {
  return <GameDetail id={id} />;
};

export default GameDetailPage;
