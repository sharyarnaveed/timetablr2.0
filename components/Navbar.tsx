"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

const themes = [
  { key: "paper",   dot: "#EFEDE3", border: true,  label: "Paper theme" },
  { key: "asphalt", dot: "#302F2C", border: false, label: "Asphalt theme" },
  { key: "rose",    dot: "#9F3E47", border: false, label: "Rose theme" },
  { key: "cocoa",   dot: "#8B6347", border: false, label: "Cocoa theme" },
] as const;

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 60], [0, 1]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all"
      style={{ backgroundColor: `color-mix(in srgb, hsl(var(--background)) calc(${bgOpacity} * 100%), transparent)` }}
    >
      <motion.div
        className="absolute inset-0 border-b border-border/0"
        style={{ opacity: bgOpacity }}
      />
      <div className="relative container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tight" data-testid="link-logo">
          timetablr<span className="text-primary">.</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/70">
          <Link href="/" className="hover:text-foreground transition-colors" data-testid="link-home">Home</Link>
          <Link href="/about" className="hover:text-foreground transition-colors" data-testid="link-about">About</Link>
          <Link href="/contact" className="hover:text-foreground transition-colors" data-testid="link-contact">Contact</Link>
          <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-privacy">Privacy</Link>
        </nav>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2" data-testid="theme-switcher">
            {themes.map(({ key, dot, border, label }) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                data-testid={`theme-${key}`}
                aria-label={label}
                className="w-5 h-5 rounded-full transition-all duration-200 hover:scale-110"
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
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
            data-testid="button-download"
          >
            <Button variant="default" className="hidden sm:inline-flex rounded-full gap-2">
              <Download className="w-4 h-4" />
              Download
            </Button>
          </a>
        </div>
      </div>
    </motion.header>
  );
}
