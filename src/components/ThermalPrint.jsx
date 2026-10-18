import { useState } from "react";
import { Printer } from "lucide-react";
import { ReceiptContent } from "./ReceiptContent";

export function ThermalPrint({ order }) {
  const [width, setWidth] = useState("80");
  const [printing, setPrinting] = useState(false);
  const [error, setError] = useState("");
  async function print() {
    setPrinting(true);
    setError("");
    const frame = document.createElement("iframe");
    frame.title = "Thermal receipt print preview";
    frame.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}mm;height:1px;border:0;`;
    document.body.appendChild(frame);
    let cleanupTimer;
    const cleanup = () => { clearTimeout(cleanupTimer); frame.remove(); setPrinting(false); };
    try {
      const { renderToStaticMarkup } = await import("react-dom/server");
      const doc = frame.contentDocument;
      const markup = renderToStaticMarkup(<ReceiptContent order={order} />);
      doc.open();
      doc.write(`<!doctype html><html><head><title>Receipt</title><style>
        * { box-sizing:border-box; }
        html, body { margin:0; padding:0; background:white; color:black; }
        body { width:${width}mm; padding:3mm; font:12px/1.4 Arial,sans-serif; }
        h2 { font-size:19px; margin:4px 0; }
        p { margin:5px 0; }
        .eyebrow { font-size:15px; font-weight:bold; letter-spacing:1px; }
        .receipt-heading { text-align:center; }
        .status { display:block; text-transform:uppercase; font-size:10px; }
        .muted { text-align:center; font-size:10px; }
        .receipt-customer { border-top:1px dashed black; border-bottom:1px dashed black; padding:9px 0; margin:10px 0; overflow-wrap:anywhere; }
        .receipt-line, .totals > div { display:flex; justify-content:space-between; align-items:start; gap:8px; margin:7px 0; }
        .receipt-line > span { flex:1; min-width:0; overflow-wrap:anywhere; }
        .receipt-line strong, .totals strong { flex-shrink:0; white-space:nowrap; }
        .receipt-line small { display:block; }
        .totals { border-top:1px dashed black; margin-top:12px; padding-top:5px; font-size:11px; }
        .grand-total { font-size:15px; border-top:1px solid black; padding-top:7px; font-weight:bold; }
        .fine-print { text-align:center; margin-top:12px; font-size:11px; }
        @page { margin:0; }
      </style></head><body>${markup}<p style="text-align:center;margin-top:12px">Thank you for your order!</p></body></html>`);
      doc.close();
      await doc.fonts.ready;
      await new Promise(resolve => frame.contentWindow.requestAnimationFrame(() => frame.contentWindow.requestAnimationFrame(resolve)));
      // Set a roll-width page with only the height this receipt needs.
      const height = Math.ceil(doc.body.getBoundingClientRect().height * 25.4 / 96) + 4;
      const pageStyle = doc.createElement("style");
      pageStyle.textContent = `@page { size:${width}mm ${height}mm; margin:0; }`;
      doc.head.appendChild(pageStyle);
      frame.contentWindow.addEventListener("afterprint", cleanup, { once:true });
      cleanupTimer = setTimeout(cleanup, 300000);
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } catch {
      cleanup();
      setError("Print preview could not open. Please try again.");
    }
  }
  return <div className="no-print">
    <div className="thermal-print-controls">
      <select aria-label="Receipt paper width" value={width} onChange={e => setWidth(e.target.value)} disabled={printing}>
        <option value="80">80 mm thermal roll</option><option value="58">58 mm thermal roll</option>
      </select>
      <button type="button" className="outline-button" disabled={printing} onClick={print}><Printer size={16} />{printing ? "Printing…" : "Print receipt"}</button>
    </div>
    <p className="fine-print">Select your thermal printer and matching roll size. Use 100% scale with headers and footers off.</p>
    {error && <p role="alert">{error}</p>}
  </div>;
}
