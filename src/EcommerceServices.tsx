import { useState } from "react";

type Lang = "bn" | "en";

type Props = {
  lang: Lang;
  proofLogo: string;
  proofHref: string;
  onSelectOther: (id: string) => void;
};

const pick = (l: Lang, bn: string, en: string) => (l === "bn" ? bn : en);

type Item = [emoji: string, bn: string, en: string];

type Feature = {
  emoji: string;
  bn: string;
  en: string;
  line: string;
  tile: string;
  surface: string;
  items: Item[];
};

const features: Feature[] = [
  {
    emoji: "🛡️",
    bn: "ফেক অর্ডার প্রোটেকশন",
    en: "Fake Order Protection",
    line: "from-transparent via-rose-400 to-transparent",
    tile: "border-rose-400/30 bg-rose-500/10",
    surface: "from-rose-950/70 via-slate-900/90 to-slate-950/85",
    items: [
      ["📱", "একই ফোন নম্বর ব্লক", "Block same phone number"],
      ["🌐", "একই IP ব্লক", "Block same IP"],
      ["📧", "একই ইমেইল ব্লক", "Block same email"],
      ["⚡", "চেকআউটেই লাইভ সতর্কবার্তা", "Live warning at checkout"],
      ["🧾", "আগের অর্ডার দেখায়", "Shows the previous order"],
      ["💬", "WhatsApp / Messenger হেল্প বাটন", "WhatsApp / Messenger help button"],
    ],
  },
  {
    emoji: "🛒",
    bn: "ইনকমপ্লিট অর্ডার রিকভারি",
    en: "Incomplete Order Recovery",
    line: "from-transparent via-amber-400 to-transparent",
    tile: "border-amber-400/30 bg-amber-500/10",
    surface: "from-amber-950/65 via-slate-900/90 to-slate-950/85",
    items: [
      ["✍️", "টাইপ করার সাথে সাথেই সেভ", "Saved as the customer types"],
      ["💬", "WhatsApp ফলোআপ", "WhatsApp follow-up"],
      ["📧", "ইমেইল ফলোআপ", "Email follow-up"],
      ["📩", "SMS ফলোআপ", "Automatic SMS follow-up"],
      ["🔄", "এক ক্লিকে আসল অর্ডার", "One-click real order"],
    ],
  },
  {
    emoji: "🚚",
    bn: "কুরিয়ার ইন্টিগ্রেশন",
    en: "Courier Integration",
    line: "from-transparent via-orange-400 to-transparent",
    tile: "border-orange-400/30 bg-orange-500/10",
    surface: "from-orange-950/65 via-slate-900/90 to-slate-950/85",
    items: [
      ["📦", "ড্যাশবোর্ড থেকেই কুরিয়ারে পাঠান", "Send to courier from dashboard"],
      ["⚡", "এক-ক্লিক অর্ডার প্রসেসিং", "One-click order processing"],
      ["✅", "সময় বাঁচে, ভুল কমে", "Saves time, fewer mistakes"],
    ],
  },
  {
    emoji: "🔔",
    bn: "Telegram অ্যালার্ট",
    en: "Telegram Alerts",
    line: "from-transparent via-sky-400 to-transparent",
    tile: "border-sky-400/30 bg-sky-500/10",
    surface: "from-sky-950/70 via-slate-900/90 to-slate-950/85",
    items: [
      ["🆕", "নতুন অর্ডার (COD সহ)", "New order (incl. COD)"],
      ["🚫", "ব্লক হওয়া অর্ডার", "Blocked order"],
      ["🛒", "ইনকমপ্লিট অর্ডার", "Incomplete order"],
      ["🔁", "বারবার ছেড়ে গেলে রিপিট চিহ্ন", "Repeat-abandoner flag"],
      ["👥", "আলাদা গ্রুপে পাঠানো যায়", "Send to separate groups"],
    ],
  },
  {
    emoji: "📊",
    bn: "Facebook Pixel ও CAPI",
    en: "Facebook Pixel & CAPI",
    line: "from-transparent via-blue-400 to-transparent",
    tile: "border-blue-400/30 bg-blue-500/10",
    surface: "from-blue-950/70 via-slate-900/90 to-slate-950/85",
    items: [
      ["🎯", "একাধিক Pixel", "Multiple Pixels"],
      ["🏷️", "প্রোডাক্ট অনুযায়ী আলাদা Pixel", "Separate Pixel per product"],
      ["🔗", "Browser + Server ইভেন্ট মেলানো", "Browser + Server events matched"],
      ["♻️", "ডুপ্লিকেট Purchase নেই", "No duplicate Purchases"],
    ],
  },
  {
    emoji: "📍",
    bn: "সহজ চেকআউট",
    en: "Streamlined Checkout",
    line: "from-transparent via-emerald-400 to-transparent",
    tile: "border-emerald-400/30 bg-emerald-500/10",
    surface: "from-emerald-950/65 via-slate-900/90 to-slate-950/85",
    items: [
      ["🗺️", "অটো জেলা-থানা সিলেক্টর", "Auto district & thana selector"],
      ["💰", "অটোমেটিক জেলা-ভিত্তিক ডেলিভারি চার্জ", "Automatic district-based delivery charge"],
    ],
  },
  {
    emoji: "🧾",
    bn: "অর্ডার ড্যাশবোর্ড ও ইনভয়েস",
    en: "Order Dashboard & Invoice",
    line: "from-transparent via-violet-400 to-transparent",
    tile: "border-violet-400/30 bg-violet-500/10",
    surface: "from-violet-950/70 via-slate-900/90 to-slate-950/85",
    items: [
      ["🖥️", "কাস্টম ডিজাইন করা সহজ ড্যাশবোর্ড", "Custom-designed easy dashboard"],
      ["📋", "সব অর্ডার এক জায়গায়", "All orders in one place"],
      ["🖨️", "A4 প্রিন্ট ইনভয়েস", "A4 print invoice"],
      ["🏢", "নিজের লোগো ও ঠিকানা", "Your own logo & address"],
    ],
  },
  {
    emoji: "🚀",
    bn: "স্টোর সেটআপ",
    en: "Store Setup",
    line: "from-transparent via-cyan-400 to-transparent",
    tile: "border-cyan-400/30 bg-cyan-500/10",
    surface: "from-cyan-950/65 via-slate-900/90 to-slate-950/85",
    items: [
      ["📱", "মোবাইল-ফ্রেন্ডলি ডিজাইন", "Mobile-friendly design"],
      ["⚡", "দ্রুত লোডিং", "Fast loading"],
      ["🔍", "SEO-রেডি", "SEO-ready"],
      ["💳", "পেমেন্ট ও শিপিং সেটআপ", "Payment & shipping setup"],
      ["🛠️", "লঞ্চের পর সাপোর্ট", "Post-launch support"],
    ],
  },
];

