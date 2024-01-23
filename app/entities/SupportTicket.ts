import Order from "./Order";
import SupportTicketMessage from "./SupportTicketMessage";

interface SupportTicket {
  id: string;
  status: string;
  order: Order;
  messages: SupportTicketMessage[];
  created_at: string;
  updated_at: string;
}

export default SupportTicket;
