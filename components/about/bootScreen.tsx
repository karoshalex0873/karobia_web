"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Terminal from "./Terminal";

const LINE_DELAY_MS = 320;
const READY_DELAY_MS = 650;

type BootStatus = "checking" | "booting" | "terminal";

type BootScreenProps = {
  bootLines: string[];
};

type BootLoaderProps = {
  lines: string[];
};

const profileStats = [
  ["focus", "web / mobile / IoT"],
  ["mode", "product engineer"],
  ["signal", "craft + delivery"],
];

const quickCommands = [
  "profile",
  "stack",
  "work",
  "impact",
  "sudo hire me",
  "sudo brief --role frontend",
];

const activityLog = [
  "Mapped portfolio into command-driven profile OS",
  "Prioritized recruiter/client scanning speed",
  "Kept the terminal as the primary interaction model",
  "Added professional proof points without losing personality",
];

function useBootStatus(lineCount: number) {
  const [status, setStatus] = useState<BootStatus>("checking");

  useEffect(() => {
    let transitionTimer: number | undefined;

    const checkTimer = window.setTimeout(() => {
      setStatus("booting");

      const finalLineDelay = Math.max(lineCount - 1, 0) * LINE_DELAY_MS;
      transitionTimer = window.setTimeout(() => {
        setStatus("terminal");
      }, finalLineDelay + READY_DELAY_MS + 450);
    }, 0);

    return () => {
      window.clearTimeout(checkTimer);

      if (transitionTimer) {
        window.clearTimeout(transitionTimer);
      }
    };
  }, [lineCount]);

  return status;
}

export function BootLoader({ lines }: BootLoaderProps) {
  return (
    <motion.section
      key="bootloader"
      className="relative min-h-screen overflow-hidden bg-[#05070A] px-4 py-5 font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-zinc-100 sm:px-8 sm:py-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.992, filter: "blur(5px)" }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,231,235,0.028)_1px,transparent_1px)] bg-[length:100%_4px] opacity-25" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(45,212,191,0.08),transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_18%,rgba(0,0,0,0.28))]" />

      <div className="relative flex min-h-[calc(100vh-2.5rem)] w-full flex-col">
        <motion.div
          className="flex items-center justify-between border-b border-zinc-700/55 pb-4 text-[11px] uppercase tracking-[0.18em] text-zinc-500 sm:text-xs"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35, ease: "easeOut" }}
        >
          <span>karobia profile os</span>
          <span className="text-emerald-300/70">secure boot</span>
        </motion.div>

        <div className="flex flex-1 items-center">
          <div className="w-full max-w-5xl">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan-200/70">
                loading professional environment
              </p>
              <h1 className="mt-3 text-3xl leading-tight text-zinc-50 sm:text-5xl">
                Alex Karobia
              </h1>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {lines.map((line, index) => (
                <motion.div
                  key={`${line}-${index}`}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 border-b border-zinc-800/70 pb-2 text-[13px] leading-6 text-zinc-300 sm:grid-cols-[5.25rem_minmax(0,1fr)_4.5rem] sm:text-base sm:leading-7"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (index * LINE_DELAY_MS) / 1000,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="font-normal text-zinc-600">
                    [{(0.184 + index * 0.317).toFixed(3)}]
                  </span>
                  <span className="min-w-0 break-words">{line}</span>
                  <span className="hidden text-right text-emerald-300/75 sm:block">
                    [ OK ]
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-12 flex items-end justify-between text-[11px] leading-5 text-zinc-500 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: ((lines.length - 1) * LINE_DELAY_MS) / 1000 + 0.4,
            duration: 0.3,
          }}
        >
          <span>tty1</span>
          <span>starting profile workstation</span>
        </motion.div>
      </div>
    </motion.section>
  );
}

function IdentityRail() {
  return (
    <aside className="border border-zinc-700/70 bg-[#090D13]/92 font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-zinc-100">
      <div className="border-b border-zinc-700/60 p-5">
        <div className="flex h-20 w-20 items-center justify-center border border-emerald-300/25 bg-emerald-300/[0.055] text-3xl font-semibold tracking-[0.08em] text-emerald-200">
          AK
        </div>
        <h2 className="mt-5 text-2xl leading-tight">Alex Karobia</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Software engineer building polished interfaces, mobile experiences,
          and practical systems.
        </p>
      </div>

      <div className="divide-y divide-zinc-800/80">
        {profileStats.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[5rem_minmax(0,1fr)]">
            <span className="border-r border-zinc-800/80 px-4 py-3 text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              {label}
            </span>
            <span className="px-4 py-3 text-sm text-zinc-300">{value}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-700/60 p-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">
          availability
        </p>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Open to product-focused roles, collaborations, and serious builds
          where quality matters.
        </p>
      </div>
    </aside>
  );
}

function OperationsRail({ activeCommand }: { activeCommand: string }) {
  return (
    <aside className="border border-zinc-700/70 bg-[#090D13]/92 font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-zinc-100">
      <header className="border-b border-zinc-700/60 px-4 py-3">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          operations
        </p>
        <p className="mt-2 break-words text-sm text-emerald-200">
          last command: {activeCommand}
        </p>
      </header>

      <section className="border-b border-zinc-700/60 p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-cyan-200/70">
          fast paths
        </p>
        <div className="mt-3 grid gap-2">
          {quickCommands.map((command) => (
            <div
              key={command}
              className="border border-zinc-800/80 bg-black/20 px-3 py-2 text-xs text-zinc-300"
            >
              $ {command}
            </div>
          ))}
        </div>
      </section>

      <section className="p-4">
        <p className="text-[11px] uppercase tracking-[0.18em] text-amber-200/75">
          product log
        </p>
        <div className="mt-3 space-y-3">
          {activityLog.map((line, index) => (
            <div
              key={line}
              className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 text-sm leading-6 text-zinc-400"
            >
              <span className="text-zinc-600">{String(index + 1).padStart(2, "0")}</span>
              <span>{line}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

function ProfileWorkstation() {
  const [activeCommand, setActiveCommand] = useState("boot");

  return (
    <motion.main
      key="workstation"
      className="relative min-h-screen overflow-hidden bg-[#05070A] px-4 py-4 text-zinc-100 sm:px-6 sm:py-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,231,235,0.022)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(45,212,191,0.095),transparent_30%),radial-gradient(circle_at_88%_12%,rgba(251,191,36,0.06),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_22%)]" />

      <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] max-w-[92rem] flex-col gap-4 sm:min-h-[calc(100vh-2.5rem)]">
        <header className="flex flex-wrap items-center justify-between gap-3 border border-zinc-700/70 bg-[#111827]/95 px-4 py-3 font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-zinc-300">karobia profile os</span>
          <span className="text-cyan-200/72">workspace / professional console</span>
          <span className="text-emerald-300/75">online</span>
        </header>

        <div className="grid flex-1 gap-4 xl:grid-cols-[18rem_minmax(0,1fr)_21rem]">
          <IdentityRail />
          <Terminal onCommandRun={setActiveCommand} />
          <OperationsRail activeCommand={activeCommand} />
        </div>
      </div>
    </motion.main>
  );
}

export default function BootScreen({ bootLines }: BootScreenProps) {
  const status = useBootStatus(bootLines.length);

  if (status === "checking") {
    return (
      <section className="min-h-screen bg-[#05070A]" aria-label="Loading" />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {status === "booting" ? (
        <BootLoader lines={bootLines} />
      ) : (
        <ProfileWorkstation />
      )}
    </AnimatePresence>
  );
}
