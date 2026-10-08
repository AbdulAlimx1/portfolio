import { useState } from "react";
import { motion } from "framer-motion";

type Lang = "bn" | "en";

type Props = {
  lang: Lang;
  /** YouTube ভিডিও ID (unlisted/public). যেমন: "dQw4w9WgXcQ" */
  youtubeId?: string;
  /** অথবা নিজের MP4 ফাইলের URL (import করা ফাইল) */
  videoSrc?: string;
  /** ভিডিওর থাম্বনেইল (ঐচ্ছিক) */
  videoPoster?: string;
  /** ঐচ্ছিক: আসল dashboard স্ক্রিনশট (কাস্টমারের তথ্য ব্লার করে দিন) */
  dashboardImage?: string;
};

const pick = (l: Lang, bn: string, en: string) => (l === "bn" ? bn : en);

/* ───────── কভার ইমেজ (SVG, আলাদা ছবি লাগবে না) ───────── */
const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="1" stop-color="#0f1b3d"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#34d399"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#g)"/><circle cx="1250" cy="200" r="260" fill="#22d3ee" opacity=".08"/><circle cx="300" cy="820" r="300" fill="#a78bfa" opacity=".08"/><rect x="330" y="230" width="560" height="130" rx="40" fill="#fff" opacity=".1"/><rect x="380" y="275" width="300" height="18" rx="9" fill="#fff" opacity=".35"/><rect x="380" y="310" width="200" height="18" rx="9" fill="#fff" opacity=".2"/><rect x="700" y="430" width="580" height="160" rx="40" fill="url(#a)" opacity=".85"/><rect x="750" y="480" width="380" height="18" rx="9" fill="#04120d" opacity=".55"/><rect x="750" y="515" width="260" height="18" rx="9" fill="#04120d" opacity=".4"/><rect x="330" y="660" width="460" height="110" rx="40" fill="#fff" opacity=".1"/><rect x="380" y="705" width="240" height="18" rx="9" fill="#fff" opacity=".35"/><rect x="760" y="820" width="460" height="110" rx="40" fill="url(#a)" opacity=".85"/><rect x="810" y="865" width="280" height="18" rx="9" fill="#04120d" opacity=".5"/></svg>`;

export const whatsappAgentCover = `data:image/svg+xml;utf8,${encodeURIComponent(coverSvg)}`;

/* ───────── DATA ───────── */
const flowSteps = [
  {
    emoji: "📱",
    bn: "কাস্টমার মেসেজ দেয়",
    en: "Customer sends a message",
    subBn: "WhatsApp, যেকোনো সময়",
    subEn: "On WhatsApp, any time",
    box: "border-emerald-400/30 bg-emerald-500/10",
    num: "bg-emerald-400",
  },
  {
    emoji: "🔗",
    bn: "Webhook মেসেজ ধরে",
    en: "Webhook catches it",
    subBn: "Meta → n8n, সাথে সাথে",
    subEn: "Meta → n8n, instantly",
    box: "border-sky-400/30 bg-sky-500/10",
    num: "bg-sky-400",
  },
  {
    emoji: "🧠",
    bn: "AI পড়ে ও উত্তর বানায়",
    en: "AI reads & writes a reply",
    subBn: "System prompt + আগের কথা মনে রেখে",
    subEn: "Using your system prompt + chat memory",
    box: "border-violet-400/30 bg-violet-500/10",
    num: "bg-violet-400",
  },
  {
    emoji: "💬",
    bn: "সাথে সাথে রিপ্লাই যায়",
    en: "Reply goes out instantly",
    subBn: "আপনার সেট করা ভাষা ও টোনে",
    subEn: "In the language & tone you set",
    box: "border-amber-400/30 bg-amber-500/10",
    num: "bg-amber-400",
  },
  {
    emoji: "📊",
    bn: "চ্যাট সেভ ও dashboard",
    en: "Chat saved & shown in dashboard",
    subBn: "Google Sheets + কাস্টম ভিউ",
    subEn: "Google Sheets + custom view",
    box: "border-rose-400/30 bg-rose-500/10",
    num: "bg-rose-400",
  },
];

