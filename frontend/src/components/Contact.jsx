import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { personal } from "../data/portfolio";
import { submitContact } from "../lib/api";

const initialForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const submittingRef = useRef(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.name.trim()) return "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "Please enter a valid email.";
    if (!form.subject.trim()) return "Please enter a subject.";
    if (form.message.trim().length < 20)
      return "Message must be at least 20 characters.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submittingRef.current) return;

    const validationError = validate();
    if (validationError) {
      setStatus("error");
      setErrorMsg(validationError);
      return;
    }

    submittingRef.current = true;
    setStatus("loading");
    try {
      await submitContact(form);
      setStatus("success");
      setForm(initialForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section id="contact" className="bg-paper-light px-5 md:px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="font-type text-xs tracking-widest uppercase text-rust mb-8 border-b border-ink/10 inline-block pb-1">
          Contact
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-type text-3xl md:text-4xl text-ink mb-4 leading-snug">
              Let's create something{" "}
              <span className="text-rust underline decoration-wavy">
                great
              </span>{" "}
              together.
            </h2>
            <p className="font-serif text-lg text-text-muted mb-8 leading-relaxed">
              Have a role, a project, or just want to say hello? Drop a note —
              I read every message.
            </p>

            <div className="space-y-4 font-serif text-base text-text-soft">
              <p className="flex items-center gap-3">
                <FiMail className="text-rust" /> {personal.email}
              </p>
              <p className="flex items-center gap-3">
                <FiPhone className="text-rust" /> {personal.phone}
              </p>
              <p className="flex items-center gap-3">
                <FiMapPin className="text-rust" /> {personal.location}
              </p>
            </div>
          </div>

          <div className="relative bg-paper-mid border border-ink/10 shadow-paper p-6 md:p-8">
            <p className="font-hand text-2xl text-ink-soft mb-4">
              Write me a letter —
            </p>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Your Name"
                  className="bg-paper-light border border-ink/20 px-3 py-3 font-mono text-sm text-ink placeholder:text-text-muted focus:border-rust outline-none"
                  disabled={status === "loading"}
                />
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Your Email"
                  className="bg-paper-light border border-ink/20 px-3 py-3 font-mono text-sm text-ink placeholder:text-text-muted focus:border-rust outline-none"
                  disabled={status === "loading"}
                />
              </div>
              <input
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="Subject"
                className="w-full bg-paper-light border border-ink/20 px-3 py-3 font-mono text-sm text-ink placeholder:text-text-muted focus:border-rust outline-none"
                disabled={status === "loading"}
              />
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                placeholder="Your Message (min. 20 characters)"
                rows={5}
                className="w-full bg-paper-light border border-ink/20 px-3 py-3 font-mono text-sm text-ink placeholder:text-text-muted focus:border-rust outline-none resize-none"
                disabled={status === "loading"}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center gap-2 font-type text-xs tracking-widest uppercase bg-ink text-paper-light px-6 py-3 shadow-paper hover:bg-rust transition-colors disabled:opacity-60"
              >
                <FiSend />
                {status === "loading" ? "Sending…" : "Send Message"}
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-type text-xs text-green-800 bg-green-100/60 border border-green-800/30 px-3 py-2"
                  >
                    Message sent — thanks for writing, I'll reply soon.
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-type text-xs text-rust bg-rust/10 border border-rust/30 px-3 py-2"
                  >
                    {errorMsg}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
