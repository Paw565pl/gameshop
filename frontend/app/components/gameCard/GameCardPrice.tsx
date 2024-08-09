interface GameCardPriceProps {
  price: string;
}

const GameCardPrice = ({ price }: GameCardPriceProps) => {
  return (
    <div className="card-actions mb-1 h-full items-end justify-end sm:text-xl">
      {price} PLN
    </div>
  );
};

export default GameCardPrice;