const getChat = (lang: Lang): { from: "user" | "bot"; text: string; time: string }[] =>
  lang === "bn"
    ? [
        { from: "user", text: "হ্যালো, আপনাদের সার্ভিসের প্যাকেজ কী কী আছে?", time: "11:42 PM" },
        { from: "bot", text: "হ্যালো! আমাদের বেসিক, স্ট্যান্ডার্ড ও প্রিমিয়াম, এই ৩টি প্যাকেজ আছে। আপনার কোনটা দরকার?", time: "11:42 PM" },
        { from: "user", text: "স্ট্যান্ডার্ডে কী কী পাব?", time: "11:43 PM" },
        { from: "bot", text: "স্ট্যান্ডার্ডে আছে সম্পূর্ণ সেটআপ ও ১ মাসের সাপোর্ট। বুকিং করতে চান?", time: "11:43 PM" },
        { from: "user", text: "হ্যাঁ, বুকিং দিতে চাই", time: "11:44 PM" },
        { from: "bot", text: "দারুণ! এই লিংকে সময় বেছে নিন: yourbusiness.com/book", time: "11:44 PM" },
      ]
    : [
        { from: "user", text: "Hi, what packages do you offer?", time: "11:42 PM" },
        { from: "bot", text: "Hello! We have three packages: Basic, Standard and Premium. Which one fits your needs?", time: "11:42 PM" },
        { from: "user", text: "What's included in Standard?", time: "11:43 PM" },
        { from: "bot", text: "Standard includes the full setup and 1 month of support. Would you like to book a slot?", time: "11:43 PM" },
        { from: "user", text: "Yes, I'd like to book", time: "11:44 PM" },
        { from: "bot", text: "Great! Pick a time here: yourbusiness.com/book", time: "11:44 PM" },
      ];

const features = [
  { emoji: "🌍", bn: "যেকোনো ভাষায়", en: "Any language", dBn: "বাংলা, ইংরেজি বা আপনার কাস্টমারের ভাষা, System Prompt-এ যা বলবেন সেভাবেই কথা বলবে।", dEn: "Bengali, English or your customers' language. It speaks the way your system prompt tells it to." },
  { emoji: "🎯", bn: "আপনার নিয়মে চলে", en: "Follows your rules", dBn: "কী বলবে, কী বলবে না, কখন মানুষের কাছে পাঠাবে, সব আপনি ঠিক করে দেন।", dEn: "You decide what it says, what it never says, and when it hands over to a human." },
  { emoji: "🧠", bn: "আগের কথা মনে রাখে", en: "Remembers the chat", dBn: "পুরো ইতিহাস সেভ হয়, AI-কে যায় সাম্প্রতিক মেসেজ, তাই উত্তর প্রাসঙ্গিক ও খরচ কম।", dEn: "The full history is saved; recent messages go to the AI, so replies stay relevant and costs stay low." },
  { emoji: "🔌", bn: "আপনার সিস্টেমের সাথে জোড়া", en: "Connects to your stack", dBn: "ওয়েবসাইটের লিংক, বুকিং, Google Sheets বা CRM-এর সাথে যুক্ত করা যায়।", dEn: "Link it to your website, booking page, Google Sheets or CRM." },
  { emoji: "🛡️", bn: "ব্যাকআপ সিস্টেম", en: "Built-in fallback", dBn: "একটা AI সার্ভিস কাজ না করলে ব্যাকআপে চলে যায়। সবকিছু ব্যস্ত থাকলে মানুষের যোগাযোগের তথ্য পাঠায়।", dEn: "If one AI service fails it switches to a backup; if all are busy it shares a human contact." },
  { emoji: "📊", bn: "মালিকের জন্য dashboard", en: "Owner dashboard", dBn: "সব কাস্টমারের চ্যাট একটি জায়গায় দেখা যায়, কোনো কথোপকথন হারায় না।", dEn: "Every customer conversation in one place, nothing gets lost." },
];

