import { motion } from "framer-motion";
import { VideoBlock } from "./WhatsAppAgentShowcase";

type Lang = "bn" | "en";

type Props = {
  lang: Lang;
  youtubeId?: string;
  videoSrc?: string;
  videoPoster?: string;
  settingsImage?: string;
};

const pick = (lang: Lang, bn: string, en: string) => (lang === "bn" ? bn : en);

const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="1" stop-color="#1a0f2e"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fbbf24"/><stop offset="1" stop-color="#fb7185"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#g)"/><circle cx="1300" cy="180" r="260" fill="#fbbf24" opacity=".07"/><circle cx="260" cy="840" r="300" fill="#fb7185" opacity=".07"/><rect x="200" y="470" width="1200" height="10" rx="5" fill="#fff" opacity=".12"/><rect x="200" y="470" width="760" height="10" rx="5" fill="url(#a)"/><circle cx="200" cy="475" r="38" fill="url(#a)"/><circle cx="580" cy="475" r="38" fill="url(#a)"/><circle cx="960" cy="475" r="38" fill="url(#a)"/><circle cx="1400" cy="475" r="38" fill="#34d399"/><rect x="120" y="260" width="360" height="110" rx="30" fill="#fff" opacity=".1"/><rect x="160" y="300" width="220" height="16" rx="8" fill="#fff" opacity=".35"/><rect x="500" y="580" width="400" height="150" rx="34" fill="url(#a)" opacity=".85"/><rect x="545" y="625" width="280" height="16" rx="8" fill="#1a0f2e" opacity=".55"/><rect x="545" y="660" width="200" height="16" rx="8" fill="#1a0f2e" opacity=".4"/><rect x="880" y="260" width="400" height="150" rx="34" fill="url(#a)" opacity=".85"/><rect x="925" y="305" width="280" height="16" rx="8" fill="#1a0f2e" opacity=".55"/><rect x="925" y="340" width="200" height="16" rx="8" fill="#1a0f2e" opacity=".4"/><rect x="1230" y="580" width="260" height="110" rx="30" fill="#34d399" opacity=".25"/></svg>`;

export const abandonedRecoveryCover = `data:image/svg+xml;utf8,${encodeURIComponent(coverSvg)}`;

const timeline = [
  {
    emoji: "✍️",
    when: "0",
    bn: "তথ্য সেভ হয়",
    en: "Details are saved",
    dBn: "কাস্টমার ফর্ম ভরার সময়ই নাম, ফোন ও কার্ট সেভ হয়, অর্ডার না দিলেও।",
    dEn: "Name, phone and cart are saved while the customer fills the form, even if they never order.",
    box: "border-sky-400/30 bg-sky-500/10",
    dot: "bg-sky-400",
  },
  {
    emoji: "⏱️",
    when: "~30",
    bn: "রিমাইন্ডার SMS",
    en: "Reminder SMS",
    dBn: "কিছুক্ষণ পরও অর্ডার না হলে চেকআউট লিংকসহ নরম একটা রিমাইন্ডার যায়।",
    dEn: "If there's still no order, a gentle reminder with the checkout link is sent.",
    box: "border-amber-400/30 bg-amber-500/10",
    dot: "bg-amber-400",
  },
  {
    emoji: "🎁",
    when: "~120",
    bn: "ডিসকাউন্ট SMS",
    en: "Discount SMS",
    dBn: "তখনো ফিরে না এলে আপনার সেট করা বিশেষ অফারসহ দ্বিতীয় মেসেজ।",
    dEn: "Still no order? A second message with the special offer you set.",
    box: "border-rose-400/30 bg-rose-500/10",
    dot: "bg-rose-400",
  },
  {
    emoji: "✅",
    when: "🛑",
    bn: "অর্ডার হলেই থামে",
    en: "Stops once they order",
    dBn: "প্রতিটি মেসেজ পাঠানোর আগে আবার চেক হয়। অর্ডার হয়ে গেলে আর কিছু যায় না।",
    dEn: "Every message is re-checked before sending. Once they order, nothing more goes out.",
    box: "border-emerald-400/30 bg-emerald-500/10",
    dot: "bg-emerald-400",
  },
];

