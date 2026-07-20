import type { DeviceOrder } from "@/lib/quote-types";

function formatInr(value: number): string {
  return `Rs ${Math.round(value).toLocaleString("en-IN")}`;
}

function buildInvoiceHtml(order: DeviceOrder): string {
  const rows = order.answers
    .map((a) => {
      const sign = a.price_effect_type === "bonus_fixed" ? "+" : "-";
      const amount =
        a.price_effect_type === "deduct_percent"
          ? `${sign}${a.price_effect_amount}%`
          : `${sign}${formatInr(a.price_effect_amount)}`;
      return `<tr><td style="padding:6px 0;color:#334155;">${a.group_title}: ${a.option_label}</td><td style="padding:6px 0;text-align:right;color:${a.price_effect_type === "bonus_fixed" ? "#059669" : "#dc2626"};">${amount}</td></tr>`;
    })
    .join("");

  const b = order.quote_breakdown;

  return `
  <div style="width:640px;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#111827;background:#ffffff;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;border-bottom:2px solid #111827;padding-bottom:16px;">
      <div>
        <p style="margin:0;font-size:20px;font-weight:800;">Numunix</p>
        <p style="margin:2px 0 0;font-size:12px;color:#6b7280;">Laptop buyback pickup invoice</p>
      </div>
      <div style="text-align:right;">
        <p style="margin:0;font-size:12px;color:#6b7280;">Booking reference</p>
        <p style="margin:2px 0 0;font-size:14px;font-weight:700;">${order.id}</p>
      </div>
    </div>

    <div style="display:flex;justify-content:space-between;margin-top:20px;font-size:13px;">
      <div>
        <p style="margin:0;font-weight:700;">${order.customer_name}</p>
        <p style="margin:4px 0 0;color:#6b7280;">${order.phone}${order.email ? ` &middot; ${order.email}` : ""}</p>
        <p style="margin:4px 0 0;color:#6b7280;max-width:320px;">${order.address}, ${order.pincode}</p>
      </div>
      <div style="text-align:right;color:#6b7280;">
        <p style="margin:0;">Pickup date: ${order.pickup_date}</p>
        <p style="margin:4px 0 0;">Time slot: ${order.pickup_slot}</p>
      </div>
    </div>

    <div style="margin-top:24px;padding:16px;border-radius:12px;background:#f0fdf4;border:1px solid #bbf7d0;">
      <p style="margin:0;font-size:12px;color:#065f46;">${order.brand_name} &middot; ${order.series_name}</p>
      <p style="margin:4px 0 0;font-size:16px;font-weight:700;">${order.model_name}</p>
      <p style="margin:10px 0 0;font-size:24px;font-weight:800;color:#059669;">${formatInr(order.final_quote)}</p>
      <p style="margin:4px 0 0;font-size:11px;color:#6b7280;">Final price is confirmed after doorstep inspection.</p>
    </div>

    <table style="width:100%;margin-top:20px;border-collapse:collapse;font-size:12px;">
      <tr><td style="padding:6px 0;color:#334155;">Base price</td><td style="padding:6px 0;text-align:right;">${formatInr(b.base_price)}</td></tr>
      <tr><td style="padding:6px 0;color:#334155;">Configuration effects</td><td style="padding:6px 0;text-align:right;">${formatInr(b.config_amount)}</td></tr>
      <tr><td style="padding:6px 0;color:#334155;">Age depreciation (${b.age_percent}%)</td><td style="padding:6px 0;text-align:right;">-${formatInr(b.age_amount)}</td></tr>
      <tr><td style="padding:6px 0;color:#334155;">Condition deductions</td><td style="padding:6px 0;text-align:right;">${formatInr(b.condition_amount)}</td></tr>
      ${rows}
      <tr><td style="padding:10px 0 0;font-weight:700;border-top:1px solid #e5e7eb;">Final quote</td><td style="padding:10px 0 0;text-align:right;font-weight:700;border-top:1px solid #e5e7eb;">${formatInr(b.final_quote)}</td></tr>
    </table>

    <p style="margin-top:24px;font-size:11px;color:#9ca3af;">Free to book. You approve the rate before anything is sold. Generated ${new Date(order.created_at).toLocaleString("en-IN")}.</p>
  </div>`;
}

export async function generateInvoicePdf(order: DeviceOrder): Promise<void> {
  const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
    import("jspdf"),
    import("html2canvas"),
  ]);

  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.innerHTML = buildInvoiceHtml(order);
  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container.firstElementChild as HTMLElement, { scale: 2 });
    const imageData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ unit: "px", format: [canvas.width, canvas.height] });
    pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`numunix-pickup-${order.id.slice(0, 8)}.pdf`);
  } finally {
    document.body.removeChild(container);
  }
}
