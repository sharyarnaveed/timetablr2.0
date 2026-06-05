"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Get in touch</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you want to bring Timetablr to your university, ask about features, or share feedback, we are ready to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card p-8 md:p-12 rounded-3xl border border-border/50 shadow-sm"
          >
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Jane Doe" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="jane@university.edu" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="How can we help?" className="h-12 bg-background" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Tell us about your timetable needs, department setup, or questions..." className="min-h-[150px] bg-background resize-none" />
              </div>
              <Button type="submit" size="lg" className="w-full rounded-full h-12">
                Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-12 lg:pl-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Timetablr is built to make university timetables easier to access, manage, and share without relying on long PDF schedules or outdated screenshots.
              </p>
              <div className="space-y-6">
                {/* Our Office removed per request */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email Us</h3>
                    <p className="text-muted-foreground">sharyarmalik430@gmail.com</p>
                  </div>
                </div>
                {/* Call Us removed per request */}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
