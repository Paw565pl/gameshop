import usePrefetchGameReviews from "@/app/hooks/server/usePrefetchGameReviews";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import AddReviewForm from "./components/AddReviewForm";
import GameDetail from "./components/GameDetail";
import ReviewsList from "./components/ReviewsList";

interface GameDetailPageProps {
  params: { id: number };
}

const GameDetailPage = async ({ params: { id } }: GameDetailPageProps) => {
  const queryClient = new QueryClient();
  await usePrefetchGameReviews(queryClient, id);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GameDetail id={id} />
      <AddReviewForm gameId={id} />
      <ReviewsList gameId={id} />
    </HydrationBoundary>
  );
};

export default GameDetailPage;
