"use client";

import { Download } from "lucide-react";
import { motion } from "framer-motion";

import { trackEvent } from "@/lib/analytics-client";

interface ResumeDownloadButtonProps {
  source: "hero" | "navigation" | "contact";
  className?: string;
}

export function ResumeDownloadButton({ source, className = "" }: ResumeDownloadButtonProps) {
  const handleDownload = async () => {
    await trackEvent("resume_download", { source });
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Kalyan-Manda-Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={handleDownload}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-full border border-sky-400/40 bg-sky-500/15 px-4 py-2.5 text-sm font-medium text-sky-50 shadow-[0_0_28px_rgba(56,189,248,0.15)] transition hover:border-sky-300/70 hover:bg-sky-500/25 sm:px-5 sm:py-3",
        className,
      ].join(" ")}
    >
      <Download className="h-4 w-4" />
      Resume
    </motion.button>
  );
}
