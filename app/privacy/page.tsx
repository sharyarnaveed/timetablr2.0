"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, Database, Mail, RefreshCw, Globe, AlertTriangle, CheckCircle } from "lucide-react";

const sections = [
  {
    icon: Eye,
    id: "introduction",
    title: "1. Introduction",
    content: [
      `Timetablr ("we", "us", or "our") is committed to protecting the privacy of everyone who uses our platform, including university administrators, faculty members, department coordinators, class representatives, and students. This Privacy Policy describes how we collect, use, store, and share information when you access or use timetablr.app (the "Service").`,
      `By accessing or using the Service, you acknowledge that you have read, understood, and agree to the terms of this Privacy Policy. If you do not agree, please discontinue use of the Service immediately.`,
    ],
  },
  {
    icon: Database,
    id: "data-collected",
    title: "2. Information We Collect",
    content: [
      "We collect only the information necessary to provide a high-quality university timetable experience:",
    ],
    list: [
      "Account information: name, email address, role (admin, faculty, coordinator, class representative, student), and university affiliation",
      "Scheduling data: course names, section details, class times, room assignments, faculty allocations, and department timetable data",
      "Profile data: profile photos, contact information, and basic biographical details (optional)",
      "Usage data: feature interactions, session duration, and error logs — used solely to improve the platform",
      "Device information: browser type, IP address, and operating system for security and compatibility purposes",
    ],
    footer: "We do not collect sensitive personal data such as national ID numbers, health records, or financial information.",
  },
  {
    icon: CheckCircle,
    id: "data-use",
    title: "3. How We Use Your Information",
    content: ["Your information is used exclusively to operate and improve the Timetablr platform:"],
    list: [
      "Publishing clear, searchable university timetables for students and staff",
      "Organizing schedules across departments, rooms, sections, and faculty assignments",
      "Sending relevant timetable updates and announcements to the correct user groups",
      "Providing customer support and responding to inquiries",
      "Ensuring the security, integrity, and reliability of the Service",
      "Complying with legal obligations under applicable law",
    ],
    footer: "We never sell, rent, or trade your personal data to third parties for marketing purposes.",
  },
  {
    icon: Globe,
    id: "sharing",
    title: "4. Information Sharing",
    content: [
      "We do not sell or share your personal data with third parties except in the following limited circumstances:",
    ],
    list: [
      "Service providers: trusted vendors who assist us in operating the platform (hosting, email delivery, analytics) under strict data processing agreements",
      "Legal compliance: when required by applicable law, regulation, or valid legal process",
      "Safety: to protect the rights, property, or safety of Timetablr, our users, or the public",
      "Business transfers: in the event of a merger, acquisition, or asset sale — users will be notified in advance",
    ],
  },
  {
    icon: Lock,
    id: "security",
    title: "5. Data Security",
    content: [
      "We employ industry-leading security measures to protect your information:",
    ],
    list: [
      "All data is encrypted in transit using TLS 1.2+ and at rest using AES-256 encryption",
      "Access controls limit staff access to personal data on a strict need-to-know basis",
      "Regular third-party security audits and penetration testing",
      "Automated threat detection and incident response procedures",
      "Secure data centres with SOC 2 Type II certification",
    ],
    footer: "While we take all reasonable precautions, no system is completely impenetrable. We encourage you to use strong, unique passwords and enable two-factor authentication where available.",
  },
  {
    icon: RefreshCw,
    id: "retention",
    title: "6. Data Retention",
    content: [
      "We retain personal data only for as long as necessary to fulfil the purposes outlined in this policy or as required by law:",
    ],
    list: [
      "Active account data: retained for the duration of your university's subscription",
      "Scheduling records: retained for as long as needed to support academic operations and institutional record-keeping requirements",
      "Usage logs: retained for 90 days, then automatically purged",
      "Deleted accounts: permanently removed from production systems within 30 days of deletion request",
    ],
  },
  {
    icon: Shield,
    id: "rights",
    title: "7. Your Rights",
    content: [
      "Depending on your jurisdiction, you may have the following rights regarding your personal data:",
    ],
    list: [
      "Access: request a copy of the personal data we hold about you",
      "Correction: request correction of inaccurate or incomplete data",
      "Deletion: request erasure of your data (subject to legal retention obligations)",
      "Portability: receive your data in a machine-readable format",
      "Objection: object to certain processing activities based on legitimate interests",
      "Restriction: request that we limit how we process your data in certain circumstances",
    ],
    footer: "To exercise any of these rights, please contact our Data Protection Officer at privacy@timetablr.app. We will respond within 30 days.",
  },
  {
    icon: AlertTriangle,
    id: "cookies",
    title: "8. Cookies & Tracking",
    content: [
      "We use cookies and similar technologies to improve your experience on the platform:",
    ],
    list: [
      "Strictly necessary cookies: required for authentication and core platform functionality",
      "Preference cookies: remember your theme selection, language, and UI preferences",
      "Analytics cookies: aggregate, anonymised usage data to understand how features are used (opt-out available)",
    ],
    footer: "You can control cookies through your browser settings. Disabling strictly necessary cookies may prevent certain features from functioning correctly.",
  },
  {
    icon: Globe,
    id: "children",
    title: "9. Student Data",
    content: [
      "Timetablr is built for universities and higher education institutions. Student accounts and timetable access are typically provisioned by the institution. In these cases:",
    ],
    list: [
      "Student accounts may be created and managed directly by the university or its authorized departments",
      "We collect only the minimum data required to provide timetable access and related university scheduling features",
      "Student data is never used for marketing, profiling, or any purpose beyond direct service delivery and platform improvement",
      "Universities remain responsible for ensuring their use of Timetablr complies with applicable student data and education privacy laws",
    ],
  },
  {
    icon: Mail,
    id: "contact",
    title: "10. Contact Us",
    content: [
      "If you have any questions, concerns, or requests regarding this Privacy Policy or how we handle your data, please reach out to our dedicated privacy team:",
    ],
    list: [
      "Email: sharyarmalik430@gmail.com",
      "Support: Use the contact page on timetablr.app for product or privacy questions",
    ],
    footer: "We aim to respond to all privacy-related inquiries within 5 business days.",
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-semibold mb-6 uppercase tracking-wide">
            <Shield className="w-3.5 h-3.5 text-primary" />
            Legal
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground text-lg">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
            At Timetablr, your privacy is not an afterthought — it is a design principle. This document
            explains plainly and completely how we handle information shared by universities, faculty, and students.
          </p>
        </motion.div>

        {/* Table of Contents */}
        <motion.nav
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-6 mb-16"
          aria-label="Table of contents"
        >
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Contents</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid={`toc-${s.id}`}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </motion.nav>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <motion.section
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                </div>

                <div className="ml-12 space-y-4 text-foreground/80 leading-relaxed">
                  {section.content.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}

                  {section.list && (
                    <ul className="space-y-2.5 mt-2">
                      {section.list.map((item, j) => (
                        <li key={j} className="flex items-start gap-2.5">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span className="text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.footer && (
                    <p className="text-sm bg-muted/60 border border-border/50 rounded-xl px-4 py-3 mt-4 text-muted-foreground">
                      {section.footer}
                    </p>
                  )}
                </div>
              </motion.section>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 text-center text-sm text-muted-foreground border-t border-border pt-10"
        >
          <p>
            This Privacy Policy may be updated periodically. We will notify registered users of material
            changes by email at least 14 days before they take effect.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} Timetablr Inc. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
