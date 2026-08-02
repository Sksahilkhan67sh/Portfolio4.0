import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { personal } from "../data/portfolio";
import sahilPhoto from "../assets/img/sahil.png";

const typeIn = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="top"
      className="paper-grain relative overflow-hidden bg-paper-light pt-16 pb-20 md:pt-24 md:pb-28 px-5 md:px-8"
    >
      <div
        className="stain w-40 h-40 -left-10 top-10 hidden md:block"
        aria-hidden
      />
      <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-14 items-center">
        {/* Left: text */}
        <div>
          <motion.p
            variants={typeIn}
            initial="hidden"
            animate="show"
            custom={0}
            className="font-type text-rust text-sm tracking-widest uppercase mb-3"
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            variants={typeIn}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-type text-ink text-5xl sm:text-6xl md:text-7xl leading-[1.05] mb-5"
          >
            {personal.name.split(" ")[0]}
            <br />
            {personal.name.split(" ")[1]}
          </motion.h1>

          <motion.div
            variants={typeIn}
            initial="hidden"
            animate="show"
            custom={2}
            className="inline-block bg-ink text-paper-light font-type text-xs md:text-sm tracking-widest uppercase px-4 py-2 mb-5 -rotate-1 shadow-paper"
          >
            {personal.title}
          </motion.div>

          <motion.p
            variants={typeIn}
            initial="hidden"
            animate="show"
            custom={3}
            className="font-serif text-lg md:text-xl text-text-soft max-w-md mb-8 leading-relaxed"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            variants={typeIn}
            initial="hidden"
            animate="show"
            custom={4}
            className="flex flex-wrap gap-4 mb-8"
          >
            <button
              onClick={() => navigate("/projects")}
              className="font-type text-xs tracking-widest uppercase bg-ink text-paper-light px-6 py-3 shadow-paper hover:bg-rust transition-colors"
            >
              View My Work →
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="font-type text-xs tracking-widest uppercase border border-ink/50 text-ink px-6 py-3 hover:bg-ink hover:text-paper-light transition-colors"
            >
              Let's Connect
            </button>
          </motion.div>

          <motion.div
            variants={typeIn}
            initial="hidden"
            animate="show"
            custom={5}
            className="flex items-center gap-5 text-ink text-xl"
          >
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-rust transition-colors"
            >
              <FiGithub />
            </a>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-rust transition-colors"
            >
              <FiLinkedin />
            </a>
            <a
              href={`mailto:${personal.email}`}
              aria-label="Email"
              className="hover:text-rust transition-colors"
            >
              <FiMail />
            </a>
          </motion.div>
        </div>

        {/* Right: polaroid photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="relative mx-auto max-w-sm"
        >
          <div className="relative bg-paper-light border border-ink/10 shadow-paperLg p-4 pb-14">
            <img
              src={sahilPhoto}
              alt={personal.name}
              className="w-full h-auto grayscale-[15%] sepia-[10%] contrast-[1.05]"
            />
            <p className="absolute bottom-4 left-0 right-0 text-center font-hand text-xl text-ink-soft">
              {personal.name} — {new Date().getFullYear()}
            </p>
          </div>

          {/* paperclip */}
          <svg
            width="46"
            height="70"
            viewBox="0 0 46 70"
            className="absolute -top-6 left-8 -rotate-6 drop-shadow"
            aria-hidden
          >
            <path
              d="M23 5c9 0 16 7 16 16v28c0 6-5 11-11 11s-11-5-11-11V22c0-3 2-5 5-5s5 2 5 5v24"
              fill="none"
              stroke="#857768"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>

          {/* tape corner */}
          <div className="tape w-24 h-9 -rotate-6 -bottom-4 right-6" />

          {/* stamp */}
          <div className="hidden md:flex absolute -right-16 top-4 w-28 h-28 rounded-full border-2 border-rust/60 items-center justify-center rotate-12 bg-paper-light/70">
            <span className="font-type text-[9px] tracking-[0.2em] text-rust text-center leading-tight px-2">
              CODE · DESIGN · REPEAT
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
