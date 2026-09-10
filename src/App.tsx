import { useEffect, useMemo, useRef, useState, useCallback, FormEvent } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { sendForm } from "@emailjs/browser";
import Lenis from "lenis";

// ★ ফাইলের একদম উপরে এই imports যোগ করুন (অন্যান্য import-এর পরে)
import PCV from "./Asset/Photos/PCV.webp";
import MobielV from "./Asset/Photos/MobielV.webp";
import CocoahavenLogo from "./Asset/Photos/CocoahavenLogo.webp";
import PoshakerBazarLogo from "./Asset/Photos/poshakerbazarlogo.webp";
import PoshakerBazarWebsite from "./Asset/Photos/poshakerbazarwebsite.webp";
import Poshingle from "./Asset/Photos/poshingel.webp";
import SinglePage from "./Asset/Photos/singelpage.webp";
import CartPage from "./Asset/Photos/CartPage.webp";
import CheckOutPage from "./Asset/Photos/ChackOutPage.webp";
import ThankYouPage from "./Asset/Photos/ThankYouPage.webp";
import ShoppImage from "./Asset/Photos/Shopp.webp";
import Poshaker from "./Asset/Photos/poshaker.webp";
import dealImage from "./Asset/Photos/deal.webp";
import WordPressLogo from "./Asset/Photos/wordpress-logo.webp";
import AbdulAlim from "./Asset/Photos/AbdulAlim.webp";
import AbdulAlimMir from "./Asset/Photos/AbdulAlimMir.webp";

/* ───────────────────────── TYPES ───────────────────────── */
type Project = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  tags: string[];
  cover: string;
  gallery: string[];
  href?: string;
  role: string;
  stack: string[];
  year: number;
  highlights: string[];
  features?: string[];
  type: "website" | "automation";
  logo?: string;
  category?: string;
  status?: string;
  review: {
    clientName: string;
    clientRole: string;
    rating: number;
    text: string;
    verifyLink?: string;
    verifyLabel?: string;
  };
  visible?: boolean;
};

/* ───────────────────────── PROJECT DATA (Updated with reviews) ───────────────────────── */
const projects: Project[] = [
  {
    id: "p1",
    title: "Cocoa Haven – Gift Shop",
    slug: "cocoa-haven",
    summary:
      "A modern gift shop website designed to showcase and sell customized chocolate gift items in an elegant and engaging way.",
    description:
      "Cocoa Haven is a cozy online shop for customized chocolate gifts, designed with a clean look and smooth shopping experience powered by WooCommerce.",
    tags: ["WordPress CMS"],
    cover: PCV,
    gallery: [SinglePage, CartPage, CheckOutPage, ThankYouPage, ShoppImage],
    href: "https://cocoahavenbd.com/",
    role: "Lead Developer & Designer",
    stack: ["WordPress"],
    year: 2026,
    highlights: [
      "Easy to find Product Category",
      "Footer Navigation Menu",
      "Instant Customer Support System",
      "Mobile-Friendly Responsive Design",
      "Smooth Product Browsing Experience",
    ],
    features: [
      "Courier Integration",
      "One-Click Order Processing",
      "Brand-Based UI Design",
      "Fake Order Detection",
      "Incomplete Order Tracking",
      "Easy Checkout Process",
      "Product-Based Photo & Custom Note Collection",
      "Auto District & Thana Selector",
      "Facebook Pixel & Conversion API Tracking",
    ],
    type: "website",
    logo: CocoahavenLogo,
    category: "E-commerce / Gift Shop",
    status: "Completed",
    review: {
      clientName: "Cocoa Haven",
      clientRole: "Gift Shop Brand",
      rating: 5,
      text: " খুবই চমৎকার কাজ হয়েছে। আমার নিস ও রিকোয়ারমেন্ট অনুযায়ী একদম পারফেক্ট ওয়েবসাইট তৈরি করেছো ধন্যবাদ। তোমার জন্য শুভকামনা রইল। ",
    },
  },
  {
    id: "p2",
    title: "Poshaker Bazar - Clothing Marketplace",
    slug: "poshaker-bazar",
    summary:
      "A stylish online clothing marketplace designed for easy browsing, product discovery, and quick checkout for fashion shoppers.",
    description:
      "Poshaker Bazar is an online fashion and clothing e-commerce brand.",
    tags: ["WordPress CMS"],
    cover: PoshakerBazarWebsite,
    gallery: [Poshingle, Poshaker],
    href: "https://poshakerbazar.com/",
    role: "Designer & Developer",
    stack: ["WordPress"],
    year: 2026,
    highlights: [
      "Easy product browsing",
      "Quick checkout process",
      "Mobile-friendly responsive design",
      "Fashion-focused UI/UX",
      "Secure payment integration"
    ],
    type: "website",
    logo: PoshakerBazarLogo,
    visible: false,
    category: "E-commerce / Fashion",
    status: "Completed",
    review: {
      clientName: "পোশাকের বাজার",
      clientRole: "Fashion Retail Brand",
      rating: 5,
      text: "Excellent work! One of the best experiences I’ve had within budget. Thank you for delivering such an amazing output within the budget. Really appreciate your effort and professionalism ❤️",
    },
  },
  {
    id: "p3",
    title: "RAG Knowledge Agent",
    slug: "rag-agent",
    summary:
      "An intelligent AI agent powered by Retrieval-Augmented Generation (RAG) that answers questions from custom knowledge bases with high accuracy.",
    description:
      "Built a production-ready RAG (Retrieval-Augmented Generation) AI agent that connects to custom knowledge bases — PDFs, documents, websites, and databases — to provide accurate, context-aware answers. The system uses vector embeddings for semantic search, ensuring relevant information retrieval. Integrated with n8n for workflow automation, the agent handles customer queries, internal documentation lookup, and knowledge management with minimal human intervention.",
    tags: ["n8n", "OpenAI", "Vector DB", "LangChain"],
    cover: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1600&auto=format",
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1600&auto=format",
    ],
    role: "AI Automation Architect",
    stack: ["n8n", "OpenAI API", "Pinecone", "Supabase", "Node.js", "Docker"],
    year: 2025,
    highlights: [
      "95%+ answer accuracy from custom docs",
      "Semantic search with vector embeddings",
      "Auto-sync with knowledge base updates",
      "Multi-format support: PDF, Web, DB",
    ],
    type: "website",
    visible: false,
    category: "AI Agent / RAG System",
    status: "Completed",
    review: {
      clientName: "Tech Solutions Ltd",
      clientRole: "SaaS Company",
      rating: 5,
      text: "The RAG agent transformed our customer support. Response accuracy improved dramatically and our team saves hours every day. The n8n integration makes everything seamless. Highly recommended for any business with complex documentation!",
    },
  },
  {
    id: "p4",
    title: "E-commerce AI Chatbot",
    slug: "ecom-chatbot",
    summary:
      "A smart WhatsApp & website chatbot for e-commerce stores that handles product queries, order tracking, and automated customer support 24/7.",
    description:
      "Developed an intelligent AI chatbot system for e-commerce businesses that operates across WhatsApp and website channels. The chatbot handles product recommendations, answers FAQs, tracks orders in real-time, processes return requests, and captures leads — all automatically. Built with n8n automation workflows, OpenAI for natural language understanding, and integrated directly with WooCommerce for live inventory and order data. The system reduced customer support tickets by 60% and increased after-hours conversions.",
    tags: ["n8n", "OpenAI", "WhatsApp API", "WooCommerce"],
    cover: "https://images.unsplash.com/photo-1531746790095-e5982b42ffee?q=80&w=2000&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?q=80&w=1600&auto=format",
      "https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=1600&auto=format",
    ],
    role: "Automation & AI Developer",
    stack: [
      "n8n",
      "OpenAI API",
      "WhatsApp Business API",
      "WooCommerce REST API",
      "Supabase",
      "Vercel",
    ],
    year: 2025,
    highlights: [
      "60% reduction in support tickets",
      "24/7 automated customer support",
      "Real-time order tracking integration",
      "Smart product recommendations",
    ],
    type: "website",
    visible: false,
    category: "AI Chatbot / E-commerce",
    status: "Completed",
    review: {
      clientName: "QuickMart BD",
      clientRole: "E-commerce Store",
      rating: 5,
      text: "Our support costs dropped by more than half! The chatbot handles most queries perfectly — product info, order tracking, returns — everything. Customers love the instant responses, especially on WhatsApp. Game changer for our business!",
    },
  },
];

type PluginItem = {
  id: string;
  nameEn: string;
  nameBn: string;
  taglineEn: string;
  taglineBn: string;
  descriptionEn: string;
  descriptionBn: string;
  featuresEn: string[];
  featuresBn: string[];
  screenshots: string[];
  accent: string;
  accentLight: string;
};

const wordpressPlugins: PluginItem[] = [
  {
    id: "incomplete-order-tracker",
    nameEn: "Incomplete Order Tracker",
    nameBn: "ইনকমপ্লিট অর্ডার ট্র্যাকার",
    taglineEn: "Recover lost sales from abandoned checkouts",
    taglineBn: "অসম্পূর্ণ চেকআউট থেকে হারানো বিক্রি ফিরিয়ে আনুন",
    descriptionEn:
      "A custom WooCommerce plugin that automatically captures customer details the moment they start checkout — even if they never complete the order. Store owners can instantly see who abandoned their cart, follow up via phone or SMS, and recover sales that would otherwise be lost forever.",
    descriptionBn:
      "একটি কাস্টম WooCommerce প্লাগিন যা কাস্টমার চেকআউট শুরু করার সাথে সাথেই তার তথ্য অটোমেটিক্যালি সংরক্ষণ করে — এমনকি অর্ডার সম্পূর্ণ না করলেও। স্টোর ওনার সাথে সাথে দেখতে পারেন কে কার্ট অ্যাবানডন করেছে, ফোন বা SMS-এর মাধ্যমে ফলোআপ করতে পারেন এবং যে বিক্রি হারিয়ে যেত তা রিকভার করতে পারেন।",
    featuresEn: [
      "Auto-captures name, phone & address before payment",
      "Real-time incomplete order dashboard",
      "One-click call / WhatsApp follow-up",
      "Separate status tag so it never mixes with real orders",
      "Daily/weekly abandoned-order summary",
    ],
    featuresBn: [
      "পেমেন্টের আগেই নাম, ফোন ও ঠিকানা অটো-ক্যাপচার",
      "রিয়েল-টাইম ইনকমপ্লিট অর্ডার ড্যাশবোর্ড",
      "এক-ক্লিকে কল / WhatsApp ফলোআপ",
      "আলাদা স্ট্যাটাস ট্যাগ, আসল অর্ডারের সাথে মিশে যায় না",
      "দৈনিক/সাপ্তাহিক অ্যাবানডন অর্ডার সামারি",
    ],
    screenshots: [],
    accent: "from-blue-500 to-indigo-600",
    accentLight: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    id: "fake-order-tracker",
    nameEn: "Fake Order Tracker",
    nameBn: "ফেক অর্ডার ট্র্যাকার",
    taglineEn: "Catch suspicious orders before they cost you",
    taglineBn: "সন্দেহজনক অর্ডার ক্ষতি করার আগেই ধরে ফেলুন",
    descriptionEn:
      "A smart fraud-detection plugin for WooCommerce that flags suspicious Cash-on-Delivery and repeat orders automatically. It cross-checks phone numbers and order patterns against a risk list, helping store owners avoid fake orders, prank orders, and courier return losses.",
    descriptionBn:
      "WooCommerce-এর জন্য একটি স্মার্ট ফ্রড-ডিটেকশন প্লাগিন যা সন্দেহজনক ক্যাশ-অন-ডেলিভারি ও রিপিট অর্ডার অটোমেটিক্যালি ফ্ল্যাগ করে। এটি ফোন নম্বর ও অর্ডার প্যাটার্ন রিস্ক লিস্টের সাথে ক্রস-চেক করে, ফলে স্টোর ওনাররা ফেক অর্ডার, প্র্যাংক অর্ডার এবং কুরিয়ার রিটার্ন লস এড়াতে পারেন।",
    featuresEn: [
      "Auto-flags risky phone numbers & repeat cancellations",
      "Custom blacklist / whitelist management",
      "Order-risk score shown right on the order page",
      "Reduces courier return & COD loss",
      "Admin alert for high-risk orders instantly",
    ],
    featuresBn: [
      "রিস্কি ফোন নম্বর ও রিপিট ক্যান্সেলেশন অটো-ফ্ল্যাগ",
      "কাস্টম ব্ল্যাকলিস্ট / হোয়াইটলিস্ট ম্যানেজমেন্ট",
      "অর্ডার পেজেই অর্ডার-রিস্ক স্কোর দেখা যায়",
      "কুরিয়ার রিটার্ন ও COD লস কমায়",
      "হাই-রিস্ক অর্ডারে সাথে সাথে অ্যাডমিন অ্যালার্ট",
    ],
    screenshots: [],
    accent: "from-rose-500 to-orange-600",
    accentLight: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400",
  },
];

const projectTabs = [
  { key: "plugins" as const, labelEn: "WordPress Plugins", labelBn: "ওয়ার্ডপ্রেস প্লাগিন" },
];

/* ───────────────────────── SKILL DATA ───────────────────────── */
const skillCategories = [
{
titleEn: "WordPress Ecosystem",
titleBn: "ওয়ার্ডপ্রেস ইকোসিস্টেম",
descEn:
"Building powerful, scalable websites with the world's leading CMS",
descBn:
"বিশ্বের শীর্ষস্থানীয় CMS দিয়ে শক্তিশালী, স্কেলেবল ওয়েবসাইট তৈরি",
accent: "from-indigo-500 to-blue-600",
accentBg: "bg-indigo-50 dark:bg-indigo-950/40",
accentText: "text-indigo-600 dark:text-indigo-400",
accentDot: "bg-indigo-500",
icon: "wordpress",
skills: [
"WordPress",
"Elementor Pro",
"WooCommerce",
"Theme & Plugin Customization",
"PHP & MySQL",
"SEO Optimization & Strategy",
"Custom Code Integration",
],
},
{
titleEn: "AI-Powered Web Development / Vibe Coding",
titleBn: "AI-চালিত ওয়েব ডেভেলপমেন্ট / ভাইব কোডিং",
descEn: "Leveraging AI to accelerate development",
descBn: "AI দিয়ে ডেভেলপমেন্ট ত্বরান্বিত করা",
accent: "from-violet-500 to-purple-600",
accentBg: "bg-violet-50 dark:bg-violet-950/40",
accentText: "text-violet-600 dark:text-violet-400",
accentDot: "bg-violet-500",
icon: "code",
skills: [
"VS Code + LLM",
"Cursor AI Coding",
"Lovable & v0 Prototyping",
"Advanced Prompt Engineering for Development",
],
},
{
titleEn: "AI Automation",
titleBn: "AI অটোমেশন",
descEn:
"Designing intelligent workflows and automation systems to improve efficiency and scalability",
descBn:
"কার্যকারিতা ও স্কেলেবিলিটি বাড়াতে ইন্টেলিজেন্ট ওয়ার্কফ্লো ও অটোমেশন সিস্টেম ডিজাইন",
accent: "from-emerald-500 to-teal-600",
accentBg: "bg-emerald-50 dark:bg-emerald-950/40",
accentText: "text-emerald-600 dark:text-emerald-400",
accentDot: "bg-emerald-500",
icon: "ai",
skills: [
"Python Development",
"n8n, Zapier, GoHighLevel, Make",
"Langflow & AI Workflow Design",
"Prompt Engineering",
"Vector Databases & Embeddings",
"Data Handling & LLM Integration",
"API Management & JSON Data Structure",
],
},
];

