import { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

function Stamp({ label }) {
  const [pressed, setPressed] = useState(false);
  return (
    <motion.div
      onHoverStart={() => setPressed(true)}
      onHoverEnd={() => setPressed(false)}
      onTapStart={() => setPressed(true)}
      onTap={() => setPressed(false)}
      animate={{ scale: pressed ? 0.94 : 1 }}
      transition={{ duration: 0.15 }}
      className={`relative bg-paper-light border-2 px-4 py-3 text-center select-none cursor-default
        ${pressed ? "border-rust shadow-stamp" : "border-ink/15 shadow-paper"}`}
      style={{ borderStyle: "dashed" }}
    >
      <span
        className={`font-type text-xs md:text-sm tracking-wide transition-colors ${
          pressed ? "text-rust" : "text-ink"
        }`}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="bg-paper-mid px-5 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-type text-xs tracking-widest uppercase text-rust mb-8 border-b border-ink/10 inline-block pb-1">
          Skills
        </p>

        <div className="space-y-10">
          {skills.map((group, gi) => (
            <div key={group.category}>
              <h3 className="font-serif italic text-xl text-umber mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.35, delay: (gi * 0.05) + i * 0.03 }}
                  >
                    <Stamp label={s} />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
