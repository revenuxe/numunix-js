import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCheck,
  Mail,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import Header from "@/components/numunix/Header";
import Footer from "@/components/numunix/Footer";
import { CONTACT } from "@/content/site";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Thank you | Numunix" },
      {
        name: "description",
        content: "Your enquiry has been received. Here is what happens next with Numunix.",
      },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: ThankYouPage,
});

const steps = [
  {
    number: "01",
    icon: CheckCheck,
    title: "We review your idea",
    description: "Our team will read your enquiry and get familiar with your goals.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "We start a conversation",
    description:
      "We’ll follow up using the contact details you shared to explore your requirements.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "We shape the next step",
    description: "Together, we can clarify the scope, priorities, and a practical way forward.",
  },
];

function ThankYouPage() {
  const actionClass =
    "inline-flex min-h-12 items-center justify-center gap-3 rounded-xl px-6 py-3.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-400";
  return (
    <div className="bg-[#05070c]">
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden px-5 pb-16 pt-32 sm:px-8 sm:pb-24 lg:pt-44">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(37,99,235,0.18),transparent_55%)]"
          />
          <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <div
                role="status"
                className="inline-flex items-center gap-2.5 rounded-full border border-emerald-300/20 bg-emerald-300/5 px-4 py-2 text-xs font-medium text-emerald-200"
              >
                <Check size={15} aria-hidden="true" /> Your enquiry has been received
              </div>
              <h1 className="mt-7 max-w-[13ch] text-[clamp(2.8rem,7vw,6rem)] font-light leading-[1.04] tracking-[-0.045em] text-white">
                Great things start with <span className="text-[#6da6ff]">a hello.</span>
              </h1>
              <p className="mt-6 max-w-[43ch] text-base leading-relaxed text-slate-300 sm:text-lg">
                Thank you for reaching out. You’ve taken the first step, we’re looking forward to
                hearing more about what you want to build.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/"
                  className={`${actionClass} bg-[#2563eb] text-white hover:bg-[#3b82f6]`}
                >
                  Back to home <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link
                  to="/features"
                  className={`${actionClass} border border-white/15 bg-white/5 text-white hover:bg-white/10`}
                >
                  Explore our services <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-slate-400">
                No need to submit again. Your details are with our team.
              </p>
            </div>

            <div
              aria-hidden="true"
              className="relative mx-auto flex aspect-[1.15] w-full max-w-[420px] items-center justify-center"
            >
              <div className="absolute inset-3 rounded-full border border-blue-300/10" />
              <div className="absolute inset-12 rounded-full border border-blue-300/15" />
              <div className="absolute inset-20 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute left-5 top-12 h-2 w-2 rounded-full bg-blue-400" />
              <div className="absolute bottom-14 right-9 h-3 w-3 rounded-full border border-blue-300/50" />
              <div className="relative w-[82%] -rotate-6 rounded-[26px] border border-white/15 bg-gradient-to-br from-[#203555] to-[#0b1425] p-6 shadow-[0_35px_90px_-25px_rgba(37,99,235,0.4)] sm:p-8">
                <div className="flex items-center justify-between text-[10px] font-medium tracking-[0.2em] text-blue-200/70">
                  <span>NUMUNIX / NEW CONNECTION</span>
                  <ArrowUpRight size={16} />
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-blue-300/20 bg-blue-400/10 text-blue-200">
                    <Mail size={26} strokeWidth={1.3} />
                  </span>
                  <div>
                    <p className="text-lg font-medium text-white">Message delivered.</p>
                    <p className="mt-1 text-xs text-slate-400">
                      An idea. A conversation. A beginning.
                    </p>
                  </div>
                </div>
                <div className="mt-8 flex items-center gap-2 border-t border-white/10 pt-5 text-xs text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Ready for our team to
                  review
                </div>
                <div className="absolute -right-2 -top-5 grid h-16 w-16 rotate-6 place-items-center rounded-2xl border border-emerald-200/30 bg-[#153b36] text-emerald-200 shadow-xl sm:-right-4">
                  <Check size={30} strokeWidth={1.8} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5f8fc] px-5 py-14 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="label-mono text-[#5d76a3]">THE NEXT CHAPTER</p>
                <h2 className="mt-3 text-3xl font-light tracking-tight text-[#102a63] sm:text-4xl">
                  Here’s what happens next.
                </h2>
              </div>
              <p className="max-w-[32ch] text-sm leading-relaxed text-[#5d76a3]">
                A thoughtful conversation comes before a project plan.
              </p>
            </div>
            <ol className="mt-8 grid gap-4 lg:grid-cols-3">
              {steps.map(({ number, icon: Icon, title, description }) => (
                <li
                  key={number}
                  className="rounded-[22px] border border-[#dbe5f2] bg-white p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3ff] text-[#2563eb]">
                      <Icon size={21} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-[#8190aa]">{number}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-medium tracking-tight text-[#102a63]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5d76a3]">{description}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-col gap-5 rounded-[22px] border border-[#dbe5f2] bg-[#eaf1fc] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <h3 className="text-base font-medium text-[#102a63]">
                  Something else on your mind?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5d76a3]">
                  Send us any extra details or questions about your project.
                </p>
              </div>
              <a
                href={CONTACT.emailHref}
                className={`${actionClass} shrink-0 border border-[#dbe5f2] bg-white text-[#1e4ed8] hover:bg-blue-50`}
              >
                <Mail size={17} aria-hidden="true" /> Email our team{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
