type WashingMachineServiceDisclaimerProps = {
  brandName?: string;
};

export function WashingMachineServiceDisclaimer({
  brandName,
}: WashingMachineServiceDisclaimerProps) {
  const title = brandName
    ? `Independent ${brandName} washing machine repair — not an authorized service center`
    : "Independent washing machine repair — not an authorized service center";
  const brandReference = brandName
    ? ` “${brandName}” and any related names, logos and trademarks are the property of their respective owners and are used only to identify the appliances we service.`
    : " Brand names, logos and trademarks shown on this page are the property of their respective owners and are used only to identify the appliances we service.";

  return (
    <section className="border-t border-border bg-secondary/35 px-4 py-12 md:px-8">
      <div className="mx-auto max-w-6xl rounded-2xl border border-border bg-white p-6 md:p-8">
        <h2 className="text-lg font-bold tracking-tight text-ink">{title}</h2>
        <p className="mt-3 max-w-5xl text-sm leading-6 text-muted-foreground">
          Numunix is an independent home-appliance repair provider and is not associated with,
          authorized by, sponsored by or officially connected with any appliance manufacturer, its
          subsidiaries or affiliates.{brandReference} Our technicians provide professional
          diagnostics and repairs using suitable genuine or certified-compatible parts where
          available, with work backed by a Numunix service warranty.
        </p>
      </div>
    </section>
  );
}
