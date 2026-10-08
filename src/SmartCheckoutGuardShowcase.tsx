import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Lang = "bn" | "en";
type Props = { lang: Lang };
type T = [bn: string, en: string];

const pick = (l: Lang, [bn, en]: T) => (l === "bn" ? bn : en);

type Tone = {
  text: string;
  box: string;
  active: string;
  line: string;
  bar: string;
};

const tones: Record<string, Tone> = {
  rose: { text: "text-rose-300", box: "border-rose-400/30 bg-rose-500/10", active: "border-rose-400/50 bg-rose-500/10", line: "from-transparent via-rose-400 to-transparent", bar: "bg-rose-400" },
  amber: { text: "text-amber-300", box: "border-amber-400/30 bg-amber-500/10", active: "border-amber-400/50 bg-amber-500/10", line: "from-transparent via-amber-400 to-transparent", bar: "bg-amber-400" },
  sky: { text: "text-sky-300", box: "border-sky-400/30 bg-sky-500/10", active: "border-sky-400/50 bg-sky-500/10", line: "from-transparent via-sky-400 to-transparent", bar: "bg-sky-400" },
  blue: { text: "text-blue-300", box: "border-blue-400/30 bg-blue-500/10", active: "border-blue-400/50 bg-blue-500/10", line: "from-transparent via-blue-400 to-transparent", bar: "bg-blue-400" },
  emerald: { text: "text-emerald-300", box: "border-emerald-400/30 bg-emerald-500/10", active: "border-emerald-400/50 bg-emerald-500/10", line: "from-transparent via-emerald-400 to-transparent", bar: "bg-emerald-400" },
  violet: { text: "text-violet-300", box: "border-violet-400/30 bg-violet-500/10", active: "border-violet-400/50 bg-violet-500/10", line: "from-transparent via-violet-400 to-transparent", bar: "bg-violet-400" },
};

type Line = { k: "head" | "text" | "muted" | "chip" | "btn" | "ok" | "bad"; t: T };

type Mod = {
  id: string;
  emoji: string;
  tone: keyof typeof tones;
  name: T;
  short: T;
  desc: T;
  features: T[];
  previewTitle: T;
  preview: Line[];
};

