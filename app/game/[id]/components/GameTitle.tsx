import MetacriticBadge from "@/app/components/common/MetacriticBadge";

interface GameTitleProps {
  name: string;
  nameOriginal: string;
  metacritic: number | null;
}

const GameTitle = ({ name, nameOriginal, metacritic }: GameTitleProps) => {
  return (
    <header>
      <div className="flex items-center gap-2">
        <h1 className="text-4xl font-semibold sm:text-5xl">{name}</h1>
        <MetacriticBadge metacritic={metacritic} />
      </div>
      <div className="pl-1 text-xs text-base-300">{nameOriginal}</div>
    </header>
  );
};

export default GameTitle;
