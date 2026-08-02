import { motion } from "framer-motion";
import { FiMonitor } from "react-icons/fi";
import { experience } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="bg-paper-light px-5 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-type text-xs tracking-widest uppercase text-rust mb-8 border-b border-ink/10 inline-block pb-1">
          Experience
        </p>

        <div className="relative">
          {/* horizontal ink line for desktop */}
          <div className="hidden md:block absolute top-6 left-0 right-0 h-[2px] bg-ink/25" />

          <div className="grid md:grid-cols-3 gap-10 md:gap-6">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative pt-2"
              >
                <div className="hidden md:flex absolute -top-[3px] left-0 w-3 h-3 rounded-full bg-rust ring-4 ring-paper-light" />
                <p className="font-type text-xs text-text-muted mb-2 mt-4 md:mt-6">
                  {exp.duration}
                  {exp.current && (
                    <span className="ml-2 text-rust">● current</span>
                  )}
                </p>
                <div className="flex items-start gap-3">
                  <FiMonitor className="text-2xl text-umber mt-1 shrink-0" />
                  <div>
                    <h3 className="font-type text-base text-ink leading-snug">
                      {exp.role}
                    </h3>
                    <p className="font-serif italic text-rust text-lg">
                      {exp.company}
                    </p>
                    <p className="font-serif text-sm text-text-muted mt-2 leading-relaxed">
                      {exp.description.length > 180
                        ? exp.description.slice(0, 180).trim() + "…"
                        : exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
