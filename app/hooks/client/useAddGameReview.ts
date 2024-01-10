import Review from "@/app/entities/Review";
import { ReviewValues } from "@/app/schemas/reviewSchema";
import authService from "@/app/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const postReviewData = async (gameId: number, postData: ReviewValues) => {
  const { data } = await authService.post<Review>(
    `/games/${gameId}/reviews/`,
    postData,
  );
  return data;
};

const useAddGameReview = (gameId: number) => {
  const queryClient = useQueryClient();
  const key = ["game", gameId, "reviews"];

  return useMutation<Review, AxiosError, ReviewValues, Review[]>({
    mutationKey: key,
    mutationFn: (postData) => postReviewData(gameId, postData),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: key }),
  });
};

export default useAddGameReview;
