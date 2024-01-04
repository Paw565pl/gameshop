import Developer from "@/app/entities/Developer";
import Genre from "@/app/entities/Genre";
import Platform from "@/app/entities/Platform";

interface GameAttributesProps {
  released: string;
  genres: Genre[];
  platforms: Platform[];
  developers: Developer[];
}

const GameAttributes = ({
  released,
  genres,
  platforms,
  developers,
}: GameAttributesProps) => {
  return (
    <dl className="grid grid-cols-2 gap-y-2 sm:grid-cols-4">
      <div>
        <dt className="mb-2 text-xl font-medium">Released</dt>
        <dd>{released}</dd>
      </div>
      <div>
        <dt className="mb-2 text-xl font-medium">Genres</dt>
        {genres.map((genre) => (
          <dd key={genre.id}>{genre.name}</dd>
        ))}
      </div>
      <div>
        <dt className="mb-2 text-xl font-medium">Platforms</dt>
        {platforms.map((platform) => (
          <dd key={platform.id}>{platform.name}</dd>
        ))}
      </div>
      <div>
        <dt className="mb-2 text-xl font-medium">Developers</dt>
        {developers.map((developer) => (
          <dd key={developer.id}>{developer.name}</dd>
        ))}
      </div>
    </dl>
  );
};

export default GameAttributes;