const modules: Mod[] = [
  {
    id: "blocking",
    emoji: "🛡️",
    tone: "rose",
    name: ["ফেক অর্ডার ব্লকিং", "Fake Order Blocking"],
    short: ["ফোন, IP, ইমেইল ধরে ব্লক", "Blocks by phone, IP, email"],
    desc: [
      "একই ফোন, IP বা ইমেইল থেকে বারবার ফেক বা প্র্যাংক COD অর্ডার এলে, ডেলিভারি চার্জ খরচ হওয়ার আগেই অর্ডার আটকে দেয়। কাস্টমার চেকআউটে ফোন নম্বর লেখার সাথে সাথেই সতর্কবার্তা দেখে।",
      "Stops repeated fake or prank COD orders from the same phone, IP or email before a delivery fee is wasted. Customers see a live warning as soon as they type their number.",
    ],
    features: [
      ["ফোন, IP ও ইমেইল আলাদা করে চালু/বন্ধ করা যায়", "Phone, IP and email can each be switched on or off"],
      ["একটাই সেটিং: কয়টা অর্ডারের পর কতক্ষণ ব্লক", "One shared rule: block after N orders, for how long"],
      ["ডিভাইস ফিঙ্গারপ্রিন্ট: VPN বা IP বদলালেও একই ব্রাউজারে ব্লক থাকে", "Device fingerprint: changing IP or VPN doesn't bypass the block on the same browser"],
      ["ক্লাসিক চেকআউট, ব্লক চেকআউট ও কাস্টম AJAX ফর্মে লাইভ সতর্কবার্তা", "Live warning on classic checkout, block checkout and custom AJAX forms"],
      ["\"আপনার আগের অর্ডার\" কার্ড, আসল কাস্টমার চিনতে সুবিধা", "\"Your previous order\" card, so genuine customers aren't mistaken for fakes"],
      ["WhatsApp ও Messenger হেল্প বাটন, কাস্টম মেসেজসহ", "WhatsApp and Messenger help buttons with a custom message"],
      ["হাতে লক/আনলক এবং \"এখন যা লক আছে\" তালিকা", "Manual lock/unlock and a \"currently locked\" list"],
      ["রিপোর্ট টেবিল ও নির্দিষ্ট দিন পর অটো-ডিলিট", "Report table with automatic cleanup after a set period"],
    ],
    previewTitle: ["চেকআউটে কাস্টমার যা দেখে", "What the customer sees at checkout"],
    preview: [
      { k: "bad", t: ["এই নম্বর থেকে এখন অর্ডার নেওয়া যাচ্ছে না", "Orders from this number are paused"] },
      { k: "muted", t: ["২ ঘণ্টা পর আবার চেষ্টা করুন", "Please try again in 2 hours"] },
      { k: "chip", t: ["আপনার আগের অর্ডার · #1234 · Processing · ৩৩ মিনিট আগে", "Your previous order · #1234 · Processing · 33 min ago"] },
      { k: "btn", t: ["WhatsApp", "WhatsApp"] },
    ],
  },
  {
    id: "recovery",
    emoji: "🛒",
    tone: "amber",
    name: ["ইনকমপ্লিট অর্ডার রিকভারি", "Incomplete Order Recovery"],
    short: ["হারানো বিক্রি ফিরিয়ে আনে", "Wins back lost sales"],
    desc: [
      "কাস্টমার ফর্ম ভরে অর্ডার না দিয়ে চলে গেলেও তার তথ্য সেভ থাকে। তারপর WhatsApp, ইমেইল বা অটোমেটিক SMS দিয়ে ফিরিয়ে আনা যায়, আর এক ক্লিকে সেটা আসল অর্ডার হয়ে যায়।",
      "When a customer fills the form and leaves, their details are already saved. Bring them back with WhatsApp, email or automatic SMS, then turn it into a real order in one click.",
    ],
    features: [
      ["টাইপ করার সাথে সাথে নাম, ফোন/ইমেইল ও কার্ট সেভ", "Name, phone/email and cart saved as the customer types"],
      ["শুধু ফোন বা শুধু ইমেইল থাকলেও কাজ করে", "Works with phone-only or email-only customers"],
      ["ডেলিভারি চার্জ: ঢাকা/ঢাকার বাইরে, অথবা WooCommerce শিপিং জোন থেকে", "Delivery charge: Dhaka vs outside, or from WooCommerce shipping zones"],
      ["WhatsApp ও ইমেইল ফলোআপ, টেমপ্লেট নিজে বদলানো যায়", "WhatsApp and email follow-up with editable templates"],
      ["অটো SMS: রিমাইন্ডার ও ডিসকাউন্ট মেসেজ আলাদা সময়ে", "Auto SMS: a reminder and a discount message at separate delays"],
      ["Alpha SMS, BulkSMSBD বা নিজের কাস্টম HTTP গেটওয়ে", "Alpha SMS, BulkSMSBD or your own custom HTTP gateway"],
      ["এক ক্লিকে আসল WooCommerce অর্ডার (Processing)", "One click to a real WooCommerce order (Processing)"],
      ["Incomplete ও Recovered আলাদা তালিকা, রিটেনশন সেটিং", "Separate Incomplete and Recovered lists with a retention setting"],
    ],
    previewTitle: ["অ্যাডমিন তালিকা (নমুনা)", "Admin list (sample)"],
    preview: [
      { k: "head", t: ["রহিম · 017••••••••", "Rahim · 017••••••••"] },
      { k: "muted", t: ["Gift Box × 1 · ৳১,২৫০ · ঢাকা", "Gift Box × 1 · ৳1,250 · Dhaka"] },
      { k: "chip", t: ["আগের অর্ডার নেই", "No previous order"] },
      { k: "btn", t: ["WhatsApp · ইমেইল · Recover", "WhatsApp · Email · Recover"] },
    ],
  },
  {
    id: "telegram",
    emoji: "📣",
    tone: "sky",
    name: ["Telegram Alerts", "Telegram Alerts"],
    short: ["সাথে সাথে নোটিফিকেশন", "Instant notifications"],
    desc: [
      "নতুন অর্ডার, ব্লকড অর্ডার, সমাপ্তি ছাড়াই ছেড়ে যাওয়া কাস্টমার, এমনকি রিপিট অ্যাব্যান্ডনারকে Telegram গ্রুপে সরাসরি পাঠানো যায়।",
      "New orders, blocked orders, incomplete users and repeat abandoners can be pushed straight to a Telegram group with the right context.",
    ],
    features: [
      ["নতুন অর্ডার, COD সহ", "New orders, including COD"],
      ["ব্লকড অর্ডার অ্যালার্ট", "Blocked order alert"],
      ["ইনকমপ্লিট অর্ডার সতর্কতা", "Incomplete checkout alert"],
      ["রিপিট অ্যাব্যান্ডনার চিহ্ন", "Repeat abandoner flag"],
      ["গ্রুপভিত্তিক আলাদা নোটিফিকেশন", "Separate groups for different notifications"],
    ],
    previewTitle: ["Telegram alert", "Telegram alert"],
    preview: [
      { k: "head", t: ["নতুন অর্ডার · #1022", "New order · #1022"] },
      { k: "text", t: ["রহিম · 017•••••••• · ১টি জিনিস", "Rahim · 017•••••••• · 1 item"] },
      { k: "ok", t: ["COD · ৩ মিনিট আগে", "COD · 3 min ago"] },
      { k: "btn", t: ["Open Order", "Open Order"] },
    ],
  },
  {
    id: "tracking",
    emoji: "📊",
    tone: "blue",
    name: ["Meta Tracking", "Meta Tracking"],
    short: ["PIxel + CAPI + রিপোর্ট", "Pixel + CAPI + reports"],
    desc: [
      "Facebook Pixel ও Conversion API ইভেন্টকে সঠিকভাবে মেলিয়ে প্রতিটি বিক্রয়, ভিউ ও কনভারশনের ট্র্যাকিং আরও নির্ভুল করে।",
      "Facebook Pixel and Conversion API events are matched so every conversion, view and sale can be tracked accurately without blind spots.",
    ],
    features: [
      ["একাধিক Pixel ও প্রোডাক্টভিত্তিক সেটিং", "Multiple pixels and product-based setup"],
      ["Browser + Server ইভেন্ট মেলানো", "Browser + server events matched"],
      ["ডুপ্লিকেট Purchase কমানো", "Duplicate purchase events reduced"],
      ["সঠিক attribution ও marketing রিপোর্ট", "More reliable attribution and reports"],
    ],
    previewTitle: ["Tracking signal", "Tracking signal"],
    preview: [
      { k: "head", t: ["Purchase · 18%", "Purchase · 18%"] },
      { k: "muted", t: ["ফেব্রুয়ারি ৫ — ৮০ কনভারশন", "February 5 — 80 conversions"] },
      { k: "chip", t: ["Duplicate removed", "Duplicate removed"] },
      { k: "ok", t: ["Server event synced", "Server event synced"] },
    ],
  },
  {
    id: "checkout",
    emoji: "⚡",
    tone: "emerald",
    name: ["ইজি চেকআউট", "Easy Checkout"],
    short: ["দ্রুত, পরিষ্কার, কম ঝামেলা", "Fast, clear and smooth"],
    desc: [
      "অটো জেলা-থানা সিলেকশন, ডেলিভারি চার্জ ক্যালকুলেশন এবং পরিষ্কার ফর্ম ফ্লো — সবকিছু কাস্টমারের জন্য দ্রুত ও সহজ করে।",
      "Auto district & area selection, delivery charge calculation and a cleaner form flow make every order feel faster and less frustrating.",
    ],
    features: [
      ["অটো জেলা ও থানা সিলেকশন", "Automatic district and area selection"],
      ["জেলা-ভিত্তিক ডেলিভারি চার্জ", "District-based delivery cost"],
      ["ক্লিয়ার ফর্ম ফ্লো", "Clean and guided checkout flow"],
      ["কম ভুল, কম রিটেনশন", "Fewer errors, less drop-off"],
    ],
    previewTitle: ["Checkout flow", "Checkout flow"],
    preview: [
      { k: "text", t: ["ঢাকা · দারুসসালাম", "Dhaka · Darus Salam"] },
      { k: "ok", t: ["৳৬০ ডেলিভারি", "৳60 delivery"] },
      { k: "chip", t: ["ভেরিফাইড", "Verified"] },
      { k: "btn", t: ["Place Order", "Place Order"] },
    ],
  },
  {
    id: "dashboard",
    emoji: "🧾",
    tone: "violet",
    name: ["Admin Dashboard", "Admin Dashboard"],
    short: ["এক ড্যাশবোর্ডে সবকিছু", "Everything in one dashboard"],
    desc: [
      "সব অর্ডার, ব্লকড রেকর্ড, ইনকমপ্লিট ফর্ম, কুরিয়ার লিস্ট, রিপোর্ট — এক জায়গায় দেখানো হয়, যাতে দ্রুত সিদ্ধান্ত নেওয়া যায়।",
      "All orders, blocked records, incomplete forms, courier items and reports live in one place so store owners can act quickly.",
    ],
    features: [
      ["সব অর্ডার একসাথে", "All orders under one roof"],
      ["অটোমেটিক ফিল্টার ও সেগমেন্টেশন", "Automatic filtering and segmentation"],
      ["এক-ক্লিকে কুরিয়ার কার্যক্রম", "One-click courier coordination"],
      ["ইনভয়েস, রিপোর্ট ও লজ", "Invoices, reports and logs"],
    ],
    previewTitle: ["Admin snapshot", "Admin snapshot"],
    preview: [
      { k: "head", t: ["Orders · 128", "Orders · 128"] },
      { k: "muted", t: ["ইনকমপ্লিট ১২ · ব্লকড ৮", "Incomplete 12 · Blocked 8"] },
      { k: "chip", t: ["Recovered 07", "Recovered 07"] },
      { k: "ok", t: ["Courier ready", "Courier ready"] },
    ],
  },
];

