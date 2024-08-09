import Platform from "./Platform";

interface SimpleGame {
  id: number;
  name: string;
  slug: string;
  released: string | null;
  background_image: string | null;
  price: string;
}

interface CartItem {
  id: number;
  game: SimpleGame;
  platform: Platform;
  quantity: number;
  total_price: string;
}

export default CartItem;
