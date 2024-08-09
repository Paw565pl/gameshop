import axios from "axios";

const baseURL =
  process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;

const apiService = axios.create({ baseURL });

export default apiService;
