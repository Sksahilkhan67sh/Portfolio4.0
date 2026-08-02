import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/portfolio";

import webhookImg from "../assets/img/webhook.png";
import streamvaultImg from "../assets/img/streamvault.png";
import phishguardImg from "../assets/img/phishguard.png";
import portfolioImg from "../assets/img/portfolio.png";
import musicalwebImg from "../assets/img/LandConnect.png";

const IMAGES = {
  webhook: webhookImg,
  streamvault: streamvaultImg,
  phishguard: phishguardImg,
  portfolio: portfolioImg,
  musicalweb: musicalwebImg,
};

export default function Projects() {
  return (
    <section id="projects" className="bg-paper-light px-5 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-10">
          <p className="font-type text-xs tracking-widest uppercase text-rust border-b border-ink/10 inline-block pb-1">
            Projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 0.6 : -0.6 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
              className="relative bg-paper-mid border border-ink/10 shadow-paper p-4 pb-5"
            >
              <div className="tape w-20 h-7 rotate-3 -top-3 left-6" />

              <div className="border border-ink/15 overflow-hidden">
                <img
                  src={IMAGES[p.image]}
                  alt={`${p.title} screenshot`}
                  className="w-full h-48 object-cover sepia-[8%]"
                  loading="lazy"
                />
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-type text-lg text-ink">{p.title}</h3>
                  <span className="font-type text-[10px] uppercase tracking-widest bg-ink text-paper-light px-2 py-1">
                    {p.type}
                  </span>
                </div>
                <p className="font-serif text-sm text-text-muted mt-2 leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] border border-umber/30 text-umber px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-type text-[11px] uppercase tracking-widest text-ink hover:text-rust"
                  >
                    <FiGithub /> Code
                  </a>
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-type text-[11px] uppercase tracking-widest text-ink hover:text-rust"
                  >
                    <FiExternalLink /> Live
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
