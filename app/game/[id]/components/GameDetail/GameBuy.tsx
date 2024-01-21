"use client";

import Toast, { ToastProps } from "@/app/components/common/Toast";
import Platform from "@/app/entities/Platform";
import useAddCartItem from "@/app/hooks/client/useAddCartItem";
import { useRef, useState } from "react";

interface GameBuyProps {
  gameId: number;
  platforms: Platform[];
}

const GameBuy = ({ gameId, platforms }: GameBuyProps) => {
  const [toast, setToast] = useState<ToastProps | null>(null);
  const platformSelectRef = useRef<HTMLSelectElement>(null);
  const { mutate: addCartItem } = useAddCartItem();

  const handleAddToCart = () => {
    const selectedPlatformId = platformSelectRef.current?.value;
    if (!selectedPlatformId) return;

    addCartItem(
      {
        game_id: gameId,
        platform_id: parseInt(selectedPlatformId),
        quantity: 1,
      },
      {
        onSuccess: () =>
          setToast({ variant: "success", children: "Game added to cart." }),
        onError: () =>
          setToast({
            variant: "error",
            children: "You have to be logged in to add a game to cart.",
          }),
      },
    );

    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div>
      {toast && <Toast variant={toast.variant}>{toast.children}</Toast>}
      <select
        name="platform"
        id="platform"
        className="select select-bordered select-md mb-2 block w-full rounded focus:border-accent focus:outline-none"
        ref={platformSelectRef}
      >
        {platforms.map((platform) => (
          <option value={platform.id} key={platform.id}>
            {platform.name}
          </option>
        ))}
      </select>
      <button className="btn btn-md w-full" onClick={handleAddToCart}>
        Add to cart
      </button>
    </div>
  );
};

export default GameBuy;
