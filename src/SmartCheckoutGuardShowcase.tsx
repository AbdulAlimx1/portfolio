import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoBlock } from "./WhatsAppAgentShowcase";

type Lang = "bn" | "en";
type Props = {
  lang: Lang;
  /** YouTube ভিডিও ID, যেমন "dQw4w9WgXcQ" */
  youtubeId?: string;
  /** অথবা নিজের MP4 ফাইল (import করা) */
  videoSrc?: string;
  videoPoster?: string;
};
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
  cyan: { text: "text-cyan-300", box: "border-cyan-400/30 bg-cyan-500/10", active: "border-cyan-400/50 bg-cyan-500/10", line: "from-transparent via-cyan-400 to-transparent", bar: "bg-cyan-400" },
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
  /* 1. ফেক অর্ডার ব্লকিং */
  {
    id: "blocking",
    emoji: "🛡️",
    tone: "rose",
    name: ["ফেক অর্ডার ব্লকিং", "Fake Order Blocking"],
    short: ["ফোন, IP, ইমেইল ধরে ব্লক", "Blocks by phone, IP, email"],
    desc: [
      "একই ফোন, IP বা ইমেইল থেকে বারবার ফেক বা মজা করে COD অর্ডার এলে, ডেলিভারি চার্জ নষ্ট হওয়ার আগেই অর্ডার আটকে দেয়। কাস্টমার চেকআউটে ফোন নম্বর লিখলেই সাথে সাথে সতর্কবার্তা দেখে।",
      "Stops repeated fake or prank COD orders from the same phone, IP or email before you lose money on delivery. Customers see a warning the moment they type their number.",
    ],
    features: [
      ["ফোন, IP ও ইমেইল আলাদা আলাদা চালু বা বন্ধ করা যায়", "Phone, IP and email can each be turned on or off"],
      ["একটাই নিয়ম: কয়টা অর্ডারের পর কতক্ষণ ব্লক থাকবে", "One simple rule: block after how many orders, and for how long"],
      ["ডিভাইস ফিঙ্গারপ্রিন্ট: VPN বা IP বদলালেও একই ব্রাউজারে ব্লক থাকে", "Device fingerprint: changing IP or using a VPN won't get around the block"],
      ["চেকআউটে সাথে সাথে সতর্কবার্তা, আগের অর্ডারের কার্ড আর WhatsApp/Messenger সাহায্য বাটন (আপনার মেসেজসহ)", "Instant warning at checkout, a previous-order card, and WhatsApp/Messenger help buttons with your own message"],
      ["নিজে হাতে লক বা আনলক করা যায়, আর এখন কী কী লক আছে তার তালিকা দেখা যায়", "Lock or unlock by hand, and see a list of what is locked right now"],
      ["রিপোর্ট টেবিল, আর কিছুদিন পর পুরনো ডেটা নিজে নিজে মুছে যায়", "Report table, with old data deleted automatically after some time"],
    ],
    previewTitle: ["চেকআউটে কাস্টমার যা দেখে", "What the customer sees at checkout"],
    preview: [
      { k: "bad", t: ["এই নম্বর থেকে এখন অর্ডার নেওয়া যাচ্ছে না", "Orders from this number are paused"] },
      { k: "muted", t: ["২ ঘণ্টা পর আবার চেষ্টা করুন", "Please try again in 2 hours"] },
      { k: "chip", t: ["আপনার আগের অর্ডার · #1234 · Processing · ৩৩ মিনিট আগে", "Your previous order · #1234 · Processing · 33 min ago"] },
      { k: "btn", t: ["WhatsApp", "WhatsApp"] },
    ],
  },

  /* 2. ইনকমপ্লিট অর্ডার রিকভারি */
  {
    id: "recovery",
    emoji: "🛒",
    tone: "amber",
    name: ["ইনকমপ্লিট অর্ডার রিকভারি", "Incomplete Order Recovery"],
    short: ["হারানো বিক্রি ফিরিয়ে আনে", "Wins back lost sales"],
    desc: [
      "কাস্টমার ফর্ম ভরে অর্ডার না দিয়ে চলে গেলেও তার তথ্য সেভ থাকে। তারপর WhatsApp, ইমেইল বা অটো SMS দিয়ে তাকে ফিরিয়ে আনা যায়, আর এক ক্লিকে সেটা আসল অর্ডার হয়ে যায়।",
      "If a customer fills the form and leaves, their details are already saved. Bring them back with WhatsApp, email or auto SMS, and turn it into a real order in one click.",
    ],
    features: [
      ["কাস্টমার টাইপ করার সাথে সাথে নাম, ফোন/ইমেইল ও কার্ট সেভ হয়", "Name, phone/email and cart are saved while the customer types"],
      ["WhatsApp ও ইমেইলে ফলোআপ, মেসেজের টেমপ্লেট নিজে বদলানো যায়", "WhatsApp and email follow-up, with message templates you can edit"],
      ["অটো SMS: রিমাইন্ডার ও ডিসকাউন্ট মেসেজ আলাদা আলাদা সময়ে যায়", "Auto SMS: a reminder and a discount message, sent at different times"],
      ["Alpha SMS, BulkSMSBD বা নিজের কাস্টম HTTP গেটওয়ে", "Alpha SMS, BulkSMSBD or your own custom HTTP gateway"],
      ["এক ক্লিকে আসল WooCommerce অর্ডার (Processing)", "One click to a real WooCommerce order (Processing)"],
      ["Incomplete ও Recovered আলাদা তালিকা, আর কতদিন রাখবে সেটার সেটিং", "Separate Incomplete and Recovered lists, with a setting for how long to keep them"],
    ],
    previewTitle: ["অ্যাডমিন তালিকা (নমুনা)", "Admin list (sample)"],
    preview: [
      { k: "head", t: ["রহিম · 017••••••••", "Rahim · 017••••••••"] },
      { k: "muted", t: ["Gift Box × 1 · ৳১,২৫০ · ঢাকা", "Gift Box × 1 · ৳1,250 · Dhaka"] },
      { k: "chip", t: ["আগের অর্ডার নেই", "No previous order"] },
      { k: "btn", t: ["WhatsApp · ইমেইল · Recover", "WhatsApp · Email · Recover"] },
    ],
  },

  /* 3. Telegram অ্যালার্ট */
  {
    id: "telegram",
    emoji: "🔔",
    tone: "sky",
    name: ["Telegram অ্যালার্ট", "Telegram Alerts"],
    short: ["অর্ডারের খবর সাথে সাথে ফোনে", "Order news on your phone, instantly"],
    desc: [
      "একটা বট দিয়েই তিন রকম খবর সরাসরি ফোনে পাবেন: নতুন অর্ডার, ব্লক হওয়া অর্ডার আর অসম্পূর্ণ অর্ডার। চাইলে সব এক গ্রুপে, আবার চাইলে আলাদা আলাদা গ্রুপে পাঠাতে পারবেন।",
      "With just one bot you get three kinds of news on your phone: new orders, blocked orders and unfinished orders. Send them all to one group, or to separate groups.",
    ],
    features: [
      ["তিন রকম অ্যালার্ট, প্রতিটা আলাদা করে চালু বা বন্ধ করা যায়, আলাদা গ্রুপেও পাঠানো যায়", "Three alerts. Turn each one on or off, and send each to its own group if you like"],
      ["নতুন অর্ডার (COD-সহ) হলেই সাথে সাথে মেসেজ আসে", "A message arrives the moment a new order (including COD) is placed"],
      ["একই কাস্টমার বারবার ব্লক হলে মেসেজ আসে", "A message arrives when the same customer keeps getting blocked"],
      ["কেউ চেকআউট ছেড়ে গেলে মেসেজ আসে, বারবার ছাড়লে 🔁 চিহ্ন থাকে", "A message arrives when someone leaves checkout, with a 🔁 mark if it keeps happening"],
      ["কাস্টমারের আগের অর্ডার থাকলে লিংকসহ দেখায়", "If the customer has a previous order, it is shown with a link"],
      ["প্রতিটার জন্য Test বাটন আছে, আর Chat ID সহজে বের করার সুবিধা আছে", "A Test button for each alert, and an easy way to find your Chat ID"],
    ],
    previewTitle: ["Telegram মেসেজ (নমুনা)", "Telegram message (sample)"],
    preview: [
      { k: "head", t: ["🛒 নতুন অর্ডার #1251", "🛒 New order #1251"] },
      { k: "text", t: ["রহিম · Cash on Delivery", "Rahim · Cash on Delivery"] },
      { k: "muted", t: ["Gift Box × 1 · ৳১,২৫০", "Gift Box × 1 · ৳1,250"] },
      { k: "chip", t: ["🔁 এই কাস্টমার আগেও চেকআউট ছেড়ে গেছেন", "🔁 This customer has left checkout before"] },
    ],
  },

  /* 4. Meta ট্র্যাকিং */
  {
    id: "pixel",
    emoji: "📊",
    tone: "blue",
    name: ["Meta ট্র্যাকিং (Pixel ও CAPI)", "Meta Tracking (Pixel & CAPI)"],
    short: ["ব্রাউজার + সার্ভার ট্র্যাকিং", "Browser + server tracking"],
    desc: [
      "ব্রাউজার Pixel আর সার্ভার Conversions API একসাথে চলে। দুটোতেই একই Event ID যায়, তাই Meta একটা ইভেন্ট দুইবার গোনে না। Purchase ইভেন্ট কখন যাবে, সেটাও পুরোপুরি আপনার হাতে।",
      "Browser Pixel and server-side Conversions API work together and share one Event ID, so Meta never counts an event twice. You also fully control when the Purchase event is sent.",
    ],
    features: [
      ["Purchase ইভেন্টের পুরো কন্ট্রোল আপনার হাতে: অর্ডার Completed হলে (বা আপনার বেছে নেওয়া স্ট্যাটাসে) তবেই Purchase যাবে", "Full control of the Purchase event: it is sent only when an order reaches Completed (or any status you choose)"],
      ["একাধিক Pixel, প্রতিটার নিজের CAPI টোকেন ও Test Event Code", "Multiple Pixels, each with its own CAPI token and Test Event Code"],
      ["প্রতিটা Pixel-এ সব প্রোডাক্ট, অথবা শুধু বেছে নেওয়া প্রোডাক্ট", "Each Pixel tracks all products, or only the ones you pick"],
      ["PageView, ViewContent, AddToCart, InitiateCheckout, Purchase: প্রতিটার আলাদা সুইচ", "PageView, ViewContent, AddToCart, InitiateCheckout, Purchase: each has its own switch"],
      ["Browser ও Server ইভেন্টে একই Event ID, তাই ডুপ্লিকেট হয় না", "Same Event ID on browser and server events, so no duplicates"],
      ["শপ পেজ, সিঙ্গেল প্রোডাক্ট ও WooCommerce Blocks-এ AddToCart ট্র্যাকিং", "AddToCart tracking on shop pages, single products and WooCommerce Blocks"],
      ["ইমেইল, ফোন ও নাম SHA-256 হ্যাশ করে পাঠায়, তাই তথ্য নিরাপদ", "Email, phone and name are SHA-256 hashed before sending, so data stays safe"],
      ["Domain Verification আর Purchase History (পেজ ভাগ করা, Delete All বাটনসহ)", "Domain Verification and Purchase History (with pages and a Delete All button)"],
    ],
    previewTitle: ["Purchase ইভেন্ট (নমুনা)", "Purchase event (sample)"],
    preview: [
      { k: "chip", t: ["Purchase যাবে: অর্ডার Completed হলে", "Purchase is sent when: order is Completed"] },
      { k: "ok", t: ["Browser Pixel · Purchase · পাঠানো হয়েছে", "Browser Pixel · Purchase · sent"] },
      { k: "ok", t: ["Conversions API · Purchase · পাঠানো হয়েছে", "Conversions API · Purchase · sent"] },
      { k: "muted", t: ["Event ID একই, Meta ডুপ্লিকেট ধরবে না", "Same Event ID, Meta will not count it twice"] },
    ],
  },

  /* 5. কুরিয়ার */
  {
    id: "courier",
    emoji: "🚚",
    tone: "emerald",
    name: ["কুরিয়ার", "Courier"],
    short: ["সব কুরিয়ার এক জায়গায়", "All couriers in one place"],
    desc: [
      "বাংলাদেশের সব কুরিয়ারের API এখানে সেট করা যায়। অর্ডার দেওয়ার আগেই দেখে নিন, কাস্টমার আগে কত অর্ডার করেছে, কয়টা রিসিভ করেছে আর রিসিভের হার কত। তারপর এক ক্লিকে কুরিয়ারে পাঠান।",
      "Set up the API of every courier in Bangladesh here. See how many orders a customer placed before, how many they received, and their receive rate. Then send it to the courier in one click.",
    ],
    features: [
      ["বাংলাদেশের সব কুরিয়ারের API সেট করা যায়", "Set up the API of every Bangladeshi courier"],
      ["কাস্টমারের অর্ডার হিস্ট্রি রিয়েল টাইমে প্লাগিনের নিজস্ব অর্ডার ড্যাশবোর্ডে দেখা যায়", "See the customer's order history in real time, inside the plugin's own order dashboard"],
      ["এক ক্লিকে অর্ডার কুরিয়ারে পাঠানো যায়, একসাথে অনেকগুলোও পারবেন", "Send an order to the courier in one click, or many together"],
      ["প্রতিটা কুরিয়ার থেকে মোট কয়টা অর্ডার করেছে, কয়টা রিসিভ করেছে আর রিসিভ রেশিও কত, সব দেখায়", "For each courier, shows total orders, how many were received, and the receive ratio"],
    ],
    previewTitle: ["কাস্টমারের কুরিয়ার রেশিও (নমুনা)", "Customer's courier ratio (sample)"],
    preview: [
      { k: "head", t: ["রহিম · 017••••••••", "Rahim · 017••••••••"] },
      { k: "ok", t: ["কুরিয়ার ১ · মোট ১০ · রিসিভ ৯ · রেশিও ৯০%", "Courier 1 · total 10 · received 9 · ratio 90%"] },
      { k: "ok", t: ["কুরিয়ার ২ · মোট ৪ · রিসিভ ৪ · রেশিও ১০০%", "Courier 2 · total 4 · received 4 · ratio 100%"] },
      { k: "btn", t: ["কুরিয়ারে পাঠান", "Send to courier"] },
    ],
  },

  /* 6. ইনভয়েস সেটিং */
  {
    id: "invoice",
    emoji: "🧾",
    tone: "violet",
    name: ["ইনভয়েস সেটিং", "Invoice Settings"],
    short: ["নিজের লেটারহেডে প্রিন্ট", "Print on your own letterhead"],
    desc: [
      "অর্ডার ড্যাশবোর্ড থেকে যে ইনভয়েস প্রিন্ট হয়, তাতে থাকে আপনার কোম্পানির লোগো, ঠিকানা আর BIN বা ট্রেড লাইসেন্স নম্বর। A4 বা Letter কাগজে পরিষ্কার প্রিন্ট হয়।",
      "Invoices printed from the order dashboard carry your company logo, address and BIN or trade licence number, and print cleanly on A4 or Letter paper.",
    ],
    features: [
      ["কোম্পানির নাম, লোগো, ঠিকানা, ফোন, ইমেইল ও ওয়েবসাইট", "Company name, logo, address, phone, email and website"],
      ["BIN / ট্রেড লাইসেন্স নম্বর", "BIN / trade licence number"],
      ["ইনভয়েস নম্বরের শুরুর অক্ষর আর নিজের পছন্দের রং", "Invoice number prefix and your own colour"],
      ["Bill To বক্স আর আইটেম টেবিল (প্রতিটার দাম ও মোট দাম)", "Bill To box and item table (price of each item and line total)"],
      ["Subtotal, Discount, Shipping, Tax ও Total", "Subtotal, Discount, Shipping, Tax and Total"],
      ["নিচে নিজের নোট লেখা যায়", "Write your own note at the bottom"],
    ],
    previewTitle: ["ইনভয়েস হেডার (নমুনা)", "Invoice header (sample)"],
    preview: [
      { k: "head", t: ["আপনার কোম্পানি", "Your Company"] },
      { k: "muted", t: ["ঠিকানা · ফোন · BIN: ••••••", "Address · Phone · BIN: ••••••"] },
      { k: "chip", t: ["INV-1251 · Bill To: রহিম", "INV-1251 · Bill To: Rahim"] },
      { k: "text", t: ["Subtotal · Shipping · Total", "Subtotal · Shipping · Total"] },
    ],
  },

  /* 7. কাস্টম অর্ডার ড্যাশবোর্ড */
  {
    id: "dashboard",
    emoji: "🗂️",
    tone: "cyan",
    name: ["কাস্টম অর্ডার ড্যাশবোর্ড", "Custom Order Dashboard"],
    short: ["সব অর্ডার এক স্ক্রিনে", "Every order on one screen"],
    desc: [
      "সব অর্ডারের তথ্য এক জায়গায় সহজে দেখা যায়। এখান থেকেই কুরিয়ারে পাঠানো, ইনভয়েস প্রিন্ট আর কাস্টমারের কুরিয়ার রেশিও দেখা, সবকিছু করা যায়।",
      "See all your order information easily in one place. Send to courier, print invoices and check the customer's courier ratio, all from here.",
    ],
    features: [
      ["এক জায়গায় সব অর্ডারের তথ্য সহজে দেখা যায়", "All order information is easy to see in one place"],
      ["এক ক্লিকে কুরিয়ারে পাঠানো", "Send to courier in one click"],
      ["এক ক্লিকে ইনভয়েস প্রিন্ট", "Print an invoice in one click"],
      ["কাস্টমারের কুরিয়ার রেশিও দেখা যায়", "Check the customer's courier ratio"],
      ["ফিল্টার ও সার্চ: অর্ডার নম্বর, নাম, ফোন, তারিখ, স্ট্যাটাস, কুরিয়ারে পাঠানো হয়েছে কি না", "Filter and search by order number, name, phone, date, status, and whether it was sent to courier"],
      ["অর্ডারের স্ট্যাটাস সেখানেই বদলানো যায়", "Change the order status right there"],
      ["একসাথে অনেক অর্ডারে কাজ: স্ট্যাটাস বদল, ট্র্যাশ, কুরিয়ার, Meta Purchase, সাথে প্রগ্রেস দেখা ও থামানোর বাটন", "Work on many orders at once: status, trash, courier, Meta Purchase, with progress and a stop button"],
      ["কাস্টমারের আগের অর্ডারের হিস্ট্রি ও WhatsApp বাটন", "Customer's previous order history and a WhatsApp button"],
    ],
    previewTitle: ["অর্ডার সারি (নমুনা)", "Order row (sample)"],
    preview: [
      { k: "head", t: ["#1251 · রহিম · ৳১,২৫০", "#1251 · Rahim · ৳1,250"] },
      { k: "ok", t: ["কুরিয়ার রেশিও ৯০%", "Courier ratio 90%"] },
      { k: "btn", t: ["কুরিয়ারে পাঠান", "Send to courier"] },
      { k: "chip", t: ["ইনভয়েস প্রিন্ট", "Print invoice"] },
    ],
  },
];

