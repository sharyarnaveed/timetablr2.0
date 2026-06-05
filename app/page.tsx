"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  LayoutDashboard,
  Bell,
  UserCircle,
  LogIn,
  BarChart3,
  CheckSquare,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { UniversityLogo } from "@/components/UniversityLogo";
import { useRef, useEffect, useState } from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

function Counter({
  from,
  to,
  duration = 2,
}: {
  from: number;
  to: number;
  duration?: number;
}) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1,
        );
        setCount(Math.floor(progress * (to - from) + from));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

const featureCards = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    color: "from-blue-500/15 to-blue-600/5",
    accent: "#4A7FA5",
    preview: (
      <div className="space-y-1.5 mt-2">
        <div className="flex gap-1.5">
          {[42, 68, 55, 80, 60].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm opacity-70"
              style={{ height: h * 0.5, background: "currentColor" }}
            />
          ))}
        </div>
        <div className="h-2 w-3/4 rounded bg-current opacity-20" />
        <div className="h-2 w-1/2 rounded bg-current opacity-10" />
      </div>
    ),
  },
  {
    icon: Calendar,
    label: "Timetable",
    color: "from-green-500/15 to-green-600/5",
    accent: "#5A8F69",
    preview: (
      <div className="grid grid-cols-5 gap-0.5 mt-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 rounded-sm ${i === 2 || i === 7 || i === 11 ? "opacity-70" : "opacity-15"} bg-current`}
          />
        ))}
      </div>
    ),
  },
  {
    icon: CheckSquare,
    label: "Attendance",
    color: "from-purple-500/15 to-purple-600/5",
    accent: "#7B5EA7",
    preview: (
      <div className="space-y-1 mt-2">
        {[
          { w: "90%", p: 90 },
          { w: "76%", p: 76 },
          { w: "95%", p: 95 },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="flex-1 h-1.5 rounded-full bg-current opacity-10 overflow-hidden">
              <div
                className="h-full rounded-full bg-current opacity-60"
                style={{ width: s.w }}
              />
            </div>
            <span className="text-[8px] opacity-50 font-mono">{s.p}%</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: BarChart3,
    label: "Class Rep",
    color: "from-orange-500/15 to-orange-600/5",
    accent: "#D4883A",
    preview: (
      <div className="space-y-1 mt-2">
        {["10A", "10B", "11A"].map((cls, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-[8px] font-mono opacity-40">{cls}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 4 }).map((_, j) => (
                <div
                  key={j}
                  className={`w-2 h-2 rounded-sm ${j < 3 - i ? "opacity-60" : "opacity-15"} bg-current`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: Bell,
    label: "Notifications",
    color: "from-red-500/15 to-red-600/5",
    accent: "#C96B74",
    preview: (
      <div className="space-y-1.5 mt-2">
        {["Assembly at 9AM", "Room 4B available", "Exam schedule"].map(
          (n, i) => (
            <div key={i} className="flex items-start gap-1">
              <div className="w-1 h-1 rounded-full bg-current opacity-60 mt-1 shrink-0" />
              <div
                className="h-2 rounded bg-current opacity-20 flex-1"
                style={{ width: `${80 - i * 10}%` }}
              />
            </div>
          ),
        )}
      </div>
    ),
  },
  {
    icon: Sparkles,
    label: "Skills & Social",
    color: "from-teal-500/15 to-teal-600/5",
    accent: "#4A7C7C",
    preview: (
      <div className="mt-2 flex gap-2">
        <div className="flex flex-col gap-1 flex-1">
          {[70, 50, 85].map((v, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-current opacity-10 overflow-hidden"
            >
              <div
                className="h-full rounded-full bg-current opacity-60"
                style={{ width: `${v}%` }}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <div className="w-6 h-6 rounded-full bg-current opacity-20" />
          <div className="w-4 h-1 rounded bg-current opacity-15" />
        </div>
      </div>
    ),
  },
  {
    icon: UserCircle,
    label: "Profile",
    color: "from-pink-500/15 to-pink-600/5",
    accent: "#8F5E7C",
    preview: (
      <div className="mt-2 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-current opacity-20 shrink-0" />
        <div className="space-y-1 flex-1">
          <div className="h-2 w-16 rounded bg-current opacity-30" />
          <div className="h-1.5 w-10 rounded bg-current opacity-15" />
        </div>
      </div>
    ),
  },
  {
    icon: LogIn,
    label: "Onboarding",
    color: "from-indigo-500/15 to-indigo-600/5",
    accent: "#4A7FA5",
    preview: (
      <div className="mt-2 space-y-1.5">
        <div className="h-3 rounded bg-current opacity-10" />
        <div className="h-3 rounded bg-current opacity-10" />
        <div className="h-3 rounded bg-current opacity-40 w-full" />
      </div>
    ),
  },
];

function AppFeatureCard({
  card,
  index,
}: {
  card: (typeof featureCards)[0];
  index: number;
}) {
  const Icon = card.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.07, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.03 }}
      className={`bg-gradient-to-br ${card.color} border border-border/40 rounded-2xl p-3 cursor-default select-none backdrop-blur-sm`}
      style={{ color: card.accent }}
    >
      <div className="flex items-center gap-1.5 mb-0.5">
        <Icon className="w-3.5 h-3.5" />
        <span className="text-[10px] font-semibold tracking-wide opacity-80">
          {card.label}
        </span>
      </div>
      {card.preview}
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cardsParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 md:pt-28 md:pb-24 px-6 overflow-hidden"
      >
        {/* Background blobs */}
        <motion.div
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
            y: parallaxY,
          }}
          className="pointer-events-none absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06]"
        />
        <motion.div
          className="pointer-events-none absolute -bottom-16 -left-16 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)",
            y: parallaxY,
          }}
        />

        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left – text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-semibold mb-6 tracking-wide uppercase"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Timetablr 2.0 is now live
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
              >
                University
                <br />
                timetables,{" "}
                <span className="text-muted-foreground">
                  made
                  <br />
                  effortless.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-muted-foreground mb-10 leading-relaxed"
              >
                Built for universities that still rely on long PDFs and
                scattered screenshots. Timetablr makes class schedules simple to
                access, organized, and instantly available for students and
                departments.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="button-get-started"
                >
                  <Button
                    size="lg"
                    className="rounded-full text-base h-12 px-8 transition-transform hover:scale-105 active:scale-95"
                  >
                    Download Now <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </motion.div>

              {/* Trust strip */}
              <motion.div
                variants={fadeInUp}
                className="mt-10 flex items-center gap-4 text-sm text-muted-foreground"
              >
                <div className="flex -space-x-2">
                  {["#4A7FA5", "#5A8F69", "#7B5EA7", "#D4883A"].map((c, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-background"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <span>
                  Trusted by{" "}
                  <strong className="text-foreground">1 university</strong> and
                  used by{" "}
                  <strong className="text-foreground">1,000 students</strong>
                </span>
              </motion.div>
            </motion.div>

            {/* Right – feature cards grid */}
            <motion.div style={{ y: cardsParallax }} className="relative">
              {/* Glow behind cards */}
              <div
                className="absolute inset-0 rounded-3xl opacity-30 blur-3xl -z-10"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(var(--primary)/0.3) 0%, transparent 70%)",
                }}
              />

              <div className="grid grid-cols-3 gap-2.5">
                {featureCards.slice(0, 6).map((card, i) => (
                  <AppFeatureCard key={card.label} card={card} index={i} />
                ))}
              </div>

              {/* Bottom row – 2 wider cards */}
              <div className="grid grid-cols-2 gap-2.5 mt-2.5">
                {featureCards.slice(6).map((card, i) => (
                  <AppFeatureCard key={card.label} card={card} index={6 + i} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Supported Universities ── */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-semibold mb-5 tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Currently in use
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
                Trusted daily by students and faculty.
              </h2>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Timetablr is currently deployed at PAK-AUSTRIA Fachhochschule
                and is actively used by students and faculty to access
                schedules, stay informed, and simplify academic planning. This
                real-world deployment helps us refine and improve the platform
                before expanding to additional institutions.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  "Active university deployment",
                  "Used by 1,000+ students",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-full border border-border bg-card text-sm text-foreground/80"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="rounded-[2rem] border border-border/60 bg-card p-6 md:p-8 shadow-sm"
            >
              <div className="rounded-[1.5rem] bg-background border border-border/40 p-6 md:p-8">
                <UniversityLogo className="w-full h-auto text-foreground" />
              </div>
              <div className="mt-5 flex items-center justify-between gap-4 text-sm text-muted-foreground">
                <span>Officially supported institution</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-16 border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: 1, suffix: "", label: "University using Timetablr" },
              {
                value: 1000,
                suffix: "+",
                label: "Students using the platform",
              },
              { value: 1, suffix: "", label: "Campus currently onboarded" },
              {
                value: 24,
                suffix: "/7",
                label: "Timetable access for students",
              },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
                  <Counter from={0} to={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features Deep Dive ── */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-5"
            >
              Everything a university timetable needs,
              <br />
              beautifully organized.
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              One focused platform built for the people who keep university
              schedules clear, current, and easy to find.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: LayoutDashboard,
                title: "Home Dashboard",
                desc: "Quick access to today's timetable, upcoming classes, and key schedule updates for each user.",
              },
              {
                icon: Calendar,
                title: "Timetable Access",
                desc: "Browse organized course schedules without digging through lengthy PDFs or outdated screenshots.",
              },
              {
                icon: CheckSquare,
                title: "Section Planning",
                desc: "Keep sections, rooms, and timing blocks aligned so students can find the right class fast.",
              },
              {
                icon: BarChart3,
                title: "Department Coordination",
                desc: "Coordinate schedules across programs, semesters, and faculty assignments from one place.",
              },
              {
                icon: Bell,
                title: "Schedule Updates",
                desc: "Share timetable changes, room swaps, and important announcements with the right students quickly.",
              },
              {
                icon: Sparkles,
                title: "Cleaner Student Experience",
                desc: "Give students a fast, mobile-friendly way to check classes anytime without extra friction.",
              },
              {
                icon: UserCircle,
                title: "Profile & Settings",
                desc: "Personal account management with privacy controls and preferences for each university user.",
              },
              {
                icon: LogIn,
                title: "Onboarding & Auth",
                desc: "Smooth login, signup, and password reset flows for students, faculty, and administrators.",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="bg-card p-6 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow duration-300 group cursor-default"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-200">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">
                    {f.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {f.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              From chaos to calm in 3 steps
            </h2>
            <p className="text-muted-foreground text-lg">
              Set up in minutes. Get results on day one.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-border/60 -z-10" />
            {[
              {
                step: "01",
                title: "Collect Schedules",
                desc: "Bring together timetable data from university PDFs, spreadsheets, or department records.",
              },
              {
                step: "02",
                title: "Organize Clearly",
                desc: "Structure classes by department, semester, section, room, and faculty so everything is easy to navigate.",
              },
              {
                step: "03",
                title: "Share Instantly",
                desc: "Publish an accessible timetable experience students can check anytime without searching through files.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center relative bg-background px-4 pt-4"
              >
                <div className="w-16 h-16 rounded-full bg-card border-4 border-background mx-auto flex items-center justify-center font-bold text-xl shadow-sm mb-6 text-foreground">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-16 text-center">
            Built from a real student problem
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "Finding our class timetable used to mean reopening a long PDF every single time we needed to check the next lecture or classroom. Timetablr solves that with a faster, clearer experience.",
                author: "Student-led insight",
                role: "Based on the story behind Timetablr",
              },
              {
                quote:
                  "Even saved screenshots were hard to keep updated. Timetablr puts the timetable at your fingertips, so students and departments can access the right schedule without the usual hassle.",
                author: "Product mission",
                role: "Designed for universities",
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-background p-8 md:p-10 rounded-3xl border border-border/50"
              >
                <div className="flex text-primary mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed font-medium">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-bold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-12 w-32 h-32 rounded-full border-2 border-current" />
            <div className="absolute bottom-8 left-10 w-20 h-20 rounded-full border border-current" />
            <div className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-current" />
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Ready to find calm?
            </h2>
            <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
              Replace confusing university timetable PDFs with a cleaner, faster
              experience for students and staff.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                variant="secondary"
                data-testid="button-cta-trial"
                className="rounded-full text-lg h-14 px-10 transition-transform hover:scale-105 active:scale-95"
              >
                Start your free trial
              </Button>
              <Button
                size="lg"
                variant="ghost"
                data-testid="button-cta-demo"
                className="rounded-full text-lg h-14 px-10 opacity-80 hover:opacity-100 text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all"
              >
                See a live demo <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
