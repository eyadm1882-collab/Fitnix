"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ComingSoonModal from "./ComingSoonModal";

interface HeaderProps {
  simplified?: boolean;
}

export default function Header({ simplified }: HeaderProps = {}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 right-0 left-0 z-50 w-full transition-all duration-500 ${
          scrolled
            ? "bg-black/95 shadow-2xl shadow-black/20 backdrop-blur-xl"
            : "bg-black"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12">
          {!simplified && (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src="/header.tsx/right.png"
                alt="Fitnix"
                width={110}
                height={32}
                className="h-7 w-auto object-contain sm:h-9"
                priority
              />
            </motion.div>
          )}

          <motion.div
            className={simplified ? "mx-auto" : "absolute left-1/2 -translate-x-1/2"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Image
              src="/header.tsx/middle.png"
              alt="Fitnix Symbol"
              width={48}
              height={48}
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
              priority
            />
          </motion.div>

          {!simplified && (
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Image
                src="/header.tsx/left.png"
                alt="Fitnix"
                width={110}
                height={32}
                className="h-7 w-auto object-contain sm:h-9"
                priority
              />
            </motion.div>
          )}
        </div>
      </motion.header>

      <ComingSoonModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
