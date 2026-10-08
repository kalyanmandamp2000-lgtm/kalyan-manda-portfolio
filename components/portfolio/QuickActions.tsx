"use client";

import { Download, Mail, Phone } from "lucide-react";
import { useState } from "react";

import { ContactModal } from "@/components/ui/ContactModal";
import { resume } from "@/lib/resume";

export function QuickActions() {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? resume.personal.email ?? "";
  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE ?? resume.personal.phone ?? "";
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <div className="fixed right-3 top-3 z-50 flex items-center gap-1.5 sm:right-5 sm:top-5 sm:gap-2" aria-label="Portfolio quick actions">
        <a href={email ? `mailto:${email}` : "#"} className="quick-action border-sky-400/20 bg-slate-950/70 px-2.5 text-[8px] shadow-[0_0_20px_rgba(56,189,248,0.08)] sm:px-3 sm:text-[10px]" aria-label="Email the portfolio owner"><Mail className="h-3.5 w-3.5" /><span>Email</span></a>
        <button type="button" onClick={() => setContactOpen(true)} className="quick-action cursor-pointer border-emerald-400/20 bg-emerald-500/5 px-2.5 text-[8px] shadow-[0_0_20px_rgba(16,185,129,0.08)] sm:px-3 sm:text-[10px]" aria-label="Open direct call options"><Phone className="h-3.5 w-3.5" /><span>Let&apos;s Talk</span></button>
        <button type="button" onClick={() => { const link = document.createElement("a"); link.href = "/resume.pdf"; link.download = "Kalyan-Manda-Resume.pdf"; document.body.appendChild(link); link.click(); link.remove(); }} className="quick-action cursor-pointer border-violet-400/20 bg-violet-500/5 px-2.5 text-[8px] shadow-[0_0_20px_rgba(168,85,247,0.08)] sm:px-3 sm:text-[10px]" aria-label="Download resume"><Download className="h-3.5 w-3.5" /><span>Resume</span></button>
      </div>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} phone={phone} />
    </>
  );
}
