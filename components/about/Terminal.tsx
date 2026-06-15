"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ActionSection,
  AboutSection,
  CvSection,
  EducationSection,
  ImpactSection,
  InteractiveLauncher,
  ProjectsSection,
  SkillsSection,
} from "./terminal/TerminalPanels";

type PanelName =
  | "about"
  | "skills"
  | "education"
  | "projects"
  | "impact"
  | "explore"
  | "cv"
  | "coffee"
  | "message";

type HistoryEntry = {
  id: number;
  command?: string;
  output: string[];
  tone?: "system" | "success" | "muted" | "error";
  panel?: PanelName;
  completed?: boolean;
};

type CommandResult = Omit<HistoryEntry, "id" | "completed">;

type TerminalProps = {
  onCommandRun?: (command: string) => void;
};

const PROMPT = "alex@profile-os";
const TYPEWRITER_CHAR_DELAY_MS = 12;
const TYPEWRITER_LINE_DELAY_MS = 90;

const introOutput = [
  "Karobia Profile OS [interactive workstation]",
  "Run `help`, `profile`, `work`, or `sudo hire me`.",
];

const commandOutput: Record<string, string[]> = {
  help: [
    "Karobia Profile OS command index",
    "  profile                 open professional profile",
    "  stack                   inspect engineering toolkit",
    "  work                    mount selected work areas",
    "  impact                  show product value report",
    "  learning                print growth timeline",
    "  launcher                open command palette",
    "  sudo hire me            generate candidate brief",
    "  sudo brief --role frontend",
    "  sudo coffee             prepare coffee chat email",
    "  sudo send-message       prepare direct message email",
    "  clear                   clear the active terminal",
  ],
  profile: [
    "Alex Karobia",
    "Software engineer focused on polished web/mobile interfaces,",
    "practical product systems, and hardware-aware software.",
    "I work best where user experience, implementation detail,",
    "and business usefulness all need to meet in one build.",
  ],
  about: [
    "Alex Karobia",
    "Software engineer focused on polished web/mobile interfaces,",
    "practical product systems, and hardware-aware software.",
  ],
  stack: [
    "Frontend: React, Next.js, TypeScript, Tailwind CSS",
    "Mobile: React Native, navigation, product flows",
    "Experience: Motion, interaction design, responsive UI systems",
    "Systems: APIs, IoT prototypes, automation, integrations",
  ],
  skills: [
    "Frontend: React, Next.js, TypeScript, Tailwind CSS",
    "Mobile: React Native, cross-platform product flows",
    "Experience: Motion, interaction polish, UI systems",
    "Systems: IoT prototyping, API integration, automation",
  ],
  learning: [
    "Core foundation: software engineering and product implementation",
    "Current growth: advanced frontend architecture and mobile delivery",
    "Ongoing practice: IoT systems, automation, and design-quality polish",
  ],
  education: [
    "Core foundation: software engineering and product implementation",
    "Current growth: advanced frontend architecture and mobile delivery",
    "Ongoing practice: IoT systems, automation, and design-quality polish",
  ],
  work: [
    "web-platforms       Portfolio, SaaS, dashboards, product interfaces",
    "mobile-apps         React Native screens, flows, and app experiences",
    "iot-systems         Software connected to devices, data, and APIs",
    "developer-tools     Utilities that remove repeated manual work",
  ],
  projects: [
    "web-platforms       Portfolio, SaaS, dashboards, product interfaces",
    "mobile-apps         React Native screens, flows, and app experiences",
    "iot-systems         Software connected to devices, data, and APIs",
    "developer-tools     Utilities that remove repeated manual work",
  ],
  impact: [
    "Translate messy ideas into shippable interfaces and working systems.",
    "Balance visual polish with maintainable code and clear product flows.",
    "Communicate tradeoffs early so teams can move without losing quality.",
  ],
  launcher: [
    "Command palette ready.",
    "Choose a profile command or keep typing in the shell.",
  ],
  explore: ["Command palette ready.", "Choose a command or keep typing."],
  contact: [
    "email: hello@karobia.dev",
    "web:   https://karobia.dev",
    "command: sudo send-message",
  ],
  resume: [
    "Software Engineer - React Native Developer - IoT Enthusiast",
    "I build interfaces and systems that feel considered, reliable,",
    "and useful from the first interaction.",
  ],
  whoami: ["Alex Karobia"],
  pwd: ["/home/alex/profile-os"],
  ls: [
    "drwxr-xr-x  profile",
    "drwxr-xr-x  stack",
    "drwxr-xr-x  work",
    "drwxr-xr-x  impact",
    "-rw-r--r--  resume.md",
    "-rwxr-xr-x  sudo-hire-me",
  ],
  uname: ["Karobia Profile OS 2.0.0 x86_64 product-console"],
  uptime: ["up and building, load average: clarity, craft, delivery"],
  date: ["system clock: browser-local"],
  "cat resume.md": [
    "Alex Karobia",
    "Software Engineer - React Native Developer - IoT Enthusiast",
    "Focus: clean UX, reliable implementation, useful product systems.",
  ],
};

