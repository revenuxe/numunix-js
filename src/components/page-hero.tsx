export function PageHero({
  eyebrow,
  title,
  accent,
  description,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink px-4 pt-28 pb-20 text-white md:px-8 md:pt-32 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          {eyebrow}
        </span>
        <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
          {accent && (
            <>
              {" "}
              <span className="text-brand">{accent}</span>
            </>
          )}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 md:text-lg">{description}</p>
        )}
      </div>
    </section>
  );
}
