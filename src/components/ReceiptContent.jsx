import { aed, dateTime, statusName } from "../lib/api";
export function ReceiptContent({ order }) {
  return (
    <>
      <div className="receipt-heading">
        <div>
          <span className="eyebrow">DESIRES CAFÉ</span>
          <h2>{order.order_number}</h2>
        </div>
        <span className={`status ${order.status}`}>
          {statusName(order.status)}
        </span>
      </div>
      <p className="muted">{dateTime(order.created_at)} · UAE time</p>
      <div className="receipt-customer">
        <strong>{order.name}</strong>
        <p>{order.phone}</p>
        <p>
          {order.address}
          {order.area ? ` · ${order.area}` : ""}
        </p>
        {order.notes && <p>Note: {order.notes}</p>}
      </div>
      {order.items.map((line, i) => (
        <div className="receipt-line" key={i}>
          <span>
            {line.quantity} × {line.name}
            {line.option && <small> · {line.option}</small>}
            {line.addon && <small> + {line.addon}</small>}
          </span>
          <strong>{aed(Number(line.unit_price) * line.quantity)}</strong>
        </div>
      ))}
      <div className="totals">
        <div>
          <span>Subtotal (VAT inclusive)</span>
          <strong>{aed(order.subtotal)}</strong>
        </div>
        <div>
          <span>Delivery</span>
          <strong>{aed(order.delivery_fee)}</strong>
        </div>
        <div className="grand-total">
          <span>Total · COD</span>
          <strong>{aed(order.total)}</strong>
        </div>
      </div>
      <p className="fine-print">
        Payment:{" "}
        {order.payment_status === "collected"
          ? "Cash collected"
          : "Cash due on delivery"}
      </p>
    </>
  );
}
