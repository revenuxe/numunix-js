import { CCTV_BRANDS } from "@/content/cctv-brands";
import { PURIFIER_BRANDS } from "@/content/purifier-brands";
import type { PurifierBrandPage } from "@/content/purifier-brand-pages";
import { PurifierBrandLogo } from "./PurifierBrandLogo";
import type { CCTVBrandPage } from "@/content/cctv-brand-pages";
import { CCTVBrandLogo } from "./CCTVBrandLogo";
import type { LaptopBrandPage } from "@/content/laptop-brand-pages";
import Link from "next/link";
import { resolveHref } from "@/lib/route-href";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Droplets,
  RotateCw,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { type WasherBrandPage } from "@/content/repair-brand-pages";
import type { MobileBrandPage } from "@/content/mobile-brand-pages";
import { MOBILE_BRANDS } from "@/content/mobile-brands";
import type { ACBrandPage } from "@/content/ac-brand-pages";
import { AC_BRANDS } from "@/content/ac-brands";
import type { FridgeBrandPage } from "@/content/fridge-brand-pages";
import { REFRIGERATOR_BRANDS } from "@/content/refrigerator-brands";
import { repairWhatsAppHref } from "@/content/repair-whatsapp";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import { DeviceVisual } from "./RepairVisual";
import { ContactForm } from "./ContactForm";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { RepairCallback } from "./RepairCallback";
import { RepairBrandScope, RepairBrandDecisions } from "./RepairBrandEditorial";
import { FridgeRepairDetails } from "./FridgeRepairDetails";
import { Label, Heading, Accent, Reveal } from "./primitives";