const problems: { emoji: string; p: T; s: T }[] = [
  { emoji: "📵", p: ["ফেক ও মজা করা COD অর্ডার", "Fake and prank COD orders"], s: ["অর্ডার হওয়ার আগেই আটকে যায়", "Stopped before they are placed"] },
  { emoji: "🚪", p: ["চেকআউট ছেড়ে চলে যাওয়া কাস্টমার", "Shoppers leaving at checkout"], s: ["তথ্য সেভ থাকে, SMS ও WhatsApp-এ ফিরিয়ে আনা যায়", "Details saved, win them back by SMS and WhatsApp"] },
  { emoji: "📦", p: ["হাতে হাতে কুরিয়ার বুকিং", "Booking couriers by hand"], s: ["রেশিও দেখে এক ক্লিকে পাঠান", "Check the ratio, send in one click"] },
  { emoji: "📉", p: ["বিজ্ঞাপনের ভুল বা ডুপ্লিকেট ডেটা", "Wrong or duplicate ad data"], s: ["Pixel + CAPI একই Event ID-তে", "Pixel + CAPI on one Event ID"] },
];

const compat = ["WooCommerce 6.0+", "HPOS", "Cart & Checkout Blocks", "PHP 7.4+", "বাংলা + English"];

/* কার্ডের কভার ছবি (SVG, আলাদা ছবি লাগবে না) */
const coverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#050816"/><stop offset="1" stop-color="#0a2a22"/></linearGradient><linearGradient id="a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#22d3ee"/></linearGradient></defs><rect width="1600" height="1000" fill="url(#g)"/><circle cx="1300" cy="180" r="280" fill="#34d399" opacity=".07"/><circle cx="260" cy="840" r="300" fill="#22d3ee" opacity=".07"/><rect x="130" y="250" width="380" height="110" rx="30" fill="#fff" opacity=".08"/><rect x="170" y="290" width="220" height="16" rx="8" fill="#fff" opacity=".3"/><rect x="1090" y="640" width="380" height="110" rx="30" fill="#fff" opacity=".08"/><rect x="1130" y="680" width="240" height="16" rx="8" fill="#fff" opacity=".3"/><rect x="1120" y="230" width="340" height="90" rx="26" fill="#fb7185" opacity=".22"/><rect x="150" y="700" width="340" height="90" rx="26" fill="#fbbf24" opacity=".2"/><path d="M800 190 L1070 300 V520 C1070 710 950 815 800 880 C650 815 530 710 530 520 V300 Z" fill="url(#a)" opacity=".16"/><path d="M800 190 L1070 300 V520 C1070 710 950 815 800 880 C650 815 530 710 530 520 V300 Z" fill="none" stroke="url(#a)" stroke-width="14"/><path d="M680 530 L770 620 L930 430" fill="none" stroke="url(#a)" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