const stack = ["n8n", "WhatsApp Cloud API", "Meta Webhook", "LLM Model API", "Google Sheets", "Custom Dashboard"];

const promptChips = [
  { bn: "ব্যবসার তথ্য", en: "Business info" },
  { bn: "সার্ভিস ও দাম", en: "Services & pricing" },
  { bn: "কথা বলার টোন", en: "Tone of voice" },
  { bn: "ভাষা", en: "Language" },
  { bn: "নিয়ম ও সীমা", en: "Rules & limits" },
  { bn: "মানুষের কাছে হ্যান্ডঅফ", en: "Human hand-off" },
];

const channels = [
  { emoji: "📱", bn: "WhatsApp", en: "WhatsApp", dBn: "এই ডেমোতে লাইভ চলছে", dEn: "Running live in this demo", badgeBn: "লাইভ", badgeEn: "Live", box: "border-emerald-400/30 bg-emerald-500/[0.07]", badge: "bg-emerald-400/20 text-emerald-300" },
  { emoji: "💙", bn: "Facebook Messenger", en: "Facebook Messenger", dBn: "একই এজেন্ট আপনার পেজের Messenger-এ", dEn: "The same agent on your Page's Messenger", badgeBn: "যুক্ত করা যায়", badgeEn: "Can be added", box: "border-sky-400/30 bg-sky-500/[0.07]", badge: "bg-sky-400/20 text-sky-300" },
  { emoji: "🌐", bn: "ওয়েবসাইট চ্যাট", en: "Website chat", dBn: "যেকোনো ওয়েবসাইটে চ্যাট উইজেট হিসেবে", dEn: "As a chat widget on any website", badgeBn: "যুক্ত করা যায়", badgeEn: "Can be added", box: "border-violet-400/30 bg-violet-500/[0.07]", badge: "bg-violet-400/20 text-violet-300" },
];

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
});

