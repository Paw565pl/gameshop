import CartItem from "./CartItem";

interface Cart {
  id: string;
  items: CartItem[];
  total_price: string;
}

export default Cart;
