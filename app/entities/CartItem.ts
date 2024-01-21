interface CartItem {
  id: number;
  game: {
    id: number;
    name: string;
    slug: string;
    released: string | null;
    background_image: string | null;
    price: string;
  };
  platform: {
    id: number;
    name: string;
    slug: string;
  };
  quantity: number;
  total_price: string;
}

export default CartItem;