/* ───────── VIDEO ───────── */
function PlayIcon() {
  return (
    <span className="grid h-16 w-16 place-items-center rounded-full border border-white/30 bg-white/15 shadow-[0_0_40px_rgba(34,211,238,0.35)] backdrop-blur-md transition group-hover:scale-110 sm:h-20 sm:w-20">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

export function VideoBlock({
  lang,
  youtubeId,
  videoSrc,
  videoPoster,
}: Pick<Props, "lang" | "youtubeId" | "videoSrc" | "videoPoster">) {
  const [play, setPlay] = useState(false);
  const frame =
    "relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_70px_rgba(0,0,0,0.5)]";

  if (youtubeId) {
    return (
      <div className={frame}>
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={pick(lang, "এজেন্ট কীভাবে কাজ করে", "How the agent works")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={pick(lang, "ভিডিও চালান", "Play video")}
            className="group absolute inset-0 grid h-full w-full place-items-center"
          >
            <img
              src={videoPoster ?? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
            <span className="relative"><PlayIcon /></span>
          </button>
        )}
      </div>
    );
  }

  if (videoSrc) {
    return (
      <div className={frame}>
        <video
          className="h-full w-full"
          src={videoSrc}
          poster={videoPoster}
          controls
          playsInline
          preload="metadata"
          muted={false}
        />
      </div>
    );
  }

  return (
    <div className={frame + " grid place-items-center border-dashed"}>
      <div className="text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/[0.06] text-2xl">🎬</span>
        <p className="mt-3 text-sm font-semibold text-slate-200">{pick(lang, "ডেমো ভিডিও শীঘ্রই আসছে", "Demo video coming soon")}</p>
      </div>
    </div>
  );
}

/* ───────── COMPONENT ───────── */
export default function WhatsAppAgentShowcase({ lang, youtubeId, videoSrc, videoPoster, dashboardImage }: Props) {
  const chat = getChat(lang);

  return (
    <section className="border-t border-white/10 px-5 py-8 sm:px-6">
      <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.08] p-5 text-center">
        <p className="text-[14px] leading-6 text-slate-200">
          {pick(
            lang,
            "এজেন্টটি কীভাবে কাজ করে সরাসরি পরীক্ষা করতে WhatsApp-এ এই নম্বরে চ্যাট করুন:",
            "Test how the agent works by chatting with it on WhatsApp:"
          )}
        </p>
        <p className="mt-1 font-semibold text-white">+880 1647-605769</p>
        <a
          href="https://wa.me/8801647605769"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
        >
          {pick(lang, "WhatsApp-এ চ্যাট করে টেস্ট করুন", "Test it on WhatsApp")}
        </a>
      </div>

      {/* Header */}
      <motion.div {...fade()} className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          {pick(lang, "কীভাবে কাজ করে", "How it works")}
        </div>
        <h4 className="mt-4 font-serif text-xl font-semibold leading-snug text-white sm:text-3xl">
          {pick(
            lang,
            "একটি AI এজেন্ট যা আপনার ব্যবসার হয়ে ২৪/৭ কাস্টমারের সাথে কথা বলে",
            "An AI agent that talks to your customers 24/7, on your behalf"
          )}
        </h4>
        <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-slate-400">
          {pick(
            lang,
            "এটি কোনো একটি দোকানের জন্য বানানো বট নয়। এটি একটি পুনর্ব্যবহারযোগ্য সলিউশন, যেকোনো ব্যবসা বা ওয়েবসাইটের জন্য আপনার তথ্য ও নিয়ম অনুযায়ী সাজিয়ে দেওয়া যায়।",
            "This isn't a bot for one shop. It's a reusable solution that can be set up for any business or website, tuned to your information and your rules."
          )}
        </p>
      </motion.div>

      {/* Problem → Solution */}
      <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        <motion.div {...fade(0)} className="rounded-2xl border border-rose-400/25 bg-rose-500/[0.06] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-rose-300">
            😟 {pick(lang, "সমস্যা", "The problem")}
          </div>
          <p className="mt-2 text-[14px] leading-7 text-slate-300">
            {pick(
              lang,
              "রাতে বা ব্যস্ত সময়ে কাস্টমারের মেসেজের উত্তর দিতে দেরি হয়। একই প্রশ্ন বারবার আসে, আর অনেক সম্ভাব্য কাস্টমার উত্তরের অপেক্ষায় থেকে চলে যায়।",
              "Late at night or at busy hours, messages wait too long. The same questions come again and again, and potential customers leave while waiting for an answer."
            )}
          </p>
        </motion.div>
        <motion.div {...fade(1)} className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
            ✅ {pick(lang, "সমাধান", "The solution")}
          </div>
          <p className="mt-2 text-[14px] leading-7 text-slate-300">
            {pick(
              lang,
              "একটি AI এজেন্ট যা আপনার সার্ভিস, নিয়ম ও টোন জানে। সাথে সাথে উত্তর দেয়, সঠিক লিংকে পাঠায়, আর সব চ্যাট একটি dashboard-এ জমা রাখে।",
              "An AI agent that knows your services, rules and tone. It replies instantly, points customers to the right link, and keeps every chat in one dashboard."
            )}
          </p>
        </motion.div>
      </div>

      {/* Video */}
      <div className="mx-auto mt-10 max-w-4xl">
        <motion.div {...fade()} className="mb-4 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
            🎬 {pick(lang, "ভিডিওতে দেখুন", "Watch it in action")}
          </div>
          <p className="mt-1 text-[13.5px] text-slate-400">
            {pick(lang, "সেটআপ থেকে লাইভ উত্তর পর্যন্ত, পুরো সিস্টেম কীভাবে কাজ করে।", "From setup to live replies, see how the whole system works.")}
          </p>
        </motion.div>
        <motion.div {...fade(1)}>
          <VideoBlock lang={lang} youtubeId={youtubeId} videoSrc={videoSrc} videoPoster={videoPoster} />
        </motion.div>
      </div>

      {/* Flow */}
      <div className="mx-auto mt-12 max-w-5xl">
        <motion.h5 {...fade()} className="mb-6 text-center font-serif text-lg font-semibold text-white sm:text-2xl">
          {pick(lang, "৫ ধাপে পুরো প্রক্রিয়া", "The whole process in 5 steps")}
        </motion.h5>
        <div className="grid gap-3 sm:grid-cols-5">
          {flowSteps.map((s, i) => (
            <motion.div key={s.en} {...fade(i)} className={"relative rounded-2xl border p-4 text-center " + s.box}>
              <span
                className={
                  "absolute -top-2.5 left-1/2 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full text-[10px] font-black text-slate-950 " +
                  s.num
                }
              >
                {i + 1}
              </span>
              <div className="text-2xl">{s.emoji}</div>
              <div className="mt-2 text-[13px] font-semibold leading-snug text-white">{pick(lang, s.bn, s.en)}</div>
              <div className="mt-1 text-[11px] leading-4 text-slate-400">{pick(lang, s.subBn, s.subEn)}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Chat demo + Dashboard */}
      <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 lg:grid-cols-[360px_1fr]">
        {/* Phone */}
        <motion.div {...fade()} className="mx-auto w-full max-w-[340px]">
          <div className="overflow-hidden rounded-[34px] border-[6px] border-slate-800 bg-[#0b141a] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-sm">🏢</div>
              <div className="min-w-0">
                <div className="truncate text-[14px] font-semibold text-white">{pick(lang, "আপনার ব্যবসা", "Your Business")}</div>
                <div className="text-[11px] text-emerald-100/80">online</div>
              </div>
            </div>
            <div
              className="space-y-2 px-3 py-4"
              style={{ background: "radial-gradient(circle at 20% 10%, rgba(255,255,255,0.03), transparent 40%), #0b141a" }}
            >
              {chat.map((m, i) => (
                <motion.div
                  key={lang + i}
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: i * 0.12 }}
                  className={"flex " + (m.from === "bot" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={
                      "max-w-[82%] rounded-xl px-3 py-2 text-[12.5px] leading-5 " +
                      (m.from === "bot"
                        ? "rounded-tr-none bg-[#005c4b] text-emerald-50"
                        : "rounded-tl-none bg-[#202c33] text-slate-100")
                    }
                  >
                    {m.text}
                    <span className="mt-1 block text-right text-[9px] text-white/40">{m.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">
            {pick(lang, "নমুনা কথোপকথন, যেকোনো ব্যবসার জন্য সাজানো যায়", "Sample conversation, adaptable to any business")}
          </p>
        </motion.div>

        {/* Dashboard */}
        <motion.div {...fade(1)}>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
            📊 {pick(lang, "মালিকের dashboard", "Owner dashboard")}
          </div>
          <p className="mt-2 text-[13.5px] leading-6 text-slate-400">
            {pick(
              lang,
              "প্রতিটি চ্যাট Google Sheets-এ সেভ হয়। কাস্টম dashboard-এ সব কাস্টমারের কথোপকথন WhatsApp-এর মতো করে দেখা যায়, ফলে এজেন্ট কী বলছে তা মালিক সবসময় জানেন।",
              "Every chat is saved to Google Sheets. A custom dashboard shows all conversations in a WhatsApp-like view, so the owner always knows what the agent is saying."
            )}
          </p>

          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e16] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-[10px] text-slate-500">chat-dashboard</span>
            </div>

            {dashboardImage ? (
              <img src={dashboardImage} alt="Agent chat dashboard" className="w-full object-cover" loading="lazy" decoding="async" />
            ) : (
              <div className="grid grid-cols-[120px_1fr] sm:grid-cols-[170px_1fr]">
                <div className="border-r border-white/10">
                  <div className="bg-[#075E54] px-3 py-2 text-[12px] font-semibold text-white">
                    {pick(lang, "সব কথোপকথন", "All conversations")}
                  </div>
                  {[
                    { n: "Customer A", m: pick(lang, "বুকিং দিতে চাই", "I'd like to book"), on: true },
                    { n: "Customer B", m: pick(lang, "দাম কত?", "What's the price?"), on: false },
                    { n: "Customer C", m: pick(lang, "অফিস কখন খোলা?", "When are you open?"), on: false },
                  ].map((c) => (
                    <div key={c.n} className={"border-b border-white/5 px-3 py-2.5 " + (c.on ? "bg-white/[0.06]" : "")}>
                      <div className="truncate text-[12px] font-semibold text-slate-200">{c.n}</div>
                      <div className="truncate text-[10.5px] text-slate-500">{c.m}</div>
                    </div>
                  ))}
                </div>
                <div className="flex min-h-[190px] flex-col bg-[#0f1a1f]">
                  <div className="bg-[#075E54] px-3 py-2 text-[12px] font-semibold text-white">Customer A</div>
                  <div className="flex-1 space-y-2 p-3">
                    <div className="max-w-[80%] rounded-lg rounded-tl-none bg-white/90 px-2.5 py-1.5 text-[11px] text-slate-800">
                      {pick(lang, "স্ট্যান্ডার্ডে কী কী পাব?", "What's included in Standard?")}
                    </div>
                    <div className="ml-auto max-w-[80%] rounded-lg rounded-tr-none bg-[#dcf8c6] px-2.5 py-1.5 text-[11px] text-slate-800">
                      {pick(lang, "সম্পূর্ণ সেটআপ ও ১ মাসের সাপোর্ট। বুকিং করতে চান?", "Full setup and 1 month of support. Want to book?")}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {pick(lang, "নমুনা ডেটা, আসল কাস্টমারের তথ্য নয়", "Sample data, not real customer information")}
          </p>
        </motion.div>
      </div>

      {/* System prompt = the brain */}
      <div className="mx-auto mt-14 max-w-5xl">
        <motion.div {...fade()} className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-violet-300">
            🧠 {pick(lang, "System Prompt, এজেন্টের মস্তিষ্ক", "System Prompt, the agent's brain")}
          </div>
          <h5 className="mt-2 font-serif text-lg font-semibold text-white sm:text-2xl">
            {pick(lang, "System Prompt যত ভালো, উত্তরও তত ভালো", "The better the system prompt, the better the answers")}
          </h5>
          <p className="mt-2 text-[13.5px] leading-6 text-slate-400">
            {pick(
              lang,
              "এজেন্ট আপনার লেখা System Prompt অনুযায়ী চলে। তাই আপনার ব্যবসার তথ্য, নিয়ম ও কথা বলার ধরন দিয়ে একে নিজের মতো করে ট্রেইন করা যায়।",
              "The agent follows the system prompt you give it. So you can train it your own way, with your business information, rules and style of speaking."
            )}
          </p>
        </motion.div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <motion.div {...fade(0)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              {pick(lang, "সাধারণ Prompt", "Basic prompt")}
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 font-mono text-[11.5px] leading-5 text-slate-400">
              {pick(lang, "তুমি একজন সহায়ক অ্যাসিস্ট্যান্ট।", "You are a helpful assistant.")}
            </div>
            <div className="mt-3 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">
              {pick(lang, "উত্তর", "Reply")}
            </div>
            <div className="mt-1 rounded-xl rounded-tl-none bg-[#202c33] px-3 py-2 text-[12.5px] leading-5 text-slate-300">
              {pick(lang, "আমরা বিভিন্ন সার্ভিস দিয়ে থাকি। বিস্তারিত জানতে আমাদের সাথে যোগাযোগ করুন।", "We offer various services. Please contact us for more details.")}
            </div>
          </motion.div>

          <motion.div {...fade(1)} className="rounded-2xl border border-emerald-400/30 bg-emerald-500/[0.06] p-5">
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
              ✨ {pick(lang, "ট্রেইন করা Prompt", "Trained prompt")}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {promptChips.map((c) => (
                <span key={c.en} className="rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-100">
                  {pick(lang, c.bn, c.en)}
                </span>
              ))}
            </div>
            <div className="mt-3 text-[10.5px] font-semibold uppercase tracking-wider text-emerald-300/70">
              {pick(lang, "উত্তর", "Reply")}
            </div>
            <div className="mt-1 rounded-xl rounded-tr-none bg-[#005c4b] px-3 py-2 text-[12.5px] leading-5 text-emerald-50">
              {pick(
                lang,
                "স্ট্যান্ডার্ডে আছে সম্পূর্ণ সেটআপ ও ১ মাসের সাপোর্ট। আপনার জন্য একটা সময় বুক করে দেব?",
                "Standard includes the full setup and 1 month of support. Shall I book a time for you?"
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto mt-12 max-w-5xl">
        <motion.h5 {...fade()} className="text-center font-serif text-lg font-semibold text-white sm:text-2xl">
          {pick(lang, "এজেন্ট যা যা করতে পারে", "What the agent can do")}
        </motion.h5>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.en}
              {...fade(i % 3)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-cyan-400/30 hover:bg-cyan-400/[0.04]"
            >
              <div className="text-xl">{f.emoji}</div>
              <div className="mt-2 text-[14px] font-semibold text-white">{pick(lang, f.bn, f.en)}</div>
              <p className="mt-1 text-[12.5px] leading-5 text-slate-400">{pick(lang, f.dBn, f.dEn)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Under the hood */}
      <motion.div {...fade()} className="mx-auto mt-10 max-w-5xl rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.04] p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
          ⚙️ {pick(lang, "ভেতরে যা ব্যবহার হয়েছে", "Under the hood")}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((t) => (
            <span key={t} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] font-medium text-slate-200">
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Channels + CTA */}
      <div className="mx-auto mt-12 max-w-5xl">
        <motion.div {...fade()} className="mx-auto max-w-2xl text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300">
            🔌 {pick(lang, "একই এজেন্ট, যেকোনো চ্যানেলে", "One agent, any channel")}
          </div>
          <h5 className="mt-2 font-serif text-lg font-semibold text-white sm:text-2xl">
            {pick(lang, "আপনার কাস্টমার যেখানে, এজেন্টও সেখানে", "Your agent meets customers where they already are")}
          </h5>
        </motion.div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {channels.map((c, i) => (
            <motion.div key={c.en} {...fade(i)} className={"rounded-2xl border p-5 text-center " + c.box}>
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-2 text-[14px] font-semibold text-white">{pick(lang, c.bn, c.en)}</div>
              <p className="mt-1 text-[12.5px] leading-5 text-slate-400">{pick(lang, c.dBn, c.dEn)}</p>
              <span className={"mt-3 inline-block rounded-full px-2.5 py-1 text-[10.5px] font-bold " + c.badge}>
                {pick(lang, c.badgeBn, c.badgeEn)}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div {...fade()} className="mt-8 rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.10] via-transparent to-cyan-500/[0.08] p-6 text-center">
          <p className="mx-auto max-w-xl font-serif text-[16px] font-semibold leading-snug text-white sm:text-xl">
            {pick(
              lang,
              "এই একই এজেন্ট আপনার WhatsApp, Messenger বা ওয়েবসাইটে চান?",
              "Want this same agent on your WhatsApp, Messenger or website?"
            )}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-slate-400">
            {pick(
              lang,
              "আপনার ব্যবসার তথ্য ও নিয়ম অনুযায়ী সাজিয়ে দেব।",
              "I'll set it up around your business information and rules."
            )}
          </p>
          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5"
          >
            💬 {pick(lang, "আমার ব্যবসার জন্য এজেন্ট চাই", "Get an agent for my business")}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
