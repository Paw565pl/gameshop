import Link from "next/link";
import { CgDetailsMore } from "react-icons/cg";

interface GameCardButtonProps {
  id: number;
}

const GameCardButton = ({ id }: GameCardButtonProps) => {
  return (
    <Link href={`/game/${id}`}>
      <button className="btn btn-primary btn-sm h-full rounded sm:btn-md">
        <CgDetailsMore className="text-xl" />
        Details
      </button>
    </Link>
  );
};

export default GameCardButton;
