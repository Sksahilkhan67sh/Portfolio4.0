import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";
import { education } from "../data/portfolio";

export default function Education() {
  return (
    <section id="education" className="bg-paper-mid px-5 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-type text-xs tracking-widest uppercase text-rust mb-8 border-b border-ink/10 inline-block pb-1">
          Education
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {education.map((ed, i) => (
            <motion.div
              key={ed.institution}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative bg-paper-light border border-ink/10 shadow-paper px-6 py-6"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, rgba(90,59,46,0.03) 0 2px, transparent 2px 14px)",
              }}
            >
              <div className="absolute inset-2 border border-umber/20 pointer-events-none" />
              <div className="flex items-start gap-4">
                <FiAward className="text-3xl text-rust shrink-0 mt-1" />
                <div>
                  <h3 className="font-type text-base text-ink leading-snug">
                    {ed.degree}
                  </h3>
                  <p className="font-serif italic text-umber">
                    {ed.institution}
                  </p>
                  <p className="font-mono text-xs text-text-muted mt-2">
                    {ed.location} · {ed.duration}
                    {ed.current && <span className="text-rust"> · ongoing</span>}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
