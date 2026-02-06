import React from "react";
import Navbar from "../auth/share/Navbar";
import Footer from "../auth/share/Footer";
import { Github, Linkedin, Mail, Twitter, ChevronRight } from "lucide-react";

/**
 * About Page
 * A clean, minimalist about section for the user.
 * Responsive design with light/dark theme support.
 */
const About = () => {
  return (
    <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-zinc-950">
      <Navbar />

      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Profile Section */}
        <section className="flex flex-col items-center gap-8 lg:flex-row lg:items-start">
          <div className="relative h-48 w-48 shrink-0 lg:h-64 lg:w-64">
            <div className="absolute inset-0 rotate-6 rounded-3xl bg-indigo-500/10 transition-transform hover:rotate-0 dark:bg-indigo-500/5"></div>
            <img
              src="https://github.com/identicons/shubh.png"
              alt="Profile"
              className="relative h-full w-full rounded-3xl bg-zinc-100 object-cover shadow-xl dark:bg-zinc-900"
            />
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-5xl">
              I'm Shubham. <span className="text-zinc-400">A Creator.</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              I'm a full-stack developer with a passion for building clean, user-centric applications.
              Currently, I'm focusing on open-source projects and sharing my knowledge with the developer community.
            </p>

            <div className="mt-8 flex items-center justify-center gap-6 lg:justify-start">
              {[
                { icon: <Github size={20} />, href: "https://github.com/04Shubhampatil" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/shubham-patil-9773032b4/" },
                { icon: <Twitter size={20} />, href: "https://x.com/SHUBHAMPAT13628" },
                { icon: <Mail size={20} />, href: "theshubhampatil04@gmail.com" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-zinc-400 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mt-24 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Professional Journey</h2>
            <div className="mt-6 space-y-8">
              {[
                { year: "2024", title: "Fullstack Developer", company: "Blogify" },
                { year: "2023", title: "Frontend Engineer", company: "Open Source" },
                { year: "2022", title: "React Developer", company: "Startup Inc" },
              ].map((job, idx) => (
                <div key={idx} className="flex gap-4">
                  <span className="text-xs font-bold tabular-nums text-zinc-300 dark:text-zinc-600">
                    {job.year}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-white">{job.title}</h3>
                    <p className="text-xs text-zinc-500">{job.company}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Skills & Expertise</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "React", "Node.js", "TypeScript","C & C++","Java",
                "Tailwind CSS", "MongoDB", "Git & GitHub"
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-100 dark:bg-white/5 dark:text-zinc-400 dark:hover:bg-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button className="group mt-10 inline-flex items-center gap-1 text-sm font-bold text-indigo-600 dark:text-indigo-400">
              Download Full Resume
              <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
