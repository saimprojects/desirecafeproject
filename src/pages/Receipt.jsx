import { Link, useParams } from "react-router-dom";
import { Check } from "lucide-react";
import { usePolling } from "../lib/usePolling";
import { ReceiptContent } from "../components/ReceiptContent";
export default function Receipt() {
  const { token } = useParams();
  const { data, error } = usePolling(
    `receipt/?token=${encodeURIComponent(token)}`,
    3000,
  );
  return (
    <div className="cafe-shop shop-container receipt-page">
      <div className="receipt-intro no-print">
        <span className="success-icon">
          <Check />
        </span>
        <h1>{data ? "Thank you for your order." : "Your order"}</h1>
        <p>Keep this private link to follow your order. No login required.</p>
      </div>
      {error && <div className="error-box">{error.message}</div>}
      {data ? (
        <section className="surface printable">
          <ReceiptContent order={data} />
          <div className="button-row no-print">
            <Link className="text-button" to="/menu">
              Back to menu
            </Link>
          </div>
        </section>
      ) : (
        !error && <div className="empty-state">Loading your receipt…</div>
      )}
    </div>
  );
}
