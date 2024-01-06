import Link from "next/link";

interface GameCardTitleProps {
  name: string;
  slug: string;
}

const GameCardTitle = ({ name, slug }: GameCardTitleProps) => {
  return (
    <h2 className="card-title text-4xl sm:text-5xl">
      <Link href={`/game/${slug}`}>{name}</Link>
    </h2>
  );
};

export default GameCardTitle;
