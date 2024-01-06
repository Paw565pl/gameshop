interface GameCardAttributesProps {
  released: string | null;
  mainDeveloper: string;
  mainGenre: string;
}

const GameCardAttributes = ({
  released,
  mainDeveloper,
  mainGenre,
}: GameCardAttributesProps) => {
  return (
    <dl className="my-4 grid w-full grid-cols-2 gap-0 text-sm sm:w-3/4 sm:text-base md:w-full xl:w-2/3">
      <dt>Release date:</dt>
      <dd>{released ? released : "N/A"}</dd>
      <dt>Main developer:</dt>
      <dd>{mainDeveloper}</dd>
      <dt>Main genre:</dt>
      <dd>{mainGenre}</dd>
    </dl>
  );
};

export default GameCardAttributes;
