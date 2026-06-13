"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Terminal from "./Terminal";

const LINE_DELAY_MS = 400;
const READY_DELAY_MS = 800;

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
      }, finalLineDelay + READY_DELAY_MS + 500);
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
      className="relative min-h-screen overflow-hidden bg-[#0B0F17] px-4 py-5 font-[JetBrains_Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace] text-[#E5E7EB] sm:px-8 sm:py-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.992, filter: "blur(5px)" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-[#E5E7EB]"
        initial={{ opacity: 0.08 }}
        animate={{ opacity: [0.08, 0, 0.035, 0] }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(229,231,235,0.06),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_18%,rgba(0,0,0,0.26))]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(229,231,235,0.035)_1px,transparent_1px)] bg-[length:100%_4px] opacity-20" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#E5E7EB]/[0.035] to-transparent" />

      <div className="relative flex min-h-[calc(100vh-2.5rem)] w-full flex-col">
        <motion.div
          className="mb-12 text-[11px] leading-6 text-[#E5E7EB]/45 sm:text-xs"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.42, ease: "easeOut" }}
        >
          <p>karobia linux x86_64</p>
          <p>boot device: /dev/nvme0n1p2</p>
        </motion.div>

        <div className="flex flex-1 items-center">
          <div className="w-full max-w-5xl">
            <div className="space-y-2.5 sm:space-y-3">
              {lines.map((line, index) => (
                <motion.div
                  key={line}
                  className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 text-[13px] leading-6 text-[#E5E7EB]/90 sm:grid-cols-[5.25rem_minmax(0,1fr)_4.5rem] sm:text-base sm:leading-7"
                  initial={{ opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: (index * LINE_DELAY_MS) / 1000,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="font-normal text-[#E5E7EB]/35">
                    [{(0.184 + index * 0.317).toFixed(3)}]
                  </span>
                  <span className="min-w-0 break-words">{line}</span>
                  <span className="hidden text-right text-[#39FF88]/75 sm:block">
                    [ OK ]
                  </span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 h-px w-full origin-left bg-[#E5E7EB]/20"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{
                delay: ((lines.length - 1) * LINE_DELAY_MS) / 1000 + 0.25,
                duration: 0.45,
                ease: "easeOut",
              }}
            />
          </div>
        </div>

        <motion.div
          className="mt-12 flex items-end justify-between text-[11px] leading-5 text-[#E5E7EB]/35 sm:text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: ((lines.length - 1) * LINE_DELAY_MS) / 1000 + 0.45,
            duration: 0.35,
          }}
        >
          <span>tty1</span>
          <span>switching to karobia.dev shell</span>
        </motion.div>
      </div>
    </motion.section>
  );
}


export default function BootScreen({ bootLines }: BootScreenProps) {
  const status = useBootStatus(bootLines.length);

  if (status === "checking") {
    return (
      <section className="min-h-screen bg-[#0B0F17]" aria-label="Loading" />
    );
  }

  return (
    <AnimatePresence mode="wait">
      {status === "booting" ? (
        <BootLoader lines={bootLines} />
      ) : (
        <Terminal />
      )}
    </AnimatePresence>
  );
}
