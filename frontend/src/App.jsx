import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import useLenis from "./lib/useLenis";
import ScrollToTop from "./lib/ScrollToTop";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";

const PAGE_TITLES = {
  "/": "Sahil Khan — Python Full Stack Developer",
  "/about": "About — Sahil Khan",
  "/experience": "Experience — Sahil Khan",
  "/skills": "Skills — Sahil Khan",
  "/projects": "Projects — Sahil Khan",
  "/education": "Education — Sahil Khan",
  "/contact": "Contact — Sahil Khan",
};

function usePageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = PAGE_TITLES[pathname] || PAGE_TITLES["/"];
  }, [pathname]);
}

function AppShell() {
  useLenis();
  usePageTitle();

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/education" element={<Education />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
