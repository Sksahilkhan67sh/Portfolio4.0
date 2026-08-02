import { motion } from "framer-motion";
import { FiCode, FiTarget, FiUser, FiZap } from "react-icons/fi";
import { personal } from "../data/portfolio";

const CARDS = [
  {
    icon: FiCode,
    title: "Clean Code",
    text: "I write maintainable, scalable, and efficient code.",
  },
  {
    icon: FiTarget,
    title: "Problem Solver",
    text: "I enjoy tackling challenges and building effective solutions.",
  },
  {
    icon: FiUser,
    title: "User Focused",
    text: "I build with the user in mind to deliver great experiences.",
  },
  {
    icon: FiZap,
    title: "Fast Delivery",
    text: "I deliver projects on time without compromising quality.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-paper-mid px-5 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-type text-xs tracking-widest uppercase text-rust mb-2 border-b border-ink/10 inline-block pb-1">
          About Me
        </p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 mt-6">
          <div>
            <h2 className="font-type text-3xl md:text-4xl text-ink mb-5 leading-snug">
              I turn ideas into
              <br />
              digital solutions.
            </h2>
            <p className="font-serif text-lg text-text-soft leading-relaxed mb-6">
              {personal.summary}
            </p>
            <p className="font-hand text-3xl text-ink-soft">{personal.name}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24, rotate: i % 2 ? 2 : -2 }}
                whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1 : -1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-paper-light border border-ink/10 shadow-paper p-5"
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-2 bg-umber/30 rounded-full" />
                <c.icon className="text-2xl text-rust mb-3" />
                <h3 className="font-type text-sm text-ink mb-2">{c.title}</h3>
                <p className="font-serif text-sm text-text-muted leading-snug">
                  {c.text}
                </p>
                <div className="mt-3 w-8 border-t-2 border-rust/60" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
