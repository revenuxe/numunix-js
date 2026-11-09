import Link from "next/link";
import { resolveHref } from "@/lib/route-href";
import { ArrowUpRight, Check, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { REPAIR_PAGES, repairCategoryPath, type RepairService } from "@/content/repair-services";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import { DeviceVisual } from "./RepairVisual";
import { ContactForm } from "./ContactForm";
import { Label, Heading, Accent, Reveal } from "./primitives";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { repairWhatsAppHref } from "@/content/repair-whatsapp";
import { RepairCallback } from "./RepairCallback";
import { WashingMachineBrands } from "./WashingMachineBrands";
import { RefrigeratorBrands } from "./RefrigeratorBrands";
import { ACBrands } from "./ACBrands";
import { MobileBrands } from "./MobileBrands";
import { CCTVBrands } from "./CCTVBrands";
import { LaptopBrands } from "./LaptopBrands";
import { PurifierBrands } from "./PurifierBrands";
import type { RepairHubContent } from "@/content/repair-hub-content";
import { guidesForRepair } from "@/content/repair-guide-links";
import { articleBySlug } from "@/content/articles";
import { MOBILE_REPAIR_PAGE } from "@/content/mobile-repair-page";
import { MobileRepairScope, MobileRepairDecisions, MobileRepairCTA } from "./MobileRepairContent";
import { WASHING_MACHINE_PAGE } from "@/content/washing-machine-page";
import {
  WashingMachineScope,
  WashingMachineDecisions,
  WashingMachineCTA,
} from "./WashingMachineContent";

export function RepairServicePage({
  service,
  hubContent,
}: {
  service: RepairService;
  hubContent?: RepairHubContent | undefined;
}) {
  const isWasher = service.category === "appliances" && service.slug === "washing-machine-repair";
  const isFridge = service.category === "appliances" && service.slug === "refrigerator-repair";
  const isAC = service.category === "appliances" && service.slug === "ac-repair";
  const isMobile = service.category === "electronics" && service.slug === "mobile-repair";
  const isCCTV = service.category === "electronics" && service.slug === "cctv-service";
  const isLaptop = service.category === "electronics" && service.slug === "laptop-repair";
  const detailedContent = isMobile
    ? MOBILE_REPAIR_PAGE
    : isWasher
      ? WASHING_MACHINE_PAGE
      : hubContent;
  const relatedGuides = guidesForRepair(service.slug)
    .map((slug) => articleBySlug(slug))
    .filter((article) => article !== undefined);
  const related = REPAIR_PAGES.filter(
    (item) => item.category === service.category && item.slug !== service.slug,
  ).slice(0, 3);
  return (
    <>
      <div className="bg-ink-900">
        <Header />
        <main>
          <Hero
            headline={service.name}
            accent="in Bangalore"
            intro={service.intro}
            primaryLabel="BOOK A REPAIR"
            primaryHref="#enquiry"
            secondaryLabel="BOOK ON WHATSAPP"
            secondaryIcon={<WhatsAppIcon />}
            secondaryHref={repairWhatsAppHref(service.name.toLowerCase(), [
              "Brand",
              "Model",
              "Issue",
              "Location",
            ])}
          />
          <RepairCallback service={service.name} />
          <section id="assessment" className="section-pad scroll-mt-24 bg-paper">
            <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal ssrVisible>
                <Label tone="light">{service.name.toUpperCase()}</Label>
                <Heading tone="light" className="mt-6">
                  Start with the fault.
                  <br />
                  <Accent>Not a guess.</Accent>
                </Heading>
                <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-mutedtext">
                  {detailedContent
                    ? detailedContent.assessmentIntro
                    : "An issue can have more than one cause. Share what happened, how often it happens and any previous repairs. The assessment helps define which work is useful and which parts, if any, need replacing."}
                </p>
              </Reveal>
              <Reveal ssrVisible>
                <div className="repair-visual">
                  <div className="repair-visual-top">
                    <span>{service.name} / assessment</span>
                    <span className="repair-status">ILLUSTRATIVE</span>
                  </div>
                  <DeviceVisual kind={service.kind} />
                  <div className="repair-checks">
                    {service.checks.map((check) => (
                      <div key={check}>
                        <span>{check}</span>
                        <Check size={14} />
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
            {detailedContent ? (
              <div className="shell mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {detailedContent.faults.map((fault, i) => (
                  <article
                    key={fault.title}
                    className="rounded-lg border border-border bg-card p-6 sm:p-8"
                  >
                    <span className="font-mono text-xs text-primary">
                      0{i + 1} / {fault.label}
                    </span>
                    <h3 className="mt-5 text-xl text-navytext">{fault.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-mutedtext">{fault.body}</p>
                    <Button asChild variant="link" className="mt-5 h-auto p-0">
                      <a href="#enquiry">
                        Discuss this fault <ArrowUpRight size={16} />
                      </a>
                    </Button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="shell mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {service.faults.map((fault, i) => (
                  <article key={fault} className="rounded-lg border border-border bg-card p-6">
                    <span className="font-mono text-xs text-primary">0{i + 1} / COMMON FAULT</span>
                    <h3 className="mt-5 text-lg leading-snug text-navytext">{fault}</h3>
                  </article>
                ))}
              </div>
            )}
          </section>
          {isWasher && (
            <>
              <WashingMachineBrands />
              <WashingMachineScope />
            </>
          )}
          {isFridge && <RefrigeratorBrands />}
          {isAC && <ACBrands />}
          {isMobile && (
            <>
              <MobileBrands />
              <MobileRepairScope />
            </>
          )}
          {isCCTV && <CCTVBrands />}
          {isLaptop && <LaptopBrands />}
          {service.category === "appliances" && service.slug === "water-purifier-service" && (
            <PurifierBrands />
          )}
          {hubContent && (
            <section
              id="service-scope"
              className="section-pad bg-paper"
              aria-labelledby="service-scope-title"
            >
              <div className="shell">
                <Label tone="light">{service.name.toUpperCase()} / SCOPE</Label>
                <Heading tone="light" className="mt-6">
                  <span id="service-scope-title">
                    The right scope.
                    <br />
                    <Accent>For your equipment.</Accent>
                  </span>
                </Heading>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {hubContent.scope.map((item) => (
                    <article
                      key={item.title}
                      className="rounded-lg border border-border bg-card p-6 sm:p-8"
                    >
                      <h3 className="text-xl text-navytext">{item.title}</h3>
                      <p className="mt-4 text-base leading-relaxed text-mutedtext">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
          <section className="section-pad bg-ink-800 text-primary-foreground">
            <div className="shell">
              <Label>THE REPAIR JOURNEY</Label>
              <Heading className="mt-6">
                Clear steps.
                <br />
                <Accent>Informed decisions.</Accent>
              </Heading>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {(isMobile
                  ? MOBILE_REPAIR_PAGE.journey
                  : [
                      ["Describe", "Share the model, issue and any damage or previous work."],
                      [
                        "Assess",
                        "Review the diagnosis, feasibility and any further checks needed.",
                      ],
                      [
                        "Approve",
                        "Confirm labour, parts, exclusions and the estimate before work begins.",
                      ],
                      [
                        "Check",
                        "Review the repaired functions and any aftercare or warranty terms.",
                      ],
                    ]
                ).map(([title, body], i) => (
                  <div key={title} className="border-t border-primary-foreground/20 pt-6">
                    <span className="font-mono text-xs text-electric">0{i + 1}</span>
                    <h3 className="mt-5 text-2xl font-light">{title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          {isWasher && <WashingMachineDecisions />}
          {isMobile && <MobileRepairDecisions />}
          <section className="section-pad bg-mist">
            <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <Label tone="light">{isMobile ? "BEFORE HANDOVER" : "BEFORE THE VISIT"}</Label>
                <Heading tone="light" className="mt-6">
                  A little preparation.
                  <br />
                  <Accent>A clearer assessment.</Accent>
                </Heading>
                <ul className="mt-8 space-y-5">
                  {(detailedContent ? detailedContent.preparation : service.preparation).map(
                    (item) => (
                      <li key={item} className="flex gap-3 text-base leading-relaxed text-navytext">
                        <Check className="mt-1 size-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
              <div>
                <Label tone="light">WHAT TO CONFIRM</Label>
                {(detailedContent
                  ? detailedContent.faqs
                  : [
                      [
                        "How much will the repair cost?",
                        "The model, fault and parts requirements determine the estimate. Confirm any inspection or visit charges, labour and parts before approving work.",
                      ],
                      [
                        "Can everything be repaired on site?",
                        "Some checks can happen where the item is installed. Board work, storage recovery or specialist testing may need a workshop. Confirm the arrangement before booking.",
                      ],
                      [
                        "How long will it take?",
                        "Timing depends on diagnosis, parts availability and the tests required. Ask for an expected timeframe after assessment rather than relying on a fixed promise.",
                      ],
                      [
                        "What if replacement is a better option?",
                        "Ask about repair feasibility and the likely benefit. If the repair is not practical, discuss replacement options before spending on parts.",
                      ],
                    ]
                ).map(([q, a]) => (
                  <details key={q} className="group border-b border-border py-6">
                    <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg text-navytext">
                      {q}
                      <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-4 text-sm leading-relaxed text-mutedtext">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          {isWasher && <WashingMachineCTA final />}
          {isMobile && <MobileRepairCTA final />}
          <section id="enquiry" className="section-pad scroll-mt-24 bg-paper">
            <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <Label tone="light">REQUEST AN ASSESSMENT</Label>
                <Heading tone="light" className="mt-6">
                  Tell us the issue.
                  <br />
                  <Accent>Let’s take a look.</Accent>
                </Heading>
                <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-mutedtext">
                  Request {service.name.toLowerCase()} with the model, fault and preferred timing.
                  Share enough detail to scope the next conversation.
                </p>
              </div>
              <ContactForm
                initialService={service.name}
                initialDescription={
                  isMobile
                    ? "Mobile repair\nBrand / Model: \nIssue / Damage history: \nBackup status / Data priority: \nBangalore locality: "
                    : isWasher
                      ? "Washing machine repair\nBrand / Model: \nMachine type: \nIssue / Error code: \nBangalore locality: "
                        : service.slug === 'desktop-repair'
                          ? 'Desktop computer repair\nBrand / Model or assembled specifications: \nTower / All-in-one: \nStartup behaviour / Issue: \nBackup status / Data priority: \nBangalore locality: '
                        : service.slug === 'desktop-repair'
                          ? 'Desktop computer repair\nBrand / Model or assembled specifications: \nTower / All-in-one: \nStartup behaviour / Issue: \nBackup status / Data priority: \nBangalore locality: '
                          : `Service: ${service.name}\nModel: \nIssue: `
                }
              />
            </div>
          </section>
          <section className="section-pad bg-mist">
            <div className="shell">
              <Label tone="light">RELATED REPAIRS</Label>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((item) => (
                  <Button
                    key={item.slug}
                    asChild
                    variant="outline"
                    className="h-auto min-h-20 justify-between whitespace-normal bg-card p-6 text-left text-navytext"
                  >
                    <Link
                      href={resolveHref("/$category/repairs/$slug", { category: repairCategoryPath(item.category), slug: item.slug })}

                    >
                      {item.name}
                      <ArrowUpRight className="shrink-0 text-primary" />
                    </Link>
                  </Button>
                ))}
              </div>
              {relatedGuides.length > 0 && (
                <nav
                  aria-label="Guides for this repair"
                  className="mt-12 border-t border-border pt-8"
                >
                  <h2 className="text-xl text-navytext">
                    Prepare for {service.name.toLowerCase()}
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
                    {relatedGuides.map((article) => (
                      <li key={article.slug}>
                        <Link
                          href={resolveHref("/repair-guides/$slug", { slug: article.slug })}

                          className="text-sm text-primary underline underline-offset-4"
                        >
                          {article.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