function SkillCategoryIcon({ name, className = "" }: { name: string; className?: string }) {
  const p = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className };
  switch (name) {
    case "wordpress":
      return (
        <svg width={28} height={28} viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M3 12c0 4.97 4.03 9 9 9 4.97 0 9-4.03 9-9s-4.03-9-9-9c-4.97 0-9 4.03-9 9zm2 0c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7zm1.5 0c0 3.04 2.46 5.5 5.5 5.5 1.27 0 2.45-.42 3.4-1.13L7.51 8.6c-.71.95-1.01 2.14-1.01 3.4zm5.5 1.5c1.25 0 2.38-.42 3.3-1.11l-5.31-5.31c-.69.92-1.09 2.04-1.09 3.25 0 3.04 2.46 5.5 5.5 5.5z"/>
        </svg>
      );
    case "code": return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>;
    case "ai": return <svg {...p}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M4.93 4.93l2.83 2.83M19.07 4.93l-2.83 2.83"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

/* ───────────────────────── SERVICE DATA ───────────────────────── */
const wordpressServices = [   { id: "ecommerce", titleEn: "E-commerce Website", titleBn: "ই-কমার্স ওয়েবসাইট", descEn: "WooCommerce stores with custom checkout, payment gateways, and conversion-optimized pages.", descBn: "WooCommerce দিয়ে কাস্টম চেকআউট, পেমেন্ট গেটওয়ে ও কনভার্সন-অপ্টিমাইজড পেজ।", icon: "cart", accent: "from-emerald-500 to-teal-600", accentLight: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" },   { id: "business", titleEn: "Business & Corporate Website", titleBn: "বিজনেস ও কর্পোরেট", descEn: "Professional websites with service pages, team sections, and lead capture.", descBn: "সার্ভিস পেজ, টিম সেকশন ও লিড ক্যাপচার সহ পেশাদার ওয়েবসাইট।", icon: "building", accent: "from-blue-500 to-indigo-600", accentLight: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400" },   { id: "blog", titleEn: "Blog & News Websites", titleBn: "ব্লগ ও নিউজ", descEn: "SEO-optimized blogs with fast loading and newsletter integration.", descBn: "SEO-অপ্টিমাইজড ব্লগ—দ্রুত লোডিং ও নিউজলেটার ইন্টিগ্রেশন।", icon: "newspaper", accent: "from-violet-500 to-purple-600", accentLight: "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400" },   { id: "portfolio", titleEn: "Portfolio & Personal Websites", titleBn: "পোর্টফোলিও ও পার্সোনাল", descEn: "Stunning portfolios with galleries, animations, and unique identity.", descBn: "চমৎকার গ্যালারি, অ্যানিমেশন ও ইউনিক আইডেন্টিটি।", icon: "user", accent: "from-pink-500 to-rose-600", accentLight: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400" },   { id: "landing", titleEn: "High-Converting Landing Pages", titleBn: "ল্যান্ডিং পেজ", descEn: "High-converting single pages with A/B test-ready structure.", descBn: "A/B টেস্ট-রেডি হাই-কনভার্টিং সিঙ্গেল পেজ।", icon: "rocket", accent: "from-amber-500 to-orange-600", accentLight: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" },   { id: "custom-wp", titleEn: "Custom WordPress Design (Elementor/Builder)", titleBn: "কাস্টম ডিজাইন", descEn: "Pixel-perfect designs with Elementor or any builder.", descBn: "Elementor বা যেকোনো বিল্ডারে পিক্সেল-পারফেক্ট ডিজাইন।", icon: "paintbrush", accent: "from-cyan-500 to-blue-600", accentLight: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400" },   { id: "maintenance", titleEn: "Maintenance & Support", titleBn: "মেইনটেন্যান্স", descEn: "Updates, security, backups, and priority support.", descBn: "আপডেট, সিকিউরিটি, ব্যাকআপ ও সাপোর্ট।", icon: "shield", accent: "from-zinc-500 to-zinc-700", accentLight: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400" }, ];
const automationServices = [
  { titleEn: "AI Chatbot & Agent", titleBn: "AI চ্যাটবট ও এজেন্ট", descEn: "Custom AI agents for customer support, lead qualification, and 24/7 availability.", descBn: "কাস্টমার সাপোর্ট ও লিড কোয়ালিফিকেশনের জন্য AI এজেন্ট।", icon: "bot", accent: "from-indigo-500 to-violet-600", accentLight: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400" },
  { titleEn: "Lead Gen & CRM", titleBn: "লিড জেন ও CRM", descEn: "Automated lead pipelines with WhatsApp/Email campaigns and ROI tracking.", descBn: "WhatsApp/ইমেইল ক্যাম্পেইন ও ROI ট্র্যাকিং সহ অটোমেটেড লিড পাইপলাইন।", icon: "funnel", accent: "from-emerald-500 to-green-600", accentLight: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400" },
  { titleEn: "Workflow Automation", titleBn: "ওয়ার্কফ্লো অটোমেশন", descEn: "n8n-powered workflows for order processing, invoicing, and sync.", descBn: "n8n দিয়ে অর্ডার প্রসেসিং, ইনভয়েসিং ও সিঙ্ক।", icon: "workflow", accent: "from-orange-500 to-red-600", accentLight: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400" },
  { titleEn: "Content Pipeline", titleBn: "কনটেন্ট পাইপলাইন", descEn: "AI script → voiceover → captions → thumbnail → scheduled publish.", descBn: "AI স্ক্রিপ্ট → ভয়েসওভার → ক্যাপশন → থাম্বনেইল → পাবলিশ।", icon: "video", accent: "from-pink-500 to-rose-600", accentLight: "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400" },
  { titleEn: "API Integration", titleBn: "API ইন্টিগ্রেশন", descEn: "Connect any platform with real-time data flow and error handling.", descBn: "রিয়েল-টাইম ডেটা ফ্লো ও এরর হ্যান্ডলিং সহ প্ল্যাটফর্ম কানেক্ট।", icon: "api", accent: "from-teal-500 to-cyan-600", accentLight: "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400" },
];

const customCodingServices = [
  { id: "any-website", titleEn: "Any Type of Website", titleBn: "যেকোনো ধরনের ওয়েবসাইট", descEn: "Custom websites for any idea, industry, or business requirement, built around your goals.", descBn: "আপনার লক্ষ্য অনুযায়ী যেকোনো আইডিয়া, ইন্ডাস্ট্রি বা ব্যবসার জন্য কাস্টম ওয়েবসাইট।", icon: "globe", accent: "from-sky-500 to-cyan-600", accentLight: "bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400" },
  { id: "vibe-coding", titleEn: "Vibe Custom Coding Website", titleBn: "ভাইব কাস্টম কোডিং ওয়েবসাইট", descEn: "Modern, expressive websites made with custom code, creative interactions, and a distinct visual identity.", descBn: "কাস্টম কোড, ক্রিয়েটিভ ইন্টার‌্যাকশন ও আলাদা ভিজ্যুয়াল আইডেন্টিটিতে তৈরি আধুনিক ওয়েবসাইট।", icon: "code", accent: "from-orange-500 to-fuchsia-600", accentLight: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400" },
];

const customCodingServiceModalData = {
  "any-website": {
    title: "Any Type of Website",
    description: "Tell me your idea and I will turn it into a polished, responsive website designed around your audience and goals.",
    points: [
      "Custom structure for your business or idea",
      "Responsive design for mobile, tablet, and desktop",
      "Fast-loading, SEO-friendly foundation",
      "Integrations and features tailored to your workflow",
    ],
    cta: "Discuss My Website",
  },
  "vibe-coding": {
    title: "Vibe Custom Coding Website",
    description: "Get a distinctive website built with custom code, creative motion, and a visual direction that feels uniquely yours.",
    points: [
      "Original design and interaction direction",
      "Custom-coded sections and functionality",
      "Smooth animations without sacrificing performance",
      "Scalable foundation for future features",
    ],
    cta: "Build My Custom Site",
  },
} as const;

/* ───────────────────────── FAQ DATA ───────────────────────── */
const faqItems = [
  {
    id: 0,
    questionEn: "How do you choose the right technologies for a project?",
    questionBn: "আপনি একটি প্রজেক্টের জন্য সঠিক প্রযুক্তি কীভাবে বেছে নেন?",
    answerEn: "Every project has unique requirements. I evaluate your business goals, scalability needs, budget, and target audience to select the most effective technology stack for long-term success.",
    answerBn: "আমি শুধু যেনতেনভাবে প্রযুক্তি বেছে নিই না — আমি আপনার প্রজেক্টের মিশন, টার্গেট অডিয়েন্স এবং ব্যবসায়িক লক্ষ্য গভীরভাবে বুঝি, তারপর আমার দক্ষতা থেকে সবচেয়ে উপযুক্ত টুলস কৌশলগতভাবে নির্বাচন করি।",
  },
];

const navItems = [
  { id: "home", labelEn: "Home", labelBn: "হোম" },
  { id: "services", labelEn: "Services", labelBn: "সার্ভিস" },
  { id: "skills", labelEn: "Skills", labelBn: "স্কিলস" },
  { id: "work", labelEn: "My Work", labelBn: "আমার কাজ" },
  { id: "about", labelEn: "About", labelBn: "আমার সম্পর্কে" },
  { id: "contact", labelEn: "Contact", labelBn: "যোগাযোগ" },
  { id: "blog", labelEn: "Blog", labelBn: "ব্লগ" },
];

function ServiceIcon({ name }: { name: string }) {
  const p = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (name) {
    case "cart": return <svg {...p}><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>;
    case "building": return <svg {...p}><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1"/><rect x="5" y="2" width="14" height="19" rx="1"/></svg>;
    case "newspaper": return <svg {...p}><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2V9m8-3h6m-6 4h6m-6 4h4"/></svg>;
    case "user": return <svg {...p}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
    case "rocket": return <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09zM12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>;
    case "paintbrush": return <svg {...p}><path d="M18.37 2.63 14 7l-1.59-1.59a2 2 0 0 0-2.82 0L8 7l9 9 1.59-1.59a2 2 0 0 0 0-2.82L17 10l4.37-4.37a2.12 2.12 0 1 0-3-3z"/></svg>;
    case "shield": return <svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>;
    case "bot": return <svg {...p}><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><circle cx="8.5" cy="15.5" r="1"/><circle cx="15.5" cy="15.5" r="1"/></svg>;
    case "funnel": return <svg {...p}><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>;
    case "workflow": return <svg {...p}><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="3" width="6" height="6" rx="1"/><rect x="9" y="15" width="6" height="6" rx="1"/><path d="M6 9v3a1 1 0 0 0 1 1h4m6-4v3a1 1 0 0 1-1 1h-4"/></svg>;
    case "video": return <svg {...p}><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>;
    case "api": return <svg {...p}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>;
    case "globe": return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case "code": return <svg {...p}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>;
    default: return <svg {...p}><circle cx="12" cy="12" r="10"/></svg>;
  }
}

/* ───────────────────────── ACCENT BORDER HOVER MAPPING ───────────────────────── */
const accentBorderHoverMap: Record<string, string> = {
  "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400": "group-hover:border-emerald-500/70 dark:group-hover:border-emerald-400",
  "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400": "group-hover:border-blue-500/70 dark:group-hover:border-blue-400",
  "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400": "group-hover:border-violet-500/70 dark:group-hover:border-violet-400",
  "bg-pink-50 text-pink-600 dark:bg-pink-950/40 dark:text-pink-400": "group-hover:border-pink-500/70 dark:group-hover:border-pink-400",
  "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400": "group-hover:border-amber-500/70 dark:group-hover:border-amber-400",
  "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400": "group-hover:border-indigo-500/70 dark:group-hover:border-indigo-400",
  "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400": "group-hover:border-orange-500/70 dark:group-hover:border-orange-400",
  "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-400": "group-hover:border-teal-500/70 dark:group-hover:border-teal-400",
  "bg-green-50 text-green-600 dark:bg-green-950/40 dark:text-green-400": "group-hover:border-green-500/70 dark:group-hover:border-green-400",
};

/* ───────────────────────── STAR RATING COMPONENT ───────────────────────── */
function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i < rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth={i < rating ? 0 : 2} className={i < rating ? "text-amber-500" : "text-zinc-300 dark:text-zinc-600"}>
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

function useScrollSpy(ids: string[], offset = 120) { const [active, setActive] = useState(ids[0] ?? ""); useEffect(() => { const fn = () => { let c = ids[0]; for (const id of ids) { const el = document.getElementById(id); if (el && el.getBoundingClientRect().top - offset <= 0) c = id; } setActive(c); }; fn(); window.addEventListener("scroll", fn, { passive: true }); return () => window.removeEventListener("scroll", fn); }, [ids, offset]); return active; }
function useTheme() { useEffect(() => { document.documentElement.classList.add("dark"); localStorage.setItem("theme", "dark"); }, []); return { theme: "dark" as const }; }

/* ───────────────────────── PREMIUM INTRO LOADER (SLOWER VERSION) ─────────────────────────
   এই পুরো ফাংশনটা দিয়ে আপনার আসল ফাইলের বর্তমান
   function IntroLoader({ onDone }: { onDone: () => void }) { ... }
   সম্পূর্ণ রিপ্লেস করে দিন।

   পরিবর্তন কী হলো:
   - মোট সময় 1900ms থেকে বাড়িয়ে 3400ms করা হয়েছে
   - Logo/monogram আঁকার duration 1s → 1.6s
   - নাম "Abdul Alim"-এর প্রতিটা অক্ষর ধীরে ধীরে ওঠে (delay gap বাড়ানো হয়েছে)
   - Progress bar sweep-এর গতিও ধীর করা হয়েছে (loader-bar animation, নিচে CSS নোট দেখুন)
═══════════════════════════════════════════════════════ */
function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    const t = window.setTimeout(onDone, reduceMotion ? 0 : 3400);
    return () => window.clearTimeout(t);
  }, [onDone, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.div
      key="intro-loader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[999] grid place-items-center bg-[#04050a]"
    >
      <motion.div
        initial={{ scale: 1 }}
        exit={{ scale: 1.06, filter: "blur(6px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        className="relative flex flex-col items-center gap-6"
      >
        <div aria-hidden className="pointer-events-none absolute -inset-32 rounded-full opacity-40 blur-3xl" style={{ background: "radial-gradient(circle, rgba(167,139,250,0.25), transparent 60%)" }} />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
          <motion.svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="text-white">
            <motion.path
              d="M4 18 L11 4 L18 18"
              stroke="url(#introGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <defs>
              <linearGradient id="introGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        <div className="flex items-center gap-[0.2em] overflow-hidden font-serif text-2xl font-semibold tracking-tight text-white">
          {"Abdul Alim".split("").map((ch, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.55 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className={ch === " " ? "w-2" : undefined}
            >
              {ch}
            </motion.span>
          ))}
        </div>

        <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
          <div className="loader-bar-slow h-full w-full" style={{ background: "linear-gradient(90deg, #22d3ee, #818cf8, #c084fc)" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────────── SMOOTH SCROLL (Lenis) ─────────────────────────
   Silky inertial scrolling used site-wide; disabled automatically for
   users who prefer reduced motion. */
function useSmoothScroll(paused: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Whenever a modal/lightbox/menu is open, fully stop Lenis so the mouse
  // wheel scrolls the popup's own content instead of the page behind it.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (paused) lenis.stop();
    else lenis.start();
  }, [paused]);
}
function cx(...a: (string|false|undefined)[]) { return a.filter(Boolean).join(" "); }
function SectionTitle({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) { return (<div className="mx-auto max-w-2xl text-center">{eyebrow && (<div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-600 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>{eyebrow}</div>)}<h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">{title}</h2>{subtitle && <p className="mt-3 text-zinc-600 dark:text-zinc-400">{subtitle}</p>}</div>); }

// FAQ Accordion — compact, premium-styled, accessible
function FaqAccordion({ lang }: { lang: "bn" | "en" }) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<number | "auto">(0);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    // measure and apply pixel height when open for smooth transition
    if (open) {
      const h = el.scrollHeight;
      setHeight(h);
    } else {
      setHeight(0);
    }
  }, [open]);

  return (
    <div className="mt-2 relative mx-auto w-full max-w-2xl px-3 sm:px-0">
      <div className="group relative overflow-hidden rounded-2xl border border-violet-400/50 bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-violet-500/10 to-blue-500/0 opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-1 bg-gradient-to-r from-violet-600/20 to-blue-600/20 rounded-2xl blur-lg opacity-75 transition-opacity duration-500" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-100 transition-opacity duration-500" />

        <button
          type="button"
          aria-expanded={open}
          aria-controls="pricing-faq-answer"
          id="pricing-faq-button"
          onClick={() => setOpen((s) => !s)}
          className="relative z-10 w-full text-left px-5 py-4 sm:px-6 sm:py-5 flex items-start justify-between gap-4 transition-all duration-300 text-white"
        >
          <span className="flex-1 text-sm sm:text-base font-semibold text-slate-200 transition-colors duration-300">
            {lang === "bn" ? "আমার সার্ভিসের খরচ কত?" : "How much do my services cost?"}
          </span>

          <div className="mt-0.5 shrink-0 grid h-5 w-5 place-items-center rounded-full border border-violet-400/40 bg-violet-500/15 text-violet-300 transition-all duration-300">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </button>

        <div
          id="pricing-faq-answer"
          role="region"
          aria-labelledby="pricing-faq-button"
          className="relative z-10 overflow-hidden"
          style={{ height: typeof height === "number" ? `${height}px` : height, transition: "height 320ms cubic-bezier(.2,.9,.2,1), opacity 220ms ease", opacity: open ? 1 : 0 }}
        >
          <div ref={contentRef} className="border-t border-violet-400/20 px-5 py-4 sm:px-6 sm:py-5">
            <p className="text-sm sm:text-base leading-relaxed text-slate-300/90 transition-colors duration-300">
              {lang === "bn"
                ? "প্রতিটি ক্লায়েন্টের চাহিদা আলাদা — তাই মূল্য নির্ধারণ প্রজেক্টের পরিমাণ, জটিলতা এবং লক্ষ্য অনুযায়ী কাস্টমাইজ করা হয়। আপনার নির্দিষ্ট রিকোয়ারমেন্ট দেখে একটি স্পষ্ট ও ট্রান্সপারেন্ট কোট প্রদান করা হবে। কোনো লুকানো খরচ থাকবে না।"
                : "Every client has different needs, so pricing is tailored to the scope, complexity, and goals of the work. You'll receive a clear, transparent quote based on your specific requirements. No hidden costs, ever."}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_32px_rgba(168,85,247,0)] group-hover:shadow-[inset_0_0_32px_rgba(168,85,247,0.1)] transition-shadow duration-500 pointer-events-none" />
      </div>
    </div>
  );
}
function MagneticButton({ children, className = "" }: { children: React.ReactNode; className?: string }) { const ref = useRef<HTMLDivElement>(null); return <div onMouseMove={useCallback((e: React.MouseEvent) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(); el.style.transform = `translate(${(e.clientX-(r.left+r.width/2))*0.08}px,${(e.clientY-(r.top+r.height/2))*0.08}px)`; }, [])} onMouseLeave={useCallback(() => { if (ref.current) ref.current.style.transform = "translate(0,0)"; }, [])} ref={ref} className={cx("transition-transform duration-200 will-change-transform", className)}>{children}</div>; }

export default function App() {
  useTheme();
  const [introDone, setIntroDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all"|"website"|"automation">("all");
  const [activeProjectTab, setActiveProjectTab] = useState<"plugins">("plugins");
  const [selectedPlugin, setSelectedPlugin] = useState<null | typeof wordpressPlugins[number]>(null);

  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formStatus, setFormStatus] = useState<"idle"|"success"|"error">("idle");
  const [formLoading, setFormLoading] = useState(false);
  const [lang, setLang] = useState<"bn"|"en">("en");
  const [serviceTab, setServiceTab] = useState<"wordpress"|"automation">("wordpress");
  const [selectedService, setSelectedService] = useState<string>("ecommerce");
  const [showMoreServices, setShowMoreServices] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [showSecondStep, setShowSecondStep] = useState(false);

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!menuOpen) return;
      const target = event.target as Node;
      if (menuPanelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) {
        return;
      }
      setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, [menuOpen]);
  const [playStep2Pulse, setPlayStep2Pulse] = useState(false);
  const [autoCyclePaused, setAutoCyclePaused] = useState(false);
  const [expandedSkillCards, setExpandedSkillCards] = useState<{ [key: number]: boolean }>({});
  const [expandedFaqItems, setExpandedFaqItems] = useState<{ [key: number]: boolean }>({});
  const [selectedServiceModal, setSelectedServiceModal] = useState<null | {
    title: string;
    description: string;
    points: string[];
    cta: string;
  }>(null);
  useSmoothScroll(Boolean(selected || selectedPreview || selectedServiceModal || menuOpen));
  const pricingRef = useRef<HTMLDivElement | null>(null);
  const [pricingVisible, setPricingVisible] = useState(false);
  const skillsRef = useRef<HTMLElement | null>(null);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const workRef = useRef<HTMLElement | null>(null);
  const workInView = true;
  const contactRef = useRef<HTMLElement | null>(null);
  const contactInView = useInView(contactRef, { once: true, margin: "120px 0px -120px 0px" });
  const { scrollYProgress: contactScrollProgress } = useScroll({ target: contactRef, offset: ["start end", "end start"] });
  const contactBlobY = useTransform(contactScrollProgress, [0, 1], [12, -20]);
  const contactBlobY2 = useTransform(contactScrollProgress, [0, 1], [-10, 14]);
  const aboutRef = useRef<HTMLElement | null>(null);
  const [aboutVisible, setAboutVisible] = useState(false);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const skillsSectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.06,
      },
    },
  };

  const skillBlockVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.16, 0.84, 0.28, 1] } },
    hover: { y: -4, scale: 1.01, transition: { duration: 0.3, ease: [0.16, 0.84, 0.28, 1] } },
  };

  const textRevealVariant = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 0.84, 0.28, 1] } },
  };

  const toolsContainerVariants = {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.85, ease: [0.16, 0.84, 0.28, 1], delay: 0.25 } },
  };

  const workSectionVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.12, ease: [0.16, 0.84, 0.28, 1] } },
  };

  const workBadgeVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const workHeadingVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.1 } },
  };

  const workQuoteVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } },
  };

  const contactSectionVariants = {
    hidden: { opacity: 0, y: 80, filter: "blur(12px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.03,
      },
    },
  };

  const contactBadgeVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const contactHeadingVariant = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.04 } },
  };

  const contactDotVariant = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.08 } },
  };

  const formCardVariant = {
    hidden: { opacity: 0, y: 30, scale: 0.985 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const formFieldsContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.16 } },
  };

  const formFieldVariant = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut", delay: 0.3 } },
  };

  const contactCardVariant = {
    hidden: { opacity: 0, y: 26, scale: 0.99 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const infoRowVariant = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  const socialIconsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.22 } },
  };

  const socialIconVariant = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
    hover: { scale: 1.08 },
  };

  const quickCardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut", delay: 0.5 } },
  };

  const whatsAppButtonVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.55, ease: "easeOut", delay: 0.6 } },
  };

  const cornerDrawVariant = {
    hidden: { scaleX: 1 },
    visible: { scaleX: 1, transition: { duration: 0 } },
  };

  const statsContainerVariant = {
    hidden: {},
    visible: { transition: { duration: 0 } },
  };

  const statCardVariant = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0 } },
  };

  const filterTabsVariant = {
    hidden: { opacity: 1, x: 0 },
    visible: { opacity: 1, x: 0, transition: { duration: 0 } },
  };

  const projectCardVariant = {
    hidden: { opacity: 1, y: 0 },
    visible: (custom: number) => ({ opacity: 1, y: 0, transition: { duration: 0 } }),
  };

  const imageHoverVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.55, ease: [0.16, 0.84, 0.28, 1] } },
  };

  const tagHoverVariants = {
    initial: { x: 0, opacity: 1 },
    hover: { x: 6, transition: { duration: 0.35, ease: [0.16, 0.84, 0.28, 1] } },
  };

  const arrowHoverVariants = {
    hover: { x: 4, y: -3, transition: { duration: 0.3, ease: [0.16, 0.84, 0.28, 1] } },
  };

  const ctaHover = {
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 70px rgba(59,130,246,0.28)",
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const handleTiltMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (reduceMotion) return;
    const el = e.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12; // left/right
    const rotateX = (0.5 - py) * 8; // top/bottom
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    el.style.transition = `transform 120ms ease-out`;
    el.style.willChange = "transform";
  };

  const handleTiltLeave = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (reduceMotion) return;
    const el = e.currentTarget as HTMLElement;
    el.style.transition = `transform 420ms cubic-bezier(.2,.9,.3,1)`;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };
  const active = useScrollSpy(navItems.map(i => i.id), 140);
  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        return (p.visible ?? true) && (activeFilter === "all" || p.type === activeFilter);
      }),
    [activeFilter]
  );
  useEffect(() => { const h = (e: KeyboardEvent) => { if (e.key === "Escape") { if (selectedPreview) { setSelectedPreview(null); } else { setSelected(null); } } }; window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h); }, [selectedPreview]);
  useEffect(() => { if (!selected) setSelectedPreview(null); }, [selected]);
    useEffect(() => { 
      const h = (e: KeyboardEvent) => { 
        if (!selectedPreview) return;
        if (e.key === "+" || e.key === "=") { 
          e.preventDefault();
          setZoomLevel(Math.min(zoomLevel + 0.25, 3)); 
        } else if (e.key === "-" || e.key === "_") { 
          e.preventDefault();
          setZoomLevel(Math.max(zoomLevel - 0.25, 1)); 
        } else if (e.key === "0") { 
          e.preventDefault();
          setZoomLevel(1); 
        }
      }; 
      window.addEventListener("keydown", h); 
      return () => window.removeEventListener("keydown", h); 
    }, [selectedPreview, zoomLevel]);
  const showToast = useCallback((msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2200); }, []);
  const handleContactSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormStatus("idle");

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS configuration missing. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY.");
        throw new Error("EmailJS not configured");
      }

      if (!formRef.current) {
        throw new Error("Form reference is missing");
      }

      await sendForm(serviceId, templateId, formRef.current, publicKey);
      setFormStatus("success");
      formRef.current.reset();
    } catch (error) {
      console.error("Contact form submit failed", error);
      setFormStatus("error");
    } finally {
      setFormLoading(false);
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  }, []);
  useEffect(() => { document.body.style.overflow = selected ? "hidden" : ""; }, [selected]);

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    if (!pricingRef) return;
    if (typeof IntersectionObserver === "undefined") {
      setPricingVisible(true);
      return;
    }
    const el = pricingRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPricingVisible(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!skillsRef) return;
    if (typeof IntersectionObserver === "undefined") {
      setSkillsVisible(true);
      return;
    }
    const el = skillsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll-reveal for individual skill cards with staggered delay
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".skill-card"));
    if (cards.length === 0) return;
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c, i) => { c.classList.add("in-view"); c.style.animationDelay = `${i * 120}ms`; });
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const idx = Math.max(0, cards.indexOf(el));
          el.style.animationDelay = `${idx * 120}ms`;
          el.classList.add("in-view");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.14 });

    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [skillsVisible]);

  useEffect(() => {
    if (!aboutRef) return;
    if (typeof IntersectionObserver === "undefined") {
      setAboutVisible(true);
      return;
    }
    const el = aboutRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setAboutVisible(true);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleStepClick = (step: 1 | 2) => {
    setShowSecondStep((current) => {
      const isSame = current === (step === 2);
      if (isSame) {
        setAutoCyclePaused(false);
      } else {
        setAutoCyclePaused(true);
      }
      return step === 2;
    });
    setPlayStep2Pulse(true);
    window.setTimeout(() => setPlayStep2Pulse(false), 1200);
  };

  useEffect(() => {
    if (autoCyclePaused) return;

    const interval = window.setInterval(() => {
      setShowSecondStep((prev) => {
        const next = !prev;
        setPlayStep2Pulse(true);
        window.setTimeout(() => setPlayStep2Pulse(false), 1200);
        return next;
      });
    }, 6000);

    return () => window.clearInterval(interval);
  }, [autoCyclePaused]);
  const currentServices = serviceTab === "wordpress" ? [...wordpressServices, ...customCodingServices] : automationServices;
  const visibleServices = currentServices.slice(0, isMobile && !showMoreServices ? 3 : currentServices.length);
  const wordpressServiceModalData = {     ecommerce: {       title: "E-commerce Website",       description:         "Start selling online with confidence. We build easy-to-manage, secure, and fast-loading WooCommerce stores.",       points: [         "Complete Store Setup: Full-featured WooCommerce store with secure payment & shipping integration.",         "Marketing-Ready: Integrated Facebook Pixel, Google Tag Manager & Analytics for tracking.",         "Inventory & Automation: Automated invoice, inventory management, and abandoned cart recovery.",         "Speed & Conversion: High-performance optimization with a seamless custom checkout experience.",       ],       cta: "Build My Store",     },     business: {       title: "Business & Corporate Website",       description:         "Get a professional, modern, and fast-loading website for your company or agency that builds credibility and attracts new clients.",       points: [         "Clean, Professional, and Custom Design",         "Responsive & modern design",         "Clear Showcase of Services & Portfolio",         "Advance SEO Setup",         "Easy to update and manage",         "User-Friendly Content Management System",       ],       cta: "Establish My Brand",     },     blog: {       title: "Blog & News Websites",       description:         "I develop clean, reader-friendly, and easy-to-manage blog and news websites optimized for audience growth and better search engine ranking.",       points: [         "Simple admin panel",         "Newsletter Subscription Form",         "Super-Fast Loading Speed",         "Comment System (with Spam Protection)",         "Related Posts Suggestion",         "SEO-Friendly URL & Structure",         "Newsletter Subscription Form",       ],       cta: "Start Sharing Ideas",     },     portfolio: {       title: "Portfolio & Personal Websites",       description:         "Showcase your skills and work with a clean, modern personal or portfolio website designed to highlight your professional profile.",       points: [         "attractive, Creative & clean design",         "Project Showcase Gallery Management",         "Easy-to-Use Contact Form",         "Fully Responsive & Mobile-friendly",         "Smooth Scrolling & Animations",         "SEO-Friendly URL & Structure",       ],       cta: "Showcase My Work",     },     landing: {       title: "High-Converting Landing Pages",       description:         "Turn visitors into customers instantly. Get high-converting landing pages for your promotions and services that compel people to take action.",       points: [         "Single-Page, Single-Goal Focus",         "Compelling Headlines & Sales Copy",         "Fast loading & Mobile Optimized",         "Marketing-focused design",         "Lead Generation Form Integration",         "Integrated Contact/Lead Capture Form",       ],       cta: "Boost My Sales",     },     "custom-wp": {       title: "Custom WordPress Design (Elementor/Builder)",       description:         "Want a custom design that you can easily update yourself? I build fully customizable WordPress websites using Elementor, tailored to your exact needs.",       points: [         "Drag & Drop Custom Design with Elementor Pro",         "Unique & Custom Coding (if needed)",         "Design based on your unique idea",         "Advanced Functionality & Animations",         "Fully Editable and Manageable",         "Fully responsive",       ],       cta: "Get a Custom Quote",     },     maintenance: {       title: "Maintenance & Support",       description:         "I provide ongoing website maintenance and support to keep your site secure, updated, and running smoothly.",       points: [         "Regular content updates & page edits",         "New feature additions as your business grows",         "Security monitoring & malware protection",         "Speed optimization & plugin updates",         "Backup management & error fixing",         "Priority lifetime support for active clients",       ],       cta: "Secure My Site",     },   } as const;
    const serviceDetails = {
    ecommerce: {
      title: "E-commerce Website",
      description:
        "Start selling online with confidence. We build easy-to-manage, secure, and fast-loading WooCommerce stores.",
      points: [
        "Complete Store Setup: Full-featured WooCommerce store with secure payment & shipping integration.",
        "Marketing-Ready: Integrated Facebook Pixel, Google Tag Manager & Analytics for tracking.",
        "Inventory & Automation: Automated invoice, inventory management, and abandoned cart recovery.",
        "Speed & Conversion: High-performance optimization with a seamless custom checkout experience.",
      ],
      cta: "Build My Store",
    },
    business: {
      title: "Business & Corporate Website",
      description:
        "Get a professional, modern, and fast-loading website for your company or agency that builds credibility and attracts new clients.",
      points: [
        "Clean, Professional, and Custom Design",
        "Responsive & modern design",
        "Clear Showcase of Services & Portfolio",
        "Advance SEO Setup",
        "Easy to update and manage",
        "User-Friendly Content Management System",
      ],
      cta: "Establish My Brand",
    },
    blog: {
      title: "Blog & News Websites",
      description:
        "I develop clean, reader-friendly, and easy-to-manage blog and news websites optimized for audience growth and better search engine ranking.",
      points: [
        "Simple admin panel",
        "Newsletter Subscription Form",
        "Super-Fast Loading Speed",
        "Comment System (with Spam Protection)",
        "Related Posts Suggestion",
        "SEO-Friendly URL & Structure",
        "Newsletter Subscription Form",
      ],
      cta: "Start Sharing Ideas",
    },
    portfolio: {
      title: "Portfolio & Personal Websites",
      description:
        "Showcase your skills and work with a clean, modern personal or portfolio website designed to highlight your professional profile.",
      points: [
        "attractive, Creative & clean design",
        "Project Showcase Gallery Management",
        "Easy-to-Use Contact Form",
        "Fully Responsive & Mobile-friendly",
        "Smooth Scrolling & Animations",
        "SEO-Friendly URL & Structure",
      ],
      cta: "Showcase My Work",
    },
    landing: {
      title: "High-Converting Landing Pages",
      description:
        "Turn visitors into customers instantly. Get high-converting landing pages for your promotions and services that compel people to take action.",
      points: [
        "Single-Page, Single-Goal Focus",
        "Compelling Headlines & Sales Copy",
        "Fast loading & Mobile Optimized",
        "Marketing-focused design",
        "Lead Generation Form Integration",
        "Integrated Contact/Lead Capture Form",
      ],
      cta: "Boost My Sales",
    },
    "custom-wp": {
      title: "Custom WordPress Design (Elementor/Builder)",
      description:
        "Want a custom design that you can easily update yourself? I build fully customizable WordPress websites using Elementor, tailored to your exact needs.",
      points: [
        "Drag & Drop Custom Design with Elementor Pro",
        "Unique & Custom Coding (if needed)",
        "Design based on your unique idea",
        "Advanced Functionality & Animations",
        "Fully Editable and Manageable",
        "Fully responsive",
      ],
      cta: "Get a Custom Quote",
    },
    maintenance: {
      title: "Maintenance & Support",
      description:
        "I provide ongoing website maintenance and support to keep your site secure, updated, and running smoothly.",
      points: [
        "Regular content updates & page edits",
        "New feature additions as your business grows",
        "Security monitoring & malware protection",
        "Speed optimization & plugin updates",
        "Backup management & error fixing",
        "Priority lifetime support for active clients",
      ],
      cta: "Secure My Site",
    },
  } as const;

  return (
    <>
      <AnimatePresence>
        {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      <div className="relative bg-[#04050a] text-zinc-100 antialiased selection:bg-violet-500/30 selection:text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35] [mask-image:radial-gradient(80%_60%_at_50%_0%,#000,transparent)] dark:opacity-[0.5]" style={{ backgroundImage: "radial-gradient(1200px 600px at 80% -20%, rgba(99,102,241,0.12), transparent), radial-gradient(1000px 500px at -10% -10%, rgba(16,185,129,0.10), transparent)" }}/>

      {/* HEADER */}
      <header className="sticky top-0 z-[120] border-b border-white/10 glass">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="group inline-flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-white/10" style={{ background: "var(--grad-aurora)" }}>
              <div className="absolute inset-[1.5px] grid place-items-center rounded-[10px] bg-[#04050a] font-mono text-[11px] font-bold text-white">AA</div>
            </div>
            <div className="leading-tight">
              <div className="font-serif text-[17px] font-semibold tracking-tight text-white">Abdul ALim</div>
              <div className="text-[11px] uppercase tracking-widest text-zinc-500">Web Developer & AI Automation Expert</div>
            </div>
          </a>
          <nav className="hidden items-center gap-1 md:flex">{navItems.map(item => (<a key={item.id} href={`#${item.id}`} className={cx("group relative rounded-full px-3.5 py-2 text-sm transition", active === item.id ? "text-white" : "text-zinc-400 hover:text-white")}>{active === item.id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.06]" transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} />}<span className="relative">{lang === "bn" ? item.labelBn : item.labelEn}<span className={cx("pointer-events-none absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-violet-400 transition-all duration-300 group-hover:w-full", active === item.id && "w-0")} /></span></a>))}</nav>
          <div className="flex items-center gap-2">
            <button onClick={() => setLang(l => l === "en" ? "bn" : "en")} className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300 shadow-sm transition hover:border-white/20 hover:bg-white/[0.08] sm:inline-flex">{lang === "en" ? "বাং" : "EN"}</button>
            <MagneticButton><a href="#contact" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(129,140,248,0.28)] transition hover:-translate-y-0.5" style={{ background: "var(--grad-aurora)" }}><span className="hidden sm:inline">{lang === "bn" ? "প্রজেক্ট শুরু করি" : "Start a Project"}</span><span className="sm:hidden">Hire</span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform duration-300 group-hover:translate-x-0.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg></a></MagneticButton>
            <button ref={menuButtonRef} className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-200 shadow-sm md:hidden" onClick={() => setMenuOpen(v => !v)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{menuOpen ? <path d="M18 6 6 18M6 6l12 12"/> : <path d="M3 6h18M3 12h18M3 18h18"/>}</svg></button>
          </div>
        </div>
        {menuOpen && (
          <>
            <div className="fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setMenuOpen(false)} />
            <div ref={menuPanelRef} data-lenis-prevent className="fixed inset-x-0 top-[4rem] z-[200] max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-[#060810] shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:hidden">
              <div className="mx-auto max-w-[1200px] px-4 py-3">
                <div className="grid grid-cols-2 gap-2">
                  {navItems.map(item => (

                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={() => setMenuOpen(false)}
                      className={cx(
                        "rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.08]",
                        active === item.id && "border-cyan-400/40 bg-cyan-400/10 text-white"
                      )}
                    >
                      {lang === "bn" ? item.labelBn : item.labelEn}
                    </a>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => setLang(l => l === "en" ? "bn" : "en")}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] py-2 text-sm font-medium text-zinc-300"
                  >
                    {lang === "en" ? "🇧🇩 বাংলা" : "🇬🇧 EN"}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </header>

      {/* HERO */}
      <motion.section id="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="relative overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.24),transparent_12%),radial-gradient(circle_at_bottom_left,rgba(14,211,255,0.10),transparent_18%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-10 top-1/4 h-[220px] w-[220px] rounded-full bg-sky-500/12 blur-3xl" />
          <div className="absolute left-8 bottom-24 h-[180px] w-[180px] rounded-full bg-violet-500/10 blur-3xl" />
        </div>
        <div className="absolute inset-0">
          <span className="particle absolute -left-4 top-24 h-2 w-2 rounded-full bg-cyan-400/40" />
          <span className="particle absolute left-[22%] top-[18%] h-2 w-2 rounded-full bg-sky-300/40" />
          <span className="particle absolute right-16 top-[28%] h-2 w-2 rounded-full bg-cyan-300/50" />
          <span className="particle absolute left-[10%] bottom-[20%] h-1.5 w-1.5 rounded-full bg-slate-300/30" />
          <span className="particle absolute right-[18%] bottom-[12%] h-1.5 w-1.5 rounded-full bg-violet-300/30" />
          <span className="particle absolute left-[55%] bottom-[30%] h-2 w-2 rounded-full bg-sky-300/30" />
        </div>

        <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-12 pt-[15px] sm:pt-0 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center gap-6">
            <motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.5 }} className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-700/60 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 shadow-[0_18px_80px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-cyan-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-300" />
              </span>
              {lang === "bn" ? "প্রজেক্টের জন্য উন্মুক্ত" : "Available for projects"}
            </motion.div>
            <motion.h1 initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.6 }} className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[4.75rem]">
              {lang === "bn" ? <>হ্যালো, আমি <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Abdul ALim</span></> : <>Hello, I'm <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent">Abdul ALim</span></>}
            </motion.h1>
            <motion.h2 initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.75 }} className="max-w-xl text-xl font-medium tracking-tight text-slate-300 sm:text-2xl">
              {lang === "bn" ? "ওয়েব ডেভেলপার & AI অটোমেশন এক্সপার্ট" : "Web Developer & AI Automation Expert"}
            </motion.h2>
            <motion.p initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 0.9 }} className="max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
              {lang === "bn" ? "হাই-পারফরম্যান্স ওয়েবসাইট ও স্মার্ট AI অটোমেশন সলিউশন।" : "I build premium websites and smart AI automation that feel futuristic, fast, and exceptionally polished. The whole experience is crafted to feel cinematic, luxurious, and conversion-ready."}
            </motion.p>
            <motion.div initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 1.1 }} className="relative z-40 grid w-full gap-3 sm:flex sm:flex-wrap sm:gap-3">
              <a href="#work" className="group relative inline-flex w-full items-center justify-center gap-2 rounded-lg border border-cyan-400/50 bg-slate-900/40 px-5 py-3 text-sm font-bold text-white transition duration-300 hover:border-cyan-400 hover:bg-cyan-500/10 backdrop-blur-sm sm:w-auto sm:px-8">
                <span className="relative flex items-center gap-2">
                  {lang === "bn" ? "কাজ দেখুন" : "See my work"}
                  <svg className="transition-transform duration-300 group-hover:translate-x-2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
                <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-cyan-600/0 via-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/20 group-hover:via-cyan-600/10 group-hover:to-blue-600/20 transition duration-300" />
              </a>
              <a href="#contact" className="group relative inline-flex w-full items-center justify-center rounded-lg border-2 border-cyan-500/60 px-5 py-3 text-sm font-bold text-cyan-300 transition duration-300 hover:border-cyan-400 sm:w-auto sm:px-8">
                <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 transition duration-300 group-hover:opacity-20" />
                <span className="relative transition duration-300 group-hover:text-white">
                  {lang === "bn" ? "ফ্রি কনসাল্টেশন" : "Let's talk"}
                </span>
              </a>
            </motion.div>
            <motion.div initial={{ y: 28, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: "easeOut", delay: 1.25 }} className="mt-0 sm:mt-8 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:translate-y-[-2px]">
                  <img loading="eager" decoding="async" src={CocoahavenLogo} alt="Cocoa Haven Logo" className="h-full w-full object-cover" />
                </div>
              </div>
              <div><span className="font-semibold text-slate-100">1+ </span>{lang === "bn" ? "ক্লায়েন্ট • 5/5 রেটিং" : "clients • 5/5 rating"}</div>
            </motion.div>
          </div>

          <div className="relative flex items-center justify-center">
            <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.05, ease: "easeOut", delay: 1.35 }} className="relative z-10 flex w-full max-w-[360px] aspect-[3/4] items-center justify-center overflow-hidden rounded-[42px] border border-white/10 bg-transparent shadow-[0_50px_140px_rgba(14,165,233,0.16)] sm:w-[400px] lg:w-[440px]">
              <img
                loading="eager"
                decoding="async"
                src={AbdulAlimMir}
                alt="Abdul Alim Mir"
                className="relative z-10 min-h-full min-w-full h-full w-full object-cover object-center"
                style={{ backgroundColor: "transparent" }}
              />
              <div className="absolute inset-0 rounded-[42px] border border-cyan-400/10" />
              <div className="absolute left-4 bottom-4 z-10 w-[calc(100%-1.5rem)] p-4 text-left">
                <div className="font-serif text-[30px] font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent sm:text-[34px]">Abdul</div>
                <div className="font-serif text-[30px] font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 bg-clip-text text-transparent sm:text-[34px]">ALim</div>
                <div className="mt-2 h-[1.5px] w-12 rounded-full bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-400" />
                <div className="mt-2 text-[11px] font-bold uppercase tracking-[0.35em] text-slate-950">Web & AI Expert</div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 40, opacity: 0, rotate: 12, filter: "blur(14px)" }} animate={{ y: [0, -8, 0], opacity: 1, rotate: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease: "easeOut", delay: 1.5, y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }} className="absolute right-2 top-4 z-20 max-w-[180px] rounded-3xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:-right-4 sm:top-6 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 ring-1 ring-cyan-400/30">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-300"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">WordPress Expert</div>
                  <div className="text-[11px] text-slate-400">Modern CMS craft</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 42, opacity: 0, rotate: -10, filter: "blur(16px)" }} animate={{ y: [0, -8, 0], opacity: 1, rotate: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease: "easeOut", delay: 1.65, y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }} className="absolute left-2 top-[52%] z-20 max-w-[180px] -translate-y-1/2 rounded-3xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:-left-8 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 ring-1 ring-cyan-400/30">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-emerald-300"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">AI Automation</div>
                  <div className="text-[11px] text-slate-400">n8n & AI agency</div>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ y: 44, opacity: 0, rotate: 10, filter: "blur(16px)" }} animate={{ y: [0, -8, 0], opacity: 1, rotate: 0, filter: "blur(0px)" }} transition={{ duration: 0.85, ease: "easeOut", delay: 1.8, y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }} className="absolute right-2 bottom-4 z-20 max-w-[180px] rounded-3xl border border-white/10 bg-slate-900/95 px-3 py-2.5 shadow-[0_22px_60px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:-right-4 sm:bottom-8 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800 ring-1 ring-amber-300/30">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-amber-300"><path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">5/5 Rating</div>
                  <div className="text-[11px] text-slate-400">Client Satisfaction</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* LOGO BAR */}
      {/* Tools / Expertise Strip */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative overflow-hidden border-y border-white/5 py-8"
        style={{ backgroundColor: '#000311', zIndex: 100 }}
      >
        {/* Ambient glow background — matches site's cyan/violet/emerald theme */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[100px]" />
          <div className="absolute right-1/4 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(circle_at_center,rgba(34,211,238,0.3)_1px,transparent_1px)] [background-size:44px_44px]" />
        </div>

        <div className="relative mx-auto grid max-w-[1200px] grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:gap-4 sm:px-6 lg:px-8">
          {[
            {
              title: "WordPress",
              tone: "cyan",
              logo: (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg"
                  alt="WordPress Logo"
                  className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                  loading="eager"
                />
              ),
            },
            {
              title: "E-commerce",
              tone: "emerald",
              logo: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="E-commerce Icon"
                >
                  <circle cx="9" cy="21" r="1.4" />
                  <circle cx="19" cy="21" r="1.4" />
                  <path d="M2.5 3h2.7l2.4 12.2a2 2 0 0 0 2 1.6h9.1a2 2 0 0 0 2-1.55L22.5 8H6" />
                </svg>
              ),
            },
            {
              title: "AI Automation Workflow",
              tone: "violet",
              logo: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="AI Agent Icon"
                >
                  <rect x="4" y="10" width="16" height="10" rx="2.4" />
                  <circle cx="9" cy="15" r="1" fill="currentColor" stroke="none" />
                  <circle cx="15" cy="15" r="1" fill="currentColor" stroke="none" />
                  <path d="M12 10V6" />
                  <circle cx="12" cy="4" r="1.6" />
                  <path d="M8 20h8" />
                </svg>
              ),
            },
            {
              title: "Custom Coding",
              tone: "amber",
              logo: (
                <svg
                  className="h-6 w-6 sm:h-7 sm:w-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-label="Custom Coding Icon"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              ),
            },
          ].map((item, index) => {
            const toneMap: Record<string, { text: string; iconBg: string; border: string; glow: string; topLine: string }> = {
              cyan: {
                text: "text-cyan-300",
                iconBg: "bg-cyan-500/10 border-cyan-400/25",
                border: "hover:border-cyan-400/50",
                glow: "group-hover:shadow-[0_0_36px_rgba(34,211,238,0.22)]",
                topLine: "from-transparent via-cyan-400 to-transparent",
              },
              emerald: {
                text: "text-emerald-300",
                iconBg: "bg-emerald-500/10 border-emerald-400/25",
                border: "hover:border-emerald-400/50",
                glow: "group-hover:shadow-[0_0_36px_rgba(16,185,129,0.22)]",
                topLine: "from-transparent via-emerald-400 to-transparent",
              },
              violet: {
                text: "text-violet-300",
                iconBg: "bg-violet-500/10 border-violet-400/25",
                border: "hover:border-violet-400/50",
                glow: "group-hover:shadow-[0_0_36px_rgba(167,139,250,0.22)]",
                topLine: "from-transparent via-violet-400 to-transparent",
              },
              amber: {
                text: "text-amber-300",
                iconBg: "bg-amber-500/10 border-amber-400/25",
                border: "hover:border-amber-400/50",
                glow: "group-hover:shadow-[0_0_36px_rgba(251,191,36,0.20)]",
                topLine: "from-transparent via-amber-400 to-transparent",
              },
            };
            const tone = toneMap[item.tone];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
                whileHover={{ y: -4 }}
                className={cx(
                  "group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 px-3.5 py-3.5 backdrop-blur-xl transition-all duration-300 sm:gap-3.5 sm:px-5 sm:py-4",
                  tone.border,
                  tone.glow
                )}
              >
                {/* Top accent line */}
                <div className={cx("absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover:opacity-100", tone.topLine)} />

                {/* Soft inner glow on hover */}
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div
                  className={cx(
                    "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-inner transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12",
                    tone.iconBg,
                    tone.text
                  )}
                >
                  {item.logo}
                </div>

                <span className="relative min-w-0 text-[10.5px] font-semibold leading-[1.2] tracking-wide text-slate-100 transition-colors duration-200 group-hover:text-white sm:text-[13px]">
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>


      {/* SERVICES */}
           {/* SERVICES */}
      <section
        id="services"
        className="relative py-8 sm:py-10 overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
          <div className="absolute right-10 top-1/4 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="absolute left-10 bottom-10 h-52 w-52 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.09),transparent_25%)] mix-blend-screen" />
          <div className="absolute inset-0 services-3d-grid pointer-events-none" />
        </div>
        <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center relative z-10">
            <h2 className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-slate-950/90 px-4 py-2 text-lg font-semibold text-emerald-300 shadow-2xl shadow-emerald-400/20 backdrop-blur-xl ring-1 ring-emerald-400/30 sm:text-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_4px_rgba(52,211,153,0.7)]" />
              {lang === "bn" ? "আমার সার্ভিস" : "My Services"}
            </h2>
            <p className="mt-4 text-slate-300 dark:text-slate-300">
              {lang === "bn"
                ? "কাস্টম ওয়েবসাইট, E-commerce, AI agent এবং automation workflow—সব কিছু এক জায়গায়।"
                : "Custom websites, E-commerce, AI agents, and automation workflows — all in one place."}
            </p>
            <div className="mt-6 overflow-hidden rounded-full border border-white/10 bg-white/10 py-2 shadow-inner shadow-cyan-500/10 backdrop-blur-xl">
              <div className="marquee flex min-w-full whitespace-nowrap text-sm font-medium text-zinc-600 dark:text-zinc-300">
                <div className="marquee-content inline-flex">
                  <span className="mx-6">WordPress Development</span>
                  <span className="mx-6">WooCommerce Stores</span>
                  <span className="mx-6">Landing Pages</span>
                  <span className="mx-6">Business Websites</span>
                  <span className="mx-6">AI Agent Development</span>
                  <span className="mx-6">n8n Automation Workflows</span>
                  <span className="mx-6">Custom WordPress Design</span>
                  <span className="mx-6">Maintenance & Support</span>
                </div>
                <div className="marquee-content inline-flex">
                  <span className="mx-6">WordPress Development</span>
                  <span className="mx-6">WooCommerce Stores</span>
                  <span className="mx-6">Landing Pages</span>
                  <span className="mx-6">Business Websites</span>
                  <span className="mx-6">AI Agent Development</span>
                  <span className="mx-6">n8n Automation Workflows</span>
                  <span className="mx-6">Custom WordPress Design</span>
                  <span className="mx-6">Maintenance & Support</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 flex justify-center">
            <div className="relative inline-flex items-end gap-1">
              <button
                onClick={() => {
                  setServiceTab("wordpress");
                  setShowMoreServices(false);
                }}
                className={cx(
                  "relative inline-flex items-center gap-2 rounded-t-2xl px-6 py-3 text-sm font-semibold transition duration-300 cursor-pointer",
                  serviceTab === "wordpress"
                    ? "text-cyan-400 shadow-lg shadow-cyan-500/30"
                    : "text-slate-400 hover:text-slate-300"
                )}
              >
                🌐 {lang === "bn" ? "ওয়েবসাইট" : "Website"}
                {serviceTab === "wordpress" && (
                  <motion.div
                    layoutId="serviceTabPointer"
                    className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 shadow-lg shadow-cyan-500/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
              <button
                onClick={() => {
                  setServiceTab("automation");
                  setShowMoreServices(false);
                }}
                className={cx(
                  "relative inline-flex items-center gap-2 rounded-t-2xl px-6 py-3 text-sm font-semibold transition duration-300 cursor-pointer",
                  serviceTab === "automation"
                    ? "text-violet-400 shadow-lg shadow-violet-500/30"
                    : "text-slate-400 hover:text-slate-300"
                )}
              >
                🤖 {lang === "bn" ? "AI অটোমেশন" : "AI Automation"}
                {serviceTab === "automation" && (
                  <motion.div
                    layoutId="serviceTabPointer"
                    className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-400 to-purple-400 shadow-lg shadow-violet-500/50"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </button>
              <div className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent" />
            </div>
          </div>
          <div
            className={cx(
              "mt-8 grid grid-cols-1 gap-4",
              serviceTab === "wordpress"
                ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "sm:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {visibleServices.map((s, index) => (
              <button
                key={s.titleEn}
                type="button"
                onClick={() => {
                  if (serviceTab === "wordpress") {
                    const modalData = wordpressServiceModalData[s.id as keyof typeof wordpressServiceModalData] || customCodingServiceModalData[s.id as keyof typeof customCodingServiceModalData];
                    if (modalData) {
                      setSelectedServiceModal(modalData);
                    }
                  }
                }}
                className="group relative overflow-hidden rounded-[28px] border border-transparent bg-slate-950/75 p-6 text-left shadow-[0_30px_60px_-35px_rgba(15,23,42,0.85)] transition-all duration-300 hover:bg-slate-900/95 hover:shadow-[0_35px_70px_-30px_rgba(14,165,233,0.18)] cursor-pointer"
              >
                <div className={cx("pointer-events-none absolute -inset-px rounded-[30px] bg-gradient-to-r opacity-80 blur-sm", s.accent)} />
                <div className="pointer-events-none absolute inset-0 m-[1px] rounded-[28px] bg-slate-950/90" />
                <div
                  className={cx(
                    "absolute left-0 top-0 h-[4px] w-full bg-gradient-to-r opacity-100",
                    s.accent
                  )}
                />
                <div className="absolute right-4 top-1/3 z-10 -translate-y-1/2 opacity-18">
                  <div className="pointer-events-none text-white/20" style={{ transform: "scale(3.2)" }}>
                    <ServiceIcon name={s.icon} />
                  </div>
                </div>
                <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(14,165,233,0.08),transparent_35%)] opacity-90 pointer-events-none" />
                <div className="absolute -right-4 top-8 h-24 w-24 rounded-full bg-white/5 blur-2xl opacity-60 pointer-events-none" />
                <div className="absolute left-5 top-8 h-22 w-22 rounded-full border border-white/10 bg-white/5 blur-2xl opacity-45 pointer-events-none" />
                <div className="relative z-10">
                  <div
                    className={cx(
                      "relative inline-flex h-12 w-12 items-center justify-center rounded-3xl border border-white/10 p-2 shadow-[0_18px_50px_-30px_rgba(14,165,233,0.7)] transition duration-300 group-hover:text-current",
                      accentBorderHoverMap[s.accentLight] || "group-hover:border-white/30",
                      s.accentLight
                    )}
                  >
                    <ServiceIcon name={s.icon} />
                  </div>
                  <h3 className="mt-5 font-serif text-[17px] font-semibold leading-tight text-white">
                    {lang === "bn" ? s.titleBn : s.titleEn}
                  </h3>
                  <p className="mt-3 text-[13px] leading-6 text-slate-300">
                    {lang === "bn" ? s.descBn : s.descEn}
                  </p>
                  {serviceTab === "wordpress" && (
                    <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 transition group-hover:text-white">
                      <span>{lang === "bn" ? "বিস্তারিত" : "View Details"}</span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M13 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {currentServices.length > 3 && isMobile && !showMoreServices && (
            <div className="mt-6 mb-5 flex justify-center">
              <button
                type="button"
                onClick={() => setShowMoreServices(true)}
                className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {lang === "bn" ? "আরও দেখুন" : "View More"}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}

          {/* PRICING DIVIDER */}
          <div className="mt-10 mb-6 sm:mb-12 h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent dark:via-zinc-700" />

          {/* ═══════════════════════════════════════════════════════
              ★★★ PREMIUM PRICING OVERVIEW SECTION ★★★
          ═══════════════════════════════════════════════════════ */}
          <div id="pricing" ref={pricingRef} className={`relative mt-1.5 sm:mt-3 ${pricingVisible ? "animate-fade-up opacity-100" : "opacity-0"}`}>
            {/* PRICING OVERVIEW BADGE */}
            <div className="flex justify-center mb-1.5 sm:mb-3">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-violet-500/25 bg-slate-950/55 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300 backdrop-blur-sm shadow-[0_0_16px_rgba(139,92,246,0.08)] sm:text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_rgba(167,139,250,0.8)]" />
                {lang === "bn" ? "প্রাইসিং ওভারভিউ" : "PRICING OVERVIEW"}
              </div>
            </div>

            {/* HEADING WITH DECORATIVE LAURELS */}
            <div className="relative mx-auto max-w-4xl text-center px-6">
              {/* Decorative leaf brackets removed as requested */}

              {/* Pricing heading removed per request */}

              <FaqAccordion lang={lang} />

              {/* Trust Badge intentionally removed per user request */}
            </div>

            {/* PROCESS SECTION */}
            <div className="mt-4 sm:mt-12">
              {/* Process Header with Side Lines & Stars */}
              <div className="relative flex items-center justify-center gap-3 sm:gap-5 mb-3">
                <div className="flex items-center gap-3 flex-1 max-w-[180px] justify-end">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-400/40" />
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-violet-400/70 shrink-0">
                    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
                  </svg>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/40 bg-slate-950/70 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-violet-300 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.15)]">
                  {lang === "bn" ? "আমাদের প্রক্রিয়া" : "MY PROCESS"}
                </div>

                <div className="flex items-center gap-3 flex-1 max-w-[180px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-violet-400/70 shrink-0">
                    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" />
                  </svg>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-violet-400/40" />
                </div>
              </div>

              <h4 className="text-center font-serif text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                {lang === "bn" ? "সরলীকৃত ২-ধাপ প্রক্রিয়া" : "Simplified 2-Step Process"}
              </h4>

              {/* MOBILE STEP TABS (1 / 2) */}
              <div className="mt-8 flex items-center justify-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => handleStepClick(1)}
                  className={cx(
                    "flex h-11 min-w-[88px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
                    !showSecondStep
                      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
                      : "border-slate-700 bg-slate-900 text-slate-400"
                  )}
                >
                  Step 1
                </button>
                <div className="h-px w-8 bg-slate-700" />
                <button
                  type="button"
                  onClick={() => handleStepClick(2)}
                  className={cx(
                    "flex h-11 min-w-[88px] items-center justify-center rounded-full border px-4 text-sm font-semibold transition",
                    showSecondStep
                      ? "border-violet-400/40 bg-violet-400/10 text-violet-100"
                      : "border-slate-700 bg-slate-900 text-slate-400"
                  )}
                >
                  Step 2
                </button>
              </div>

              {/* TWO CARDS WITH CONNECTOR */}
              <div className="relative mt-10">
                {/* Dotted connector line between cards (desktop) */}
                <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-20 pointer-events-none">
                  <svg viewBox="0 0 200 40" className="w-full h-full" fill="none">
                    <path
                      d="M 0 20 C 50 0, 150 40, 200 20"
                      stroke="rgba(59,130,246,0.18)"
                      strokeWidth="10"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0 20 C 50 0, 150 40, 200 20"
                      stroke="url(#dashGradient)"
                      strokeWidth="3"
                      strokeDasharray="8 5"
                      strokeLinecap="round"
                      strokeOpacity="1"
                    />
                    <circle
                      cx="100"
                      cy="20"
                      r="5"
                      fill="#60a5fa"
                      className="shadow-[0_0_22px_rgba(96,165,250,0.9)]"
                    />
                    <defs>
                      <linearGradient id="dashGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="1" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="relative z-10 grid gap-5 md:grid-cols-2 md:gap-x-20 md:gap-y-6">
                  {/* ───── CARD 1: Discuss Vision ───── */}
                  <div
                    className={cx(
                      "group relative overflow-hidden rounded-[28px] border border-slate-800/80 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-slate-900/80 p-7 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_35px_100px_rgba(34,211,238,0.15)]",
                      showSecondStep ? "hidden md:block" : "block"
                    )}
                  >
                    {/* Top gradient line */}
                    <div className="absolute left-0 top-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
                    {/* Top corner glow */}
                    <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

                    <div className="relative flex items-center gap-3 mb-7">
                      {/* Number badge with sparkles */}
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 text-xl font-bold text-white shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                          1
                        </div>
                        {/* Sparkles around badge */}
                        <svg className="absolute -top-1 -right-1 w-3 h-3 text-cyan-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2 L13 10 L22 12 L13 14 L12 22 L11 14 L2 12 L11 10 Z" />
                        </svg>
                        <svg className="absolute -bottom-1 -left-2 w-2.5 h-2.5 text-cyan-300/70" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2 L13 10 L22 12 L13 14 L12 22 L11 14 L2 12 L11 10 Z" />
                        </svg>
                      </div>

                      {/* Chat icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-slate-900/70 shadow-[inset_0_0_15px_rgba(34,211,238,0.1)]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                          <circle cx="8.5" cy="10" r="0.8" fill="currentColor" />
                          <circle cx="12" cy="10" r="0.8" fill="currentColor" />
                          <circle cx="15.5" cy="10" r="0.8" fill="currentColor" />
                        </svg>
                      </div>
                    </div>

                    <h5 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-tight">
                      {lang === "bn" ? "আপনার ভিশন ও প্রয়োজন নিয়ে আলোচনা" : "Discuss Your Vision & Needs"}
                    </h5>

                    <p className="mt-4 text-[14px] leading-7 text-slate-400">
                      {lang === "bn"
                        ? "আপনার লক্ষ্য এবং ওয়েবসাইট রিকোয়ারমেন্ট আমাকে জানান। আমি মনোযোগ দিয়ে আপনার ভিশন ও প্রজেক্ট স্কোপ বুঝে নেব।"
                        : "Share your goals and website requirements with me. I'll listen carefully to understand your vision and the scope of your project."}
                    </p>

                    {/* Tag pill */}
                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3.5 py-1.5 text-[12px] font-medium text-cyan-200">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      {lang === "bn" ? "ডিসকভারি ও আন্ডারস্ট্যান্ডিং" : "Discovery & Understanding"}
                    </div>
                  </div>

                  {/* ───── CARD 2: Collaborative Pricing ───── */}
                  <div
                    className={cx(
                      "group relative overflow-hidden rounded-[28px] border border-slate-800/80 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-slate-900/80 p-7 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.5)] transition duration-500 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-[0_35px_100px_rgba(168,85,247,0.15)]",
                      showSecondStep ? "block" : "hidden md:block",
                      playStep2Pulse && "ring-2 ring-violet-400/30"
                    )}
                  >
                    {/* Top gradient line */}
                    <div className="absolute left-0 top-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-70" />
                    {/* Top corner glow */}
                    <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-violet-500/20 blur-3xl pointer-events-none" />

                    <div className="relative flex items-center gap-3 mb-7">
                      {/* Number badge with sparkles */}
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-purple-500 to-fuchsia-600 text-xl font-bold text-white shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                          2
                        </div>
                        <svg className="absolute -top-1 -right-1 w-3 h-3 text-violet-300" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2 L13 10 L22 12 L13 14 L12 22 L11 14 L2 12 L11 10 Z" />
                        </svg>
                        <svg className="absolute -bottom-1 -left-2 w-2.5 h-2.5 text-violet-300/70" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2 L13 10 L22 12 L13 14 L12 22 L11 14 L2 12 L11 10 Z" />
                        </svg>
                      </div>

                      {/* Handshake icon */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/20 bg-slate-900/70 shadow-[inset_0_0_15px_rgba(168,85,247,0.1)] overflow-hidden">
                        <img loading="eager" decoding="async" src={dealImage} alt="Handshake icon" className="h-8 w-8 object-contain" />
                      </div>
                    </div>

                    <h5 className="font-serif text-xl sm:text-2xl font-semibold text-white leading-tight">
                      {lang === "bn" ? "সহযোগী ও ন্যায্য প্রাইসিং" : "Collaborative & Fair Pricing"}
                    </h5>

                    <p className="mt-4 text-[14px] leading-7 text-slate-400">
                      {lang === "bn"
                        ? "আমরা একসাথে আলোচনার মাধ্যমে এমন একটি মূল্য নির্ধারণ করব যা আপনার বাজেট ও প্রজেক্টের চাহিদার সম্মান করে। আপনার ইনপুটই আমার অগ্রাধিকার।"
                        : "We will discuss together to fix a price that respects your budget and project needs. Your input is my priority, ensuring a fair deal for both of us."}
                    </p>

                    {/* Tag pill */}
                    <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/5 px-3.5 py-1.5 text-[12px] font-medium text-violet-200">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="9" y1="13" x2="15" y2="13" />
                        <line x1="9" y1="17" x2="13" y2="17" />
                      </svg>
                      {lang === "bn" ? "প্ল্যানিং ও এগ্রিমেন্ট" : "Planning & Agreement"}
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
★★★ SKILLS SECTION — REDESIGNED ★★★
═══════════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════════
    PREMIUM SKILLS SECTION — Replace your full skills section with this
    Required existing items:
    - skillCategories
    - lang
    - cx()
    - expandedSkillCards
    - setExpandedSkillCards
═══════════════════════════════════════════════════════ */}

<section
  id="skills"
  className="relative overflow-hidden border-y border-slate-800/80 bg-[#050816] py-8 text-white sm:py-28"
>
  {/* Background Gradients */}
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <div className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
    <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
    <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="mx-auto max-w-3xl text-center">
      <div
        className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-slate-950/90 px-4 py-2 text-lg font-semibold text-emerald-300 shadow-2xl shadow-emerald-400/20 backdrop-blur-xl ring-1 ring-emerald-400/30 sm:text-xl"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_4px_rgba(52,211,153,0.7)]" />
        {lang === "bn" ? "দক্ষতা ও বিশেষজ্ঞতা" : "Skills & Expertise"}
      </div>

      <h2
        className="font-serif text-2xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[60px]"
      >
        {lang === "bn" ? (
          <>
            আমার{" "}
            <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              টেকনিক্যাল
            </span>{" "}
            স্কিলসেট
          </>
        ) : (
          <>
            My{" "}
            <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Technical
            </span>{" "}
            Skillset
          </>
        )}
      </h2>

      {/* Trust Metric Bar */}
      <div className="mt-7 inline-flex max-w-full items-center justify-center gap-1 rounded-full border border-white/10 bg-slate-950/55 px-5 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:gap-2">
        <span className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full border border-blue-400/40 bg-blue-500/10 text-blue-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 12 4 4 8-8" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-white">3</span>
          <span className="text-sm text-slate-300/80">
            {lang === "bn" ? "বিশেষত্ব" : "Specializations"}
          </span>
        </span>

        <span className="hidden h-5 w-px bg-white/15 sm:block" />

        <span className="flex items-center gap-2">
          <span className="grid h-5 w-5 place-items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 text-emerald-300">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="m6 12 4 4 8-8" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-white">18+</span>
          <span className="text-sm text-slate-300/80">
            {lang === "bn" ? "টেকনোলজি" : "Technologies"}
          </span>
        </span>


      </div>
    </div>

    {/* Skill Cards */}
    <div className="mt-14 grid gap-6 lg:grid-cols-3">
      {skillCategories.map((cat, idx) => {
        const tone =
          idx === 0
            ? {
                border: "border-blue-400/40 hover:border-blue-300/70",
                glow: "bg-blue-500/25",
                top: "from-transparent via-blue-400 to-transparent",
                iconBox:
                  "border-blue-400/35 bg-blue-500/15 shadow-[0_0_38px_rgba(59,130,246,0.20)]",
                iconText: "text-blue-300",
                tagHover: "hover:border-blue-400/45 hover:bg-blue-500/10",
                badge:
                  "bg-blue-500/15 text-blue-300 shadow-[0_0_22px_rgba(59,130,246,0.16)]",
              }
            : idx === 1
            ? {
                border: "border-emerald-400/40 hover:border-emerald-300/70",
                glow: "bg-emerald-500/25",
                top: "from-transparent via-emerald-400 to-transparent",
                iconBox:
                  "border-emerald-400/35 bg-emerald-500/15 shadow-[0_0_38px_rgba(16,185,129,0.20)]",
                iconText: "text-emerald-300",
                tagHover: "hover:border-emerald-400/45 hover:bg-emerald-500/10",
                badge:
                  "bg-emerald-500/15 text-emerald-300 shadow-[0_0_22px_rgba(16,185,129,0.16)]",
              }
            : {
                border: "border-violet-400/40 hover:border-violet-300/70",
                glow: "bg-violet-500/25",
                top: "from-transparent via-violet-400 to-transparent",
                iconBox:
                  "border-violet-400/35 bg-violet-500/15 shadow-[0_0_38px_rgba(168,85,247,0.20)]",
                iconText: "text-violet-300",
                tagHover: "hover:border-violet-400/45 hover:bg-violet-500/10",
                badge:
                  "bg-violet-500/15 text-violet-300 shadow-[0_0_22px_rgba(168,85,247,0.16)]",
              };

        return (
          <div
            key={cat.titleEn}
            className={cx(
              "skill-card group relative flex flex-col overflow-hidden rounded-[28px] border bg-slate-950/55 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:bg-slate-950/75 sm:p-7 md:min-h-[430px] lg:min-h-[500px]",
              tone.border
            )}
          >
            <div className={cx("wave-mask")} />
            <div className={cx("absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r opacity-90", tone.top)} />
            <div className={cx("absolute -top-24 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70", tone.glow)} />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)] opacity-80" />

            <div className="relative z-10 flex items-start gap-5">
              <div
                className={cx(
                  "grid h-[62px] w-[62px] shrink-0 place-items-center rounded-2xl border backdrop-blur-xl transition-transform duration-300 group-hover:scale-105",
                  tone.iconBox
                )}
              >
                {cat.icon === "wordpress" ? (
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-blue-200/50 bg-white text-blue-600 shadow-[0_0_24px_rgba(96,165,250,0.35)]">
                    <span className="font-serif text-2xl font-black leading-none">W</span>
                  </div>
                ) : cat.icon === "ai" ? (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={tone.iconText}
                  >
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <circle cx="9" cy="15" r="1" fill="currentColor" />
                    <circle cx="15" cy="15" r="1" fill="currentColor" />
                    <path d="M12 10V6" />
                    <circle cx="12" cy="4" r="1.5" />
                    <path d="M8 20h8" />
                  </svg>
                ) : (
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={tone.iconText}
                  >
                    <path d="m8 18-6-6 6-6" />
                    <path d="m16 6 6 6-6 6" />
                    <path d="m14 4-4 16" />
                  </svg>
                )}
              </div>

              <div className="min-w-0 pt-1">
                <h3 className="font-serif text-[20px] font-semibold leading-tight text-white sm:text-[22px]">
                  {lang === "bn" ? cat.titleBn : cat.titleEn}
                </h3>
                <p className="mt-2 text-[13.5px] leading-6 text-slate-300/78">
                  {lang === "bn" ? cat.descBn : cat.descEn}
                </p>
              </div>
            </div>

            <div
              className={cx(
                "relative z-10 my-6 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent",
                !expandedSkillCards[idx] && "hidden md:block"
              )}
            />

            <div
              className={cx(
                "relative z-10 flex flex-1 flex-wrap content-start gap-2",
                !expandedSkillCards[idx] && "hidden md:flex"
              )}
            >
              {cat.skills.map((skill, sidx) => (
                <div
                  key={skill}
                  style={{ animationDelay: `${idx * 120 + sidx * 40}ms`, animationPlayState: skillsVisible ? "running" : "paused" }}
                  className={cx(
                    "skill-chip inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3.5 py-2 text-[12.5px] font-medium text-slate-200/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:text-white",
                    tone.tagHover
                  )}
                >
                  <span className={cx("grid h-4 w-4 place-items-center rounded-full border border-current/40", tone.iconText)}>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 12 4 4 8-8" />
                    </svg>
                  </span>
                  {skill}
                </div>
              ))}
            </div>

            <div
              className={cx(
                "relative z-10 mt-auto flex items-center justify-between border-t border-white/10 pt-5",
                !expandedSkillCards[idx] && "hidden md:flex"
              )}
            >
              <div className="flex items-center gap-2">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={tone.iconText}
                >
                  <path d="M12 3 4 7l8 4 8-4-8-4Z" />
                  <path d="m4 12 8 4 8-4" />
                  <path d="m4 17 8 4 8-4" />
                </svg>
                <span className="text-[13px] font-medium text-slate-300/85">
                  {cat.skills.length}{" "}
                  {lang === "bn" ? "মূল দক্ষতা" : "core technologies"}
                </span>
              </div>

              <span
                className={cx(
                  "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                  tone.badge
                )}
              >
                {lang === "bn" ? "প্রমাণিত" : "PROVEN"}
              </span>
            </div>

            {/* Mobile Show More Button */}
            <button
              type="button"
              onClick={() =>
                setExpandedSkillCards((prev) => ({
                  ...prev,
                  [idx]: !prev[idx],
                }))
              }
              className="relative z-10 mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.10] md:hidden"
            >
              {expandedSkillCards[idx] ? (
                <>
                  {lang === "bn" ? "কম দেখুন" : "Show Less"}
                  <svg wizdth="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </>
              ) : (
                <>
                  {lang === "bn" ? "আরও দেখুন" : "Show More"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </>
              )}
            </button>
          </div>
        );
      })}
    </div>

    {/* Ongoing learning statement */}
    <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-[26px] border border-cyan-300/20 bg-gradient-to-br from-cyan-400/[0.08] via-white/[0.04] to-violet-400/[0.08] px-6 py-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.25)] backdrop-blur-2xl sm:px-12 sm:py-10">
      <div className="absolute inset-x-1/3 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />
      <svg className="mx-auto mb-4 h-7 w-7 text-cyan-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
        <path d="M12 2 13.5 10.5 22 12 13.5 13.5 12 22 10.5 13.5 2 12 10.5 10.5 12 2Z" />
      </svg>
      <p className="text-base font-medium leading-relaxed text-slate-200 sm:text-lg">
        {lang === "bn"
          ? "আমি নিয়মিত গবেষণা ও হাতে-কলমে অনুশীলনের মাধ্যমে সবসময় আপডেট থাকি, যাতে আপনার প্রজেক্টের জন্য সবচেয়ে ভালো ও আধুনিক সমাধান দিতে পারি।"
          : "I stay continuously updated through regular research and hands-on practice so I always bring the best, most current solution to your project."}
      </p>
    </div>
  </div>
</section>

{/* ═══════════════════════════════════════════════════════
    ★★★ PREMIUM MY WORK SECTION ★★★
    ═══════════════════════════════════════════════════════ */}

<motion.section
  id="work"
  ref={workRef}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.1 }}
  variants={workSectionVariants}
  className="relative overflow-hidden border-y border-slate-800/80 bg-[#050816] py-20 text-white sm:py-32"
