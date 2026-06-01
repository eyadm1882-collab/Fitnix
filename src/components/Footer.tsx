"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare, BookOpen, Heart, Shield, Mail, Globe, ChevronUp } from "lucide-react";

const footerLinks = [
  {
    title: "الرئيسية",
    links: [
      { label: "اكتشف Fitnix", href: "/discover" },
      { label: "مكتبة التمارين", href: "/discover#exercises" },
      { label: "المدرب الذكي", href: "/ai" },
      { label: "الأسعار", href: "/discover#pricing" },
    ],
  },
  {
    title: "الخدمات",
    links: [
      { label: "خطط التمارين", href: "/dashboard" },
      { label: "المساعد الذكي", href: "/ai" },
      { label: "تحليل الجسم", href: "/body-analysis" },
      { label: "الوجبات الغذائية", href: "/meal-plan" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { label: "تواصل معنا", href: "#" },
      { label: "الشروط والأحكام", href: "#" },
      { label: "سياسة الخصوصية", href: "#" },
      { label: "المساعدة", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "انستغرام" },
  { icon: Globe, href: "#", label: "تويتر" },
  { icon: Globe, href: "#", label: "يوتيوب" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-black" dir="rtl">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full border border-white/10" />
        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full border border-white/5" />
        <div className="absolute left-1/3 top-1/2 h-40 w-40 rounded-full border border-white/5" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <Image
                src="/header.tsx/middle.png"
                alt="Fitnix"
                width={44}
                height={44}
                className="h-11 w-11"
              />
              <span className="text-2xl font-black text-white">
                Fitnix
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              أول منصة عربية متكاملة تستخدم الذكاء الاصطناعي لإنشاء خطط تمارين وتغذية مخصصة. 
              درب نفسك بذكاء مع Fitnix.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-gray-400 transition-colors hover:bg-fitnix/20 hover:text-fitnix"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="h-4 w-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          {footerLinks.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
            >
              <h3 className="mb-4 text-sm font-bold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-fitnix"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Info */}
        <motion.div
          className="mt-12 grid gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
              <Mail className="h-4 w-4 text-fitnix" />
            </div>
            <div>
              <p className="text-xs text-gray-500">البريد الإلكتروني</p>
              <p className="text-sm font-medium text-gray-300">support@fitnix.ai</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
              <Shield className="h-4 w-4 text-fitnix" />
            </div>
            <div>
              <p className="text-xs text-gray-500">دفع آمن</p>
              <p className="text-sm font-medium text-gray-300">Gumroad · مدى · Visa</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fitnix/10">
              <Heart className="h-4 w-4 text-fitnix" />
            </div>
            <div>
              <p className="text-xs text-gray-500">مدعوم بالذكاء الاصطناعي</p>
              <p className="text-sm font-medium text-gray-300">DeepSeek AI · Supabase</p>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mt-10 border-t border-white/5" />

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Fitnix. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
              الشروط والأحكام
            </Link>
            <Link href="#" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
              سياسة الخصوصية
            </Link>
            <motion.button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-gray-400 transition-colors hover:bg-fitnix/20 hover:text-fitnix"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <ChevronUp className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
