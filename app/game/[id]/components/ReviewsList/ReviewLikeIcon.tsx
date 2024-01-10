import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

interface ReviewsListLikeIconProps {
  is_positive: boolean;
}

const ReviewLikeIcon = ({ is_positive }: ReviewsListLikeIconProps) => {
  const icon = is_positive ? (
    <BiSolidLike className="text-7xl text-success" />
  ) : (
    <BiSolidDislike className="text-7xl text-error" />
  );

  return (
    <div className="flex items-center justify-center py-8 pl-8">{icon}</div>
  );
};

export default ReviewLikeIcon;
