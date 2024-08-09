import { BiSolidDislike, BiSolidLike } from "react-icons/bi";

interface ReviewsListLikeIconProps {
  is_positive: boolean;
}

const ReviewLikeIcon = ({ is_positive }: ReviewsListLikeIconProps) => {
  const icon = is_positive ? (
    <BiSolidLike className="text-2xl text-success sm:text-7xl" />
  ) : (
    <BiSolidDislike className="text-2xl text-error sm:text-7xl" />
  );

  return (
    <div className="flex items-center justify-center px-1 py-4 sm:py-8 sm:pl-8 sm:pr-0">
      {icon}
    </div>
  );
};

export default ReviewLikeIcon;