export const smartCheckoutCover = `data:image/svg+xml;utf8,${encodeURIComponent(coverSvg)}`;

const previewStyle: Record<Line["k"], string> = {
  head: "text-[13px] font-semibold text-white",
  text: "text-[12.5px] text-slate-200",
  muted: "text-[12px] text-slate-400",
  chip: "rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1.5 text-[11.5px] text-slate-300",
  btn: "inline-flex w-fit rounded-full bg-emerald-500/90 px-3.5 py-1.5 text-[12px] font-bold text-white",
  ok: "flex items-center gap-2 text-[12px] text-emerald-200 before:content-['✓'] before:font-bold",
  bad: "rounded-lg border border-rose-400/40 bg-rose-500/15 px-2.5 py-2 text-[12.5px] font-semibold text-rose-100",
};

export default function SmartCheckoutShowcase({ lang, youtubeId, videoSrc, videoPoster }: Props) {
  const [activeId, setActiveId] = useState(modules[0].id);
  const active = modules.find((m) => m.id === activeId) ?? modules[0];
  const tone = tones[active.tone];

  return (
    <section className="border-t border-white/10 px-5 py-8 sm:px-6">
      {/* Header */}
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
          {pick(lang, ["প্লাগিন ওভারভিউ", "Plugin overview"])}
        </div>
        <h4 className="mt-4 font-serif text-xl font-semibold leading-snug text-white sm:text-3xl">
          {pick(lang, [
            "WooCommerce স্টোর সহজে চালানোর জন্য বানানো প্লাগিন",
            "A plugin built to make running a WooCommerce store easy",
          ])}
        </h4>
        <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-7 text-slate-400">
          {pick(lang, [
            "ফেক অর্ডার আটকানো, হারানো অর্ডার ফিরিয়ে আনা, কুরিয়ারে পাঠানো আর Meta ট্র্যাকিং, সব একটা ড্যাশবোর্ড আর একটা লাইসেন্সে।",
            "Block fake orders, win back lost ones, send to couriers and track Meta events, all from one dashboard with one licence.",
          ])}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {compat.map((c) => (
            <span key={c} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[12px] font-medium text-slate-200">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Video */}
      <div className="mx-auto mt-10 max-w-4xl">
        <div className="mb-4 text-center">
          <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-300">
            🎬 {pick(lang, ["ভিডিওতে দেখুন", "Watch it in action"])}
          </div>
          <p className="mt-1 text-[13.5px] text-slate-400">
            {pick(lang, ["প্লাগিনের সব ফিচার ভিডিওতে দেখানো হয়েছে।", "Every feature of the plugin, shown on video."])}
          </p>
        </div>
        <VideoBlock lang={lang} youtubeId={youtubeId} videoSrc={videoSrc} videoPoster={videoPoster} />
      </div>

      {/* Problem -> solution */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {problems.map((x) => (
          <div key={x.p[1]} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-2xl">{x.emoji}</div>
            <div className="mt-2 text-[13.5px] font-semibold text-white">{pick(lang, x.p)}</div>
            <div className="mt-1 text-[12.5px] leading-5 text-emerald-300/90">{pick(lang, x.s)}</div>
          </div>
        ))}
      </div>

      {/* Feature explorer */}
      <div className="mx-auto mt-12 max-w-5xl">
        <h5 className="text-center font-serif text-lg font-semibold text-white sm:text-2xl">
          {pick(lang, ["সাতটা মডিউল, প্রতিটার ভেতরে কী আছে", "Seven modules, and what's inside each"])}
        </h5>
        <p className="mt-2 text-center text-[13px] text-slate-400">{pick(lang, ["একটায় ক্লিক করে দেখুন", "Select one to explore"])}</p>

        <div className="mt-6 grid gap-5 lg:grid-cols-[270px_1fr]">
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
              className="relative overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/60 p-5 sm:p-6"
            >
              <div className={"absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r " + tone.line} />
              <div className="flex items-center gap-3">
                <span className={"grid h-12 w-12 place-items-center rounded-2xl border text-2xl " + tone.box}>{active.emoji}</span>
                <h6 className="font-serif text-lg font-semibold text-white sm:text-xl">{pick(lang, active.name)}</h6>
              </div>
              <p className="mt-4 text-[14px] leading-7 text-slate-300">{pick(lang, active.desc)}</p>

              <div className="mt-5 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
                <ul className="space-y-2.5">
                  {active.features.map((f) => (
                    <li key={f[1]} className="flex items-start gap-2.5 text-[13.5px] leading-6 text-slate-200">
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
                        <div key={l.t[1]} className={previewStyle[l.k]}>
                          {pick(lang, l.t)}
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-500">
                    {pick(lang, ["নমুনা ডেটা, আসল কাস্টমারের তথ্য নয়", "Sample data, not real customer information"])}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Built-in */}
      <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {([
          ["🔑", ["একটা লাইসেন্সে সব মডিউল", "One licence, every module"], ["এক কী, এক ওয়েবসাইট", "One key, one website"]],
          ["⬆️", ["অটো আপডেট", "Automatic updates"], ["নতুন ভার্সন এলে Plugins পেজেই \"Update Available\" দেখায়", "When a new version is out, \"Update Available\" shows on the Plugins page"]],
          ["🗄️", ["ডেটা আপনার সাইটেই থাকে", "Data stays on your site"], ["কিছুদিন পর নিজে নিজে মুছে ফেলার সেটিং আছে", "You can set it to delete automatically after some time"]],
          ["🇧🇩", ["বাংলা ও English ড্যাশবোর্ড", "Bangla and English dashboard"], ["চেকআউটের মেসেজ নিজের মতো লেখা যায়", "Checkout messages can be written your way"]],
        ] as [string, T, T][]).map(([emoji, a, b]) => (
          <div key={a[1]} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-xl">{emoji}</div>
            <div className="mt-2 text-[14px] font-semibold text-white">{pick(lang, a)}</div>
            <p className="mt-1 text-[12.5px] leading-5 text-slate-400">{pick(lang, b)}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-emerald-400/25 bg-gradient-to-br from-emerald-500/[0.10] via-transparent to-cyan-500/[0.08] p-6 text-center">
        <p className="mx-auto max-w-xl font-serif text-[16px] font-semibold leading-snug text-white sm:text-xl">
          {pick(lang, [
            "এই প্লাগিন দিয়ে এই সব ফিচারসহ আপনার ই-কমার্স ওয়েবসাইট বানাতে চান?",
            "Want to build your e-commerce website with this plugin and all these features?",
          ])}
        </p>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-6 text-slate-400">
          {pick(lang, ["তাহলে আমার সাথে যোগাযোগ করুন।", "Then get in touch with me."])}
        </p>
        <a
          href="#contact"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 px-7 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5"
        >
          💬 {pick(lang, ["যোগাযোগ করুন", "Contact me"])}
        </a>
      </div>
    </section>
  );
}