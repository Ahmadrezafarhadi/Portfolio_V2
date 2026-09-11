"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  Variants,
} from "framer-motion";
import {
  Send,
  Mail,
  ArrowUpRight,
  Menu,
  X,
  ChevronRight,
  FileDown,
  Layers,
  Zap,
  Palette,
  Globe,
  Sparkles,
} from "lucide-react";
import { FaLinkedin as LinkedinIcon, FaGithub as Github } from "react-icons/fa";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiVuedotjs,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiMongodb,
  SiPrisma,
  SiRedux,
  SiTailwindcss,
  SiGit,
  SiSwagger,
  SiVite,
} from "react-icons/si";
import Image from "next/image";
import { useLanguage } from "../app/context/LanguageContext";
import { LanguageSwitcher } from "../app/components/LanguageSwitcher";

const NAME = "Ahmadreza Farhadi";

const SOCIALS = {
  github: "https://github.com/ahmadrezafarhadi",
  linkedin: "https://linkedin.com/in/ahmadrezafarhadi",
  telegram: "https://t.me/ahmadr_farhadi",
  email: "ahmadfarhadi051@gmail.com",
  resume:
    "https://cvbuilder.me/Resume/fa/7b6acebf-67d3-42bd-a034-e8f9196035df?template=Template31",
};

const NAV_IDS = ["about", "stack", "work", "approach", "contact"];

