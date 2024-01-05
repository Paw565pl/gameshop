interface MetacriticBadgeProps {
  metacritic: number;
}

const MetacriticBadge = ({ metacritic }: MetacriticBadgeProps) => {
  const backgroundColor =
    metacritic > 75 ? "green" : metacritic > 50 ? "yellow" : "red";

  return (
    <div
      className="badge h-8 rounded-lg border-none text-lg font-bold text-white sm:h-12 sm:text-2xl"
      style={{ backgroundColor }}
    >
      {metacritic}
    </div>
  );
};

export default MetacriticBadge;
