interface MetacriticBadgeProps {
  metacritic: number | null;
}

const MetacriticBadge = ({ metacritic }: MetacriticBadgeProps) => {
  if (!metacritic) return <div />;

  const backgroundColor =
    metacritic > 75 ? "green" : metacritic > 50 ? "yellow" : "red";

  return (
    <div
      className="badge h-8 rounded-lg border-none text-lg font-bold text-white sm:h-12 sm:text-2xl"
      style={{ backgroundColor, textShadow: "0px 1px #000" }}
    >
      {metacritic}
    </div>
  );
};

export default MetacriticBadge;
