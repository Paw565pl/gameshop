import PaginatedResponse from "@/app/entities/PaginatedResponse";
import Review from "@/app/entities/Review";
import apiService from "@/app/services/apiService";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";

const deleteReview = async (gameId: number, reviewId: number) => {
  const response = await apiService.delete(
    `/games/${gameId}/reviews/${reviewId}/`,
  );
  return response;
};

const useDeleteGameReview = (gameId: number, reviewId: number) => {
  const queryClient = useQueryClient();
  const queryKey = ["game", gameId, "reviews"];

  return useMutation<
    AxiosResponse,
    AxiosError,
    void,
    InfiniteData<PaginatedResponse<Review>>
  >({
    mutationKey: ["game", gameId, "reviews", reviewId],
    mutationFn: () => deleteReview(gameId, reviewId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previousReviews =
        queryClient.getQueryData<InfiniteData<PaginatedResponse<Review>>>(
          queryKey,
        );

      queryClient.setQueryData(
        queryKey,
        (oldReviews: InfiniteData<PaginatedResponse<Review>>) => {
          const updatedPages = oldReviews.pages.map((oldReviewPage) => ({
            ...oldReviewPage,
            results: oldReviewPage.results.filter(
              (review) => review.id !== reviewId,
            ),
          }));
          return { ...oldReviews, pages: updatedPages };
        },
      );

      return previousReviews;
    },

    onError: (_, __, previousReviews) => {
      queryClient.setQueryData(queryKey, previousReviews);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
};

export default useDeleteGameReview;