const problems = [
  { emoji: "🚨", p: ["ফেক অর্ডার", "Fake orders"], s: ["সন্দেহজনক COD কেটে দেয়", "Cuts suspicious COD before it hurts"] },
  { emoji: "🧍", p: ["হারানো বিক্রি", "Lost sales"], s: ["অর্ডার ছেড়ে গেলে ফিরে আনে", "Brings customers back when they leave"] },
  { emoji: "📉", p: ["ট্র্যাকিং ফাঁক", "Tracking gaps"], s: ["Meta ও কুরিয়ার কনভারশন ঠিক রাখে", "Keeps Meta and courier conversion data solid"] },
  { emoji: "🧠", p: ["স্টাফের চাপ", "Staff load"], s: ["অটোমেশন দিয়ে কাজে কমিয়ে দেয়", "Automation reduces manual follow-up"] },
] as const;

const compat = ["WooCommerce", "WordPress", "Telegram", "Meta Pixel", "Courier API"];

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="1" stop-color="#0a2a22"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#g)"/><circle cx="1300" cy="180" r="280" fill="#34d399" opacity=".07"/><circle cx="260" cy="840" r="300" fill="#22d3ee" opacity=".07"/><rect x="130" y="250" width="380" height="110" rx="30" fill="#fff" opacity=".08"/><rect x="170" y="290" width="220" height="16" rx="8" fill="#fff" opacity=".3"/><rect x="1090" y="640" width="380" height="110" rx="30" fill="#fff" opacity=".08"/><rect x="1130" y="680" width="240" height="16" rx="8" fill="#fff" opacity=".3"/><rect x="1120" y="230" width="340" height="90" rx="26" fill="#fb7185" opacity=".22"/><rect x="150" y="700" width="340" height="90" rx="26" fill="#fbbf24" opacity=".2"/><path d="M800 190 L1070 300 V520 C1070 710 950 815 800 880 C650 815 530 710 530 520 V300 Z" fill="url(#a)" opacity=".16"/><path d="M800 190 L1070 300 V520 C1070 710 950 815 800 880 C650 815 530 710 530 520 V300 Z" fill="none" stroke="url(#a)" stroke-width="14"/><path d="M680 530 L770 620 L930 430" fill="none" stroke="url(#a)" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const smartCheckoutCover = `data:image/svg+xml;utf8,${encodeURIComponent(coverSvg)}`;

