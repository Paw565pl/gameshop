import Address from "./Address";
import CartItem from "./CartItem";

interface Order {
  id: string;
  items: CartItem[];
  status: string;
  payment_method: string;
  delivery_method: string;
  address: Address;
  promo_code: string | null;
  total_price: string;
  created_at: string;
  updated_at: string;
}

export default Order;
