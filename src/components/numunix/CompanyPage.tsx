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
      {page.sections.map((section) => {
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
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {section.items.map(([title, body], i) => (
                <Reveal key={title} delay={i * 40}>
                  <div
                    className={`h-full rounded-[22px] border p-7 lg:p-8 ${
                      tone === "dark"
                        ? "border-white/[0.07] bg-white/[0.02]"
                        : "border-[#dbe5f2] bg-white"
                    }`}
                  >
                    <h3
                      className={`text-[19px] font-light tracking-[-0.01em] ${
                        tone === "dark" ? "text-white" : "text-[#102a63]"
                      }`}
                    >
                      {title}
                    </h3>
                    <p
                      className={`mt-3 text-[16px] leading-relaxed ${
                        tone === "dark" ? "text-white/55" : "text-[#5d76a3]"
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
