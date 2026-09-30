import type { LegalPageData } from "@/content/company";
import { Page, PageHero, Section, ClosingCTA } from "./PageShell";
import { Reveal } from "./primitives";

export function LegalPage({ page }: { page: LegalPageData }) {
  return (
    <Page>
      <PageHero
        compact
        label={page.label}
        title={page.title}
        accent={page.accent}
        body={page.intro}
        primary={{ label: "CONTACT US", href: "/contact" }}
        secondary={{ label: "BACK TO HOME", href: "/" }}
      />
      <Section bg="#f7f9fc">
        <p className="label-mono text-[#93a6c4]">UPDATED {page.updated}</p>
        <div className="mt-10 max-w-[72ch] space-y-12">
          {page.sections.map((section) => (
            <Reveal key={section.heading}>
              <h2 className="text-[26px] font-light tracking-[-0.02em] text-[#102a63] lg:text-[30px]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p}
                  className="mt-4 text-[16.5px] leading-relaxed text-[#5d76a3]"
                >
                  {p}
                </p>
              ))}
            </Reveal>
          ))}
        </div>
      </Section>
      <ClosingCTA
        title="Questions about this page?"
        accent="this page?"
        body="Email us and we will point you to the right person."
      />
    </Page>
  );
}
