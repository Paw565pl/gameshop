import Link from "next/link";

interface GameCardTitleProps {
  name: string;
  id: number;
}

const GameCardTitle = ({ name, id }: GameCardTitleProps) => {
  return (
    <h1 className="card-title text-4xl sm:text-5xl">
      <Link href={`/game/${id}`}>{name}</Link>
    </h1>
  );
};

export default GameCardTitle;
