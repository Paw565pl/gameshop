"use client";

import useFetchOrCreateCart from "@/app/hooks/client/useFetchOrCreateCart";
import CartItemCard from "./CartItemCard";
import SubmitOrderForm from "./SubmitOrderForm";

const CartItems = () => {
  const { data: cart, isLoading } = useFetchOrCreateCart();

  if (isLoading) return null;

  if (cart?.items.length === 0) return <div>Your cart is empty.</div>;

  return (
    <>
      <section className="space-y-4 ">
        {cart?.items.map((cartItem) => (
          <CartItemCard key={cartItem.id} cartItem={cartItem} />
        ))}
        {cart?.total_price && (
          <div className="w-full pr-4 text-right text-xl font-medium">
            Final price: {cart?.total_price} PLN
          </div>
        )}
      </section>
      <SubmitOrderForm />
    </>
  );
};

export default CartItems;