const previewStyle: Record<Line["k"], string> = {
  head: "rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-2 text-[12.5px] font-semibold text-white",
  text: "rounded-lg border border-sky-400/30 bg-sky-500/10 px-2.5 py-2 text-[12.5px] text-sky-100",
  muted: "rounded-lg border border-white/10 bg-white/[0.02] px-2.5 py-2 text-[12.5px] text-slate-300",
  chip: "rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1.5 text-[11.5px] font-medium text-emerald-100",
  btn: "rounded-lg border border-violet-400/30 bg-violet-500/10 px-2.5 py-2 text-center text-[12.5px] font-semibold text-violet-100",
  ok: "rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-2 text-[12.5px] font-medium text-emerald-100",
  bad: "rounded-lg border border-rose-400/40 bg-rose-500/15 px-2.5 py-2 text-[12.5px] font-semibold text-rose-100",
};

export default function SmartCheckoutGuardShowcase({ lang }: Props) {
  const [activeId, setActiveId] = useState(modules[0].id);
  const active = modules.find((m) => m.id === activeId) ?? modules[0];
  const tone = tones[active.tone];

  return (
    <section className="border-t border-white/10 px-5 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            {pick(lang, ["প্লাগিন ওভারভিউ", "Plugin overview"])}
          </div>
          <h2 className="font-serif text-2xl font-semibold leading-[1.1] tracking-tight text-white sm:text-3xl">
            SmartCheckout Guard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-300">
            {pick(lang, [
              "WooCommerce স্টোরের চেকআউট বাঁচানোর পূর্ণাঙ্গ প্লাগিন। ফেক অর্ডার আটকায়, হারানো অর্ডার ফিরিয়ে আনে, কুরিয়ার ও Meta ট্র্যাকিংও সামলায়। সব একটা ড্যাশবোর্ড আর একটা লাইসেন্সে।",
              "A complete checkout-protection plugin for WooCommerce. It blocks fake orders, wins back lost ones, and handles courier and Meta tracking too, all in one dashboard under one licence.",
            ])}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {compat.map((c) => (
              <span key={c} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] font-medium text-slate-200">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {problems.map((x) => (
            <div key={String(x.p[1])} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="text-2xl">{x.emoji}</div>
              <div className="mt-2 text-[13.5px] font-semibold text-white">{pick(lang, x.p)}</div>
              <div className="mt-1 text-[12.5px] leading-5 text-emerald-300/90">{pick(lang, x.s)}</div>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-center font-serif text-xl font-semibold text-white sm:text-3xl">
            {pick(lang, ["ছয়টা মডিউল, প্রতিটার ভেতরে কী আছে", "Six modules, and what's inside each"]) }
          </h3>
          <p className="mt-2 text-center text-[13.5px] text-slate-400">
            {pick(lang, ["একটায় ক্লিক করে দেখুন", "Select one to explore"]) }
          </p>

          <div className="mt-8 grid gap-5 lg:grid-cols-[300px_1fr]">
            <div role="tablist" aria-label="SmartCheckout Guard modules" className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
              {modules.map((m) => {
                const t = tones[m.tone];
                const on = m.id === activeId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActiveId(m.id)}
                    className={
                      "flex min-w-[210px] items-center gap-3 rounded-2xl border p-3 text-left transition lg:min-w-0 " +
                      (on ? t.active : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]")
                    }
                  >
                    <span className={"grid h-11 w-11 shrink-0 place-items-center rounded-xl border text-xl " + t.box}>{m.emoji}</span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-semibold leading-tight text-white">{pick(lang, m.name)}</span>
                      <span className="mt-0.5 block text-[11.5px] leading-4 text-slate-400">{pick(lang, m.short)}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                role="tabpanel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/60 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-7"
              >
                <div className={"absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r " + tone.line} />
                <div className="flex items-center gap-3">
                  <span className={"grid h-12 w-12 place-items-center rounded-2xl border text-2xl " + tone.box}>{active.emoji}</span>
                  <h4 className="font-serif text-xl font-semibold text-white sm:text-2xl">{pick(lang, active.name)}</h4>
                </div>
                <p className="mt-4 text-[14px] leading-7 text-slate-300">{pick(lang, active.desc)}</p>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
                  <ul className="space-y-2.5">
                    {active.features.map((f) => (
                      <li key={String(f[1])} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-slate-200">
                        <span className={"mt-2 h-1.5 w-1.5 shrink-0 rounded-full " + tone.bar} />
                        <span>{pick(lang, f)}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e16]">
                      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
                        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
                        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                        <span className={"ml-2 text-[10.5px] " + tone.text}>{pick(lang, active.previewTitle)}</span>
                      </div>
                      <div className="flex flex-col gap-2.5 p-4">
                        {active.preview.map((l) => (
                          <div key={String(l.t[1])} className={previewStyle[l.k]}>
                            {pick(lang, l.t)}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500">
                      {pick(lang, ["নমুনা ডেটা, আসল কেসের মতো নয়", "Sample data only — not the live case"]) }
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
