import useFetchSupportTickets from "@/app/hooks/client/useFetchSupportTickets";

const SupportTickets = () => {
  const {
    data: supportTickets,
    isLoading,
    fetchNextPage,
  } = useFetchSupportTickets();

  if (isLoading) return null;

  if (supportTickets?.pages.at(0)?.count === 0) {
    return <div>Your do not have any support tickets.</div>;
  }

  return (
    <section>
      {supportTickets?.pages.map((page) =>
        page.results.map((supportTicket) => (
          <div className="card bordered" key={supportTicket.id}>
            <div className="card-body">
              <h2 className="card-title text-2xl">
                Support ticket ({supportTicket.id})
              </h2>
              <dl className="grid grid-cols-2 gap-2">
                <dt>Status:</dt>
                <dd>{supportTicket.status}</dd>
                <dt>Order id:</dt>
                <dd>{supportTicket.order.id}</dd>
                <dt>Created at:</dt>
                <dd>
                  {new Date(supportTicket.created_at).toLocaleString("pl-PL")}
                </dd>
                <dt>Updated at:</dt>
                <dd>
                  {new Date(supportTicket.updated_at).toLocaleString("pl-PL")}
                </dd>
              </dl>
              <h3 className="text-xl">Messages</h3>
              {supportTicket.messages.map((message) => (
                <div key={message.id} className="chat">
                  <div className="chat-bubble rounded-2xl">
                    <div className="chat-header flex items-center gap-2">
                      <span className="text-sm opacity-75">
                        Autor: {message.author}
                      </span>
                      <time className="text-xs opacity-25">
                        {new Date(message.created_at).toLocaleString("pl-PL")}
                      </time>
                    </div>
                    {message.message}
                  </div>
                </div>
              ))}
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

export default SupportTickets;