export function RepairBrandPage({
  page,
}: {
  page:
    | WasherBrandPage
    | FridgeBrandPage
    | ACBrandPage
    | MobileBrandPage
    | LaptopBrandPage
    | CCTVBrandPage
    | PurifierBrandPage;
}) {
  const isFridge = "guidance" in page;
  const isAC = "acGuidance" in page;
  const isMobile = "mobileGuidance" in page;
  const isLaptop = "laptopGuidance" in page;
  const isCCTV = "cctvGuidance" in page;
  const isPurifier = "purifierGuidance" in page;
  const purifierLogo = isPurifier
    ? PURIFIER_BRANDS.find((brand) => brand.name === page.brand)
    : undefined;
  const cctvLogo = isCCTV ? CCTV_BRANDS.find((brand) => brand.name === page.brand) : undefined;
  const directoryCategory = isMobile || isLaptop || isCCTV ? "electronic" : "appliances";
  const mobileLogo = isMobile
    ? MOBILE_BRANDS.find((brand) => brand.name === page.brand)
    : undefined;
  const appliance = isPurifier
    ? "water purifier"
    : isCCTV
      ? "cctv"
      : isLaptop
        ? "laptop"
        : isMobile
          ? "mobile"
          : isAC
            ? "AC"
            : isFridge
              ? "fridge"
              : "washing machine";
  const directorySlug = isPurifier
    ? "water-purifier-service"
    : isCCTV
      ? "cctv-service"
      : isLaptop
        ? "laptop-repair"
        : isMobile
          ? "mobile-repair"
          : isAC
            ? "ac-repair"
            : isFridge
              ? "refrigerator-repair"
              : "washing-machine-repair";
  const logo = isPurifier
    ? `/brands/water-purifiers/${purifierLogo?.file}`
    : isCCTV
      ? `/brands/cctv/${cctvLogo?.file}`
      : isLaptop
        ? `/brands/laptop/${page.slug}.svg`
        : isMobile
          ? `/brands/mobiles/${mobileLogo?.file}`
          : isAC
            ? `/brands/air-conditioners/${AC_BRANDS.find((brand) => brand.name === page.brand)?.file}`
            : isFridge
              ? `/brands/refrigerators/${REFRIGERATOR_BRANDS.find((brand) => brand.name === page.brand)?.file}`
              : `/brands/washing-machines/${page.slug}.webp`;
  const whatsappHref = repairWhatsAppHref(`${page.brand} ${appliance} repair`);
  return (
    <div className="bg-ink-900">
      <Header />
      <main>
        <Hero
          headline={`${page.brand} ${isPurifier ? "Water Purifier" : isCCTV ? "CCTV" : isLaptop ? "Laptop" : isMobile ? "Mobile" : isAC ? "AC" : isFridge ? "Fridge" : "Washing Machine"}`}
          accent="Repair in Bangalore"
          intro={page.heroIntro}
          primaryLabel="BOOK A REPAIR"
          primaryHref="#enquiry"
          secondaryLabel="BOOK ON WHATSAPP"
          secondaryIcon={<WhatsAppIcon />}
          secondaryHref={whatsappHref}
        />
        <RepairCallback
          service={page.service}
          brand={page.brand}
          brandLogo={logo}
          brandLogoContent={
            purifierLogo ? (
              <PurifierBrandLogo brand={purifierLogo} />
            ) : cctvLogo ? (
              <CCTVBrandLogo brand={cctvLogo} />
            ) : undefined
          }
          brandLogoDark={mobileLogo?.darkLogo ?? false}
        />
        <section className="section-pad bg-paper">
          <div className="shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <Reveal ssrVisible>
              <Label tone="light">
                {page.brand.toUpperCase()}{" "}
                {isPurifier
                  ? "WATER PURIFIER"
                  : isCCTV
                    ? "CCTV"
                    : isLaptop
                      ? "LAPTOP"
                      : isMobile
                        ? "MOBILE"
                        : isAC
                          ? "AC"
                          : isFridge
                            ? "FRIDGE"
                            : "WASHING MACHINE"}{" "}
                SERVICE
              </Label>
              <Heading tone="light" className="mt-6">
                {page.brand} repair.
                <br />
                <Accent>Your model first.</Accent>
              </Heading>
              <p className="mt-6 text-base leading-relaxed text-mutedtext">{page.description}</p>
              <p className="mt-5 text-base leading-relaxed text-mutedtext">{page.modelIntro}</p>
            </Reveal>
            <Reveal ssrVisible>
              <div className="repair-visual">
                <div className="repair-visual-top">
                  <span>
                    {page.brand}{" "}
                    {isPurifier
                      ? "water purifier"
                      : isCCTV
                        ? "cctv"
                        : isLaptop
                          ? "laptop"
                          : isMobile
                            ? "phone"
                            : isAC
                              ? "AC"
                              : isFridge
                                ? "fridge"
                                : "washer"}{" "}
                    / assessment
                  </span>
                  <span className="repair-status">ILLUSTRATIVE</span>
                </div>
                <DeviceVisual
                  kind={
                    isPurifier
                      ? "purifier"
                      : isCCTV
                        ? "cctv"
                        : isLaptop
                          ? "laptop"
                          : isMobile
                            ? "phone"
                            : isAC
                              ? "ac"
                              : isFridge
                                ? "fridge"
                                : "washer"
                  }
                />
                <div className="repair-checks">
                  {page.checks.map((check) => (
                    <div key={check}>
                      <span>{check}</span>
                      <Check size={14} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
        <section className="section-pad bg-mist">
          <div className="shell">
            <Label tone="light">
              YOUR {page.brand.toUpperCase()}{" "}
              {isPurifier
                ? "WATER PURIFIER"
                : isCCTV
                  ? "CCTV"
                  : isLaptop
                    ? "LAPTOP"
                    : isMobile
                      ? "MOBILE"
                      : isAC
                        ? "AC"
                        : isFridge
                          ? "FRIDGE"
                          : "WASHER"}{" "}
              REPAIR QUESTIONS
            </Label>
            <Heading tone="light" className="mt-6">
              {page.brand} symptoms.
              <br />
              <Accent>Repair decisions.</Accent>
            </Heading>
            <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {page.faults.map((fault, index) => (
                <Reveal ssrVisible key={fault.title}>
                  <article className="h-full rounded-lg border border-border bg-card p-6 sm:p-8">
                    <span className="font-mono text-xs text-primary">
                      0{index + 1} / {fault.label}
                    </span>
                    <h3 className="mt-5 text-xl text-navytext">{fault.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-mutedtext">{fault.body}</p>
                    <Button
                      asChild
                      variant="link"
                      className="mt-5 h-auto justify-start p-0 text-primary"
                    >
                      <a href="#enquiry">
                        Request assessment <ArrowUpRight size={16} />
                      </a>
                    </Button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <RepairBrandScope page={page} whatsappHref={whatsappHref} />
        {isFridge && <FridgeRepairDetails page={page} whatsappHref={whatsappHref} />}
        <section className="section-pad bg-ink-800 text-primary-foreground">
          <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Label>
                {isPurifier
                  ? "PURIFIER SYMPTOMS, NOT GUESSWORK"
                  : isCCTV
                    ? "SYSTEM SYMPTOMS, NOT GUESSWORK"
                    : isLaptop
                      ? "LAPTOP SYMPTOMS, NOT GUESSWORK"
                      : isMobile
                        ? "PHONE SYMPTOMS, NOT GUESSWORK"
                        : "ERROR CODES, NOT GUESSWORK"}
              </Label>
              <Heading className="mt-6">
                {page.editorial ? "Before a replacement." : page.diagnosticTitle}
                <br />
                <Accent>Check the context.</Accent>
              </Heading>
              <p className="mt-6 text-base leading-relaxed text-primary-foreground/70">
                {page.editorial?.decision.body ?? page.diagnosticBody}
              </p>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/70">
                {isPurifier
                  ? "Keep the cabinet closed and do not bypass warnings or handle wet electrical connections. Follow the exact model guidance for user checks and any flushing required after work."
                  : isCCTV
                    ? "Keep electrical covers closed and do not climb to inspect cameras. Do not reset or format a recorder when footage matters. Keep account passwords, verification codes and device QR labels private, and coordinate access through the authorized system contact."
                    : isLaptop
                      ? "Do not keep powering a wet laptop, force a damaged hinge or press a swollen battery. Keep passwords and recovery keys out of the enquiry, and discuss any data-impacting work before approval."
                      : isMobile
                        ? "Do not open the phone, press a swollen battery or keep charging a wet or visibly damaged device. Keep passwords and OTPs out of the enquiry, and discuss any data-impacting work before approval."
                        : isAC
                          ? "Keep electrical covers closed and leave internal or refrigerant work to a professional. Do not climb or lean out to inspect an outdoor unit. Follow the exact model manual for permitted user checks."
                          : isFridge
                            ? "Do not chip ice with tools, remove electrical covers or attempt work on refrigerant pipework. Follow your exact model manual and leave internal inspection to a professional."
                            : "Do not force a locked door or open the pump cover while the machine contains hot water. Follow your model manual. If you are unsure, leave draining and inspection to a professional."}
              </p>
              <Button
                asChild
                variant="outline"
                className="mt-8 h-auto min-h-10 max-w-full whitespace-normal border-primary-foreground/30 bg-transparent py-2 text-left text-primary-foreground"
              >
                <a
                  href={page.sources[0]?.href ?? "/repair-diagnostics"}
                  target={page.sources.length ? "_blank" : undefined}
                  rel={page.sources.length ? "noopener noreferrer" : undefined}
                >
                  {page.diagnosticLink} <ArrowUpRight size={16} />
                </a>
              </Button>
            </div>
            <div className="grid gap-0">
              {(isPurifier
                ? [
                    [
                      Droplets,
                      "Supply and dispensing",
                      "Explain tank filling separately from outlet flow and mention any incoming water-supply change.",
                    ],
                    [
                      RotateCw,
                      "Filter and operating history",
                      "Keep replacement records and the complete indicator description with the full model.",
                    ],
                    [
                      ShieldCheck,
                      "Safe assessment",
                      "Keep internal tubing and electrical covers untouched. Stop use if water reaches electrics.",
                    ],
                  ]
                : isCCTV
                  ? [
                      [
                        Droplets,
                        "Camera and connection",
                        "Identify affected channels and whether the local image is missing, unclear or intermittent. Describe power and cable changes without handling installed wiring.",
                      ],
                      [
                        RotateCw,
                        "Recording and playback",
                        "Separate live view from saved footage. Include the affected time range and any storage warning before reset or replacement is discussed.",
                      ],
                      [
                        ShieldCheck,
                        "Authorized access",
                        "Coordinate with the system owner or responsible IT contact. Keep credentials private and discuss important recordings before changes.",
                      ],
                    ]
                  : isLaptop
                    ? [
                        [
                          Droplets,
                          "Damage and fault history",
                          "Mention spills, drops and earlier repairs. Describe which functions still respond without repeating unsafe tests.",
                        ],
                        [
                          RotateCw,
                          "Power and startup",
                          "Note adapter behaviour, lights, fan activity and the complete startup message. Separate no power from a missing image.",
                        ],
                        [
                          ShieldCheck,
                          "Data and privacy",
                          "Discuss backups and any encryption before software or storage work. Keep passwords and recovery keys private.",
                        ],
                      ]
                    : isMobile
                      ? [
                          [
                            Droplets,
                            "Damage history",
                            "Mention drops, liquid exposure and earlier work, along with the functions that still respond.",
                          ],
                          [
                            RotateCw,
                            "Power and start-up",
                            "Describe charging indicators, restarts and screen behaviour without repeatedly testing an unsafe device.",
                          ],
                          [
                            ShieldCheck,
                            "Data and privacy",
                            "Back up accessible files and discuss reset risks. Keep passwords, OTPs and recovery codes private.",
                          ],
                        ]
                      : isAC
                        ? [
                            [
                              Droplets,
                              "Cooling and airflow",
                              "Explain whether air moves normally and how cooling changed. Include mode and temperature settings.",
                            ],
                            [
                              RotateCw,
                              "Operating pattern",
                              "Note a recurring shutdown, message or new sound and how long the unit runs before it occurs.",
                            ],
                            [
                              ShieldCheck,
                              "Safe access",
                              "Describe indoor and outdoor access without climbing, opening covers or touching refrigerant pipework.",
                            ],
                          ]
                        : isFridge
                          ? [
                              [
                                Droplets,
                                "Compartment observations",
                                "Describe the fresh-food and freezer sections separately and include settings and visible ice or water.",
                              ],
                              [
                                RotateCw,
                                "Operating pattern",
                                "Mention a new sound, a recurring warning or a change in operation and when it began.",
                              ],
                              [
                                ShieldCheck,
                                "Safe assessment",
                                "Keep covers in place, avoid refrigerant pipework and do not handle wet electrical connections.",
                              ],
                            ]
                          : [
                              [
                                Droplets,
                                "Drainage first",
                                "Explain whether water is left inside, whether the hose appears kinked and when the programme stops.",
                              ],
                              [
                                RotateCw,
                                "Cycle behaviour",
                                "Tell us if washing works but spinning does not. Mention load size and any repeated interruption.",
                              ],
                              [
                                ShieldCheck,
                                "Safety before testing",
                                "Stop using a leaking or electrically unsafe machine. Never handle plugs or switches with wet hands.",
                              ],
                            ]
              ).map(([Icon, title, body]) => {
                const Symbol = Icon as typeof Droplets;
                return (
                  <div
                    key={String(title)}
                    className="flex gap-5 border-t border-primary-foreground/20 py-7"
                  >
                    <Symbol className="mt-1 size-6 shrink-0 text-electric" />
                    <div>
                      <h3 className="text-xl">{String(title)}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
                        {String(body)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="section-pad bg-paper">
          <div className="shell">
            <Label tone="light">FROM REQUEST TO FUNCTION CHECK</Label>
            <Heading tone="light" className="mt-6">
              A clear repair plan.
              <br />
              <Accent>Your approval first.</Accent>
            </Heading>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                [
                  "Share the details",
                  `Send the ${page.brand} model, fault, display message and your location. Mention previous work and warranty status.`,
                ],
                [
                  "Confirm assessment",
                  isPurifier
                    ? "Confirm the installed model, locality, visit scope and assessment charges. Mention existing cover and recent filter changes before arrangements are agreed."
                    : isCCTV
                      ? "Confirm the site, authorized contact, affected devices, access restrictions and inspection charges before a visit is agreed."
                      : isLaptop
                        ? "Agree assessment and handover arrangements, inspection charges and data priorities before work is proposed."
                        : isMobile
                          ? "Agree the handover or assessment arrangements, inspection charges and data priorities. Diagnosis establishes the proposed repair scope."
                          : "Agree the visit arrangements and any inspection charges. Diagnosis establishes repair feasibility and parts requirements.",
                ],
                [
                  "Review the estimate",
                  "Confirm proposed work, labour, part specifications and exclusions. Ask what evidence supports any replacement.",
                ],
                [
                  "Check the result",
                  isPurifier
                    ? "Review relevant refill, dispensing, leak and control checks. Confirm model-specific flushing or recommissioning guidance and written repair terms."
                    : isCCTV
                      ? "Review affected channels, live images, new recording and playback, timestamps and agreed remote access. Confirm any remaining limitations and written repair terms."
                      : isLaptop
                        ? "Review relevant startup, display, input, charging, port and cooling checks. Confirm any remaining limitations and written repair terms."
                        : isMobile
                          ? "Review the relevant display, touch, charging, camera and audio checks, and confirm any functionality limitations and written repair terms."
                          : isAC
                            ? "Review relevant cooling, airflow, drainage and control checks and confirm any applicable written repair terms."
                            : isFridge
                              ? "Discuss relevant cooling, control and door checks, observation guidance and any applicable written warranty terms."
                              : "Review relevant fill, wash, drain and spin functions after the repair. Confirm aftercare and any applicable written warranty terms.",
                ],
              ].map(([title, body], index) => (
                <div key={title} className="border-t border-border pt-6">
                  <span className="font-mono text-xs text-primary">0{index + 1}</span>
                  <h3 className="mt-5 text-xl text-navytext">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-mutedtext">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section-pad border-t border-border bg-paper">
          <div className="shell">
            <Label tone="light">BEFORE YOU APPROVE A REPAIR</Label>
            <Heading tone="light" className="mt-6">
              Know the work.
              <br />
              <Accent>Know the estimate.</Accent>
            </Heading>
            <p className="mt-6 max-w-[65ch] text-base leading-relaxed text-mutedtext">
              Keep your model details and the proposed work together. These questions help you
              discuss the assessment; the answers depend on your device and the fault found.
            </p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {page.estimateChecks.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-border bg-card p-6 sm:p-8"
                >
                  <ClipboardList className="size-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-xl text-navytext">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-mutedtext">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <RepairBrandDecisions page={page} whatsappHref={whatsappHref} />
        <section className="section-pad bg-mist">
          <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Label tone="light">BEFORE YOUR ASSESSMENT</Label>
              <Heading tone="light" className="mt-6">
                A few useful details.
                <br />
                <Accent>A better starting point.</Accent>
              </Heading>
              <ul className="mt-8 space-y-5">
                {page.preparation.map((item) => (
                  <li key={item} className="flex gap-3 text-base leading-relaxed text-mutedtext">
                    <ClipboardList className="mt-1 size-5 shrink-0 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label tone="light">{page.brand.toUpperCase()} REPAIR QUESTIONS</Label>
              {page.faqs.map(([question, answer]) => (
                <details key={question} className="group border-b border-border py-6">
                  <summary className="flex cursor-pointer list-none justify-between gap-4 text-lg text-navytext">
                    {question}
                    <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-4 text-sm leading-relaxed text-mutedtext">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="enquiry" className="section-pad scroll-mt-24 bg-paper">
          <div className="shell grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <Label tone="light">
                BOOK {page.brand.toUpperCase()}{" "}
                {isPurifier
                  ? "WATER PURIFIER"
                  : isCCTV
                    ? "CCTV"
                    : isLaptop
                      ? "LAPTOP"
                      : isMobile
                        ? "MOBILE"
                        : isAC
                          ? "AC"
                          : isFridge
                            ? "FRIDGE"
                            : "WASHING MACHINE"}{" "}
                REPAIR
              </Label>
              <Heading tone="light" className="mt-6">
                Tell us what stopped.
                <br />
                <Accent>Let’s take a look.</Accent>
              </Heading>
              <p className="mt-6 max-w-[46ch] text-base leading-relaxed text-mutedtext">
                Share your {page.brand} model, the issue and preferred timing. Our team can discuss
                assessment arrangements in Bangalore and what to confirm before approving work.
              </p>
              <p className="mt-5 text-sm leading-relaxed text-mutedtext">
                Still covered by a manufacturer warranty? Start with {page.brand} official support
                to understand your options.
              </p>
              <Button asChild variant="default" className="mt-8 whitespace-nowrap">
                <a href={whatsappHref}>
                  <WhatsAppIcon /> Book on WhatsApp
                </a>
              </Button>
            </div>
            <ContactForm
              initialService={page.service}
              brandSelection={page.brandSelection}
              initialDescription={page.enquiryDescription}
            />
          </div>
        </section>
        <section className="border-t border-border bg-mist py-10">
          <div className="shell grid gap-8 lg:grid-cols-2">
            <div>
              <Label tone="light">
                {page.sources.length ? "MANUFACTURER REFERENCES" : "MODEL & SUPPLIER DETAILS"}
              </Label>
              <p className="mt-4 text-sm leading-relaxed text-mutedtext">
                {page.sources.length
                  ? `Official product-support references from ${page.brand}. Always use the guidance for your exact device. ${page.brand} is a trademark of its respective owner; its name identifies the equipment, not an affiliation with Numunix.`
                  : "Use the model label, invoice and supplier documents to identify your purifier and existing cover. Confirm compatible parts for the fitted system. Brand names identify equipment and do not imply affiliation with Numunix."}
              </p>
              <ul className="mt-4 space-y-3">
                {page.sources.map((source) => (
                  <li key={source.href}>
                    <a
                      className="text-sm text-primary underline underline-offset-4"
                      href={source.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Label tone="light">MORE REPAIR HELP</Label>
              <div className="mt-4 flex flex-col items-start gap-3">
                <Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left">
                  <Link
                    href={resolveHref("/$category/repairs/$slug", { category: directoryCategory, slug: directorySlug })}

                  >
                    All{" "}
                    {isPurifier
                      ? "water purifier"
                      : isCCTV
                        ? "cctv"
                        : isLaptop
                          ? "laptop"
                          : isMobile
                            ? "mobile"
                            : isAC
                              ? "AC"
                              : isFridge
                                ? "fridge"
                                : "washing machine"}{" "}
                    repairs <ArrowUpRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="link" className="h-auto whitespace-normal p-0 text-left">
                  <Link
                    href={resolveHref("/repair-guides/$slug", {
                      slug: isCCTV
                        ? "choosing-a-repair-service-in-bangalore"
                        : isLaptop
                          ? "laptop-faults-repair-or-replace"
                          : isMobile
                            ? "mobile-repair-before-you-book"
                            : "appliance-repair-visit-checklist",
                    })}

                  >
                    {isCCTV
                      ? "Choosing a repair service"
                      : isLaptop
                        ? "Before booking a laptop repair"
                        : isMobile
                          ? "Before booking a mobile repair"
                          : "Appliance repair visit checklist"}{" "}
                    <ArrowUpRight size={16} />
                  </Link>
                </Button>
                <Button asChild variant="link" className="h-auto p-0">
                  <Link href={"/repair-assessment"}>
                    How assessment works <ArrowUpRight size={16} />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
