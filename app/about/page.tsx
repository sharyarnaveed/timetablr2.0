import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">Our Mission</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            We believe that school administration shouldn't be a source of stress. Our goal is to bring clarity and calm to the educators who shape our future.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-20 bg-muted"
        >
          <img 
            src="/about-team.png" 
            alt="The Timetablr team" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">The Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Timetablr was born out of frustration. After watching brilliant educators spend countless hours wrestling with clunky spreadsheets and outdated legacy software, we knew there had to be a better way.
              </p>
              <p>
                We set out to build a tool that didn't just add features, but removed friction. A platform that felt less like a database and more like a beautifully organized desk.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Values</h2>
            <ul className="space-y-6">
              {[
                { title: "Precision", desc: "Every detail matters when hundreds of schedules are on the line." },
                { title: "Clarity", desc: "Complex problems demand simple, intuitive interfaces." },
                { title: "Warmth", desc: "Software for humans should feel human, not corporate." }
              ].map((value, i) => (
                <li key={i} className="border-l-2 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.desc}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
