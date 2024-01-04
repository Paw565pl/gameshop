interface MetacriticBadgeProps {
  metacritic: number;
}

const MetacriticBadge = ({ metacritic }: MetacriticBadgeProps) => {
  const backgroundColor =
    metacritic > 75 ? "green" : metacritic > 50 ? "yellow" : "red";

  return (
    <div
      className="badge h-6 sm:h-12 font-bold text-white rounded-lg text-lg sm:text-2xl border-none"
      style={{ backgroundColor }}
    >
      {metacritic}
    </div>
  );
};

export default MetacriticBadge;
