import PrivateRoute from "../components/common/PrivateRoute";
import CartItems from "./components/CartItems";

const CartPage = () => {
  return (
    <PrivateRoute>
      <CartItems />
    </PrivateRoute>
  );
};

export default CartPage;
