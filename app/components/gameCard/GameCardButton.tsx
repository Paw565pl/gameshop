import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";

interface GameCardButtonProps {
  slug: string;
}

const GameCardButton = ({ slug }: GameCardButtonProps) => {
  return (
    <Link href={`/game/${slug}`}>
      <button className="btn btn-primary btn-sm h-full rounded sm:btn-md">
        <CgDetailsMore className="text-xl" />
        Details
      </button>
    </Link>
  );
};

export default GameCardButton;
