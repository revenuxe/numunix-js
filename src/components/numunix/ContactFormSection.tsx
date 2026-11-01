import { useCategory } from "./category";
import { ContactForm } from "./ContactForm";
import { Accent, Heading, Label } from "./primitives";

export function ContactFormSection() {
  const category = useCategory()?.category ?? "electronics";
  return (
    <section id="enquiry" className="section-pad scroll-mt-24 bg-[#f1f5f9]">
      <div className="shell grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <Label tone="light">START A CONVERSATION</Label>
          <Heading tone="light" className="mt-5 max-w-[16ch]">
            {category === "appliances" ? "Your appliance." : "Your device."} <Accent>Our next repair.</Accent>
          </Heading>
          <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-[#5d76a3]">
            {category === "appliances" ? "Tell us the appliance model, fault and location, and share the best way to reach you." : "Tell us what's not working, pick a device or service, and share the best way to reach you."}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
