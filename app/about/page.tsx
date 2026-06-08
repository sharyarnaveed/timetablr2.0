"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-5 md:mb-6 leading-tight">
            Our Mission
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We believe accessing class schedules shouldn't be a source of
            frustration. Our goal is to make timetable management simple,
            organized, and instantly accessible for students and educational
            institutions, eliminating the need to search through lengthy PDFs or
            outdated screenshots.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-10 sm:mb-14 md:mb-20 bg-muted"
        >
          <img
            src="/about.png"
            alt="The Timetablr team"
            className="w-full h-full object-cover aspect-[16/9] sm:aspect-[21/9]"
          />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">The Story</h2>
            <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p>
                Timetablr was born from a simple problem many students face
                every day. Finding our class timetable was frustrating because
                it was usually buried deep inside a lengthy PDF. Every time we
                needed to check the next class, classroom, or schedule, we had
                to open the PDF again and search through multiple pages.
              </p>
              <p>
                Even when students saved screenshots of their timetable, keeping
                them updated and finding the right information quickly was still
                inconvenient. We wanted a faster and simpler solution. That's
                why we built Timetablr — a platform that puts your timetable at
                your fingertips, making it easy to view classes, stay organized,
                and access schedule information anytime without the hassle of
                scrolling through PDFs.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Our Values</h2>
            <ul className="space-y-5 sm:space-y-6">
              {[
                {
                  title: "Efficiency",
                  desc: "Quick access to schedules saves time and reduces unnecessary frustration.",
                },
                {
                  title: "Clarity",
                  desc: "Timetable information should be organized, easy to navigate, and available when needed.",
                },
                {
                  title: "Reliability",
                  desc: "Students and institutions can depend on accurate, up-to-date schedule information.",
                },
              ].map((value, i) => (
                <li key={i} className="border-l-2 border-primary pl-4 sm:pl-6">
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{value.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground">{value.desc}</p>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </div>
  );
}