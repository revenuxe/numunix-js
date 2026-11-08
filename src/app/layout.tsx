import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/styles.css";
import { CategorySelectionProvider } from "@/components/numunix/category";
import { RepairInteractionEvents } from "@/components/numunix/RepairInteractionEvents";
import { repairSiteSchema } from "@/content/repair-seo";
import { SITE_URL } from "@/content/site";
import { inter, jetbrainsMono } from "./fonts";
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Numunix | Electronics and Appliance Repair in Bangalore",
  description:
    "Electronics and appliance repair in Bangalore. Discuss fault assessment, repair options and estimates with Numunix.",
  authors: [{ name: "Numunix" }],
  icons: { icon: "/favicon.ico" },
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(repairSiteSchema()).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <CategorySelectionProvider>
          <RepairInteractionEvents />
          {children}
        </CategorySelectionProvider>
      </body>
    </html>
  );
}