>
  {/* ═══ PREMIUM BACKGROUND SYSTEM ═══ */}
  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* Subtle project-style atmosphere */}
    <div className="absolute -top-24 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
    <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-rose-500/8 blur-[100px]" />

    {/* Floating particles */}
    {[
      { top: '12%', left: '6%', color: 'bg-cyan-300', size: 'h-2 w-2', glow: '0 0 20px 6px rgba(34,211,238,0.5)', delay: '0s' },
      { top: '22%', right: '4%', color: 'bg-violet-400', size: 'h-1.5 w-1.5', glow: '0 0 16px 4px rgba(167,139,250,0.4)', delay: '2s' },
      { top: '55%', left: '3%', color: 'bg-emerald-400', size: 'h-1 w-1', glow: '0 0 12px 3px rgba(52,211,153,0.4)', delay: '4s' },
      { top: '75%', right: '8%', color: 'bg-sky-300', size: 'h-2 w-2', glow: '0 0 18px 5px rgba(125,211,252,0.4)', delay: '1s' },
      { top: '40%', right: '2%', color: 'bg-indigo-400', size: 'h-1 w-1', glow: '0 0 14px 3px rgba(129,140,248,0.4)', delay: '3s' },
      { top: '88%', left: '15%', color: 'bg-cyan-400', size: 'h-1.5 w-1.5', glow: '0 0 16px 4px rgba(34,211,238,0.3)', delay: '5s' },
    ].map((p, i) => (
      <span
        key={i}
        className={`absolute rounded-full ${p.color} ${p.size}`}
        style={{
          top: p.top,
          left: p.left,
          right: p.right,
          boxShadow: p.glow,
          animation: `ping 3s cubic-bezier(0,0,0.2,1) infinite`,
          animationDelay: p.delay,
          animationDuration: '4s',
        }}
      />
    ))}
  </div>

  <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-10">
    {/* ═══ SECTION HEADER ═══ */}
    <div className="mx-auto max-w-3xl text-center">
      {/* Badge */}
      <motion.div
        variants={workBadgeVariant}
        className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-indigo-400/40 bg-slate-950/90 px-5 py-2.5 text-sm font-semibold text-indigo-300 shadow-2xl shadow-indigo-400/10 backdrop-blur-xl ring-1 ring-indigo-400/30"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]" />
        </span>
        <span className="bg-gradient-to-r from-indigo-300 to-blue-300 bg-clip-text text-transparent font-bold tracking-wide">
          {lang === "bn" ? "আমার কাজ" : "My Work"}
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h2
        variants={workHeadingVariant}
        className="font-serif text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl leading-[1.15]"
      >
        {lang === "bn" ? (
          <>
            আমার{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">
                শ্রেষ্ঠ কাজ
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-rose-400 opacity-70" />
            </span>{" "}
            এবং প্রভাব
          </>
        ) : (
          <>
            My{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">
                Best Work
              </span>
              <span className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-400 via-blue-400 to-rose-400 opacity-70" />
            </span>{" "}
            & Impact
          </>
        )}
      </motion.h2>

      {/* Subtext Quote Card */}
      <motion.div variants={workQuoteVariant} className="mx-auto mt-8 max-w-2xl">
        <div className="group relative overflow-hidden rounded-[22px] border border-indigo-400/20 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-indigo-950/30 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-0.5 hover:border-indigo-300/40 hover:shadow-[0_28px_85px_rgba(99,102,241,0.16),inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-7">
          <div className="pointer-events-none absolute inset-y-5 left-0 w-1 rounded-r-full bg-gradient-to-b from-indigo-400 via-blue-400 to-rose-400 opacity-90 shadow-[0_0_18px_rgba(99,102,241,0.55)]" />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/70 to-transparent" />
          {/* Gradient sweep on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-blue-500/5 to-rose-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Corner accents */}
          {[
            'top-0 left-0 border-t border-l border-cyan-400/40 rounded-tl-lg',
            'top-0 right-0 border-t border-r border-violet-400/40 rounded-tr-lg',
            'bottom-0 left-0 border-b border-l border-violet-400/40 rounded-bl-lg',
            'bottom-0 right-0 border-b border-r border-cyan-400/40 rounded-br-lg',
          ].map((cls, i) => (
            <span key={i} className={`absolute w-4 h-4 ${cls} transition-all duration-500 group-hover:w-6 group-hover:h-6`} />
          ))}

          <div className="relative z-10 flex items-start gap-4 pl-1">
            <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-200/25 bg-amber-300/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]">
              <svg className="h-4 w-4 text-amber-200 drop-shadow-[0_0_8px_rgba(253,186,116,0.45)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="pt-0.5 text-sm font-medium leading-6 text-slate-200/90 text-left sm:text-[15px] sm:leading-7">
              {lang === "bn"
                ? "প্রতিটি প্রজেক্ট আমার কাছে গুণগত মান, সৃজনশীলতা এবং ক্লায়েন্ট সন্তুষ্টির প্রতিশ্রুতি। এখানে আমার দক্ষতা ও নিষ্ঠার সাথে সম্পন্ন করা কাজগুলো দেখুন।"
                : "Every project I take on is a commitment to quality, creativity, and client satisfaction. Here's a showcase of the work I've delivered with dedication and expertise."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>

    {/* ═══ STATS BAR ═══ */}
    <motion.div
      variants={statsContainerVariant}
      className="mt-10 grid grid-cols-3 gap-2 sm:mt-12 sm:gap-4"
    >
      {[
        {
          value: "1+",
          labelBn: "প্রজেক্ট সম্পন্ন",
          labelEn: "Projects Done",
          subBn: "সফলভাবে ডেলিভারি",
          subEn: "Successfully delivered",
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-blue-300">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          ),
          valueColor: "text-blue-300",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20",
          glowColor: "rgba(59,130,246,0.15)",
          hoverGlow: "rgba(59,130,246,0.25)",
          barColor: "from-blue-500 to-cyan-400",
          barWidth: "w-3/4",
        },
        {
          value: "100%",
          labelBn: "ক্লায়েন্ট সন্তুষ্টি",
          labelEn: "Client Satisfaction",
          subBn: "খুশি ক্লায়েন্ট",
          subEn: "Happy clients",
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-300">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 14s1.5 2 4 2 4-2 4-2" />
              <line x1="9" y1="9" x2="9.01" y2="9" />
              <line x1="15" y1="9" x2="15.01" y2="9" />
            </svg>
          ),
          valueColor: "text-emerald-300",
          bgColor: "bg-emerald-500/10",
          borderColor: "border-emerald-500/20",
          glowColor: "rgba(52,211,153,0.15)",
          hoverGlow: "rgba(52,211,153,0.25)",
          barColor: "from-emerald-500 to-teal-400",
          barWidth: "w-full",
        },
        {
          value: "5/5",
          labelBn: "গড় রেটিং",
          labelEn: "Average Rating",
          subBn: "ক্লায়েন্ট ফিডব্যাক",
          subEn: "Client feedback",
          icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-violet-300">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ),
          valueColor: "text-violet-300",
          bgColor: "bg-violet-500/10",
          borderColor: "border-violet-500/20",
          glowColor: "rgba(167,139,250,0.15)",
          hoverGlow: "rgba(167,139,250,0.25)",
          barColor: "from-violet-500 to-indigo-400",
          barWidth: "w-full",
        },
      ].map((stat) => (
        <motion.div
          key={stat.value}
          variants={statCardVariant}
          whileHover={{
            y: -6,
            scale: 1.02,
            boxShadow: `0 24px 80px ${stat.hoverGlow}`,
            transition: { duration: 0.25 }
          }}
          className={cx(
            "group relative flex min-h-[148px] flex-col overflow-hidden rounded-2xl border bg-slate-950/65 p-3 shadow-[0_14px_38px_rgba(0,0,0,0.22)] backdrop-blur-2xl transition-all duration-400 sm:min-h-[165px] sm:rounded-[20px] sm:p-4",
            stat.borderColor
          )}
          style={{ boxShadow: `0 16px 48px ${stat.glowColor}` }}
        >
          <div className={cx("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70", stat.bgColor, "from-white/[0.03] to-transparent")} />
          <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />

          {/* Icon row */}
          <div className="relative z-10 mb-3 flex items-center justify-between sm:mb-4">
            <div className={cx("grid h-8 w-8 place-items-center rounded-xl border shadow-inner transition duration-300 group-hover:scale-105 sm:h-10 sm:w-10", stat.bgColor, stat.borderColor)}>
              {stat.icon}
            </div>
            <div className="flex gap-1 opacity-80">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cx("h-1 rounded-full transition-all duration-300", stat.valueColor.replace('text-', 'bg-').replace('300', '400'))}
                  style={{ width: i < 3 ? '7px' : '4px', opacity: i < 3 ? 1 : 0.25 }}
                />
              ))}
            </div>
          </div>

          {/* Value */}
          <div className={cx("relative z-10 font-mono text-xl font-black leading-none tracking-tight sm:text-2xl", stat.valueColor)}>
            {stat.value}
          </div>

          {/* Labels */}
          <div className="relative z-10 mt-1.5 min-w-0">
            <p className="truncate text-[9px] font-semibold text-white/90 sm:text-[12px]">
              {lang === "bn" ? stat.labelBn : stat.labelEn}
            </p>
            <p className="mt-0.5 truncate text-[8px] text-slate-500 sm:text-[10px]">
              {lang === "bn" ? stat.subBn : stat.subEn}
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative z-10 mt-auto pt-3 sm:pt-4">
            <div className="h-1 w-full rounded-full bg-white/[0.07] p-px shadow-inner">
              <div className={cx("h-full rounded-full bg-gradient-to-r shadow-[0_0_12px_currentColor]", stat.barColor, stat.barWidth)} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    {/* ═══ FILTER TABS ═══ */}
    <motion.div variants={filterTabsVariant} className="mt-10 flex w-full min-w-0 items-center justify-center sm:mt-14">
      <div className="relative w-full max-w-full overflow-hidden rounded-2xl border border-white/8 bg-slate-900/30 p-1.5 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.04)] sm:w-auto">
        <div className="grid w-full grid-cols-3 gap-1 sm:flex sm:w-auto">
          {[
            {
              k: "all",
              labelBn: "সব প্রজেক্ট",
              labelEn: "All Projects",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              ),
              activeGradient: "from-cyan-500/30 via-sky-500/20 to-violet-600/20",
              activeBorder: "border-cyan-400/40",
              activeShadow: "0 0 30px rgba(34,211,238,0.25)",
              activeText: "text-white",
              activeBadge: "bg-cyan-400/20 text-cyan-200",
            },
            {
              k: "website",
              labelBn: "ওয়েবসাইট",
              labelEn: "Websites",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              ),
              activeGradient: "from-emerald-500/25 via-teal-500/15 to-emerald-600/15",
              activeBorder: "border-emerald-400/40",
              activeShadow: "0 0 30px rgba(52,211,153,0.2)",
              activeText: "text-white",
              activeBadge: "bg-emerald-400/20 text-emerald-200",
            },
            {
              k: "automation",
              labelBn: "অটোমেশন",
              labelEn: "Automation",
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
                </svg>
              ),
              activeGradient: "from-violet-500/25 via-indigo-500/15 to-violet-600/15",
              activeBorder: "border-violet-400/40",
              activeShadow: "0 0 30px rgba(167,139,250,0.2)",
              activeText: "text-white",
              activeBadge: "bg-violet-400/20 text-violet-200",
            },
          ].map((tab) => {
            const count =
              tab.k === "all"
                ? projects.filter((p) => p.visible !== false).length
                : projects.filter((p) => p.type === tab.k && p.visible !== false).length;
            const isActive = activeFilter === tab.k;

            return (
              <motion.button
                key={tab.k}
                type="button"
                onClick={() => setActiveFilter(tab.k as "all" | "website" | "automation")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cx(
                  "relative flex min-w-0 items-center justify-center gap-1 rounded-xl px-1.5 py-2.5 text-[10px] font-semibold transition-all duration-300 cursor-pointer overflow-hidden sm:gap-2 sm:px-5 sm:py-3 sm:text-sm",
                  isActive
                    ? cx(
                        "border bg-gradient-to-br shadow-lg",
                        tab.activeGradient,
                        tab.activeBorder,
                        tab.activeText
                      )
                    : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5"
                )}
                style={isActive ? { boxShadow: tab.activeShadow } : {}}
              >
                {/* Active glow sweep */}
                {isActive && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                )}

                <span className={cx("shrink-0 transition-colors duration-300", isActive ? "text-current" : "text-slate-500")}>
                  {tab.icon}
                </span>

                <span className="relative z-10 whitespace-nowrap">
                  {lang === "bn" ? tab.labelBn : tab.labelEn}
                </span>

                {count > 0 && (
                  <span
                    className={cx(
                      "relative z-10 rounded-full px-1.5 py-0.5 text-[9px] font-bold tabular-nums sm:px-2 sm:text-[10px]",
                      isActive ? tab.activeBadge : "bg-white/8 text-slate-400"
                    )}
                  >
                    {count}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>

    {/* ═══ PROJECT CARDS GRID ═══ */}
    {filtered.length > 0 ? (
      <motion.div
        layout
        className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((p, pidx) => (
          <motion.article
            key={p.id}
            layout
            role="button"
            tabIndex={0}
            onClick={() => setSelected(p)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSelected(p); }}
            onMouseMove={handleTiltMove}
            onMouseLeave={handleTiltLeave}
            variants={projectCardVariant}
            custom={pidx}
            initial="hidden"
            animate="visible"
            exit="hidden"
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={cx(
              "group relative flex flex-col overflow-hidden rounded-[28px] border border-white/8 bg-slate-950/55 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:border-white/16 hover:bg-slate-950/75 hover:shadow-[0_20px_80px_rgba(99,102,241,0.14)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
            )}
          >
            {/* Top accent line */}
            <div className={cx(
              "absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500",
              p.slug === 'cocoa-haven'
                ? "from-transparent via-cyan-400 to-transparent"
                : p.slug === 'poshaker-bazar'
                ? "from-transparent via-violet-400 to-transparent"
                : "from-transparent via-rose-400 to-transparent"
            )} />

            {/* ── IMAGE AREA ── */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950/80">
              <motion.img
                src={p.cover}
                alt={p.title}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Multi-stop gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

              {/* Side gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/30 via-transparent to-transparent" />

              {/* Type Badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className={cx(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold backdrop-blur-xl border shadow-lg",
                  p.type === "website"
                    ? "bg-blue-950/70 text-blue-200 border-blue-400/30 shadow-blue-500/10"
                    : "bg-rose-950/70 text-rose-200 border-rose-400/30 shadow-rose-500/10"
                )}>
                  <span className={cx(
                    "h-1.5 w-1.5 rounded-full shadow-sm",
                    p.type === "website" ? "bg-blue-300" : "bg-rose-300"
                  )} />
                  {p.type === "website" ? "Website" : "Automation"}
                </span>
              </div>

              {/* Status Badge */}
              {p.status && (
                <div className="absolute right-4 top-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-950/70 px-3 py-1.5 text-[11px] font-bold text-teal-200 backdrop-blur-xl border border-teal-300/30 shadow-lg shadow-teal-300/10">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" />
                    </span>
                    {p.status}
                  </span>
                </div>
              )}

              {/* View Project button */}
              <div className="absolute bottom-4 right-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 8 }}
                  whileHover={{ scale: 1.1 }}
                  className="opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 grid h-10 w-10 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur-xl border border-white/20 shadow-lg"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17 17 7M7 7h10v10" />
                  </svg>
                </motion.div>
              </div>

              {/* Year overlay */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[10px] font-medium text-white/50 backdrop-blur-sm">
                  © {p.year}
                </span>
              </div>
            </div>

            {/* ── CONTENT AREA ── */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">

              {/* Title + Category */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className={cx(
                    "font-serif text-base sm:text-lg font-bold text-white transition-colors duration-300 leading-snug",
                    p.slug === "cocoa-haven"
                      ? "group-hover:text-blue-300"
                      : p.slug === "poshaker-bazar"
                      ? "group-hover:text-rose-300"
                      : "group-hover:text-indigo-300"
                  )}>
                    {p.title}
                  </h3>
                  {p.category && (
                    <p className="mt-1 text-[11px] font-medium text-slate-500 flex items-center gap-1.5">
                      <span className={cx(
                        "h-1 w-1 rounded-full",
                        p.type === "website" ? "bg-emerald-400/60" : "bg-violet-400/60"
                      )} />
                      {p.category}
                    </p>
                  )}
                </div>

                {/* Mini rating */}
                <div className="shrink-0 flex items-center gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-amber-400">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                {p.summary}
              </p>

              {/* Tech Stack Label */}
              <div className="mt-4 flex items-center gap-2">
                <div className="h-px flex-1 bg-gradient-to-r from-white/8 to-transparent" />
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">
                  Tech Stack
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-white/8 to-transparent" />
              </div>

              {/* Tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={cx(
                      "rounded-lg px-2.5 py-1 text-[10px] font-semibold border transition-all duration-300",
                        p.type === "website"
                        ? "bg-blue-500/8 text-blue-300/80 border-blue-400/15 group-hover:bg-blue-500/15 group-hover:text-blue-300"
                        : "bg-rose-500/8 text-rose-300/80 border-rose-400/15 group-hover:bg-rose-500/15 group-hover:text-rose-300"
                    )}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Client Footer */}
              <div className="mt-5 flex items-center justify-between border-t border-white/6 pt-4">
                <div className="flex items-center gap-2.5">
                  {p.logo ? (
                    <img
                      loading="eager"
                      decoding="async"
                      src={p.logo}
                      alt=""
                      className="h-8 w-8 rounded-full object-cover border border-white/10 shadow-sm"
                    />
                  ) : (
                    <div className={cx(
                      "grid h-8 w-8 place-items-center rounded-full text-[11px] font-black text-white shadow-sm",
                      p.type === "website"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : "bg-gradient-to-br from-rose-500 to-orange-600"
                    )}>
                      {p.review.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] font-semibold text-slate-300 leading-none">
                      {p.review.clientName}
                    </p>
                    <p className="text-[9px] text-slate-600 mt-0.5">Client</p>
                  </div>
                </div>

                {/* View details CTA */}
                <motion.div
                  whileHover={{ x: 2 }}
                  className={cx(
                    "flex items-center gap-1 text-[11px] font-semibold transition-colors duration-300",
                    p.type === "website" ? "text-blue-300/80 group-hover:text-blue-200" : "text-rose-300/80 group-hover:text-rose-200"
                  )}
                >
                  {lang === "bn" ? "দেখুন" : "View"}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    ) : (
      /* ── EMPTY STATE ── */
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-14 flex justify-center"
      >
        <div className="w-full max-w-lg rounded-3xl border border-dashed border-slate-700/60 bg-slate-900/20 px-10 py-16 text-center backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500/15 to-violet-500/15 border border-white/8 text-3xl">
            ✨
          </div>
          <h3 className="mt-5 text-xl font-bold text-white">
            {lang === "bn" ? "শীঘ্রই আসছে" : "Coming Soon"}
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {lang === "bn"
              ? "অটোমেশন প্রজেক্টগুলো এখানে শীঘ্রই যুক্ত করা হবে। চোখ রাখুন!"
              : "Automation projects will be added here soon. Stay tuned!"}
          </p>
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 animate-pulse"
                style={{ width: i === 1 ? '24px' : '8px', animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    )}

    {/* ═══ BOTTOM CTA ═══ */}
    <motion.div
      variants={workQuoteVariant}
      className="mt-16 sm:mt-20 text-center"
    >
      <div className="group relative inline-flex w-full max-w-[320px] flex-col items-center gap-3 overflow-hidden rounded-[22px] border border-cyan-300/20 bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-violet-950/35 px-5 py-4 shadow-[0_20px_55px_rgba(0,0,0,0.32),inset_0_1px_0_rgba(255,255,255,0.09)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-0.5 hover:border-cyan-300/40 hover:shadow-[0_24px_70px_rgba(34,211,238,0.14),inset_0_1px_0_rgba(255,255,255,0.12)] sm:w-auto sm:max-w-none sm:flex-row sm:gap-4 sm:px-5 sm:py-3.5">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
        <div className="pointer-events-none absolute -right-10 -top-12 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="relative z-10 flex items-center gap-2 text-[13px] font-medium text-slate-300 sm:text-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.85)]" />
          {lang === "bn" ? "আপনার প্রজেক্ট নিয়ে কথা বলতে চান?" : "Have a project in mind?"}
        </div>
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/20 to-transparent sm:h-5 sm:w-px sm:bg-gradient-to-b" />
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="relative z-10 inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-white/15 bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(16,185,129,0.25),inset_0_1px_0_rgba(255,255,255,0.28)] transition-all duration-300 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-[0_10px_32px_rgba(16,185,129,0.38),inset_0_1px_0_rgba(255,255,255,0.35)] sm:w-auto"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {lang === "bn" ? "যোগাযোগ করুন" : "Let's Talk"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.a>
      </div>
    </motion.div>

  </div>
</motion.section>

{/* ═══════════════════════════════════════════════════════
    ★★★ MY PROJECT SECTION (Plugins / future tabs) ★★★
    ═══════════════════════════════════════════════════════ */}
<motion.section
  id="my-project"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.15 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="hidden relative overflow-hidden border-y border-slate-800/80 bg-[#050816] py-16 text-white sm:py-24"
>
  <div aria-hidden className="pointer-events-none absolute inset-0">
    <div className="absolute -top-24 left-1/2 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
    <div className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-rose-500/8 blur-[100px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/40 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-indigo-300 shadow-2xl shadow-indigo-400/10 backdrop-blur-xl ring-1 ring-indigo-400/30">
        <span className="h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_16px_4px_rgba(99,102,241,0.6)]" />
        {lang === "bn" ? "আমার প্রজেক্ট" : "My Project"}
      </div>
      <h2 className="font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
        {lang === "bn" ? (
          <>
            কাস্টম{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">
              ওয়ার্ডপ্রেস প্লাগিন
            </span>{" "}
            ও টুলস
          </>
        ) : (
          <>
            Custom{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-rose-400 bg-clip-text text-transparent">
              WordPress Plugins
            </span>{" "}
            & Tools
          </>
        )}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400 sm:text-base">
        {lang === "bn"
          ? "নিজে তৈরি করা প্লাগিন যা রিয়েল ই-কমার্স সমস্যার সমাধান করে।"
          : "In-house built plugins that solve real e-commerce problems."}
      </p>
    </div>

    <div className="mt-10 flex justify-center">
      <div className="inline-flex flex-wrap gap-1 rounded-2xl border border-white/8 bg-slate-900/40 p-1.5 backdrop-blur-xl">
        {projectTabs.map((tab) => {
          const isActive = activeProjectTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveProjectTab(tab.key)}
              className={cx(
                "relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300",
                isActive
                  ? "bg-gradient-to-br from-indigo-500/25 via-blue-500/15 to-indigo-600/15 text-white shadow-[0_0_24px_rgba(99,102,241,0.25)] border border-indigo-400/40"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              🧩 {lang === "bn" ? tab.labelBn : tab.labelEn}
            </button>
          );
        })}
      </div>
    </div>

    {activeProjectTab === "plugins" && (
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {wordpressPlugins.map((plugin) => (
          <div
            key={plugin.id}
            className="group relative flex flex-col overflow-hidden rounded-[28px] border border-white/8 bg-slate-950/55 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-500 hover:bg-slate-950/75 hover:border-white/16 sm:p-7"
          >
            <div className={cx("absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r opacity-80", plugin.accent)} />
            <div className={cx("pointer-events-none absolute -top-20 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full opacity-60 blur-3xl bg-gradient-to-r", plugin.accent)} />

            <div className="relative z-10 flex items-start gap-4">
              <div
                className={cx(
                  "grid h-14 w-14 shrink-0 place-items-center rounded-2xl border backdrop-blur-xl",
                  plugin.accentLight
                )}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.5 11H19V7a2 2 0 0 0-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4a2 2 0 0 0-2 2v3.8h1.5a2.3 2.3 0 0 1 0 4.6H2V19a2 2 0 0 0 2 2h3.8v-1.5a2.3 2.3 0 0 1 4.6 0V21H16a2 2 0 0 0 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">
                  {lang === "bn" ? plugin.nameBn : plugin.nameEn}
                </h3>
                <p className="mt-1 text-[12.5px] font-medium text-slate-400">
                  {lang === "bn" ? plugin.taglineBn : plugin.taglineEn}
                </p>
              </div>
            </div>

            <p className="relative z-10 mt-5 text-[13.5px] leading-6 text-slate-300/85">
              {lang === "bn" ? plugin.descriptionBn : plugin.descriptionEn}
            </p>

            <div className="relative z-10 mt-5 space-y-2.5">
              {(lang === "bn" ? plugin.featuresBn : plugin.featuresEn).map((f, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className={cx("mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full", plugin.accentLight)}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 12 4 4 8-8" />
                    </svg>
                  </span>
                  <span className="text-[13px] leading-5 text-slate-300/90">{f}</span>
                </div>
              ))}
            </div>

            <div className="relative z-10 mt-6">
              <div className="mb-2 flex items-center gap-2">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  {lang === "bn" ? "স্ক্রিনশট" : "Screenshots"}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {plugin.screenshots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {plugin.screenshots.map((s, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedPlugin(plugin)}
                      className="aspect-[4/3] overflow-hidden rounded-xl border border-white/10"
                    >
                      <img src={s} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-white/12 bg-white/[0.03] text-[10px] text-slate-500"
                    >
                      {lang === "bn" ? "শীঘ্রই" : "Coming Soon"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</motion.section>

      <motion.section
        id="about"
        ref={aboutRef}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden border-y border-slate-800/80 bg-[#050816] pt-[20px] pb-14 text-white sm:pt-[80px] sm:pb-20"
      >
        {/* Background decorations */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-violet-500/10 to-transparent blur-3xl" />
          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]" />
        </div>

        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          {/* About Me Badge — Top Center */}
          <div className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-slate-950/60 px-4 py-2 text-sm font-semibold text-slate-100 shadow-[0_0_30px_rgba(16,185,129,0.1)] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
              {lang === "bn" ? "আমার সম্পর্কে" : "About Me"}
            </div>
          </div>

          {/* ── PART 1: Hero Intro ── */}
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">

            {/* ═════ LEFT: Photo Card ═════ */}
            <div className="relative flex justify-center lg:justify-start order-last lg:order-first">

              {/* Orbital rings — behind card */}
              <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="absolute h-[400px] w-[400px] rounded-full border border-violet-400/15" />
                <div className="absolute h-[340px] w-[340px] rounded-full border border-dashed border-cyan-400/15" />
                <span className="absolute left-[50%] top-[6%] h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.9)]" />
                <span className="absolute bottom-[8%] left-[20%] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_14px_rgba(167,139,250,0.9)]" />
                <span className="absolute right-[8%] top-[42%] h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
              </div>

              {/* Main Glass Card */}
              <div className="relative z-10 w-full max-w-[400px] overflow-hidden rounded-[36px] border border-white/10 bg-slate-900/40 p-3 shadow-[0_30px_90px_rgba(0,0,0,0.5)] backdrop-blur-2xl">

                {/* Top gradient line */}
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-80" />

                {/* ─── Photo Container ─── */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px]">

                  {/* Background — Beautiful dark blue-purple gradient matching your design */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.5),transparent_50%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(168,85,247,0.4),transparent_55%)]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.25),transparent_65%)]" />
                  {/* Orbital ring accents */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
                    <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-400/10 border-dashed" />
                  </div>

                  {/* ★ YOUR PHOTO HERE — actual photo inserted below */}
                  <img
                    loading="eager"
                    decoding="async"
                    src={AbdulAlimMir}
                    alt="Abdul Alim Mir"
                    className="relative z-10 h-full w-full object-cover object-center"
                    onError={(e: any) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  {/* ─── Bottom Name Overlay ─── */}
                  <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent px-4 pb-4 pt-12">
                    <div className="font-serif text-[32px] font-bold leading-[0.95] text-white tracking-tight">
                      Abdul
                    </div>
                    <div className="font-serif text-[32px] font-bold leading-[0.95] bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent tracking-tight">
                      Alim
                    </div>
                    <div className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-slate-300">
                      Web & AI Expert
                    </div>
                  </div>
                </div>

                {/* ─── Core Expertise Strip ─── */}
                <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/60 p-3 backdrop-blur">
                  <div className="text-xs font-semibold text-white">Core Expertise</div>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {[
                      {
                        name: "WordPress",
                        sub: "Expert",
                        color: "from-blue-500/20 to-blue-600/20 border-blue-400/30 text-blue-300",
                        icon: (
                          <img 
                            loading="eager" decoding="async" 
                            src={WordPressLogo} 
                            alt="WordPress" 
                            style={{width: '20px', height: '20px', objectFit: 'contain'}} 
                          />
                        ),
                      },
                      {
                        name: "Custom Coding",
                        sub: "Expert",
                        color: "from-orange-500/20 to-amber-600/20 border-orange-400/30 text-orange-300",
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="16 18 22 12 16 6"></polyline>
                            <polyline points="8 6 2 12 8 18"></polyline>
                          </svg>
                        ),
                      },
                      {
                        name: "WooCommerce",
                        sub: "Expert",
                        color: "from-violet-500/20 to-purple-600/20 border-violet-400/30 text-violet-300",
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                          </svg>
                        ),
                      },
                      {
                        name: "AI Automation",
                        sub: "Specialist",
                        color: "from-emerald-500/20 to-teal-600/20 border-emerald-400/30 text-emerald-300",
                        icon: (
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="3" y="11" width="18" height="10" rx="2" />
                            <circle cx="12" cy="5" r="2" />
                            <path d="M12 7v4" />
                            <circle cx="8.5" cy="15.5" r="1" />
                            <circle cx="15.5" cy="15.5" r="1" />
                          </svg>
                        ),
                      },
                    ].map((skill) => (
                      <div key={skill.name} className="flex flex-col items-center text-center">
                        <div className={cx("grid h-9 w-9 place-items-center rounded-lg border bg-gradient-to-br backdrop-blur transition-transform duration-300 hover:scale-110", skill.color)}>
                          {skill.icon}
                        </div>
                        <div className="mt-1 text-[9px] font-semibold text-white leading-tight">{skill.name}</div>
                        <div className="text-[8px] text-slate-400">{skill.sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ═════ RIGHT: Text Content ═════ */}
            <div className="order-first lg:order-last">
              {/* Heading */}
              <h2 className="mt-6 font-serif text-3xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[68px]">
                {lang === "bn" ? "হ্যালো, আমি" : "I'm"}{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Abdul Alim
                </span>
              </h2>

              {/* Subtitle */}
              <p className="mt-4 font-serif text-xl font-medium text-slate-300 sm:text-2xl">
                {lang === "bn"
                  ? "ওয়েব ডেভেলপার ও AI অটোমেশন এক্সপার্ট"
                  : "Web Developer & AI Automation Expert"}
              </p>

              {/* Divider */}
              <div className="my-6 h-[2px] w-20 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />

              {/* Description */}
              <p className="text-[15px] leading-7 text-slate-300/85">
                {lang === "bn"
                  ? "আমি একজন পেশাদার ওয়েব ডেভেলপার যিনি WordPress, কাস্টম-কোডেড ওয়েবসাইট এবং AI-চালিত অটোমেশন ওয়ার্কফ্লোতে বিশেষজ্ঞ।"
                  : "I am a professional web developer specializing in WordPress, custom coded websites, and AI-powered automation workflows."}
              </p>
              <p className="mt-4 text-[15px] leading-7 text-slate-300/85">
                {lang === "bn"
                  ? "আমি উচ্চমানের, নির্ভরযোগ্য এবং স্কেলেবল ডিজিটাল সমাধান প্রদানে মনোযোগ দিই, ক্লায়েন্ট সন্তুষ্টি আমার সর্বোচ্চ অগ্রাধিকার। প্রতিটি প্রজেক্ট পেশাদারিত্ব, বিস্তারিত মনোযোগ এবং শ্রেষ্ঠত্বের প্রতিশ্রুতি নিয়ে পরিচালিত হয়।"
                  : "I focus on delivering high-quality, reliable, and scalable digital solutions, with client satisfaction as my top priority. Every project I take on is handled with professionalism, attention to detail, and a commitment to excellence."}
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={(e) => e.preventDefault()}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 px-7 py-3.5 text-sm font-bold text-white shadow-[0_15px_40px_rgba(99,102,241,0.35)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(139,92,246,0.45)] cursor-default"
                >
                  {lang === "bn" ? "যোগাযোগ করুন" : "Let's Connect"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </button>
                <a
                  href="https://www.linkedin.com/in/abdul-alim-781776397/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/60 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-slate-900/80"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#0A66C2]">
                    <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5V8h3v11zM6.5 6.73A1.73 1.73 0 1 1 6.5 3.27a1.73 1.73 0 0 1 0 3.46zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z" />
                  </svg>
                  LinkedIn
                </a>
              </div>


            </div>
          </div>
        </div>
      </motion.section>

      {/* ═══════════════════════════════════════════════════════
          ★★★ MY JOURNEY TIMELINE — IMG 2 STYLE (LARGE ICONS) ★★★
          Required: lang, cx()
      ═══════════════════════════════════════════════════════ */}
      <motion.section
        className="relative overflow-hidden bg-slate-950 py-8 text-white sm:py-12"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(6,182,212,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_25%)]" />
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">

          {/* Timeline Header */}
          <motion.div
            className="mb-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
              {lang === "bn" ? "আমার যাত্রা" : "My Journey"}
            </div>

            <h3 className="mx-auto max-w-5xl font-serif text-xl font-bold leading-[1.15] tracking-tight text-white sm:text-2xl lg:text-3xl">
              {lang === "bn" ? (
                <>
                  বৃদ্ধি,{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">শেখা</span>{" "}
                  ও পেশাদার{" "}
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">বিবর্তনের</span>{" "}
                  একটি টাইমলাইন
                </>
              ) : (
                <>
                  A timeline of{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-sky-400 bg-clip-text text-transparent">growth, learning,</span>{" "}
                  and professional{" "}
                  <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">evolution.</span>
                </>
              )}
            </h3>

            <div className="mt-8 flex flex-col items-center">
              <div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-400">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Vertical center line — desktop */}
            <div aria-hidden className="absolute left-1/2 top-0 hidden h-full w-[3px] -translate-x-1/2 bg-gradient-to-b from-transparent via-slate-500/80 to-transparent shadow-[0_0_20px_rgba(148,163,184,0.18)] md:block" />
            {/* Mobile vertical line */}
            <div aria-hidden className="absolute left-6 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-slate-500/80 to-transparent shadow-[0_0_20px_rgba(148,163,184,0.18)] md:hidden" />

            <div className="space-y-6 md:space-y-1">
              {[
                {
                  year: "2023", short: "23",
                  titleEn: "Web Development Journey Begins",
                  titleBn: "ওয়েব ডেভেলপমেন্ট যাত্রা শুরু",
                  descEn: "Started learning HTML5, CSS3, and JavaScript to build responsive, modern websites and strong development fundamentals.",
                  descBn: "রেসপন্সিভ, আধুনিক ওয়েবসাইট তৈরি এবং শক্তিশালী ডেভেলপমেন্ট ফান্ডামেন্টাল গড়তে HTML5, CSS3 এবং JavaScript শেখা শুরু করি।",
                  ringBorder: "border-blue-400", ringText: "text-blue-300",
                  cardBorder: "border-blue-400/30 hover:border-blue-400/60",
                  cardGlow: "shadow-[0_0_50px_rgba(59,130,246,0.12)]",
                  iconBoxBg: "bg-blue-500/15 border-blue-400/40 text-blue-300",
                  accent: "from-blue-400 to-blue-600",
                  dotShadow: "shadow-[0_0_24px_rgba(59,130,246,0.8)]",
                  yearText: "text-blue-300",
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                      <line x1="14" y1="4" x2="10" y2="20" />
                    </svg>
                  ),
                  side: "left",
                },
                {
                  year: "2024", short: "24",
                  titleEn: "WordPress Ecosystem Mastery",
                  titleBn: "ওয়ার্ডপ্রেস ইকোসিস্টেম আয়ত্ত",
                  descEn: "Deep dive into WordPress, Elementor Pro, WooCommerce, advanced customization, and performance optimization.",
                  descBn: "WordPress, Elementor Pro, WooCommerce, অ্যাডভান্সড কাস্টমাইজেশন এবং পারফরম্যান্স অপ্টিমাইজেশনে গভীরভাবে ডুব দিই।",
                  ringBorder: "border-emerald-400", ringText: "text-emerald-300",
                  cardBorder: "border-emerald-400/30 hover:border-emerald-400/60",
                  cardGlow: "shadow-[0_0_50px_rgba(16,185,129,0.12)]",
                  iconBoxBg: "bg-emerald-500/15 border-emerald-400/40 text-emerald-300",
                  accent: "from-emerald-400 to-teal-600",
                  dotShadow: "shadow-[0_0_24px_rgba(16,185,129,0.8)]",
                  yearText: "text-emerald-300",
                  icon: (
                    <img 
                      loading="eager" decoding="async" 
                      src={WordPressLogo} 
                      alt="WordPress" 
                      style={{width: '36px', height: '36px', objectFit: 'contain'}} 
                    />
                  ),
                  side: "right",
                },
                {
                  year: "2025", short: "25",
                  titleEn: "AI Prompt Engineering & AI Automation",
                  titleBn: "AI প্রম্পট ইঞ্জিনিয়ারিং ও AI অটোমেশন",
                  descEn: "Mastered AI prompt engineering and n8n workflow automation, building intelligent AI agents and automated business solutions.",
                  descBn: "AI প্রম্পট ইঞ্জিনিয়ারিং এবং n8n ওয়ার্কফ্লো অটোমেশনে আয়ত্ত করি, ইন্টেলিজেন্ট AI এজেন্ট ও অটোমেটেড বিজনেস সলিউশন তৈরি করি।",
                  ringBorder: "border-violet-400", ringText: "text-violet-300",
                  cardBorder: "border-violet-400/30 hover:border-violet-400/60",
                  cardGlow: "shadow-[0_0_50px_rgba(139,92,246,0.12)]",
                  iconBoxBg: "bg-violet-500/15 border-violet-400/40 text-violet-300",
                  accent: "from-violet-400 to-purple-600",
                  dotShadow: "shadow-[0_0_24px_rgba(139,92,246,0.8)]",
                  yearText: "text-violet-300",
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="10" width="16" height="11" rx="2.5" />
                      <circle cx="12" cy="5" r="2" />
                      <path d="M12 7v3" />
                      <circle cx="9" cy="15" r="1.2" fill="currentColor" />
                      <circle cx="15" cy="15" r="1.2" fill="currentColor" />
                      <line x1="2" y1="14" x2="4" y2="14" />
                      <line x1="20" y1="14" x2="22" y2="14" />
                      <line x1="2" y1="18" x2="4" y2="18" />
                      <line x1="20" y1="18" x2="22" y2="18" />
                    </svg>
                  ),
                  side: "left",
                },
                {
                  year: "2026", short: "26",
                  titleEn: "Professional Work & Continuous Learning",
                  titleBn: "পেশাদার কাজ ও অবিরাম শেখা",
                  descEn: "Actively involved in professional projects while continuing to learn new technologies. Currently studying at B.S.S Tongi Govt College.",
                  descBn: "নতুন প্রযুক্তি শিখতে থাকার পাশাপাশি পেশাদার প্রজেক্টে সক্রিয়ভাবে যুক্ত। বর্তমানে B.S.S Tongi Govt College-এ অধ্যয়নরত।",
                  ringBorder: "border-amber-400", ringText: "text-amber-300",
                  cardBorder: "border-amber-400/30 hover:border-amber-400/60",
                  cardGlow: "shadow-[0_0_50px_rgba(245,158,11,0.12)]",
                  iconBoxBg: "bg-amber-500/15 border-amber-400/40 text-amber-300",
                  accent: "from-amber-400 to-orange-600",
                  dotShadow: "shadow-[0_0_24px_rgba(245,158,11,0.8)]",
                  yearText: "text-amber-300",
                  icon: (
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  ),
                  side: "right",
                  isCurrent: true,
                },
              ].map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
                  className={cx(
                    "group relative flex items-stretch gap-4 md:items-center md:gap-0",
                    item.side === "right" ? "md:flex-row-reverse" : "md:flex-row"
                  )}
                >
                  {/* ─── Card Side ─── */}
                  <div className="flex-1 pl-16 md:pl-0 md:w-[calc(50%-56px)]">
                    <div
                      className={cx(
                        "group/card relative overflow-hidden rounded-[24px] border bg-slate-900/40 p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-slate-900/60 sm:p-7",
                        item.cardBorder,
                        item.cardGlow
                      )}
                    >
                      {/* Top accent line */}
                      <div className={cx("absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r opacity-70 transition-opacity duration-300 group-hover/card:opacity-100", item.accent)} />

                      {/* ─── Top Row: Big Icon (LEFT) + Year + Title (RIGHT) ─── */}
                      <div className="flex items-start gap-4">
                        {/* Big Icon Box — LEFT */}
                        <div
                          className={cx(
                            "grid h-[68px] w-[68px] shrink-0 place-items-center rounded-2xl border backdrop-blur transition-all duration-300 group-hover/card:scale-105 group-hover/card:rotate-3",
                            item.iconBoxBg
                          )}
                        >
                          {item.icon}
                        </div>

                        {/* Year + Title — RIGHT */}
                        <div className="min-w-0 flex-1 pt-1">
                          {/* Year + Current Badge */}
                          <div className="flex flex-wrap items-center gap-2">
                            <div className={cx("inline-flex items-center gap-1.5 text-[12px] font-bold", item.yearText)}>
                              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <path d="M16 2v4M8 2v4M3 10h18" />
                              </svg>
                              {item.year}
                            </div>
                            {item.isCurrent && (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                </span>
                                {lang === "bn" ? "চলমান" : "Current"}
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h4 className="mt-2 font-serif text-[12px] font-bold leading-tight text-white sm:text-[18px] md:text-[20px]">
                            {lang === "bn" ? item.titleBn : item.titleEn}
                          </h4>

                          {/* Underline */}
                          <div className={cx("mt-3 h-[3px] w-12 rounded-full bg-gradient-to-r transition-all duration-300 group-hover/card:w-20", item.accent)} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-5 text-[14px] leading-5 sm:leading-7 text-slate-400">
                        {lang === "bn" ? item.descBn : item.descEn}
                      </p>
                    </div>
                  </div>

                  {/* ─── Center Year Circle + Connector (Desktop) ─── */}
                  <div className="relative z-10 hidden shrink-0 md:flex md:w-[112px] md:items-center md:justify-center">
                    {/* Horizontal connector dotted line */}
                    <div
                      aria-hidden
                      className={cx(
                        "absolute top-1/2 h-[3px] w-[32px] rounded-full",
                        item.side === "left" ? "right-full" : "left-full"
                      )}
                      style={{
                        backgroundImage: `linear-gradient(90deg, transparent, ${
                          item.ringText.includes("blue") ? "rgba(96,165,250,0.85)" :
                          item.ringText.includes("emerald") ? "rgba(52,211,153,0.85)" :
                          item.ringText.includes("violet") ? "rgba(167,139,250,0.85)" :
                          "rgba(245,158,11,0.85)"
                        } 35%, transparent)`,
                      }}
                    />
                    {/* Year Circle */}
                    <div
                      className={cx(
                        "relative grid h-[78px] w-[78px] place-items-center rounded-full border-[4px] bg-slate-950 transition-all duration-300 group-hover:scale-110",
                        item.ringBorder,
                        item.dotShadow
                      )}
                    >
                      <span className="absolute inset-0 rounded-full opacity-40 blur-xl"
                        style={{
                          background: item.ringText.includes("blue") ? "radial-gradient(circle, rgba(59,130,246,0.25), transparent 45%)" :
                            item.ringText.includes("emerald") ? "radial-gradient(circle, rgba(16,185,129,0.25), transparent 45%)" :
                            item.ringText.includes("violet") ? "radial-gradient(circle, rgba(167,139,250,0.25), transparent 45%)" :
                            "radial-gradient(circle, rgba(245,158,11,0.25), transparent 45%)"
                        }}
                      />
                      <span className={cx("relative font-mono text-lg font-bold", item.ringText)}>
                        {item.short}
                      </span>
                      <span className={cx("absolute -inset-1 rounded-full border opacity-40", item.ringBorder)} />
                    </div>
                  </div>

                  {/* ─── Mobile Year Circle (Left) ─── */}
                  <div className="absolute left-0 top-6 z-10 md:hidden">
                    <div className={cx("relative grid h-[56px] w-[56px] place-items-center rounded-full border-[4px] bg-slate-950", item.ringBorder, item.dotShadow)}>
                      <span className="absolute inset-0 rounded-full opacity-40 blur-xl"
                        style={{
                          background: item.ringText.includes("blue") ? "radial-gradient(circle, rgba(59,130,246,0.25), transparent 45%)" :
                            item.ringText.includes("emerald") ? "radial-gradient(circle, rgba(16,185,129,0.25), transparent 45%)" :
                            item.ringText.includes("violet") ? "radial-gradient(circle, rgba(167,139,250,0.25), transparent 45%)" :
                            "radial-gradient(circle, rgba(245,158,11,0.25), transparent 45%)"
                        }}
                      />
                      <span className={cx("relative font-mono text-sm font-bold", item.ringText)}>
                        {item.short}
                      </span>
                    </div>
                  </div>

                  {/* Empty spacer — Desktop */}
                  <div className="hidden md:block md:w-[calc(50%-56px)]" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Bottom Stats Bar ─── */}
          <div className="mt-16 rounded-[28px] border border-white/10 bg-slate-900/40 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl sm:p-8">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {[
                  {
                    valueEn: "3+",
                    valueBn: "৩+",
                    labelEn: "Years of Learning",
                    labelBn: "বছর শেখা",
                    iconBg: "bg-blue-500/15 border-blue-400/30 text-blue-300",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    ),
                  },
                  {
                    valueEn: "18+",
                    valueBn: "১৮+",
                    labelEn: "Technologies Mastered",
                    labelBn: "টেকনোলজি",
                    iconBg: "bg-emerald-500/15 border-emerald-400/30 text-emerald-300",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    ),
                  },
                  {
                    valueEn: "2+",
                    valueBn: "১৫+",
                    labelEn: "Projects Completed",
                    labelBn: "প্রজেক্ট সম্পন্ন",
                    iconBg: "bg-violet-500/15 border-violet-400/30 text-violet-300",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                      </svg>
                    ),
                  },
                  {
                    valueEn: "5/5",
                    valueBn: "৫/৫",
                    labelEn: "Client Satisfaction",
                    labelBn: "ক্লায়েন্ট সন্তুষ্টি",
                    iconBg: "bg-amber-500/15 border-amber-400/30 text-amber-300",
                    icon: (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ),
                  },
                ].map((stat) => (
                  <div key={stat.labelEn} className="flex items-center gap-4">
                    <div className={cx("grid h-12 w-12 shrink-0 place-items-center rounded-2xl border", stat.iconBg)}>
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-mono text-2xl font-bold leading-none text-white">
                        {lang === "bn" ? stat.valueBn : stat.valueEn}
                      </div>
                      <div className="mt-1.5 text-[12px] font-medium text-slate-400">
                        {lang === "bn" ? stat.labelBn : stat.labelEn}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        ref={contactRef}
        id="contact"
        initial="hidden"
        animate={contactInView ? "visible" : "hidden"}
        viewport={{ once: true, amount: 0.2 }}
        variants={contactSectionVariants}
        className="relative overflow-hidden border-y border-slate-800/80 bg-[#050816] [padding-top:32px] pb-8 text-white sm:pb-28"
      >
        {/* Background Gradients */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute top-1/2 left-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto max-w-3xl text-center">
            <motion.div variants={contactBadgeVariant} className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-slate-950/90 px-4 py-2 text-lg font-semibold text-emerald-300 shadow-2xl shadow-emerald-400/20 backdrop-blur-xl ring-1 ring-emerald-400/30 sm:text-xl">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_4px_rgba(52,211,153,0.7)]" />
              {lang === "bn" ? "যোগাযোগ" : "Contact"}
            </motion.div>

            <motion.h2 variants={contactHeadingVariant} className="font-serif text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              {lang === "bn" ? (
                <>আইডিয়াকে <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">প্রোডাক্টে</span> রূপ দিই</>
              ) : (
                <>
                  Turn Your Idea Into a <span className="bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
                    Product
                  </span>
                </>
              )}
            </motion.h2>

            <motion.span variants={contactDotVariant} className="mx-auto mt-4 h-3.5 w-3.5 rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.75)]" />
          </div>

          {/* Main Grid */}
          <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

            {/* LEFT: Form */}
            <motion.div
              variants={formCardVariant}
              whileHover={{ y: -5, boxShadow: "0 28px 90px rgba(168,85,247,0.16)" }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border bg-slate-950/55 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 will-change-transform hover:bg-slate-950/75 sm:p-7 border-violet-400/40 hover:border-violet-300/70"
            >
              <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-violet-400 to-transparent opacity-90" />
              <div className="absolute -top-24 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70 bg-violet-500/25" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)] opacity-80" />

              <div className="relative z-10 p-0">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 border border-violet-400/35 shadow-[0_0_38px_rgba(168,85,247,0.20)]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-white">
                      {lang === "bn" ? "মেসেজ পাঠান" : "Send Me a Message"}
                    </h3>
                    <p className="text-[12px] text-slate-400">
                      {lang === "bn" ? "সব ফিল্ড পূরণ করুন" : "Fill in the details below"}
                    </p>
                  </div>
                </div>

                <form ref={formRef} onSubmit={handleContactSubmit} className="space-y-4">
                  <motion.div variants={formFieldsContainerVariants} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-semibold text-slate-300">
                        {lang === "bn" ? "আপনার নাম" : "Your Name"} <span className="text-red-500">*</span>
                      </span>
                      <div className="relative">
                        <input
                          required
                          name="from_name"
                          placeholder="John Doe"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 py-2.5 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/20"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded bg-white/5 text-slate-400 text-[12px] font-bold">A</div>
                      </div>
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-semibold text-slate-300">
                        {lang === "bn" ? "ইমেইল" : "Email Address"} <span className="text-red-500">*</span>
                      </span>
                      <div className="relative">
                        <input
                          required
                          type="email"
                          name="reply_to"
                          placeholder="john@example.com"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 py-2.5 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/20"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded text-slate-400">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                      </div>
                    </label>
                  </div>

                  <label className="grid gap-1.5">
                    <span className="text-[13px] font-semibold text-slate-300">
                      {lang === "bn" ? "ফোন নম্বর" : "Phone Number"} <span className="text-[11px] font-normal text-slate-400">({lang === "bn" ? "ঐচ্ছিক" : "Optional"})</span>
                    </span>
                    <div className="relative">
                      <input
                        name="phone"
                        placeholder="01XXXXXXXXX"
                        className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 py-2.5 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/20"
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded text-slate-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.16-6.16 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      </div>
                    </div>
                  </label>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-semibold text-slate-300">
                        {lang === "bn" ? "বিষয়" : "Subject"} <span className="text-red-500">*</span>
                      </span>
                      <div className="relative">
                        <input
                          required
                          name="subject"
                          placeholder="Project Inquiry"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 py-2.5 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/20"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded text-slate-400">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                        </div>
                      </div>
                    </label>
                    <label className="grid gap-1.5">
                      <span className="text-[13px] font-semibold text-slate-300">
                        {lang === "bn" ? "প্রজেক্টের ধরন" : "Project Type"} <span className="text-red-500">*</span>
                      </span>
                      <div className="relative">
                        <select
                          required
                          name="project_type"
                          defaultValue=""
                          className="w-full rounded-xl border border-white/10 bg-white/[0.06] pl-11 py-2.5 pr-4 text-sm text-slate-100 outline-none transition focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/20"
                          style={{
                            backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23a1a1aa%22 stroke-width=%222%22%3e%3cpath d=%22M8 9l4-4 4 4M8 15l4 4 4-4%22/%3e%3c/svg%3e")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 0.75rem center',
                            backgroundSize: '1.25rem 1.25rem',
                            paddingRight: '2.5rem',
                            colorScheme: 'dark'
                          }}
                        >
                          <option value="" disabled style={{backgroundColor: '#1e293b', color: '#94a3b8'}}>
                            {lang === "bn" ? "প্রজেক্ট টাইপ বাছুন" : "Select a project type"}
                          </option>
                          <option value="Web Design & Development" style={{backgroundColor: '#1e293b', color: '#f1f5f9'}}>Web Design & Development</option>
                          <option value="Website Support & Maintenance" style={{backgroundColor: '#1e293b', color: '#f1f5f9'}}>Website Support & Maintenance</option>
                          <option value="AI Automation Workflow" style={{backgroundColor: '#1e293b', color: '#f1f5f9'}}>AI Automation Workflow</option>
                        </select>
                        <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded text-slate-400">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 9l4-4 4 4M8 15l4 4 4-4"/></svg>
                        </div>
                      </div>
                    </label>
                  </div>

                  <label className="grid gap-1.5">
                    <span className="text-[13px] font-semibold text-slate-300">
                      {lang === "bn" ? "আপনার বার্তা" : "Your Message"} <span className="text-red-500">*</span>
                    </span>
                    <div className="relative">
                      <textarea
                        required
                        name="message"
                        rows={5}
                        placeholder={lang === "bn" ? "আপনার প্রজেক্ট, লক্ষ্য ও সময়সীমা বলুন..." : "Tell me about your project, goals, and timeline..."}
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.06] pl-11 py-2.5 pr-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/20"
                      />
                      <div className="pointer-events-none absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded text-slate-400">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                      </div>
                    </div>
                  </label>
                  </motion.div>

                  {formStatus === "success" && (
                    <div className="flex items-center gap-3 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
                      {lang === "bn" ? "মেসেজ সফলভাবে পাঠানো হয়েছে! শীঘ্রই রিপ্লাই করব।" : "Thank you — message sent! I will respond as soon as possible."}
                    </div>
                  )}
                  {formStatus === "error" && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
                      {lang === "bn" ? "সমস্যা হয়েছে। সরাসরি ইমেইল করুন।" : "Something went wrong. Please email directly."}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={formLoading}
                    className={cx(
                      "group flex w-full items-center justify-center gap-2.5 rounded-xl py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-200",
                      formLoading
                        ? "cursor-not-allowed bg-slate-400"
                        : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(124,58,237,0.28)]"
                    )}
                    style={{
                      backgroundSize: "220% 100%",
                      backgroundPosition: "0% center",
                      ...(formLoading ? {} : { backgroundImage: "linear-gradient(90deg, rgba(168,85,247,1) 0%, rgba(56,189,248,1) 45%, rgba(16,185,129,1) 100%)" }),
                    }}
                  >
                    {formLoading ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        {lang === "bn" ? "পাঠানো হচ্ছে..." : "Sending..."}
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
                        </svg>
                        {lang === "bn" ? "মেসেজ পাঠান" : "Send Message"}
                        <svg className="transition-transform group-hover:translate-x-0.5" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    {lang === "bn"
                      ? "✓ স্প্যাম নয় • ✓ ২৪ ঘণ্টায় রিপ্লাই • ✓ সম্পূর্ণ গোপনীয়"
                      : "Fast Response"}
                  </p>
                </form>
              </div>
            </motion.div>

            {/* RIGHT: Info */}
            <div className="flex flex-col gap-5">

              {/* Contact Info */}
              <motion.div
                variants={contactCardVariant}
                whileHover={{ y: -5, boxShadow: "0 24px 72px rgba(16,185,129,0.18)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border bg-slate-950/55 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 will-change-transform hover:bg-slate-950/75 sm:p-7 border-emerald-400/40 hover:border-emerald-300/70"
              >
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-90" />
                <div className="absolute -top-24 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70 bg-emerald-500/25" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)] opacity-80" />

                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {lang === "bn" ? "যোগাযোগের তথ্য" : "Contact Information"}
                  </h3>
                  <div className="mt-5 space-y-3">
                  {[
                    {
                      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
                      label: "Email",
                      value: "webabdulalim@gmail.com",
                      href: "mailto:webabdulalim@gmail.com",
                      accent: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400",
                    },
                    {
                      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                      label: lang === "bn" ? "ফোন" : "Phone",
                      value: "+880 1890-336989",
                      href: "tel:+8801890336989",
                      accent: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400",
                    },
                    {
                      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                      label: lang === "bn" ? "অবস্থান" : "Location",
                      value: "Tongi, Gazipur, Bangladesh",
                      href: "https://maps.google.com/?q=Tongi,Gazipur,Bangladesh",
                      accent: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400",
                    },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group/item flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-500/5"
                    >
                      <div className={cx("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition group-hover/item:scale-110 border border-emerald-400/35 bg-emerald-500/15 shadow-[0_0_38px_rgba(16,185,129,0.20)] text-emerald-300")}>
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">{item.label}</div>
                        <div className="mt-0.5 truncate text-[13px] font-medium text-slate-200">{item.value}</div>
                      </div>
                      <svg className="ml-auto shrink-0 text-slate-500 transition group-hover/item:translate-x-0.5 group-hover/item:text-slate-300" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17 17 7M7 7h10v10"/></svg>
                    </a>
                  ))}
                </div>
              </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                variants={contactCardVariant}
                whileHover={{ y: -5, boxShadow: "0 24px 72px rgba(34,211,238,0.14)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border bg-slate-950/55 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 will-change-transform hover:bg-slate-950/75 sm:p-7 border-cyan-400/40 hover:border-cyan-300/70"
              >
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-90" />
                <div className="absolute -top-24 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70 bg-cyan-500/25" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)] opacity-80" />

                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-semibold text-white">
                    {lang === "bn" ? "সোশ্যাল মিডিয়া" : "Contact With Me"}
                  </h3>
                  <div className="mt-4 grid grid-cols-3 gap-2.5">
                  {[
                    {
                      name: "LinkedIn",
                      href: "https://www.linkedin.com/in/abdul-alim-781776397/",
                      bgColor: "bg-blue-50 dark:bg-blue-950/30",
                      borderColor: "border-blue-200 dark:border-blue-800",
                      textColor: "text-blue-600 dark:text-blue-400",
                      hoverBg: "hover:bg-blue-500 hover:border-blue-500",
                      hoverText: "hover:text-white",
                      shadowColor: "group-hover:shadow-[0_0_12px_rgba(10,102,194,0.5)]",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5V8h3v11zM6.5 6.73A1.73 1.73 0 1 1 6.5 3.27a1.73 1.73 0 0 1 0 3.46zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z"/></svg>,
                    },
                    {
                      name: "GitHub",
                      href: "https://github.com/AbdulAlimx1",
                      bgColor: "bg-gray-50 dark:bg-gray-950/30",
                      borderColor: "border-gray-300 dark:border-gray-700",
                      textColor: "text-gray-700 dark:text-gray-300",
                      hoverBg: "hover:bg-gray-900 hover:border-gray-900",
                      hoverText: "hover:text-white",
                      shadowColor: "group-hover:shadow-[0_0_12px_rgba(0,0,0,0.5)]",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>,
                    },
                    {
                      name: "Facebook",
                      href: "https://www.facebook.com/profile.php?id=61581710966944",
                      bgColor: "bg-blue-50 dark:bg-blue-950/30",
                      borderColor: "border-blue-300 dark:border-blue-800",
                      textColor: "text-blue-700 dark:text-blue-300",
                      hoverBg: "hover:bg-blue-600 hover:border-blue-600",
                      hoverText: "hover:text-white",
                      shadowColor: "group-hover:shadow-[0_0_12px_rgba(24,119,242,0.5)]",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>,
                    },
                    {
                      name: "WhatsApp",
                      href: "https://wa.me/8801890336989?text=Hi%20Abdul%20Alim%2C%20I%20want%20to%20discuss%20a%20project.",
                      bgColor: "bg-green-50 dark:bg-green-950/30",
                      borderColor: "border-green-300 dark:border-green-800",
                      textColor: "text-green-600 dark:text-green-400",
                      hoverBg: "hover:bg-green-500 hover:border-green-500",
                      hoverText: "hover:text-white",
                      shadowColor: "group-hover:shadow-[0_0_12px_rgba(37,211,102,0.5)]",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
                    },
                    {
                      name: "X",
                      href: "https://x.com/WebAbdulAlim",
                      bgColor: "bg-gray-100 dark:bg-gray-950/30",
                      borderColor: "border-gray-400 dark:border-gray-700",
                      textColor: "text-gray-800 dark:text-gray-200",
                      hoverBg: "hover:bg-gray-900 hover:border-gray-900",
                      hoverText: "hover:text-white",
                      shadowColor: "group-hover:shadow-[0_0_12px_rgba(0,0,0,0.5)]",
                      icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                    },
                    {
                      name: "Gmail",
                      href: "mailto:webabdulalim@gmail.com",
                      bgColor: "bg-red-50 dark:bg-red-950/30",
                      borderColor: "border-red-300 dark:border-red-800",
                      textColor: "text-red-600 dark:text-red-400",
                      hoverBg: "hover:bg-red-500 hover:border-red-500",
                      hoverText: "hover:text-white",
                      shadowColor: "group-hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]",
                      icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.910 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>,
                    },
                  ].map((s) => (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx(
                        "group/social flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-cyan-400/50 hover:bg-cyan-500/5"
                      )}
                    >
                      <div className="transition-transform duration-300 group-hover/social:scale-125 text-slate-300">{s.icon}</div>
                      <span className="text-[11px] font-semibold text-slate-300">{s.name}</span>
                    </a>
                  ))}
                </div>
              </div>
              </motion.div>

              {/* WhatsApp Quick Contact */}
              <motion.div
                variants={contactCardVariant}
                whileHover={{ y: -5, boxShadow: "0 24px 72px rgba(16,185,129,0.18)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="group relative flex flex-col overflow-hidden rounded-[28px] border bg-slate-950/55 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-all duration-300 will-change-transform hover:bg-slate-950/75 sm:p-7 border-emerald-400/40 hover:border-emerald-300/70"
              >
                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-90" />
                <div className="absolute -top-24 left-1/2 h-48 w-56 -translate-x-1/2 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-70 bg-emerald-500/25" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.04),transparent_35%)] opacity-80" />

                <div className="relative z-10 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-400/35 shadow-[0_0_38px_rgba(16,185,129,0.20)]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-emerald-300">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="font-serif font-semibold text-white">
                      {lang === "bn" ? "দ্রুত রিপ্লাই" : "Quick Response"}
                    </div>
                    <p className="mt-1 text-[13px] leading-6 text-slate-300/85">
                      {lang === "bn"
                        ? "যতদ্রুত সম্ভব রিপ্লাই করি। জরুরি হলে WhatsApp-এ যোগাযোগ করুন।"
                        : "I respond as quickly as possible. For urgent matters, please reach out via WhatsApp."}
                    </p>
                    <a
                      href="https://wa.me/8801890336989?text=Hi%20Abdul%20Alim%2C%20I%20have%20an%20urgent%20project%20to%20discuss."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 text-[12px] font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.35)]"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
                      {lang === "bn" ? "WhatsApp করুন" : "Chat on WhatsApp"}
                    </a>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.section>



      {/* FOOTER */}
      <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Background decorations */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-60 -top-60 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-indigo-900/20 to-transparent blur-3xl" />
          <div className="absolute -right-60 bottom-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-emerald-900/15 to-transparent blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* MAIN FOOTER CONTENT
            Mobile:
            1) Brand block
            2) Explore + Services (2 columns side-by-side)
            3) Get In Touch
            Desktop:
            Brand | Explore | Services | Get In Touch
        */}
        <div className="mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-4">
            {/* 1) Brand block */}
            <div className="order-1 lg:order-none">
              <a href="#home" className="inline-flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-white">
                  <div className="absolute inset-0 grid place-items-center font-mono text-[12px] font-bold text-zinc-900">
                    AA
                  </div>
                </div>
                <div className="leading-tight">
                  <div className="font-serif text-[17px] font-semibold tracking-tight text-white">
                    Abdul ALim
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500">
                    Web Developer & AI Automation Expert
                  </div>
                </div>
              </a>

              <p className="mt-5 max-w-md text-[13px] leading-7 text-slate-400">
                Crafting high‑performance WordPress websites and smart AI automation solutions that help businesses grow faster.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-700 bg-slate-800/50">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-slate-400"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <span className="text-[12px] text-slate-400">Tongi, Gazipur, Bangladesh</span>
                <span className="rounded-full border border-emerald-900/50 bg-emerald-950/40 px-2 py-0.5 text-[10px] font-medium text-emerald-500">
                  Remote
                </span>
              </div>

              <div className="mt-6">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                  Follow Me
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    {
                      label: "Facebook",
                      href: "https://www.facebook.com/profile.php?id=61581710966944",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3h-2.5v6.8c4.56-.93 8-4.96 8-9.8z" />
                        </svg>
                      ),
                      hoverColor: "hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 hover:text-[#1877F2]",
                    },
                    {
                      label: "X",
                      href: "https://x.com/WebAbdulAlim",
                      icon: (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                      hoverColor: "hover:border-slate-400 hover:bg-slate-700/50 hover:text-slate-100",
                    },
                    {
                      label: "LinkedIn",
                      href: "https://www.linkedin.com/in/abdul-alim-781776397/",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zm-11 19H5V8h3v11zM6.5 6.73A1.73 1.73 0 1 1 6.5 3.27a1.73 1.73 0 0 1 0 3.46zM20 19h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97V19h-3V8h2.88v1.5h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59V19z" />
                        </svg>
                      ),
                      hoverColor: "hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]",
                    },
                    {
                      label: "GitHub",
                      href: "https://github.com/AbdulAlimx1",
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      ),
                      hoverColor: "hover:border-slate-400 hover:bg-slate-700/50 hover:text-slate-100",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={cx(
                        "flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 text-slate-400 transition-all duration-200 hover:-translate-y-0.5",
                        s.hoverColor
                      )}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 2) Explore + Services side-by-side (Mobile), spans 2 cols on desktop */}
            <div className="order-2 lg:order-none lg:col-span-2">
              <div className="grid grid-cols-2 gap-8">
                {/* Explore */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-[1px] w-5 bg-gradient-to-r from-indigo-500 to-transparent" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300">
                      Explore
                    </span>
                  </div>

                  <ul className="space-y-3.5">
                    {[
                      { label: lang === "bn" ? "হোম" : "Home", href: "#home" },
                      { label: lang === "bn" ? "সার্ভিস" : "Services", href: "#services" },
                      { label: lang === "bn" ? "স্কিলস" : "Skills", href: "#skills" },
                      { label: lang === "bn" ? "আমার কাজ" : "My Work", href: "#work" },
                      { label: lang === "bn" ? "আমার সম্পর্কে" : "About", href: "#about" },
                      { label: lang === "bn" ? "যোগাযোগ" : "Contact", href: "#contact" },
                    ].map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="group flex items-center gap-2.5 text-[13px] text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-slate-100"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="shrink-0 text-slate-600 transition-colors group-hover:text-cyan-400"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Services */}
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <span className="h-[1px] w-5 bg-gradient-to-r from-emerald-500 to-transparent" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300">
                      Services
                    </span>
                  </div>

                  <ul className="space-y-3.5">
                    {[
                      { label: "WordPress Development", href: "#services" },
                      { label: "E‑commerce Websites", href: "#services" },
                      { label: "Portfolio & Business Sites", href: "#services" },
                      { label: "Landing Pages", href: "#services" },
                      { label: "AI & Automation Workflows", href: "#services" },
                      { label: "PRICING OVERVIEW", href: "#pricing" },
                    ].map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="group flex items-center gap-2.5 text-[13px] text-slate-400 transition-all duration-200 hover:translate-x-1 hover:text-slate-100"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="shrink-0 text-slate-600 transition-colors group-hover:text-emerald-400"
                          >
                            <path d="M5 12h14M13 5l7 7-7 7" />
                          </svg>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* 3) Contact*/}
            <div className="order-3 lg:order-none">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-[1px] w-5 bg-gradient-to-r from-violet-500 to-transparent" />
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-300">
                  Get In Touch
                </span>
              </div>

              <div className="space-y-4">
                <a href="mailto:webabdulalim@gmail.com" className="group flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-indigo-400 transition-transform group-hover:scale-110">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Email</div>
                    <div className="break-words text-[12px] text-slate-300 transition-colors group-hover:text-slate-100">
                      webabdulalim@gmail.com
                    </div>
                  </div>
                </a>

                <a href="tel:+8801890336989" className="group flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-emerald-400 transition-transform group-hover:scale-110">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">Phone</div>
                    <div className="text-[12px] text-slate-300 transition-colors group-hover:text-slate-100">
                      01890-336989
                    </div>
                  </div>
                </a>

                <div className="pt-2">
                  <a
                    href="#contact"
                    className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-700 bg-slate-800/50 px-5 py-2.5 text-[13px] font-semibold text-slate-100 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <div className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-r from-indigo-600 to-emerald-500 transition-transform duration-300 group-hover:translate-y-0" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {lang === "bn" ? "কথা বলুন" : "Let's Talk"}
                    <svg
                      className="transition-transform group-hover:translate-x-0.5"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (no Back to top, no WordPress) */}
        <div className="border-t border-slate-700/40">
          <div className="mx-auto max-w-[1200px] px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex flex-wrap items-center justify-start gap-2 text-[12px] text-slate-500">
                <span>© 2026 Abdul Alim </span>
                <span className="h-3 w-px bg-slate-700" />
                
              </div>
              <a
                href="#home"
                aria-label={lang === "bn" ? "উপর ফিরে যান" : "Back to top"}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-[12px] font-semibold text-slate-100 shadow-[0_14px_32px_rgba(15,23,42,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-700/50"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                {lang === "bn" ? "উপর যান" : "Back to top"}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ★ UPDATED MODAL with Review */}
{/* ═══════════════════════════════════════════════════════
    ★★★ REDESIGNED PROJECT DETAIL MODAL ★★★
    ═══════════════════════════════════════════════════════ */}
{selected && (
  <div
    className="fixed inset-0 z-[130] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4"
    onClick={() => setSelected(null)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0a0c14] shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:rounded-[28px]"
    >
      {/* ── Modal Header ── */}
      <div className="relative flex flex-col gap-3 border-b border-white/10 px-4 pt-12 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:pt-4">
        {selected.href && (
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[12px] font-semibold text-zinc-200 shadow-sm transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white sm:hidden"
          >
            {lang === "bn" ? "সাইট দেখুন" : "Visit Site"}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17 17 7M7 7h10v10" />
            </svg>
          </a>
        )}
        <div className="flex min-w-0 items-center gap-3">
          {selected.logo ? (
            <img
              loading="eager"
              decoding="async"
              src={selected.logo}
              alt=""
              className="h-10 w-10 rounded-xl border border-white/10 object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 text-sm font-bold text-white shadow-sm">
              {selected.title.charAt(0)}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="truncate font-serif text-lg font-semibold text-white sm:text-xl">
              {selected.title}
            </h3>
            {selected.category && (
              <p className="truncate text-[12px] text-zinc-400">
                {selected.category}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 justify-end sm:pr-14">
          {/* Completed Badge */}
          {selected.status && (
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 text-[11px] font-semibold text-emerald-300 sm:inline-flex">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="m9 12 2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              {selected.status}
            </div>
          )}
          {/* Visit Site */}
          {selected.href && (
            <a
              href={selected.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[12px] font-semibold text-zinc-200 shadow-sm transition duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-white"
            >
              {lang === "bn" ? "সাইট দেখুন" : "Visit Site"}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          )}
          {/* Close */}
          <button
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.12] hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Modal Body (Scrollable) ── */}
      <div data-lenis-prevent className="flex-1 overflow-y-auto">
        {/* Banner + Info Grid */}
        <div className="grid md:grid-cols-[1.2fr_0.8fr]">
          {/* Left: Banner Image */}
          <button
            type="button"
            onClick={() => setSelectedPreview(selected.cover)}
            className="relative text-left"
          >
            <img
              loading="eager"
              decoding="async"
              src={selected.cover}
              alt={selected.title}
              className="h-[260px] w-full object-cover sm:h-[320px] md:h-full md:min-h-[380px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/10" />
          </button>

          {/* Right: Project Info */}
          <div className="flex flex-col gap-5 p-5 sm:p-6">
            {/* Meta */}
            <div className="flex items-center gap-4">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-[12px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                {selected.year}
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-3 py-1.5 text-[12px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <span
                  className={cx(
                    "h-2 w-2 rounded-full",
                    selected.type === "website"
                      ? "bg-emerald-500"
                      : "bg-indigo-500"
                  )}
                />
                {selected.category || (selected.type === "website" ? "Website" : "Automation")}
              </div>
            </div>

            {/* About */}
            <div>
              <h4 className="font-serif text-lg font-semibold text-zinc-900 dark:text-white">
                {lang === "bn" ? "প্রজেক্ট সম্পর্কে" : "About This Project"}
              </h4>
              <p className="mt-2 text-[14px] leading-7 text-zinc-600 dark:text-zinc-400">
                {selected.description}
              </p>
            </div>

            {/* Core Features */}
            {selected.features && selected.features.length > 0 && (
              <div>
                <h4 className="font-serif text-base font-semibold text-zinc-900 dark:text-white">
                  {lang === "bn" ? "মূল বৈশিষ্ট্য" : "Core Features"}
                </h4>
                <p className="mt-1 text-[12px] text-zinc-500 dark:text-zinc-400">
                  {lang === "bn" ? "সমস্ত প্রিমিয়াম বৈশিষ্ট্য কোন পেইড প্লাগইন ছাড়াই তৈরি।" : "All premium features are developed without any paid plugins, subscriptions, or recurring costs."}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2">
                  {selected.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="mt-0.5 flex-shrink-0 text-emerald-500 dark:text-emerald-400"
                      >
                        <path d="M9 12l2 2 4-4" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      <span className="text-[14px] text-zinc-700 dark:text-zinc-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies Used */}
            <div>
              <h4 className="font-serif text-base font-semibold text-zinc-900 dark:text-white">
                {lang === "bn" ? "ব্যবহৃত প্রযুক্তি" : "Technologies Used"}
              </h4>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg bg-white/5 px-2 py-1 text-[11px] sm:text-[12px] font-medium text-slate-500 border border-slate-200 text-center dark:bg-slate-950/70 dark:text-slate-300 dark:border-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Client Review */}
            <div className="border-t border-zinc-200 bg-zinc-50/80 px-5 py-6 dark:border-zinc-800 dark:bg-zinc-900/50 sm:px-6">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {lang === "bn" ? "ক্লায়েন্ট রিভিউ" : "Client Review"}
              </div>
              <div className="mt-4 rounded-3xl border border-zinc-200 bg-white/90 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/80">
                <div className="flex items-center gap-3">
                  {selected.logo ? (
                    <img
                      loading="eager"
                      decoding="async"
                      src={selected.logo}
                      alt=""
                      className="h-12 w-12 rounded-full border border-zinc-200 object-cover dark:border-zinc-700"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-500 text-sm font-bold text-white">
                      {selected.review.clientName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {selected.review.clientName}
                    </div>
                    <div className="text-[12px] text-emerald-600 dark:text-emerald-400">
                      {selected.review.clientRole}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={i < selected.review.rating ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={i < selected.review.rating ? 0 : 2}
                    className={
                      i < selected.review.rating
                        ? "text-amber-500"
                        : "text-zinc-300 dark:text-zinc-600"
                    }
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <div className="mt-4 rounded-3xl border border-zinc-200 bg-white/95 px-4 py-4 text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/80 dark:text-zinc-300">
                <div className="text-4xl leading-none text-amber-500">“</div>
                <p className="mt-1 text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">
                  {selected.review.text}
                </p>
                <div className="mt-2 text-right text-4xl leading-none text-amber-500">”</div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Review removed (duplicate) */}

        {/* ── Gallery ── */}
        {selected.gallery.length > 0 && (
          <div className="border-t border-zinc-200 px-5 py-6 dark:border-zinc-800 sm:px-6">
            <h4 className="mb-4 font-serif text-base font-semibold text-zinc-900 dark:text-white">
              {lang === "bn" ? "আরও স্ক্রিনশট" : "More Screenshots"}
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {selected.gallery.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedPreview(g)}
                  className="group/img relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-0 text-left transition hover:border-indigo-400 dark:border-zinc-800 dark:bg-zinc-950 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <img
                    loading="eager"
                    decoding="async"
                    src={g}
                    alt=""
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/img:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Modal Footer CTA ── */}
        <div className="border-t border-zinc-200 px-5 py-5 dark:border-zinc-800 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="inline-flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-zinc-400"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>Design and Develop by <span className="text-white font-semibold">Abdul Alim</span></span>
              </span>
            </div>
            <a
              href="#contact"
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 dark:bg-white dark:text-zinc-900"
            >
              {lang === "bn"
                ? "এরকম প্রজেক্ট শুরু করি"
                : "Start Similar Project"}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

      {selectedServiceModal && (
        <div
          className="fixed inset-0 z-[130] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedServiceModal(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] dark:border-zinc-800 dark:bg-zinc-950"
          >
            <button
              onClick={() => setSelectedServiceModal(null)}
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/90 text-white backdrop-blur transition hover:scale-105 dark:bg-white/90 dark:text-zinc-900"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                {selectedServiceModal.title}
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-zinc-600 dark:text-zinc-400">
                {selectedServiceModal.description}
              </p>
              <ul className="mt-6 space-y-3">
                {selectedServiceModal.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    <span className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9.55 18 3.85 12.3l1.4-1.4 4.3 4.3 9-9 1.4 1.4Z" />
                      </svg>
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {selectedServiceModal.title === "E-commerce Website" && (
                <div className="mt-7 overflow-hidden rounded-2xl border border-emerald-400/35 bg-gradient-to-br from-emerald-500/15 via-cyan-500/10 to-transparent p-5 shadow-[0_16px_45px_rgba(16,185,129,0.12)] dark:border-emerald-400/30 sm:p-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/30 bg-emerald-400/15 text-emerald-600 dark:text-emerald-300">
                      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-emerald-600 dark:text-emerald-300">
                        {lang === "bn" ? "বাস্তব কাজের উদাহরণ" : "A Website I Built"}
                      </p>
                      <h4 className="mt-1 font-serif text-lg font-semibold text-zinc-900 dark:text-white">
                        Cocoa Haven E-commerce Website
                      </h4>
                      <p className="mt-1.5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                        {lang === "bn"
                          ? "ইতিমধ্যেই তৈরি করা আমার একটি ই-কমার্স ওয়েবসাইট দেখে নিন।"
                          : "Take a look at one of the e-commerce websites I have already built."}
                      </p>
                    </div>
                  </div>
                  <a
                    href="https://cocoahavenbd.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-5 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(16,185,129,0.25)] transition duration-300 hover:-translate-y-0.5 hover:from-emerald-400 hover:to-cyan-400 hover:shadow-[0_12px_32px_rgba(6,182,212,0.3)]"
                  >
                    {lang === "bn" ? "ওয়েবসাইট দেখুন" : "Visit Website"}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M7 17 17 7M7 7h10v10" />
                    </svg>
                  </a>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <a
                  href="#contact"
                  onClick={() => setSelectedServiceModal(null)}
                  className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 dark:bg-white dark:text-zinc-900"
                >
                  {selectedServiceModal.cta}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPreview && (
        <div
          className="fixed inset-0 z-[130] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => { setSelectedPreview(null); setZoomLevel(1); }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl overflow-hidden rounded-[28px] bg-black"
          >
            <button
              type="button"
              onClick={() => { setSelectedPreview(null); setZoomLevel(1); }}
              className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-zinc-900 transition hover:bg-white dark:bg-zinc-900/90 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute left-3 top-3 z-10 flex flex-col gap-2 rounded-lg bg-black/60 backdrop-blur-md p-2">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 3))}
                title="Zoom In"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white transition hover:bg-white/40 hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 1))}
                title="Zoom Out"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white transition hover:bg-white/40 hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                title="Reset Zoom"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white transition hover:bg-white/40 hover:scale-110"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64M3.51 15A9 9 0 0 0 18.36 18.36"/>
                </svg>
              </button>
            </div>

            {/* Image Container with Scroll */}
            <div data-lenis-prevent className="h-[80vh] w-full overflow-auto flex items-center justify-center bg-black">
              <img
                loading="eager"
                decoding="async"
                src={selectedPreview}
                alt="Project screenshot"
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
                className="max-h-full max-w-full object-contain cursor-grab active:cursor-grabbing"
              />
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between bg-black/60 backdrop-blur-md rounded-lg px-3 py-2 text-white text-sm">
              <span>Zoom: {Math.round(zoomLevel * 100)}%</span>
              <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400" style={{ width: `${((zoomLevel - 1) / 2) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* TOAST */}
      <div className="pointer-events-none fixed bottom-4 left-1/2 z-[70] -translate-x-1/2"><div className={cx("pointer-events-auto flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm font-medium text-white shadow-lift transition", toast ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0")}><span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"/>{toast ?? "Saved"}</div></div>
      </div>
    </>
  );
}