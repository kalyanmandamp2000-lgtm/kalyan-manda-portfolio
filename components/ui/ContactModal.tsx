"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useEffect, useRef } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
  phone: string;
}

export function ContactModal({ open, onClose, phone }: ContactModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const phoneHref = phone ? `tel:${phone.replace(/\s|-/g, "")}` : "#";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/85 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/15 bg-[#07111f]/95 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.7),0_0_80px_rgba(14,165,233,0.12)] sm:p-8"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.9)]" />
                Direct call
              </div>
              <h2 id="contact-dialog-title" className="max-w-md text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Call to connect.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">
                You can start a call now, or cancel and return to the portfolio.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={phoneHref}
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_18px_45px_rgba(52,211,153,0.18)] transition hover:-translate-y-0.5 hover:brightness-110"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
                <button
                  ref={cancelButtonRef}
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/[0.08]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
