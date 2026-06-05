"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const themes = [
  { key: "paper",   dot: "#EFEDE3", border: true,  label: "Paper theme" },
  { key: "asphalt", dot: "#302F2C", border: false, label: "Asphalt theme" },
  { key: "rose",    dot: "#9F3E47", border: false, label: "Rose theme" },
  { key: "cocoa",   dot: "#8B6347", border: false, label: "Cocoa theme" },
] as const;

const navLinks = [
  { href: "/",        label: "Home",    testId: "link-home" },
  { href: "/about",   label: "About",   testId: "link-about" },
  { href: "/contact", label: "Contact", testId: "link-contact" },
  { href: "/privacy", label: "Privacy", testId: "link-privacy" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 40], [0, 1]);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: `color-mix(in srgb, hsl(var(--background) / 0.78) calc(${bgOpacity} * 100%), hsl(var(--background) / 0.15))`,
          backdropFilter: "blur(18px) saturate(160%)",
          WebkitBackdropFilter: "blur(18px) saturate(160%)",
          boxShadow: `0 1px 24px rgba(0,0,0,calc(${bgOpacity} * 0.35))`,
        }}
      >
        <motion.div
          className="absolute inset-x-0 bottom-0 h-px bg-border"
          style={{ opacity: bgOpacity }}
        />

        <div className="relative container mx-auto px-5 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight z-10"
            data-testid="link-logo"
            onClick={() => setMenuOpen(false)}
          >
            timetablr<span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map(({ href, label, testId }) => (
              <Link
                key={href}
                href={href}
                data-testid={testId}
                className={[
                  "relative py-1 transition-colors duration-200",
                  "text-foreground/90 hover:text-foreground",
                  "after:absolute after:left-0 after:bottom-0 after:h-px after:w-0",
                  "after:bg-primary after:transition-all after:duration-200",
                  "hover:after:w-full",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right: themes + download + hamburger */}
          <div className="flex items-center gap-3 md:gap-5">
            {/* Theme dots — visible on all sizes */}
            <div className="flex items-center gap-2" data-testid="theme-switcher">
              {themes.map(({ key, dot, border, label }) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  data-testid={`theme-${key}`}
                  aria-label={label}
                  className="w-[18px] h-[18px] rounded-full transition-all duration-200 hover:scale-110"
                  style={{
                    backgroundColor: dot,
                    border: border ? "2px solid hsl(var(--border))" : "2px solid transparent",
                    outline: theme === key ? "2px solid hsl(var(--primary))" : "2px solid transparent",
                    outlineOffset: "2px",
                    transform: theme === key ? "scale(1.25)" : undefined,
                  }}
                />
              ))}
            </div>

            {/* Download — hidden on mobile (shown inside drawer) */}
            <a
         href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="button-download"
              className="hidden md:block"
            
            >
              <Button variant="default" className="rounded-full gap-2">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </a>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full
                         text-foreground/80 hover:text-foreground hover:bg-foreground/8
                         transition-colors duration-200"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              className="fixed top-[72px] left-0 right-0 z-40 md:hidden
                         bg-background/95 backdrop-blur-xl border-b border-border"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <nav className="flex flex-col px-5 py-4 gap-1">
                {navLinks.map(({ href, label, testId }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.18 }}
                  >
                    <Link
                      href={href}
                      data-testid={testId}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center h-12 px-2 text-base font-medium
                                 text-foreground/80 hover:text-foreground
                                 border-b border-border/40 last:border-0
                                 transition-colors duration-150"
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}

                {/* Download button inside drawer */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.18 }}
                  className="pt-3 pb-1"
                >
                  <a
                    href="https://play.google.com/store"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Button variant="default" className="w-full rounded-full gap-2 h-11 text-sm">
                      <Download className="w-4 h-4" />
                      Download App
                    </Button>
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}