import { useCategory } from "./category";
import { ContactForm } from "./ContactForm";
import { Accent, Heading, Label, Btn, Reveal } from "./primitives";

export function ContactFormSection() {
  const category = useCategory()?.category ?? "electronics";
  return (
    <section id="enquiry" className="section-pad scroll-mt-24 bg-[#f1f5f9]">
      <div className="shell grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Label tone="light">START A CONVERSATION</Label>
          <Heading tone="light" className="mt-5 max-w-[16ch]">
            {category === "appliances" ? "Appliance service" : "Device service"}. <Accent>Send a request.</Accent>
          </Heading>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-[#5d76a3]">
            {category === "appliances" ? "Share the appliance model, service issue and location so the team can review your request." : "Share the device, service issue and contact details so the team can review your request."}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export function ProductContactSection() {
  return <section id="enquiry" className="section-pad scroll-mt-24 bg-[#f1f5f9]"><div className="shell grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"><div><Heading tone="light" className="max-w-[16ch]">Bring your service team <Accent>onto one page.</Accent></Heading><p className="mt-5 max-w-[44ch] text-base leading-relaxed text-[#5d76a3]">Contact Numunix about managing service requests, bookings, teams and jobs in one workspace.</p></div><Reveal><div className="rounded-[24px] border border-[#dbe5f2] bg-white p-7 shadow-[0_24px_60px_-42px_rgba(16,42,99,0.4)] sm:p-9"><h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#102a63]">Talk with our team</h2><p className="mt-3 max-w-[42ch] text-[15px] leading-relaxed text-[#5d76a3]">Ask about the workspace, team access or a service workflow you want to manage.</p><div className="mt-7 flex flex-wrap gap-3"><Btn as="a" href="mailto:numunix@gmail.com?subject=Numunix%20service%20management">EMAIL NUMUNIX</Btn><Btn as="a" href="https://app.numunix.com" variant="ghostLight">OPEN WORKSPACE</Btn></div></div></Reveal></div></section>;
}
