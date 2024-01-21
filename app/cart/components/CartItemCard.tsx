import GameCardImage from "@/app/components/gameCard/GameCardImage";
import GameCardPrice from "@/app/components/gameCard/GameCardPrice";
import GameCardTitle from "@/app/components/gameCard/GameCardTitle";
import CartItem from "@/app/entities/CartItem";
import useDeleteCartItem from "@/app/hooks/client/useDeleteCartItem";
import useUpdateCartItemQuantity from "@/app/hooks/client/useUpdateCartItemQuantity";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

interface CartItemCardProps {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: CartItemCardProps) => {
  const { id, game } = cartItem;
  const { mutate: updateCartItemQuantity } = useUpdateCartItemQuantity(id);
  const { mutate: deleteCartItem } = useDeleteCartItem(id);

  const handleDecreaseQuantity = () =>
    updateCartItemQuantity(cartItem.quantity - 1);

  const handleIncreaseQuantity = () =>
    updateCartItemQuantity(cartItem.quantity + 1);

  const handleDeleteCartItem = () => deleteCartItem();

  return (
    <div className="card bg-base-100 shadow-lg md:card-side">
      <GameCardImage
        src={game.background_image}
        name={game.name}
        id={game.id}
      />
      <div className="card-body w-full gap-0">
        <GameCardTitle name={game.name} id={game.id} />
        <div className="pl-1">{cartItem.platform.name}</div>
        <GameCardPrice price={cartItem.total_price} />
        <div className="card-actions justify-between">
          <div className="flex items-center gap-2">
            <button
              className="btn btn-outline"
              onClick={handleDecreaseQuantity}
            >
              <FaMinus />
            </button>
            <span className="font-bold">{cartItem.quantity}</span>
            <button
              className="btn btn-outline"
              onClick={handleIncreaseQuantity}
            >
              <FaPlus />
            </button>
          </div>
          <button
            className="btn btn-error btn-sm flex items-center gap-1 sm:btn-md"
            onClick={handleDeleteCartItem}
          >
            <FaTrash /> Delete from cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;