const sudoOutput: Record<string, CommandResult> = {
  "hire me": {
    command: "sudo hire me",
    output: [
      "Role fit: frontend, mobile, product engineering",
      "Strength: turns ambiguous ideas into usable shipped interfaces",
      "Stack: React, Next.js, TypeScript, Tailwind CSS, React Native",
      "Bonus: IoT prototypes, APIs, automation, practical internal tools",
      "Signal: product sense plus implementation discipline",
    ],
    tone: "success",
    panel: "cv",
  },
  "brief --role frontend": {
    command: "sudo brief --role frontend",
    output: [
      "Frontend brief generated",
      "Best fit: React/Next.js interfaces, dashboards, product pages",
      "Value: design-sensitive implementation with maintainable structure",
      "Next step: send a role description using `sudo send-message`",
    ],
    tone: "success",
    panel: "cv",
  },
  coffee: {
    command: "sudo coffee",
    output: [
      "Preparing coffee chat context...",
      "Topic ideas: product engineering, mobile apps, IoT, collaboration.",
    ],
    tone: "success",
    panel: "coffee",
  },
  "send-message": {
    command: "sudo send-message",
    output: [
      "Preparing message context...",
      "Subject: I saw your profile OS",
    ],
    tone: "success",
    panel: "message",
  },
  contact: {
    command: "sudo contact",
    output: [
      "Escalating contact privileges...",
      "email: hello@karobia.dev",
      "web: https://karobia.dev",
    ],
    tone: "success",
    panel: "message",
  },
};

function panelForCommand(command: string): PanelName | undefined {
  if (command === "profile" || command === "about") {
    return "about";
  }

  if (command === "stack" || command === "skills") {
    return "skills";
  }

  if (command === "learning" || command === "education") {
    return "education";
  }

  if (command === "work" || command === "projects") {
    return "projects";
  }

  if (command === "impact") {
    return "impact";
  }

  if (command === "launcher" || command === "explore") {
    return "explore";
  }

  return undefined;
}

function getCommandOutput(command: string): CommandResult {
  const normalizedCommand = command.trim().toLowerCase();

  if (!normalizedCommand) {
    return { command, output: [], tone: "muted" };
  }

  if (normalizedCommand === "clear") {
    return { command, output: [], tone: "system" };
  }

  if (normalizedCommand.startsWith("sudo ")) {
    const sudoCommand = normalizedCommand.replace(/^sudo\s+/, "");

    if (sudoOutput[sudoCommand]) {
      return {
        ...sudoOutput[sudoCommand],
        command,
      };
    }

    return {
      command,
      output: [
        "sudo: command rejected by profile policy",
        "Try `sudo hire me`, `sudo brief --role frontend`, or `sudo send-message`.",
      ],
      tone: "error",
    };
  }

  if (commandOutput[normalizedCommand]) {
    return {
      command,
      output: commandOutput[normalizedCommand],
      tone: normalizedCommand === "help" ? "success" : "system",
      panel: panelForCommand(normalizedCommand),
    };
  }

  return {
    command,
    output: [
      `${command}: command not found`,
      "Run `help` for the profile OS command index.",
    ],
    tone: "error",
  };
}

