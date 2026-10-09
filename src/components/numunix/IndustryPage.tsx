import { ArrowRight, ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Link } from "@tanstack/react-router";
import Header from "./Header";
import Hero from "./Hero";
import WhatsAppIcon from "./WhatsAppIcon";
import Footer from "./Footer";
import IndustryScene from "./IndustryScene";
import IndustrySectionNav from "./IndustrySectionNav";
import { ContactForm } from "./ContactForm";
import { Accent, Heading, Label, Reveal } from "./primitives";
import { industries } from "@/content/industries";
import type { IndustryLanding } from "@/content/industry-landings";
import { CONTACT } from "@/content/site";

export default function IndustryPage({ page }: { page: IndustryLanding }) {
  const index = industries.findIndex((item) => item.slug === page.slug);
  const industry = industries[index]!;
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main>
        <Hero
          variant="industry"
          headline={page.headline}
          accent={page.accent}
          intro={page.intro}
          eyebrow={industry.name}
          primaryLabel="DISCUSS YOUR PROJECT"
          primaryHref="#enquiry"
          secondaryLabel="WHATSAPP NOW"
          secondaryHref={CONTACT.whatsappHref}
          secondaryIcon={<WhatsAppIcon />}
        />

        <IndustrySectionNav />

        <section className="section-pad bg-[#eef3f8]">
          <div className="shell grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal ssrVisible>
              <Label tone="light">A LOOK AT THE POSSIBILITIES</Label>
              <Heading tone="light" className="mt-7">
                Your industry.
                <br />
                <Accent>A connected experience.</Accent>
              </Heading>
              <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[#5d76a3]">
                {industry.description} — brought into focus through a thoughtful product experience.
              </p>
            </Reveal>
            <Reveal ssrVisible delay={120}>
              <IndustryScene index={index} />
            </Reveal>
          </div>
        </section>

        <section id="overview" className="section-pad scroll-mt-24 bg-[#f7f9fc]">
          <div className="shell grid gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-20">
            <Reveal ssrVisible>
              <Label tone="light">THE REAL CHALLENGE</Label>
              <p className="mt-5 max-w-[25ch] text-sm leading-relaxed text-[#8190aa]">
                {industry.name} software development
              </p>
            </Reveal>
            <Reveal ssrVisible>
              <Heading tone="light" className="max-w-[23ch]">
                {page.tension}
              </Heading>
              <p className="mt-7 max-w-[64ch] text-lg leading-relaxed text-[#5d76a3]">
                {page.perspective}
              </p>
            </Reveal>
          </div>
        </section>

        <section id="capabilities" className="section-pad scroll-mt-24 bg-[#eef3f8]">
          <div className="shell">
            <Reveal ssrVisible>
              <Label tone="light">WHAT WE CAN BUILD</Label>
              <Heading tone="light" className="mt-7 max-w-[20ch]">
                Built around your sector.
                <br />
                <Accent>Shaped around your business.</Accent>
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.capabilities.map(([title, body], i) => (
                <Reveal ssrVisible key={title} delay={(i % 3) * 50}>
                  <article className="h-full rounded-2xl border border-[#dce5f1] bg-white p-7 sm:p-8">
                    <span className="font-mono text-xs text-[#9db4d6]">0{i + 1} /</span>
                    <h3 className="mt-8 text-2xl leading-tight font-light tracking-tight text-[#102a63]">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#5d76a3]">{body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="workflow" className="section-pad scroll-mt-24 bg-[#07111f]">
          <div className="shell">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-20">
              <Reveal ssrVisible>
                <Label>A JOURNEY, END TO END</Label>
                <Heading className="mt-7">
                  The workflow behind
                  <br />
                  <Accent>the experience.</Accent>
                </Heading>
              </Reveal>
              <Reveal ssrVisible delay={70}>
                <span className="label-mono text-[#8fb4e8]">ILLUSTRATIVE PRODUCT SCENARIO</span>
                <p className="mt-6 text-xl leading-relaxed font-light text-[#b6c6df]">
                  {page.scenario}
                </p>
              </Reveal>
            </div>
            <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {page.workflow.map(([title, body], i) => (
                <Reveal ssrVisible key={title} delay={i * 50}>
                  <div className="h-full border-t border-[#35517c] pt-6">
                    <span className="font-mono text-xs text-[#6a97d9]">0{i + 1}</span>
                    <h3 className="mt-7 text-2xl font-light text-white">{title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#91a9cb]">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#f7f9fc]">
          <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal ssrVisible>
              <Label tone="light">CONNECTED BY DESIGN</Label>
              <Heading tone="light" className="mt-7">
                Fit the ecosystem.
                <br />
                <Accent>Keep the ownership clear.</Accent>
              </Heading>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-[#5d76a3]">
                The interface is one part of the system. We map where data lives, which tools need
                to connect, and how updates recover when an integration fails.
              </p>
            </Reveal>
            <Reveal ssrVisible delay={70}>
              <div className="rounded-[24px] border border-[#dce5f1] bg-white p-7 sm:p-9">
                <h3 className="text-xl font-light text-[#102a63]">
                  Integration points to plan for
                </h3>
                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {page.integrations.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-[#f1f5fb] p-4 text-sm text-[#42658f]"
                    >
                      <Check size={15} className="shrink-0 text-[#2459e0]" />
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-relaxed text-[#8190aa]">
                  Provider access, API support, and integration scope are confirmed during
                  discovery.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="delivery" className="section-pad scroll-mt-24 bg-white">
          <div className="shell">
            <Reveal ssrVisible>
              <Label tone="light">DECISIONS BEFORE DEVELOPMENT</Label>
              <Heading tone="light" className="mt-7 max-w-[22ch]">
                Get the important questions
                <br />
                <Accent>on the table early.</Accent>
              </Heading>
            </Reveal>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {page.decisions.map(([title, body], i) => (
                <Reveal ssrVisible key={title}>
                  <div className="border-t border-[#dce5f1] pt-6">
                    <span className="font-mono text-xs text-[#8190aa]">DISCOVERY / 0{i + 1}</span>
                    <h3 className="mt-6 text-2xl font-light tracking-tight text-[#102a63]">
                      {title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[#5d76a3]">{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal ssrVisible>
              <div className="mt-14 grid gap-7 rounded-[24px] bg-[#102a63] p-7 text-white sm:p-10 lg:grid-cols-[0.65fr_1.35fr]">
                <div>
                  <span className="label-mono text-[#9dbded]">A FOCUSED FIRST RELEASE</span>
                  <h3 className="mt-4 text-3xl font-light tracking-tight">
                    Start with a complete journey.
                  </h3>
                </div>
                <div>
                  <p className="text-base leading-relaxed text-[#c4d3ec]">{page.firstRelease}</p>
                  <a
                    href="#enquiry"
                    className="mt-6 inline-flex items-center gap-3 text-sm text-white"
                  >
                    Shape your first release <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-4 md:grid-cols-3">
              {[
                [
                  "Define",
                  "A workflow map, prioritized scope, integration inventory, and acceptance criteria.",
                ],
                [
                  "Build & validate",
                  "Reviewable increments, testing around the core journey, and documented decisions.",
                ],
                [
                  "Launch & evolve",
                  "An agreed release plan, operational handover, and a scoped path for ongoing support.",
                ],
              ].map(([title, body], i) => (
                <div key={title} className="rounded-2xl border border-[#dce5f1] p-6">
                  <span className="label-mono text-[#8190aa]">PHASE 0{i + 1}</span>
                  <h3 className="mt-4 text-xl font-light text-[#102a63]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5d76a3]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-pad bg-[#eef3f8]">
          <div className="shell">
            <Reveal ssrVisible>
              <Label tone="light">THE ENGINEERING BEHIND IT</Label>
              <Heading tone="light" className="mt-7">
                Explore the <Accent>relevant services.</Accent>
              </Heading>
            </Reveal>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {page.services.map((service) => (
                <Link
                  key={service.slug}
                  to="/features/$slug"
                  params={{ slug: service.slug }}
                  className="group flex items-center justify-between gap-5 rounded-2xl border border-[#dce5f1] bg-white p-7 transition-colors hover:border-[#3b82f6]"
                >
                  <h3 className="text-xl font-light text-[#102a63]">{service.name}</h3>
                  <ArrowUpRight
                    size={20}
                    className="shrink-0 text-[#2459e0] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section-pad scroll-mt-24 bg-[#f7f9fc]">
          <div className="shell grid gap-10 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20">
            <Reveal ssrVisible>
              <Label tone="light">PRACTICAL ANSWERS</Label>
              <Heading tone="light" className="mt-7">
                Before
                <br />
                <Accent>we begin.</Accent>
              </Heading>
            </Reveal>
            <div>
              {page.faq.map(([q, a]) => (
                <details key={q} className="group border-b border-[#dce5f1] py-6 first:pt-0">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-lg text-[#102a63] [&::-webkit-details-marker]:hidden">
                    {q}
                    <ChevronDown
                      size={20}
                      className="mt-1 shrink-0 text-[#2459e0] transition-transform group-open:rotate-180"
                    />
                  </summary>
                  <p className="mt-5 max-w-[65ch] text-base leading-relaxed text-[#5d76a3]">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="enquiry" className="section-pad scroll-mt-24 bg-[#eaf0f9]">
          <div className="shell grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal ssrVisible>
              <Label tone="light">LET’S SHAPE YOUR PROJECT</Label>
              <Heading tone="light" className="mt-7">
                Your sector.
                <br />
                Your challenge.
                <br />
                <Accent>Our next conversation.</Accent>
              </Heading>
              <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-[#5d76a3]">
                Tell us about your {industry.name.toLowerCase()} project: who it serves, what needs
                to improve, and which systems it needs to work with.
              </p>
              <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-[#5d76a3]">
                Exploring an idea? Share the workflow you want to simplify. Modernizing a platform?
                Tell us what already exists.
              </p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="mt-7 inline-flex items-center gap-2 text-sm text-[#1e4ed8]"
              >
                Prefer email? Write to us <ArrowUpRight size={15} />
              </a>
            </Reveal>
            <ContactForm initialDescription={`Industry: ${industry.name}\n\n`} />
          </div>
        </section>

        <section className="border-t border-[#dce5f1] bg-[#f7f9fc] py-12">
          <div className="shell">
            <Label tone="light">EXPLORE OTHER INDUSTRIES</Label>
            <div className="mt-6 flex flex-wrap gap-3">
              {industries
                .filter((item) => item.slug !== page.slug)
                .map((item) => (
                  <Link
                    key={item.slug}
                    to="/industries/$slug"
                    params={{ slug: item.slug }}
                    className="rounded-full border border-[#dce5f1] bg-white px-5 py-3 text-sm text-[#42658f] hover:border-[#2459e0] hover:text-[#2459e0]"
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
