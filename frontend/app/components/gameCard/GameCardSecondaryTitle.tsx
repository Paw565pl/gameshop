interface GameCardSecondaryTitleProps {
  nameOriginal: string;
}

const GameCardSecondaryTitle = ({
  nameOriginal,
}: GameCardSecondaryTitleProps) => {
  return <div className="pl-1 text-xs text-base-300">{nameOriginal}</div>;
};

export default GameCardSecondaryTitle;