const SKILLS = {
  Frontend: [
    { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
    { name: "CSS3", icon: SiCss, color: "text-blue-500" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
    { name: "React.js", icon: SiReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { name: "Vue.js", icon: SiVuedotjs, color: "text-emerald-500" },
  ],
  Backend_Database: [
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "Express.js", icon: SiExpress, color: "text-zinc-200" },
    { name: "REST API", icon: Globe, color: "text-violet-400" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    { name: "Prisma", icon: SiPrisma, color: "text-cyan-500" },
  ],
  State_Management: [
    { name: "Redux Toolkit", icon: SiRedux, color: "text-purple-600" },
    { name: "Zustand", icon: Layers, color: "text-pink-400" },
    { name: "SWR", icon: Zap, color: "text-yellow-500" },
  ],
  UI_Animation: [
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "Shadcn UI", icon: Palette, color: "text-zinc-200" },
    { name: "Framer Motion", icon: Sparkles, color: "text-violet-400" },
  ],
  Tools: [
    { name: "Git & GitHub", icon: SiGit, color: "text-orange-600" },
    { name: "Swagger", icon: SiSwagger, color: "text-green-500" },
    { name: "Vite", icon: SiVite, color: "text-yellow-400" },
  ],
};

const PROJECTS = [
  {
    key: "1gramtala",
    tech: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    href: "https://1gramtala.com/",
    image: "/images/1gramtala.jpg",
    featured: true,
  },
  {
    key: "Zarmava",
    tech: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    href: "https://zarmava.vercel.app/",
    image: "/images/zarmava.png",
  },
  {
    key: "Dana Smart",
    tech: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    href: "https://dana-smart-front-end.vercel.app/",
    image: "/images/danasmart.png",
  },
  {
    key: "Shan Loray",
    tech: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    href: "https://www.shanloray.ru/",
    image: "/images/shanloray.png",
    featured: true,
  },
  {
    key: "Crypto Tracker",
    tech: ["React.js", "Tailwind CSS", "GraphQL"],
    href: "https://crypto-app-one-pink.vercel.app/",
    image: "/images/crypto.png",
  },
  {
    key: "Library",
    tech: ["React.js", "Tailwind CSS"],
    href: "https://library-fawn-one.vercel.app/",
    image: "/images/library.png",
  },
  {
    key: "Weather",
    tech: ["React.js"],
    href: "https://weather-app-sandy-zeta-44.vercel.app/",
    image: "/images/weather.png",
  },
  {
    key: "ShadCn Dashboard",
    tech: ["React.js", "Next.js", "Tailwind CSS", "TypeScript"],
    href: "https://shadcn-dashboard-ui-drab.vercel.app/",
    image: "/images/dashboard.png",
  },
];

// UTILITIES

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  const { dir } = useLanguage();

  return (
    <div
      className={`flex items-center gap-3 mb-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
    >
      <span className="font-mono text-xs tracking-widest text-violet-400">
        {index}
      </span>
      <span className="h-px w-8 bg-zinc-700" />
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-zinc-400">
        {children}
      </span>
    </div>
  );
}

function TypedCodeCard({ reducedMotion }: { reducedMotion: boolean }) {
  const { t } = useLanguage();
  const CODE_LINES = t.code.lines;

  const [visibleLines, setVisibleLines] = useState(() =>
    reducedMotion ? CODE_LINES.length : 0,
  );

  useEffect(() => {
    if (reducedMotion) return;
    if (visibleLines >= CODE_LINES.length) return;

    const timer = setTimeout(() => setVisibleLines((v) => v + 1), 260);
    return () => clearTimeout(timer);
  }, [visibleLines, reducedMotion, CODE_LINES.length]);

  return (
    <div
      dir="ltr"
      className="relative rounded-xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm shadow-2xl shadow-black/40 overflow-hidden"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/80">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="ml-3 font-mono text-xs text-zinc-500">
          {t.code.fileName}
        </span>
      </div>
      <div className="px-5 py-6 font-mono text-sm leading-relaxed">
        {CODE_LINES.map((line, i) => (
          <div
            key={i}
            className="whitespace-pre"
            style={{
              opacity: i < visibleLines ? 1 : 0,
              transition: "opacity .2s",
            }}
          >
            <span className="text-zinc-600 select-none mr-4">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-zinc-300">{line}</span>
          </div>
        ))}
        <span
          className="inline-block w-2 h-4 bg-violet-400 ml-8 align-middle"
          style={{
            animation: reducedMotion ? "none" : "blink 1s step-end infinite",
          }}
        />
      </div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

function ProjectCard({
  project,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const { t, dir } = useLanguage();
  const projectInfo =
    t.work.projects[project.key as keyof typeof t.work.projects];

  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={`group relative block overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40 ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${project.featured ? "aspect-16/8" : "aspect-16/10"}`}
      >
        <Image
          loading="eager"
          width={project.featured ? 1600 : 1600}
          height={project.featured ? 800 : 1000}
          src={project.image}
          alt={projectInfo.name}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 p-6 flex items-end justify-between ${
          dir === "rtl" ? "flex-row-reverse" : ""
        }`}
      >
        <div className={dir === "rtl" ? "text-right" : ""}>
          <p className="font-mono text-[11px] tracking-widest uppercase text-violet-300/90 mb-1">
            {project.tech[0]}
          </p>
          <h3
            className="text-xl md:text-2xl text-zinc-50 font-semibold tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {projectInfo.name}
          </h3>
        </div>
        <span
          className={`grid place-items-center h-10 w-10 rounded-full border border-zinc-600 text-zinc-200 transition-all duration-300 group-hover:bg-violet-500 group-hover:border-violet-500 group-hover:-translate-y-1 ${
            dir === "rtl"
              ? "group-hover:-translate-x-1"
              : "group-hover:translate-x-1"
          }`}
        >
          <ArrowUpRight size={18} />
        </span>
      </div>
    </motion.a>
  );
}

// Main

export default function Portfolio() {
  const { t, dir, locale } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const active = useActiveSection(NAV_IDS);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 60],
  );
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  };

  const navLinks = [
    { id: "about", label: t.nav.about },
    { id: "stack", label: t.nav.stack },
    { id: "work", label: t.nav.work },
    { id: "approach", label: t.nav.approach },
    { id: "contact", label: t.nav.contact },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 antialiased selection:bg-violet-500/30 selection:text-white">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap'); html { scroll-behavior: smooth; }`}</style>

      {/* Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-6xl mx-auto px-6 h-16 flex items-center justify-between ${
            dir === "rtl" ? "flex-row-reverse" : ""
          }`}
        >
          <button
            onClick={() => scrollTo("top")}
            className="font-mono text-sm tracking-tight text-zinc-100"
          >
            {t.nav.logo.split(".")[0]}
            <span className="text-violet-400">.</span>
            {t.nav.logo.split(".")[1]}
          </button>

          <nav
            className={`hidden md:flex items-center gap-8 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
          >
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`relative text-sm transition-colors ${
                  active === l.id
                    ? "text-zinc-50"
                    : "text-zinc-500 hover:text-zinc-200"
                }`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-2 left-0 right-0 h-px bg-violet-400"
                  />
                )}
              </button>
            ))}
          </nav>

          <div
            className={`hidden md:flex items-center gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
          >
            <LanguageSwitcher />
            <a
              href={SOCIALS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href={SOCIALS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <LinkedinIcon size={18} />
            </a>
            <button
              onClick={() => scrollTo("contact")}
              className="text-sm px-4 py-2 rounded-full border border-zinc-700 text-zinc-100 hover:border-violet-400 hover:text-violet-300 transition-colors"
            >
              {t.nav.letsTalk}
            </button>
          </div>

          <button
            className="md:hidden text-zinc-200"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-b border-zinc-800 bg-zinc-950"
            >
              <div
                className={`px-6 py-4 flex flex-col gap-4 ${dir === "rtl" ? "items-end" : ""}`}
              >
                <LanguageSwitcher />
                {navLinks.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => scrollTo(l.id)}
                    className={`text-zinc-300 text-base ${dir === "rtl" ? "text-right" : "text-left"}`}
                  >
                    {l.label}
                  </button>
                ))}
                <div
                  className={`flex items-center gap-5 pt-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                >
                  <a
                    href={SOCIALS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href={SOCIALS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400"
                  >
                    <LinkedinIcon size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main id="top">
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative pt-40 pb-28 px-6 overflow-hidden"
        >
          {/* Updated Background: Perspective Grid with Radial Fade */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              maskImage:
                "radial-gradient(circle at center, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(circle at center, black 40%, transparent 100%)",
            }}
          />
          {/* Perspective Floor Effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              transform:
                "perspective(1000px) rotateX(60deg) scale(2) translateY(-100px)",
              transformOrigin: "top center",
              maskImage:
                "linear-gradient(to bottom, transparent 20%, black 80%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 20%, black 80%)",
            }}
          />

          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="max-w-6xl mx-auto grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center relative"
          >
            <div className={dir === "rtl" ? "text-right" : ""}>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="font-mono text-xs tracking-[0.2em] uppercase text-violet-400 mb-6"
              >
                {t.hero.role} — {t.hero.availability}
              </motion.p>
              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="text-[13vw] leading-[0.95] md:text-6xl md:leading-[1.02] font-semibold tracking-tight text-zinc-50"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t.hero.title.line1}
                <br />
                <span className="text-zinc-500">{t.hero.title.line2}</span>
                <br />
                {t.hero.title.line3}
              </motion.h1>
              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className="mt-8 max-w-md text-zinc-400 text-base leading-relaxed"
              >
                {t.hero.description}
              </motion.p>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className={`mt-10 flex flex-wrap items-center gap-4 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
              >
                <button
                  onClick={() => scrollTo("work")}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium hover:bg-violet-300 transition-colors"
                >
                  {t.hero.viewProjects}{" "}
                  <ChevronRight
                    size={16}
                    className={dir === "rtl" ? "rotate-180" : ""}
                  />
                </button>
                <a
                  href={SOCIALS.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-zinc-700 text-zinc-200 text-sm font-medium hover:border-zinc-400 transition-colors"
                >
                  <FileDown size={16} /> {t.hero.resume}
                </a>
              </motion.div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="show"
                className={`mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-zinc-500 ${
                  dir === "rtl" ? "flex-row-reverse" : ""
                }`}
              >
                {t.hero.techStack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TypedCodeCard reducedMotion={reducedMotion} />
            </motion.div>
          </motion.div>
        </section>

        {/* About */}
        <section id="about" className="px-6 py-28 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className={dir === "rtl" ? "text-right" : ""}>
              <SectionLabel index={t.about.index}>
                {t.about.sectionLabel}
              </SectionLabel>
            </div>

            <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-16 items-start mt-8">
              {/* Profile Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative ${dir === "rtl" ? "md:order-2" : ""}`}
              >
                <div className="relative aspect-square w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
                  <Image
                    src="/images/profile.jpg"
                    alt="Ahmadreza Farhadi"
                    width={500}
                    height={500}
                    priority
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-zinc-950/60 via-transparent to-transparent" />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`absolute -bottom-4 ${dir === "rtl" ? "right-8" : "left-8"} flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/90 backdrop-blur-sm px-4 py-2 shadow-xl`}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
                  </span>
                  <span className="text-xs font-medium text-zinc-200">
                    {t.about.info.currently.value}
                  </span>
                </motion.div>
              </motion.div>

              {/* Text Content */}
              <div
                className={`${dir === "rtl" ? "text-right md:order-1" : ""}`}
              >
                <h2
                  className="text-3xl md:text-4xl font-semibold text-zinc-50 tracking-tight mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t.about.title.line1}
                  <br />
                  {t.about.title.line2}
                </h2>

                <div className="space-y-6 text-zinc-400 leading-relaxed text-[15px]">
                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {t.about.paragraph1}
                  </motion.p>
                  <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                  >
                    {t.about.paragraph2}
                  </motion.p>

                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 gap-6 pt-4"
                  >
                    {Object.values(t.about.info).map((item) => (
                      <div
                        key={item.label}
                        className={`border-t border-zinc-800 pt-3 ${dir === "rtl" ? "text-right" : ""}`}
                      >
                        <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-600">
                          {item.label}
                        </p>
                        <p className="text-zinc-200 mt-1">{item.value}</p>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section
          id="stack"
          className="px-6 py-28 border-t border-zinc-900 bg-zinc-950"
        >
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className={dir === "rtl" ? "text-right" : ""}>
              <SectionLabel index={t.stack.index}>
                {t.stack.sectionLabel}
              </SectionLabel>

              <h2
                className="text-3xl md:text-4xl font-semibold text-zinc-50 tracking-tight mb-14 max-w-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t.stack.title}
              </h2>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(SKILLS).map(([group, items], groupIndex) => (
                <motion.div
                  key={group}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: groupIndex * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-zinc-900/30 border border-zinc-800/60 rounded-2xl p-6 hover:border-zinc-700 transition-colors duration-300"
                >
                  {/* Category Title */}
                  <div
                    className={`flex items-center gap-2 mb-6 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
                  >
                    <h3 className="font-mono text-sm uppercase tracking-widest text-zinc-300">
                      {t.stack.categories[
                        group as keyof typeof t.stack.categories
                      ] || group}
                    </h3>
                    <div className="h-px flex-1 bg-zinc-800" />
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill, index) => {
                      const Icon = skill.icon;
                      return (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: groupIndex * 0.1 + index * 0.05,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          whileHover={{ y: -4, scale: 1.03 }}
                          className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 transition-all duration-300 cursor-default shadow-sm hover:shadow-md hover:shadow-violet-500/5"
                        >
                          <Icon
                            className={`w-5 h-5 transition-transform duration-300 ${skill.color} group-hover:scale-110`}
                          />
                          <span className="text-sm text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">
                            {skill.name}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="work" className="px-6 py-28 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div
              className={`flex items-end justify-between mb-14 flex-wrap gap-4 ${
                dir === "rtl" ? "flex-row-reverse" : ""
              }`}
            >
              <div className={dir === "rtl" ? "text-right" : ""}>
                <SectionLabel index={t.work.index}>
                  {t.work.sectionLabel}
                </SectionLabel>
                <h2
                  className="text-3xl md:text-4xl font-semibold text-zinc-50 tracking-tight max-w-lg"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {t.work.title}
                </h2>
              </div>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-violet-300 transition-colors"
              >
                {t.work.allRepositories} <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {PROJECTS.map((p, i) => (
                <ProjectCard key={p.key} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="px-6 py-28 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className={dir === "rtl" ? "text-right" : ""}>
              <SectionLabel index={t.approach.index}>
                {t.approach.sectionLabel}
              </SectionLabel>
              <h2
                className="text-3xl md:text-4xl font-semibold text-zinc-50 tracking-tight mb-14 max-w-lg"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t.approach.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-4 gap-px bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-900">
              {Object.values(t.approach.steps).map((step) => (
                <motion.div
                  key={step.number}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`bg-zinc-950 p-7 hover:bg-zinc-900/60 transition-colors ${
                    dir === "rtl" ? "text-right" : ""
                  }`}
                >
                  <span className="font-mono text-xs text-violet-400">
                    {step.number}
                  </span>
                  <h3
                    className="mt-4 text-lg font-semibold text-zinc-50"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="px-6 py-28 border-t border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-3xl border border-zinc-800 bg-linear-to-b from-zinc-900/60 to-zinc-950 p-10 md:p-16 text-center relative overflow-hidden">
              {/* Updated Background: Radial Fade Grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: "40px 40px",
                  maskImage:
                    "radial-gradient(circle at center, black 40%, transparent 100%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center, black 40%, transparent 100%)",
                }}
              />

              <p className="font-mono text-xs tracking-[0.2em] uppercase text-violet-400 mb-6 relative">
                {t.contact.index} — {t.contact.sectionLabel}
              </p>
              <h2
                className="text-3xl md:text-5xl font-semibold text-zinc-50 tracking-tight max-w-2xl mx-auto relative"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {t.contact.title.line1}
                <br />
                <span className="text-zinc-500">{t.contact.title.line2}</span>
              </h2>
              <div
                className={`mt-10 flex flex-wrap items-center justify-center gap-4 relative ${
                  dir === "rtl" ? "flex-row-reverse" : ""
                }`}
              >
                <a
                  href={`mailto:${SOCIALS.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium hover:bg-violet-300 transition-colors"
                >
                  <Mail size={16} /> {SOCIALS.email}
                </a>
                <a
                  href={SOCIALS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-200 text-sm font-medium hover:border-zinc-400 transition-colors"
                >
                  <Send size={16} /> {t.contact.telegram}
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center gap-6 relative">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  <LinkedinIcon size={20} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-zinc-900">
        <div
          className={`max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 ${
            dir === "rtl" ? "md:flex-row-reverse" : ""
          }`}
        >
          <p
            className={`font-mono text-xs text-zinc-600 ${dir === "rtl" ? "text-right" : ""}`}
          >
            © {new Date().getFullYear()} {NAME}. {t.footer.copyright}
          </p>
          <div
            className={`flex items-center gap-5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}
          >
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-xs text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
