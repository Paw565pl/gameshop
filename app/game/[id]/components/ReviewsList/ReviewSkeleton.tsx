const ReviewSkeleton = () => {
  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <div className="skeleton ml-4 mt-8 h-24 w-1/4 md:w-1/12" />
      <div className="card-body gap-0">
        <div className="card-title skeleton h-8 w-1/3" />
        <div>
          <div className="skeleton mt-4 h-4 w-1/2" />
          <div className="skeleton mt-4 h-4 w-1/2" />
          <div className="skeleton mt-4 h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default ReviewSkeleton;
