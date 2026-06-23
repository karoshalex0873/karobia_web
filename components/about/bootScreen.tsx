"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Terminal from "./Terminal";

const LINE_DELAY_MS = 240;
const READY_DELAY_MS = 620;

type BootStatus = "checking" | "booting" | "terminal";

type BootScreenProps = {
  bootLines: string[];
};

type BootLoaderProps = {
  lines: string[];
};

function useBootStatus(lineCount: number) {
  const [status, setStatus] = useState<BootStatus>("checking");

  useEffect(() => {
    let transitionTimer: number | undefined;

    const checkTimer = window.setTimeout(() => {
      setStatus("booting");

      const finalLineDelay = Math.max(lineCount - 1, 0) * LINE_DELAY_MS;
      transitionTimer = window.setTimeout(() => {
        setStatus("terminal");
      }, finalLineDelay + READY_DELAY_MS + 320);
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

function BootLoader({ lines }: BootLoaderProps) {
  return (
    <motion.section
      key="bootloader"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-6 font-[SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-zinc-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.38, ease: "easeInOut" }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.12),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(45,212,191,0.08),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_24%)]" />

      <div className="relative w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-zinc-500/90">
          <span>karobia.dev</span>
          <span>secure session</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.8fr)] lg:items-center">
          <div className="max-w-md space-y-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-emerald-300/80">
              boot sequence
            </p>
            <h1 className="max-w-sm text-4xl font-medium tracking-[-0.05em] text-zinc-50 sm:text-5xl">
              Alex Karobia
            </h1>
            <p className="max-w-sm text-sm leading-7 text-zinc-400 sm:text-base">
              The workstation is waking up and preparing the interactive
              portfolio shell.
            </p>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="space-y-3 text-[13px] leading-6 text-zinc-300">
                {lines.map((line, index) => (
                  <motion.div
                    key={`${line}-${index}`}
                    className="flex gap-3"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: (index * LINE_DELAY_MS) / 1000,
                      duration: 0.32,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="w-8 shrink-0 text-emerald-300/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-zinc-200/88">{line}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,12,16,0.92),rgba(4,6,8,0.96))] p-3 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl sm:p-4">
            <div className="rounded-[1.45rem] border border-white/10 bg-black/20 p-5">
              <div className="mb-5 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <div className="ml-3 h-px flex-1 bg-gradient-to-r from-white/10 via-white/0 to-white/10" />
              </div>

              <div className="space-y-2 text-[12px] leading-6 text-zinc-400 sm:text-sm">
                <p className="text-zinc-200">establishing shell context...</p>
                <p>loading terminal frame, prompt state, and history buffer.</p>
                <p>seamless handoff in progress.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function BootScreen({ bootLines }: BootScreenProps) {
  const status = useBootStatus(bootLines.length);

  if (status === "checking") {
    return <section className="min-h-screen bg-[#05070a]" aria-label="Loading" />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={status}
        className="relative min-h-screen overflow-hidden px-4 py-4 text-zinc-100 sm:px-6 sm:py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(52,211,153,0.08),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_22%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col justify-center">
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-zinc-500/90">
            <span>alex karobia</span>
            <span>portfolio terminal</span>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,15,0.92),rgba(4,6,8,0.98))] shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            {status === "booting" ? <BootLoader lines={bootLines} /> : null}

            <motion.div
              initial={{ opacity: 0, scale: 0.985, filter: "blur(5px)" }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: status === "booting" ? "blur(2px)" : "blur(0px)",
              }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/40 to-transparent" />
              <div className="px-3 pb-3 pt-3 sm:px-4 sm:pb-4 sm:pt-4">
                <Terminal />
              </div>
            </motion.div>
          </div>

          <p className="mt-4 max-w-xl text-[11px] leading-6 tracking-[0.16em] text-zinc-500/85">
            Type commands like help, about, skills, education, projects,
            launch, coffee, or contact. The shell is the portfolio.
          </p>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