const features = [
  { emoji: "🔌", bn: "যেকোনো SMS গেটওয়ে", en: "Any SMS gateway", dBn: "Alpha SMS, BulkSMSBD বা নিজের কাস্টম HTTP গেটওয়ে, যেটা আপনার আছে সেটাই।", dEn: "Alpha SMS, BulkSMSBD or your own custom HTTP gateway. Use whichever you already have." },
  { emoji: "🧩", bn: "নিজের মতো মেসেজ", en: "Your own message", dBn: "{name}, {products}, {checkout_url}-এর মতো ভ্যারিয়েবল দিয়ে ব্যক্তিগত মেসেজ বানান।", dEn: "Personalize with variables like {name}, {products} and {checkout_url}." },
  { emoji: "🛡️", bn: "ভুল মেসেজ যায় না", en: "No wrong messages", dBn: "পাঠানোর মুহূর্তে চেক হয় কাস্টমার এখনো অসম্পূর্ণ কিনা।", dEn: "At send time it checks the customer is still incomplete." },
  { emoji: "🔒", bn: "একজনকে দুইবার নয়", en: "Never twice", dBn: "প্রতিটি রেকর্ডে পাঠানোর সময় লেখা থাকে, তাই একই মেসেজ দুইবার যায় না।", dEn: "Each record stores its send time, so the same message never goes out twice." },
  { emoji: "🔔", bn: "মালিকের Telegram অ্যালার্ট", en: "Owner Telegram alert", dBn: "বারবার চেকআউট ছেড়ে যাওয়া কাস্টমারকে আলাদা চিহ্নসহ জানায়।", dEn: "Flags repeat abandoners to the owner on Telegram." },
  { emoji: "🧪", bn: "লাইভের আগে টেস্ট", en: "Test before going live", dBn: "\"Test SMS\" বাটনে সেভ করার আগেই সেটিংস যাচাই করা যায়।", dEn: "A \"Test SMS\" button verifies your settings before you save." },
];

const stack = ["WordPress", "WooCommerce", "PHP", "WP-Cron", "SMS Gateway API", "Telegram Bot API"];

const fade = (i = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
});

