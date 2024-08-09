import { FaUser } from "react-icons/fa";

interface ReviewTitleProps {
  author: string;
  created_at: string;
}

const ReviewTitle = ({ author, created_at }: ReviewTitleProps) => {
  const parsedDate = new Date(created_at).toLocaleString("pl-PL");

  return (
    <h2 className="card-title">
      <FaUser className="text-xl sm:text-2xl" /> {author}
      <div className="text-xs font-normal">created at: {parsedDate}</div>
    </h2>
  );
};

export default ReviewTitle;
