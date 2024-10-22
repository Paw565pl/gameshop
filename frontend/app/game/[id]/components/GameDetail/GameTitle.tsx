import MetacriticBadge from "@/app/components/common/MetacriticBadge";

interface GameTitleProps {
  name: string;
  nameOriginal: string;
  metacritic: number | null;
}

const GameTitle = ({ name, nameOriginal, metacritic }: GameTitleProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <h2 className="text-4xl font-semibold sm:text-5xl">{name}</h2>
        <MetacriticBadge metacritic={metacritic} />
      </div>
      <div className="pl-1 text-xs text-base-300">{nameOriginal}</div>
    </>
  );
};

export default GameTitle;
