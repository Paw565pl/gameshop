import GameCardImage from "@/app/components/gameCard/GameCardImage";
import GameCardTitle from "@/app/components/gameCard/GameCardTitle";
import useFetchOrders from "@/app/hooks/client/useFetchOrders";
import SupportTicketForm from "./SupportTicketForm";

const OrdersHistory = () => {
  const { data: orders, isLoading, fetchNextPage } = useFetchOrders();

  if (isLoading) return null;

  if (orders?.pages.at(0)?.count === 0) {
    return <div>Your orders history is empty.</div>;
  }

  return (
    <section className="space-y-4">
      {orders?.pages.map((page) =>
        page.results.map((order) => (
          <div key={order.id} className="card bordered">
            <div className="card-body">
              <h2 className="card-title text-2xl">Order ({order.id})</h2>
              <dl className="grid grid-cols-2 gap-2">
                <dt>Status:</dt>
                <dd>{order.status}</dd>
                <dt>Payment method:</dt>
                <dd>{order.payment_method}</dd>
                <dt>Delivery method:</dt>
                <dd>{order.delivery_method}</dd>
                <dt>Address:</dt>
                <dd>
                  {order.address.street} {order.address.street_number}
                  {order.address.flat_number &&
                    ` / ${order.address.flat_number}`}
                  , {order.address.post_code} {order.address.city},{" "}
                  {order.address.country}
                </dd>
                <dt>Created at:</dt>
                <dd>{new Date(order.created_at).toLocaleString("pl-PL")}</dd>
                <dt>Promo code:</dt>
                <dd>{order.promo_code || "-"}</dd>
                <dt>Total price:</dt>
                <dd>{order.total_price} PLN</dd>
              </dl>

              <div className="divider"></div>

              <div className="grid grid-cols-2 justify-center gap-4">
                {order.items.map((item) => (
                  <div key={item.id} className="card items-center shadow-lg">
                    <GameCardImage
                      src={item.game.background_image}
                      name={item.game.name}
                      id={item.game.id}
                    />
                    <div className="card-body">
                      <GameCardTitle name={item.game.name} id={item.game.id} />
                      <p>{item.platform.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Unit price: {item.total_price} PLN</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              <SupportTicketForm orderId={order.id} />
            </div>
          </div>
        )),
      )}
      <button className="btn btn-ghost btn-xs" onClick={() => fetchNextPage()}>
        Show more
      </button>
    </section>
  );
};

export default OrdersHistory;
