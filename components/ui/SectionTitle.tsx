interface SectionTitleProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:gap-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/40 bg-sky-500/10 text-[9px] font-semibold uppercase tracking-[0.2em] text-sky-200 sm:h-9 sm:w-9 sm:text-[10px]">
          {eyebrow.split("/")[0]?.trim() ?? "01"}
        </span>
        <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-slate-400 sm:text-[10px] sm:tracking-[0.35em]">{eyebrow.replace(/^\d+\s*\/\s*/, "")}</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-[-0.05em] text-white sm:text-3xl md:text-5xl">{title}</h2>
      {description ? <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:leading-7 md:text-base">{description}</p> : null}
    </div>
  );
}
