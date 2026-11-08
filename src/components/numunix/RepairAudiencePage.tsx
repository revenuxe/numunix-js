"use client";
import Link from "next/link";
import { resolveHref } from "@/lib/route-href";
import { repairAudience, REPAIR_AUDIENCE_PATHS } from "@/content/repair-audiences";
import { REPAIR_PAGES, repairCategoryPath } from "@/content/repair-services";
import { useCategory } from "./category";
import AudienceRepairScene from "./AudienceRepairScene";
import { Page, PageHero, Section, SectionHead, ClosingCTA } from "./PageShell";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Check } from "lucide-react";
import { ContactForm } from "./ContactForm";

export function RepairAudiencePage({ slug }: { slug: string }) {
  const category = useCategory()?.category ?? "electronics";
  const audience = repairAudience(slug, category);
  if (!audience) return null;
  return (
    <Page>
      <PageHero
        label={audience.name.toUpperCase()}
        title={audience.guidance.headline}
        accent="in Bangalore"
        body={audience.intro}
        primary={{ label: "REQUEST A VISIT", href: "#enquiry" }}
      />
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHead
            label="REPAIRS IN YOUR SETTING"
            title="Plan around the space. Not just the fault."
            accent="Not just the fault."
            body={audience.guidance.scope}
          />
          <AudienceRepairScene
            category={category}
            index={audience.index}
            service={audience.service}
          />
        </div>
      </Section>
      <section id="capabilities" className="section-pad bg-mist">
        <div className="shell">
          <SectionHead
            label="RELEVANT SERVICES"
            title="Equipment-specific checks. Clear repair options."
            accent="Clear repair options."
          />
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {audience.services.map((item) => {
              const repair = REPAIR_PAGES.find(
                (service) => service.category === category && service.kind === item.kind,
              );
              return (
                <article key={item.kind} className="rounded-lg border border-border bg-card p-7">
                  <item.icon className="size-6 text-primary" />
                  <h3 className="mt-5 text-xl text-navytext">{item.name}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  {repair && (
                    <Button asChild variant="link" className="mt-4 px-0">
                      <Link
                        href={resolveHref("/$category/repairs/$slug", {
                          category: repairCategoryPath(repair.category),
                          slug: repair.slug,
                        })}

                      >
                        View repair details
                        <ArrowUpRight />
                      </Link>
                    </Button>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Section bg="var(--ink-800)">
        <SectionHead
          tone="dark"
          label="BEFORE THE VISIT"
          title="Useful details. A practical plan."
          accent="A practical plan."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {audience.guidance.planning.map(([title, body]) => (
            <div key={title} className="border-t border-primary-foreground/20 pt-6">
              <h3 className="text-xl text-primary-foreground">{title}</h3>
              <p className="mt-4 leading-relaxed text-primary-foreground/65">{body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHead
          label="SCOPE TO CONFIRM"
          title="Know what is included. Before work starts."
          accent="Before work starts."
        />
        <ul className="mt-8 space-y-5">
          {[
            "Visit and inspection charges, parts, labour and any transport arrangements.",
            "Domestic appliances and everyday electronics only; specialist medical equipment and industrial machinery are outside this guidance.",
            "Repair feasibility, expected timing, function checks and applicable aftercare terms.",
          ].map((item) => (
            <li key={item} className="flex gap-3 text-navytext">
              <Check className="size-5 shrink-0 text-primary" />
              {item}
            </li>
          ))}
        </ul>
      </Section>
      <section id="enquiry" className="section-pad scroll-mt-24 bg-mist">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <SectionHead
            label="REQUEST AN ASSESSMENT"
            title="Tell us the setting. Share the issue."
            accent="Share the issue."
            body="Include the models, location, affected functions and access details. Do not send passwords or one-time codes."
          />
          <ContactForm initialDescription={`Setting: ${audience.name}\nEquipment: \nIssue: `} />
        </div>
      </section>
      <Section>
        <div className="flex flex-wrap gap-3">
          {REPAIR_AUDIENCE_PATHS.filter((path) => path !== slug).map((path) => (
            <Button key={path} asChild variant="outline">
              <Link href={resolveHref("/who-we-serve/$slug", { slug: path })} >
                {repairAudience(path, category)?.name}
              </Link>
            </Button>
          ))}
        </div>
      </Section>
      <ClosingCTA />
    </Page>
  );
}