export default function AbandonedRecoveryShowcase({
  lang,
  youtubeId,
  videoSrc,
  videoPoster,
  settingsImage,
}: Props) {
  const hasVideo = Boolean(youtubeId || videoSrc);

  return (
    <section className="border-t border-white/10 px-5 py-8 sm:px-6">
      <motion.div {...fade()} className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-amber-300">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.9)]" />
          {pick(lang, "কীভাবে কাজ করে", "How it works")}
        </div>
        <h4 className="mt-4 font-serif text-xl font-semibold leading-snug text-white sm:text-3xl">
          {pick(lang, "চেকআউট ছেড়ে যাওয়া কাস্টমারকে নিজে থেকেই ফিরিয়ে আনে", "Brings customers back after they leave checkout, automatically")}
        </h4>
        <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-slate-400">
          {pick(lang, "WooCommerce স্টোরের জন্য একটি অটোমেটিক রিকভারি সিস্টেম। কাউকে হাতে হাতে মেসেজ পাঠাতে হয় না।", "An automatic recovery system for WooCommerce stores. Nobody has to send messages by hand.")}
        </p>
      </motion.div>

      <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2">
        <motion.div {...fade()} className="rounded-2xl border border-rose-400/25 bg-rose-500/[0.06] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-rose-300">
            😟 {pick(lang, "সমস্যা", "The problem")}
          </div>
          <p className="mt-2 text-[14px] leading-7 text-slate-300">
            {pick(lang, "অনেকে পণ্য পছন্দ করে, ফর্ম ভরে, তারপর কোনো কারণে অর্ডার না দিয়েই চলে যায়। মালিক জানতেও পারেন না, বিক্রিটা হারিয়ে যায়।", "Many shoppers pick a product, fill the form, then leave without ordering. The owner never knows, and the sale is lost.")}
          </p>
        </motion.div>
        <motion.div {...fade(1)} className="rounded-2xl border border-emerald-400/25 bg-emerald-500/[0.06] p-5">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
            ✅ {pick(lang, "সমাধান", "The solution")}
          </div>
          <p className="mt-2 text-[14px] leading-7 text-slate-300">
            {pick(lang, "সিস্টেম তথ্য সেভ রাখে, নির্দিষ্ট সময় পর নিজেই SMS পাঠায়, আর অর্ডার হয়ে গেলে থেমে যায়। মালিক শুধু ফলাফল দেখেন।", "The system saves the details, sends an SMS after a set time on its own, and stops once the order is placed. The owner just sees the result.")}
          </p>
        </motion.div>
      </div>

      {hasVideo && (
        <div className="mx-auto mt-10 max-w-4xl">
          <motion.div {...fade()} className="mb-4 text-center text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
            🎬 {pick(lang, "ভিডিওতে দেখুন", "Watch it in action")}
          </motion.div>
          <motion.div {...fade(1)}>
            <VideoBlock lang={lang} youtubeId={youtubeId} videoSrc={videoSrc} videoPoster={videoPoster} />
          </motion.div>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-5xl">
        <motion.h5 {...fade()} className="mb-6 text-center font-serif text-lg font-semibold text-white sm:text-2xl">
          {pick(lang, "একজন কাস্টমারের যাত্রা", "One customer's journey")}
        </motion.h5>
        <div className="grid gap-3 sm:grid-cols-4">
          {timeline.map((item, i) => (
            <motion.div key={item.en} {...fade(i)} className={`relative rounded-2xl border p-4 ${item.box}`}>
              <div className="flex items-center justify-between">
                <span className="text-2xl">{item.emoji}</span>
                <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-black text-slate-950 ${item.dot}`}>
                  {item.when}
                  {item.when.startsWith("~") || item.when === "0" ? pick(lang, " মিনিট", " min") : ""}
                </span>
              </div>
              <div className="mt-3 text-[14px] font-semibold text-white">{pick(lang, item.bn, item.en)}</div>
              <p className="mt-1 text-[12.5px] leading-5 text-slate-400">{pick(lang, item.dBn, item.dEn)}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-500">
          {pick(lang, "সময়গুলো ডিফল্ট, সেটিংস থেকে বদলানো যায়। সাইটের ট্রাফিকের উপর কয়েক মিনিট এদিক-ওদিক হতে পারে।", "Timings are defaults and can be changed in settings. They may shift by a few minutes depending on site traffic.")}
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 lg:grid-cols-[340px_1fr]">
        <motion.div {...fade()} className="mx-auto w-full max-w-[320px]">
          <div className="overflow-hidden rounded-[34px] border-[6px] border-slate-800 bg-[#0d1117] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
            <div className="border-b border-white/10 bg-white/[0.04] px-4 py-3 text-center">
              <div className="text-[13px] font-semibold text-white">YourStore</div>
              <div className="text-[10px] text-slate-500">SMS</div>
            </div>
            <div className="space-y-3 px-3 py-4">
              {[
                {
                  time: pick(lang, "৩০ মিনিট পর", "After ~30 min"),
                  text: pick(lang, "হ্যালো রহিম, আপনি YourStore-এ Gift Box কিনতে চেয়েছিলেন কিন্তু অর্ডারটি সম্পন্ন করেননি। অর্ডার কনফার্ম করতে এখানে ক্লিক করুন: yourstore.com/checkout", "Hi Rahim, you wanted to buy a Gift Box at YourStore but didn't complete the order. Tap here to confirm it: yourstore.com/checkout"),
                },
                {
                  time: pick(lang, "২ ঘণ্টা পর", "After ~2 hours"),
                  text: pick(lang, "হ্যালো রহিম! শুধু আপনার জন্য বিশেষ ছাড় 🎁 এখনই অর্ডার সম্পন্ন করুন: yourstore.com/checkout", "Hi Rahim! A special discount just for you 🎁 Complete your order now: yourstore.com/checkout"),
                },
              ].map((message, i) => (
                <motion.div key={lang + i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.45, delay: i * 0.2 }}>
                  <div className="mb-1 text-center text-[10px] font-medium text-slate-500">{message.time}</div>
                  <div className="rounded-2xl rounded-tl-md bg-[#1f2a37] px-3 py-2.5 text-[12.5px] leading-5 text-slate-100">{message.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] text-slate-500">{pick(lang, "নমুনা মেসেজ, টেমপ্লেট আপনি নিজে বদলাতে পারবেন", "Sample messages. You can edit the templates yourself")}</p>
        </motion.div>

        <motion.div {...fade(1)}>
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">⚙️ {pick(lang, "অ্যাডমিন সেটিংস", "Admin settings")}</div>
          <p className="mt-2 text-[13.5px] leading-6 text-slate-400">
            {pick(lang, "সব নিয়ন্ত্রণ ড্যাশবোর্ড থেকে: কোন গেটওয়ে, কত মিনিট পর, কী লেখা থাকবে। কোড ছোঁয়ার দরকার নেই।", "Everything is controlled from the dashboard: which gateway, how many minutes later, and what the message says. No code needed.")}
          </p>
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0e16] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-rose-400/70" />
              <span className="h-2 w-2 rounded-full bg-amber-400/70" />
              <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
              <span className="ml-2 text-[10px] text-slate-500">sms-recovery-settings</span>
            </div>
            {settingsImage ? (
              <img src={settingsImage} alt="Automatic SMS recovery settings" className="w-full object-cover" loading="lazy" decoding="async" />
            ) : (
              <div className="space-y-3 p-4 text-[12px]">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                  <span className="font-semibold text-slate-200">{pick(lang, "অটোমেটিক SMS চালু", "Enable automatic SMS")}</span>
                  <span className="relative h-5 w-9 rounded-full bg-emerald-500"><span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white" /></span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Setting label={pick(lang, "SMS গেটওয়ে", "SMS gateway")} value="Alpha SMS / BulkSMSBD / Custom" />
                  <Setting label="API Key" value="••••••••••••" />
                  <Setting label={pick(lang, "রিমাইন্ডার (মিনিট)", "Reminder (minutes)")} value="30" />
                  <Setting label={pick(lang, "ডিসকাউন্ট (মিনিট)", "Discount (minutes)")} value="120" />
                </div>
                <div>
                  <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">{pick(lang, "মেসেজ টেমপ্লেট", "Message template")}</div>
                  <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 leading-5 text-slate-300">
                    {pick(lang, "হ্যালো {name}, আপনি {products} কিনতে চেয়েছিলেন... {checkout_url}", "Hi {name}, you wanted to buy {products}... {checkout_url}")}
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-2 font-semibold text-cyan-200">🧪 Test SMS</div>
              </div>
            )}
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{pick(lang, "নমুনা ডেটা, আসল কোনো তথ্য নয়", "Sample data, no real information")}</p>
        </motion.div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <motion.h5 {...fade()} className="text-center font-serif text-lg font-semibold text-white sm:text-2xl">
          {pick(lang, "যেসব সুরক্ষা ও সুবিধা আছে", "Built-in safeguards & features")}
        </motion.h5>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div key={feature.en} {...fade(i % 3)} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-amber-400/30 hover:bg-amber-400/[0.04]">
              <div className="text-xl">{feature.emoji}</div>
              <div className="mt-2 text-[14px] font-semibold text-white">{pick(lang, feature.bn, feature.en)}</div>
              <p className="mt-1 text-[12.5px] leading-5 text-slate-400">{pick(lang, feature.dBn, feature.dEn)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div {...fade()} className="mx-auto mt-10 max-w-5xl rounded-2xl border border-cyan-300/15 bg-cyan-400/[0.04] p-5">
        <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">⚙️ {pick(lang, "ভেতরে যা ব্যবহার হয়েছে", "Under the hood")}</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] font-medium text-slate-200">{item}</span>)}
        </div>
      </motion.div>

      <motion.div {...fade()} className="mx-auto mt-10 max-w-5xl rounded-2xl border border-amber-400/25 bg-gradient-to-br from-amber-500/[0.10] via-transparent to-rose-500/[0.08] p-6 text-center">
        <p className="mx-auto max-w-xl font-serif text-[16px] font-semibold leading-snug text-white sm:text-xl">
          {pick(lang, "আপনার WooCommerce স্টোরে এই রিকভারি সিস্টেম চান?", "Want this recovery system on your WooCommerce store?")}
        </p>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-slate-400">
          {pick(lang, "আপনার গেটওয়ে, মেসেজ ও সময় অনুযায়ী সেট করে দেব।", "I'll set it up with your gateway, your messages and your timing.")}
        </p>
        <a href="#contact" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 px-7 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(251,113,133,0.25)] transition hover:-translate-y-0.5">
          💬 {pick(lang, "আমার স্টোরের জন্য চাই", "Get this for my store")}
        </a>
      </motion.div>
    </section>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-[10.5px] font-semibold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-slate-300">{value}</div>
    </div>
  );
}