function outputColor(tone: HistoryEntry["tone"]) {
  if (tone === "success") {
    return "text-emerald-200/90";
  }

  if (tone === "error") {
    return "text-red-200/90";
  }

  if (tone === "muted") {
    return "text-zinc-500";
  }

  return "text-zinc-300";
}

export default function Terminal({ onCommandRun }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: 0,
      output: introOutput,
      tone: "success",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextEntryIdRef = useRef(1);
  const typingQueueRef = useRef<HistoryEntry[]>([]);
  const typingActiveRef = useRef(false);
  const animationTokenRef = useRef(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  useEffect(() => {
    return () => {
      animationTokenRef.current += 1;
      typingQueueRef.current = [];
    };
  }, []);

  function pause(ms: number) {
    return new Promise<void>((resolve) => {
      window.setTimeout(resolve, ms);
    });
  }

  async function animateEntry(entry: HistoryEntry, token: number) {
    for (let lineIndex = 0; lineIndex < entry.output.length; lineIndex += 1) {
      let revealedLine = "";

      for (const character of entry.output[lineIndex]) {
        if (animationTokenRef.current !== token) {
          return;
        }

        revealedLine += character;

        setHistory((currentHistory) =>
          currentHistory.map((currentEntry) => {
            if (currentEntry.id !== entry.id) {
              return currentEntry;
            }

            const nextOutput = [...currentEntry.output];
            nextOutput[lineIndex] = revealedLine;

            return {
              ...currentEntry,
              output: nextOutput,
            };
          }),
        );

        await pause(TYPEWRITER_CHAR_DELAY_MS);
      }

      if (lineIndex < entry.output.length - 1) {
        await pause(TYPEWRITER_LINE_DELAY_MS);
      }
    }

    if (animationTokenRef.current === token && entry.panel) {
      setHistory((currentHistory) =>
        currentHistory.map((currentEntry) => {
          if (currentEntry.id !== entry.id) {
            return currentEntry;
          }

          return {
            ...currentEntry,
            completed: true,
          };
        }),
      );
    }
  }

  async function drainTypingQueue() {
    if (typingActiveRef.current) {
      return;
    }

    typingActiveRef.current = true;
    const token = animationTokenRef.current;

    try {
      while (
        typingQueueRef.current.length > 0 &&
        animationTokenRef.current === token
      ) {
        const nextEntry = typingQueueRef.current.shift();

        if (!nextEntry) {
          continue;
        }

        await animateEntry(nextEntry, token);
      }
    } finally {
      typingActiveRef.current = false;
    }
  }

  function enqueueTypedEntry(nextEntry: CommandResult & { output: string[] }) {
    const entry: HistoryEntry = {
      ...nextEntry,
      id: nextEntryIdRef.current,
      completed: false,
      output: nextEntry.output.map(() => ""),
    };

    nextEntryIdRef.current += 1;

    setHistory((currentHistory) => [...currentHistory, entry]);
    typingQueueRef.current.push({
      ...nextEntry,
      id: entry.id,
      completed: false,
    });

    void drainTypingQueue();
  }

  function runCommand(command: string) {
    const normalizedCommand = command.trim().toLowerCase();
    const nextEntry = getCommandOutput(command);

    onCommandRun?.(command);

    if (normalizedCommand === "clear") {
      animationTokenRef.current += 1;
      typingQueueRef.current = [];
      typingActiveRef.current = false;
      setHistory([]);
      return;
    }

    enqueueTypedEntry(nextEntry);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input.trim();

    if (!command) {
      return;
    }

    runCommand(command);
    setInput("");
  }

  function renderPanel(entry: HistoryEntry) {
    if (!entry.panel || !entry.completed) {
      return null;
    }

    if (entry.panel === "about") {
      return <AboutSection lines={entry.output} />;
    }

    if (entry.panel === "skills") {
      return <SkillsSection lines={entry.output} />;
    }

    if (entry.panel === "education") {
      return <EducationSection lines={entry.output} />;
    }

    if (entry.panel === "projects") {
      return <ProjectsSection lines={entry.output} />;
    }

    if (entry.panel === "impact") {
      return <ImpactSection lines={entry.output} />;
    }

    if (entry.panel === "explore") {
      return <InteractiveLauncher onCommandSelect={runCommand} />;
    }

    if (entry.panel === "cv") {
      return <CvSection lines={entry.output} />;
    }

    if (entry.panel === "coffee") {
      return (
        <ActionSection
          title="Coffee Chat"
          lines={entry.output}
          actionLabel="Start email"
          href="mailto:hello@karobia.dev?subject=Coffee%20chat%20from%20Karobia%20Profile%20OS"
        />
      );
    }

    if (entry.panel === "message") {
      return (
        <ActionSection
          title="Direct Message"
          lines={entry.output}
          actionLabel="Send message"
          href="mailto:hello@karobia.dev?subject=Hello%20from%20Karobia%20Profile%20OS"
        />
      );
    }

    return null;
  }

  return (
    <motion.section
      key="terminal"
      className="relative h-full min-h-[38rem] cursor-text overflow-hidden border border-zinc-700/70 bg-[#05070A] font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-zinc-100 shadow-[0_26px_80px_rgba(0,0,0,0.48)]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(45,212,191,0.08),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(251,191,36,0.055),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,231,235,0.022)_1px,transparent_1px)] bg-size-[100%_4px] opacity-20" />

      <div className="relative flex h-full w-full">
        <div className="flex w-full flex-col overflow-hidden bg-[linear-gradient(180deg,rgba(10,14,22,0.94),rgba(5,7,10,0.99))]">
          <div className="h-px w-full bg-[linear-gradient(90deg,transparent,rgba(16,185,129,0.5),rgba(45,212,191,0.65),rgba(251,191,36,0.42),transparent)] opacity-80" />

          <header className="flex items-center justify-between gap-4 border-b border-zinc-700/60 bg-[#111827] px-4 py-2.5 text-[11px] tracking-[0.16em] text-zinc-400 uppercase sm:px-5">
            <div className="flex items-center gap-3 tracking-normal text-[12px] uppercase">
              <span className="inline-flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_10px_rgba(255,95,86,0.35)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_10px_rgba(255,189,46,0.28)]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] shadow-[0_0_10px_rgba(39,201,63,0.32)]" />
              </span>
              <span className="text-cyan-200/85">alex@profile-os:/workspace</span>
            </div>
            <span className="hidden text-zinc-500 sm:inline">bash - professional mode</span>
          </header>

          <div className="flex min-h-0 flex-1 flex-col px-4 py-4 sm:px-5 sm:py-5">
            <div className="flex-1 space-y-5 overflow-y-auto pb-6 text-sm leading-7 text-zinc-200 sm:text-[15px]">
              {history.map((entry, index) => {
                const panel = renderPanel(entry);

                return (
                  <div
                    key={entry.id ?? `${entry.command ?? "system"}-${index}`}
                    className="space-y-1"
                  >
                    {entry.command ? (
                      <p>
                        <span className="text-emerald-300">{PROMPT}</span>
                        <span className="text-zinc-500">:~$ </span>
                        <span className="text-zinc-100">{entry.command}</span>
                      </p>
                    ) : null}

                    {panel ? (
                      <div className="pt-2">{panel}</div>
                    ) : (
                      entry.output.map((line, lineIndex) => (
                        <p
                          key={`${entry.id}-output-${lineIndex}`}
                          className={`whitespace-pre-wrap ${outputColor(entry.tone)}`}
                        >
                          {line}
                        </p>
                      ))
                    )}
                  </div>
                );
              })}

              <form onSubmit={handleSubmit} className="flex min-w-0 items-center pt-1">
                <label htmlFor="terminal-input" className="shrink-0">
                  <span className="text-emerald-300">{PROMPT}</span>
                  <span className="text-zinc-500">:~$ </span>
                </label>
                <input
                  ref={inputRef}
                  id="terminal-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-zinc-100 caret-cyan-200 outline-none"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-label="Terminal command"
                />
              </form>
              <div ref={scrollRef} />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