const others: { id: string; emoji: string; bn: string; en: string }[] = [
  { id: "business", emoji: "🏢", bn: "বিজনেস ও কর্পোরেট", en: "Business & Corporate" },
  { id: "blog", emoji: "📰", bn: "ব্লগ ও নিউজ", en: "Blog & News" },
  { id: "portfolio", emoji: "👤", bn: "পোর্টফোলিও ও পার্সোনাল", en: "Portfolio & Personal" },
  { id: "landing", emoji: "🚀", bn: "ল্যান্ডিং পেজ", en: "Landing Pages" },
  { id: "custom-wp", emoji: "🎨", bn: "কাস্টম WordPress ডিজাইন", en: "Custom WordPress Design" },
  { id: "maintenance", emoji: "🛠️", bn: "মেইনটেন্যান্স ও সাপোর্ট", en: "Maintenance & Support" },
  { id: "any-website", emoji: "🌐", bn: "যেকোনো ধরনের ওয়েবসাইট", en: "Any Type of Website" },
  { id: "vibe-coding", emoji: "💻", bn: "ভাইব কাস্টম কোডিং", en: "Vibe Custom Coding" },
];

export default function EcommerceServices({ lang, proofLogo, proofHref, onSelectOther }: Props) {
  const [expandedFeatures, setExpandedFeatures] = useState<Set<string>>(() => new Set());
  const [otherServicesOpen, setOtherServicesOpen] = useState(false);

  const toggleFeature = (featureId: string) => {
    setExpandedFeatures((current) => {
      const next = new Set(current);
      if (next.has(featureId)) next.delete(featureId);
      else next.add(featureId);
      return next;
    });
  };

  return (
    <div className="mt-10">
      <div className="mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-200">
          🛒 {pick(lang, "কাস্টম ডিজাইনের ই-কমার্স ওয়েবসাইট", "Custom-Designed E-commerce Websites")}
        </div>
        <div className="mt-4 rounded-2xl border border-cyan-400/20 bg-slate-900/45 px-3 py-5 text-center shadow-[0_0_40px_rgba(34,211,238,0.05)] sm:px-5 sm:py-7">
          <h3 className="whitespace-normal font-serif text-lg font-semibold leading-snug text-white sm:text-2xl lg:whitespace-nowrap lg:text-3xl">
          {lang === "bn" ? (
            "অনলাইন শপের জন্য যা যা লাগে, সব এক জায়গায় 🎯"
          ) : (
            <>
              A <span className="font-bold text-emerald-300">Custom Store</span> Designed to Turn Visitors into Customers. 🎯
            </>
          )}
          </h3>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            {lang === "bn"
              ? "কনভার্সন-কেন্দ্রিক ডিজাইন, স্মার্ট অটোমেশন ও উন্নত ফিচার—সবই আপনার ব্র্যান্ড ও ব্যবসার লক্ষ্য অনুযায়ী তৈরি।"
              : "Conversion-focused design, smart automation, and advanced features—all built around your brand and business goals."}
          </p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <h4 className="whitespace-nowrap font-serif text-sm font-semibold text-white sm:whitespace-normal sm:text-2xl">
          {pick(lang, "⚡ ব্যবসার প্রবৃদ্ধির জন্য শক্তিশালী ফিচার", "⚡ Powerful Features, Built for Growth")}
        </h4>
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, index) => {
          const featureId = `ecommerce-feature-${index}`;
          const title = pick(lang, f.bn, f.en);
          const isExpanded = expandedFeatures.has(featureId);

          return (
            <div key={f.en} className={"relative overflow-hidden rounded-[24px] border border-white/15 bg-gradient-to-br p-5 shadow-[0_12px_32px_rgba(0,0,0,0.2)] backdrop-blur-xl " + f.surface}>
              <div className={"absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r " + f.line} />
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={`${featureId}-details`}
                onClick={() => toggleFeature(featureId)}
                className="flex w-full items-center gap-3 text-left sm:hidden"
              >
                <span className={"grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-2xl " + f.tile}>{f.emoji}</span>
                <span className="flex-1 font-serif text-[17px] font-semibold leading-tight text-white">{title}</span>
                <svg className="h-5 w-5 shrink-0 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  {!isExpanded && <path d="M12 5v14" />}
                </svg>
              </button>
              <div className="hidden items-center gap-3 sm:flex">
                <span className={"grid h-12 w-12 shrink-0 place-items-center rounded-2xl border text-2xl " + f.tile}>{f.emoji}</span>
                <h4 className="font-serif text-[17px] font-semibold leading-tight text-white">{title}</h4>
              </div>
              <ul id={`${featureId}-details`} className={`${isExpanded ? "block" : "hidden"} mt-4 space-y-2 sm:block`}>
                {f.items.map(([emoji, bn, en]) => (
                  <li key={en} className="flex items-start gap-2 text-[13px] leading-5 text-slate-300">
                    <span className="shrink-0">{emoji}</span>
                    <span>{pick(lang, bn, en)}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-6 text-slate-300 sm:text-base">
        {pick(lang, "আরও কিছু প্রয়োজন হলে, আপনার ব্যবসার জন্য সেটিও তৈরি করে দেওয়া যাবে।", "Need anything else? We can build it around your business needs.")}
      </p>

      <div className="mt-6 flex justify-center">
        <a
          href={proofHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 py-1.5 pl-1.5 pr-4 text-[13px] text-slate-200 backdrop-blur transition hover:border-emerald-400/40"
        >
          <img src={proofLogo} alt="" className="h-8 w-8 rounded-full object-cover" />
          <span>💼 {pick(lang, "আমার সাম্প্রতিক ক্লায়েন্টের কাজ", "My recent client work")}</span>
          <span className="font-semibold text-emerald-300">{pick(lang, "দেখুন ↗", "View ↗")}</span>
        </a>
      </div>

      <div className="mt-8 flex justify-center">
        <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5">
          💬 {pick(lang, "আমার স্টোরের জন্য কথা বলি", "Let's talk about my store")}
        </a>
      </div>

      <div className="mt-12 rounded-[24px] border border-cyan-300/20 bg-cyan-400/[0.06] p-5 sm:p-6">
        <button
          type="button"
          aria-expanded={otherServicesOpen}
          aria-controls="other-services-content"
          onClick={() => setOtherServicesOpen((open) => !open)}
          className="flex w-full items-center justify-center gap-2 text-center text-sm font-semibold text-white sm:hidden"
        >
          ➕ {pick(lang, "এছাড়াও আমি ডেভেলপ করি", "Also I develop")}
          <svg className={`h-4 w-4 transition-transform ${otherServicesOpen ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
        <div className="hidden text-center text-sm font-semibold text-white sm:block">
          ➕ {pick(lang, "এছাড়াও আমি ডেভেলপ করি", "Also I develop")}
        </div>
        <div id="other-services-content" className={`${otherServicesOpen ? "grid" : "hidden"} mt-4 w-full grid-cols-2 gap-2 max-[359px]:grid-cols-1 sm:flex sm:flex-wrap sm:justify-center`}>
          {others.map((other) => (
            <button
              key={other.id}
              type="button"
              onClick={() => onSelectOther(other.id)}
              className="inline-flex min-h-10 min-w-0 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-2 py-2 text-center text-[12px] leading-tight text-slate-200 transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white min-[360px]:px-3 min-[360px]:text-[13px] min-[420px]:px-4 sm:min-h-0 sm:min-w-fit sm:px-4 sm:text-left sm:text-[13px] sm:leading-normal"
            >
              <span className="shrink-0">{other.emoji}</span>
              <span className="min-w-0 break-words sm:whitespace-nowrap">{pick(lang, other.bn, other.en)}</span>
            </button>
          ))}
        </div>
        <p className={`${otherServicesOpen ? "block" : "hidden"} mt-3 text-center text-[12px] text-slate-500 sm:block`}>
          👆 {pick(lang, "যেকোনোটায় ক্লিক করলে সংক্ষেপে বিস্তারিত দেখা যাবে", "Tap any item for a quick summary")}
        </p>
      </div>
    </div>
  );
}