import type { ReactNode } from "react";
import type { CompanyPageData } from "@/content/company";
import {
  Page,
  PageHero,
  StatStrip,
  Section,
  SectionHead,
  ClosingCTA,
} from "./PageShell";
import { Reveal } from "./primitives";

export function CompanyPage({
  page,
  children,
}: {
  page: CompanyPageData;
  children?: ReactNode;
}) {
  return (
    <Page>
      <PageHero
        label={page.label}
        title={page.title}
        accent={page.accent}
        body={page.intro}
        secondary={{ label: "EXPLORE SERVICES", href: "/features" }}
      />
      <StatStrip stats={page.stats} />
      {children}
      {page.sections.map((section, sectionIndex) => {
        const tone = section.tone ?? "light";
        const bg = section.bg ?? (tone === "dark" ? "#07111f" : "#f1f5f9");
        return (
          <Section key={section.label} bg={bg}>
            <SectionHead
              label={section.label}
              title={section.title}
              {...(section.accent !== undefined ? { accent: section.accent } : {})}
              {...(section.body !== undefined ? { body: section.body } : {})}
              tone={tone}
            />
            <div className={`mt-12 border-t ${tone === "dark" ? "border-white/15" : "border-border"}`}>
              {section.items.map(([title, body], i) => (
                <Reveal key={title} delay={i * 40}>
                  <div
                    className={`grid gap-4 border-b py-7 sm:grid-cols-[3rem_0.7fr_1.3fr] sm:gap-8 lg:py-9 ${tone === "dark" ? "border-white/15" : "border-border"}`}
                  >
                    <span className={`label-mono ${tone === "dark" ? "text-cyan" : "text-primary"}`}>{String(sectionIndex + 1).padStart(2, "0")}.{String(i + 1).padStart(2, "0")}</span>
                    <h3
                      className={`text-[21px] font-light ${
                        tone === "dark" ? "text-primary-foreground" : "text-navytext"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`max-w-[65ch] text-[16px] leading-relaxed ${
                        tone === "dark" ? "text-primary-foreground/60" : "text-muted-foreground"
                      }`}
                    >
                      {body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        );
      })}
      <ClosingCTA
        {...(page.ctaTitle ? { title: page.ctaTitle } : {})}
        {...(page.ctaAccent ? { accent: page.ctaAccent } : {})}
        {...(page.ctaBody ? { body: page.ctaBody } : {})}
      />
    </Page>
  );
}
