import PrivateRoute from "../components/common/PrivateRoute";
import CartItemsList from "./components/CartItemsList";

const CartPage = () => {
  return (
    <PrivateRoute>
      <CartItemsList />
    </PrivateRoute>
  );
};

export default CartPage;
