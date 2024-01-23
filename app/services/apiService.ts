import axios from "axios";

const apiService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_GAME_SHOP_API_URL}/api`,
});

export default apiService;
