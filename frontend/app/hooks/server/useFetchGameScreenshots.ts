import PaginatedResponse from "@/app/entities/PaginatedResponse";
import Screenshot from "@/app/entities/Screenshot";
import apiService from "@/app/services/apiService";
import { cache } from "react";

export const revalidate = 10 * 60; // 10 minutes

const useFetchGameScreenshots = cache(async (id: number) => {
  const response = await apiService.get<PaginatedResponse<Screenshot>>(
    `/games/${id}/screenshots`,
  );
  return response;
});

export default useFetchGameScreenshots;
