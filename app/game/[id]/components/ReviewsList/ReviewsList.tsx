"use client";

import useFetchGameReviews from "@/app/hooks/client/useFetchGameReviews";
import { Fragment, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import AddReview from "./AddReview";
import ReviewButtons from "./ReviewButtons";
import ReviewLikeIcon from "./ReviewLikeIcon";
import ReviewSkeleton from "./ReviewSkeleton";
import ReviewTitle from "./ReviewTitle";

interface ReviewsListProps {
  gameId: number;
}

const ReviewsList = ({ gameId }: ReviewsListProps) => {
  const {
    data: reviews,
    isSuccess,
    isFetching,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useFetchGameReviews(gameId);

  const fetchedGameReviewsCount = useMemo(
    () => reviews?.pages.reduce((acc, page) => acc + page.results.length, 0),
    [reviews],
  );

  if (isError) return <div>Something went wrong!</div>;

  return (
    <section>
      <h2 className="mt-6 flex justify-between text-xl font-semibold">
        Reviews
      </h2>
      <AddReview />
      <InfiniteScroll
        dataLength={fetchedGameReviewsCount || 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<ReviewSkeleton />}
        className="space-y-4 px-1 pb-2"
      >
        {isFetching && <ReviewSkeleton />}
        {isSuccess &&
          reviews?.pages.map((page, index) => (
            <Fragment key={index}>
              {page.results.map((review) => (
                <div
                  className="card card-side bg-base-100 shadow-md"
                  key={review.id}
                >
                  <ReviewLikeIcon is_positive={review.is_positive} />
                  <div className="card-body">
                    <ReviewTitle
                      author={review.author}
                      created_at={review.created_at}
                    />
                    <p>{review.content}</p>
                    <ReviewButtons
                      author={review.author}
                      handleEdit={() => {}}
                      handleDelete={() => {}}
                    />
                  </div>
                </div>
              ))}
            </Fragment>
          ))}
      </InfiniteScroll>
    </section>
  );
};

export default ReviewsList;
