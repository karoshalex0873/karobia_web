"use client";

type TerminalTone = "system" | "success" | "muted" | "error";

type TextBlockProps = {
  lines: string[];
  tone?: TerminalTone;
};

type SectionProps = {
  lines: string[];
};

type ActionSectionProps = SectionProps & {
  title: string;
  actionLabel: string;
  href: string;
};

type InteractiveLauncherProps = {
  onCommandSelect: (command: string) => void;
};

const metrics = [
  ["01", "Product-minded engineering"],
  ["02", "Mobile and web delivery"],
  ["03", "Hardware-aware software"],
];

function toneClasses(tone: TerminalTone) {
  if (tone === "success") {
    return "border-emerald-300/20 bg-emerald-300/[0.06] text-emerald-50/90";
  }

  if (tone === "error") {
    return "border-red-400/20 bg-red-400/[0.06] text-red-50/90";
  }

  if (tone === "muted") {
    return "border-zinc-400/10 bg-white/[0.03] text-zinc-300/60";
  }

  return "border-cyan-300/16 bg-cyan-300/[0.05] text-zinc-100/84";
}

function SectionShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.035] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-sm">
      <div className="border-b border-white/8 px-4 py-4 sm:px-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-emerald-300/75">
          {eyebrow}
        </p>
        <h3 className="mt-1 text-base leading-tight text-zinc-50 sm:text-lg">
          {title}
        </h3>
        <p className="mt-2 max-w-2xl text-[13px] leading-6 text-zinc-400 sm:text-sm">
          {description}
        </p>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

export function TerminalTextBlock({ lines, tone = "system" }: TextBlockProps) {
  return (
    <div className={`rounded-2xl border px-4 py-4 sm:px-5 ${toneClasses(tone)}`}>
      <div className="space-y-1 text-[12px] leading-6 sm:text-sm">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`} className="whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}

export function AboutSection({ lines }: SectionProps) {
  const [nameLine = "Alex Karobia", ...detailLines] = lines;

  return (
    <SectionShell
      eyebrow="profile.exec"
      title={nameLine}
      description="A concise profile for teams that need a builder who can reason about product, implementation, and finish."
    >
        <div className="grid gap-4 md:grid-cols-[10rem_minmax(0,1fr)]">
          <div className="rounded-2xl border border-emerald-300/18 bg-emerald-300/5 p-4">
          <p className="text-3xl font-semibold tracking-[0.08em] text-emerald-200">
            AK
          </p>
          <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-zinc-400">
            software engineer
          </p>
        </div>
        <div className="space-y-3 text-[13px] leading-6 text-zinc-300 sm:text-sm">
          {detailLines.map((line, index) => (
            <p key={`${line}-${index}`}>{line}</p>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

export function SkillsSection({ lines }: SectionProps) {
  return (
    <SectionShell
      eyebrow="stack.scan"
      title="Engineering Stack"
      description="The tools are grouped by the kind of product problem they solve, not by buzzword density."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {lines.map((line, index) => {
          const [label, ...valueParts] = line.split(":");
          const value = valueParts.join(":").trim();

          return (
            <div
              key={`${label}-${index}`}
              className="rounded-2xl border border-white/8 bg-black/24 px-4 py-4 sm:px-5"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-cyan-200/75">
                {label.trim()}
              </p>
              <p className="mt-2 text-[13px] leading-6 text-zinc-300 sm:text-sm">
                {value}
              </p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function EducationSection({ lines }: SectionProps) {
  return (
    <SectionShell
      eyebrow="learning.log"
      title="Learning Path"
      description="Education and growth shown as an operating log: practical, current, and still moving."
    >
      <div className="space-y-2">
        {lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className="grid grid-cols-[2.75rem_minmax(0,1fr)] rounded-2xl border border-white/8 bg-black/20"
          >
            <div className="border-r border-white/8 px-3 py-3 text-xs text-emerald-300/80">
              {String(index + 1).padStart(2, "0")}
            </div>
            <p className="px-3 py-3 text-[13px] leading-6 text-zinc-300 sm:px-4 sm:text-sm">
              {line}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ProjectsSection({ lines }: SectionProps) {
  return (
    <SectionShell
      eyebrow="work.mount"
      title="Selected Work Areas"
      description="A project map showing the kinds of systems this profile is built to deliver."
    >
      <div className="space-y-3">
        {lines.map((line, index) => {
          const [slug, ...descriptionParts] = line.trim().split(/\s+/);
          const description = descriptionParts.join(" ").trim();

          return (
            <div
              key={`${slug}-${index}`}
              className="rounded-2xl border border-white/8 bg-[#0B1018] px-4 py-4 sm:px-5"
            >
              <p className="text-[11px] uppercase tracking-[0.16em] text-emerald-300/75">
                {slug}
              </p>
              <p className="mt-2 text-[13px] leading-6 text-zinc-300 sm:text-sm">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    </SectionShell>
  );
}

export function ImpactSection({ lines }: SectionProps) {
  return (
    <SectionShell
      eyebrow="impact.report"
      title="How I Create Value"
      description="The operating principles behind the work: clarity first, then reliable execution."
    >
      <div className="grid gap-3 md:grid-cols-3">
        {lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className="rounded-2xl border border-amber-300/18 bg-amber-300/5 p-4 sm:p-5"
          >
            <p className="text-[11px] text-amber-200/75">{metrics[index]?.[0]}</p>
            <p className="mt-2 text-[13px] leading-6 text-zinc-200 sm:text-sm">
              {line}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function InteractiveLauncher({ onCommandSelect }: InteractiveLauncherProps) {
  const commands = [
    "about",
    "skills",
    "education",
    "projects",
    "launch",
    "help",
    "impact",
    "sudo hire me",
    "sudo brief --role frontend",
    "sudo coffee",
    "sudo send-message",
  ];

  return (
    <SectionShell
      eyebrow="launcher"
      title="Command Palette"
      description="Run the profile like a workstation. Each command opens a focused professional view."
    >
      <div className="grid gap-2 sm:grid-cols-2">
        {commands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => onCommandSelect(command)}
            className="rounded-2xl border border-white/8 bg-black/24 px-4 py-3 text-left text-[12px] text-zinc-300 transition hover:border-emerald-300/35 hover:bg-emerald-300/8 hover:text-emerald-100"
          >
            $ {command}
          </button>
        ))}
      </div>
    </SectionShell>
  );
}

export function CvSection({ lines }: SectionProps) {
  return (
    <SectionShell
      eyebrow="sudo hire me"
      title="Candidate Brief"
      description="A hiring-oriented summary designed to answer the first screening questions quickly."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {lines.map((line, index) => (
          <div
            key={`${line}-${index}`}
            className="rounded-2xl border border-emerald-300/18 bg-emerald-300/5 px-4 py-4 sm:px-5"
          >
            <p className="text-[13px] leading-6 text-zinc-200 sm:text-sm">
              {line}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

export function ActionSection({
  title,
  lines,
  actionLabel,
  href,
}: ActionSectionProps) {
  return (
    <SectionShell
      eyebrow="secure-action"
      title={title}
      description="The terminal prepares the context. The link opens the next step with a useful subject line."
    >
      <div className="space-y-3">
        <TerminalTextBlock lines={lines} tone="success" />
        <a
          href={href}
              className="inline-flex rounded-full border border-emerald-300/28 bg-emerald-300/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-emerald-200 transition hover:bg-emerald-300/14"
        >
          {actionLabel}
        </a>
      </div>
    </SectionShell>
  );
}
