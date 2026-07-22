import { Lightbulb, TriangleAlert } from "lucide-react";
import type { BlogBlock } from "@/lib/blog-posts";

export function BlogPostContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return <p className="leading-7 text-muted-foreground">{block.text}</p>;

    case "heading": {
      const Tag = (block.level ?? 2) === 3 ? "h3" : "h2";
      return (
        <Tag
          className={
            Tag === "h2"
              ? "pt-4 text-2xl font-extrabold tracking-tight text-ink md:text-3xl"
              : "pt-2 text-xl font-bold text-ink"
          }
        >
          {block.text}
        </Tag>
      );
    }

    case "list":
      return (
        <ul className="list-disc space-y-2.5 pl-5 leading-7 text-muted-foreground marker:text-brand">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <div className="space-y-5">
          {block.items.map((step) => (
            <div key={step.title} className="rounded-2xl border border-border bg-secondary/30 p-5">
              <h3 className="text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      );

    case "callout": {
      const isWarning = block.tone === "warning";
      const Icon = isWarning ? TriangleAlert : Lightbulb;
      return (
        <div
          className={`flex gap-3 rounded-2xl border p-5 ${
            isWarning ? "border-amber-200 bg-amber-50" : "border-brand/25 bg-brand/5"
          }`}
        >
          <Icon
            className={`mt-0.5 h-5 w-5 shrink-0 ${isWarning ? "text-amber-600" : "text-brand"}`}
          />
          <div>
            <p className="font-bold text-ink">{block.title}</p>
            <p className="mt-1.5 leading-7 text-muted-foreground">{block.text}</p>
          </div>
        </div>
      );
    }

    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-secondary/60">
                {block.headers.map((header) => (
                  <th key={header} className="border-b border-border px-4 py-3 font-bold text-ink">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className="odd:bg-white even:bg-secondary/20">
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className="border-b border-border px-4 py-3 align-top leading-6 text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    default:
      return null;
  }
}
