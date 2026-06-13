"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type HistoryEntry = {
  command?: string;
  output: string[];
  tone?: "system" | "success" | "muted" | "error";
};

const PROMPT = "alex@dev";

const introOutput = [
  "Welcome to karobia.dev interactive shell.",
  "Type `help` to explore the portfolio.",
];

const commandOutput: Record<string, string[]> = {
  help: [
    "Portfolio commands:",
    "  about      Who I am and what I build",
    "  skills     Core frontend, mobile, and systems stack",
    "  projects   Selected project areas",
    "  contact    Ways to reach me",
    "  resume     Quick professional summary",
    "  clear      Clear this shell",
  ],
  about: [
    "Alex Karobia",
    "Software Engineer building polished interfaces, mobile apps,",
    "developer tools, and IoT-connected systems.",
  ],
  skills: [
    "Frontend:   React, Next.js, TypeScript, Tailwind CSS",
    "Mobile:     React Native, cross-platform product flows",
    "Motion:     Framer Motion, interaction polish, UI systems",
    "Systems:    IoT prototyping, API integration, automation",
  ],
  projects: [
    "projects/web       Modern portfolio and product interfaces",
    "projects/mobile    React Native app experiences",
    "projects/iot       Software connected to physical devices",
    "projects/tools     Practical utilities and workflow systems",
  ],
  contact: [
    "email: hello@karobia.dev",
    "web:   https://karobia.dev",
    "hint:  replace these with your live links when ready",
  ],
  resume: [
    "Software Engineer - React Native Developer - IoT Enthusiast",
    "I care about clean UX, reliable implementation, and interfaces",
    "that feel intentional from the first second.",
  ],
  whoami: ["Alex Karobia"],
  pwd: ["/home/alex/karobia.dev"],
  ls: ["about  skills  projects  contact  resume"],
};

function getCommandOutput(command: string): HistoryEntry {
  const normalizedCommand = command.trim().toLowerCase();

  if (!normalizedCommand) {
    return { command, output: [], tone: "muted" };
  }

  if (normalizedCommand === "clear") {
    return { command, output: [], tone: "system" };
  }

  if (commandOutput[normalizedCommand]) {
    return {
      command,
      output: commandOutput[normalizedCommand],
      tone: normalizedCommand === "help" ? "success" : "system",
    };
  }

  return {
    command,
    output: [
      `${command}: command not found`,
      "Type `help` to see available portfolio commands.",
    ],
    tone: "error",
  };
}

function outputColor(tone: HistoryEntry["tone"]) {
  if (tone === "success") {
    return "text-[#39FF88]/85";
  }

  if (tone === "error") {
    return "text-[#ff6b6b]/85";
  }

  if (tone === "muted") {
    return "text-[#E5E7EB]/45";
  }

  return "text-[#E5E7EB]/72";
}

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      output: introOutput,
      tone: "success",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const command = input.trim();

    if (!command) {
      return;
    }

    const nextEntry = getCommandOutput(command);

    if (command.toLowerCase() === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((currentHistory) => [...currentHistory, nextEntry]);
    setInput("");
  }

  return (
    <motion.section
      key="terminal"
      className="relative min-h-screen cursor-text overflow-hidden bg-[#070B12] px-4 py-5 font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-[#E5E7EB] sm:px-8 sm:py-7"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.13),transparent_28%),radial-gradient(circle_at_82%_0%,rgba(57,255,136,0.09),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,231,235,0.025)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20" />

      <div className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] max-w-6xl flex-col">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#22D3EE]/15 pb-4 text-xs text-[#E5E7EB]/48">
          <span className="text-[#22D3EE]/85">karobia.dev shell</span>
          <span>interactive portfolio</span>
        </header>

        <div className="mb-8 grid gap-2 text-xs text-[#E5E7EB]/45 sm:grid-cols-3">
          <p>
            <span className="text-[#39FF88]/80">status</span> online
          </p>
          <p>
            <span className="text-[#39FF88]/80">user</span> alex
          </p>
          <p>
            <span className="text-[#39FF88]/80">host</span> dev
          </p>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto pb-6 text-sm leading-7 text-[#E5E7EB]/90 sm:text-[15px]">
          {history.map((entry, index) => (
            <div key={`${entry.command ?? "system"}-${index}`} className="space-y-1">
              {entry.command ? (
                <p>
                  <span className="text-[#39FF88]">{PROMPT}</span>
                  <span className="text-[#E5E7EB]/45">:~$ </span>
                  <span className="text-[#E5E7EB]">{entry.command}</span>
                </p>
              ) : null}

              {entry.output.map((line) => (
                <p
                  key={`${entry.command ?? "intro"}-${line}`}
                  className={`whitespace-pre-wrap ${outputColor(entry.tone)}`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex min-w-0 items-center">
            <label htmlFor="terminal-input" className="shrink-0">
              <span className="text-[#39FF88]">{PROMPT}</span>
              <span className="text-[#E5E7EB]/45">:~$ </span>
            </label>
            <input
              ref={inputRef}
              id="terminal-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[#E5E7EB] caret-[#22D3EE] outline-none"
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-label="Terminal command"
            />
          </form>
          <div ref={scrollRef} />
        </div>
      </div>
    </motion.section>
  );
}
