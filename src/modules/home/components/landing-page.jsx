"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Zap,
  Code2,
  Eye,
  Layers,
  Shield,
  MessageSquare,
  ArrowRight,
  ChevronRight,
  Terminal,
  Braces,
  Globe,
  Github,
  Twitter,
} from "lucide-react";

function useInView(options = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 pt-24 pb-16 overflow-hidden">

      <div className="absolute inset-0 -z-10">

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-400/8 dark:bg-emerald-400/5 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-teal-500/8 dark:bg-teal-500/5 rounded-full blur-[80px] animate-float-delay" />


        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-emerald-400/40 dark:bg-emerald-400/30 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `particle-float-${(i % 2) + 1} ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>


      <div className="animate-fade-in-up mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 dark:border-emerald-500/15 bg-emerald-500/5 dark:bg-emerald-500/5 text-emerald-700 dark:text-emerald-400 text-sm font-medium backdrop-blur-sm">
          <Sparkles className="w-4 h-4" />
          <span>Powered by Google Gemini AI</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>


      <h1 className="animate-fade-in-up animation-delay-200 text-center max-w-4xl">
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground">
          Turn Ideas Into
        </span>
        <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mt-2 gradient-text animate-shimmer">
          Working Apps
        </span>
      </h1>


      <p className="animate-fade-in-up animation-delay-400 mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl text-center leading-relaxed">
        Describe what you want to build in plain English. Watch as AI generates
        production-ready code with live preview — in seconds, not hours.
      </p>


      <div className="animate-fade-in-up animation-delay-600 mt-10 flex flex-col sm:flex-row items-center gap-4">
        <SignUpButton>
          <button className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-semibold rounded-xl text-base transition-all duration-300 animate-pulse-glow cursor-pointer">
            Start Building Free
            <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </SignUpButton>
        <Link
          href="#demo"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border/60 hover:border-emerald-500/30 text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-all duration-300 backdrop-blur-sm text-base"
        >
          <Eye className="w-4.5 h-4.5" />
          See How It Works
        </Link>
      </div>


      <div className="animate-fade-in-up animation-delay-800 mt-16 w-full max-w-4xl">
        <div className="relative rounded-2xl border border-border/40 dark:border-zinc-800/60 overflow-hidden shadow-2xl shadow-emerald-500/5">

          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-border/40 dark:border-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 rounded-md bg-zinc-200/60 dark:bg-zinc-800 text-xs text-muted-foreground font-mono">
                vibe.dev
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 bg-white dark:bg-zinc-950">

            <div className="p-6 border-r border-border/30 dark:border-zinc-800/50">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                  <div className="px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-sm leading-relaxed">
                    Build me a modern dashboard with charts, a sidebar, and dark mode support
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-purple-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                  </div>
                  <div className="px-4 py-2.5 rounded-xl bg-emerald-500/8 dark:bg-emerald-500/10 text-sm leading-relaxed">
                    <span className="text-emerald-700 dark:text-emerald-400 font-medium">Generating your dashboard</span>
                    <span className="text-muted-foreground"> — creating layout, adding charts with Recharts, implementing dark mode toggle...</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 pl-10">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: "0s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>
            </div>

            <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Preview</div>
                  <div className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-medium">LIVE</div>
                </div>
                <div className="rounded-lg bg-white dark:bg-zinc-800/50 border border-border/30 dark:border-zinc-700/40 p-4 space-y-3">

                  <div className="flex gap-3">
                    <div className="w-16 space-y-2">
                      <div className="h-2 w-full rounded bg-emerald-500/30" />
                      <div className="h-2 w-12 rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-2 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
                      <div className="h-2 w-10 rounded bg-zinc-200 dark:bg-zinc-700" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-32 rounded bg-zinc-300 dark:bg-zinc-600" />
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-16 rounded-md bg-emerald-500/15 border border-emerald-500/20" />
                        <div className="h-16 rounded-md bg-blue-500/15 border border-blue-500/20" />
                        <div className="h-16 rounded-md bg-purple-500/15 border border-purple-500/20" />
                      </div>
                      <div className="h-20 rounded-md bg-zinc-100 dark:bg-zinc-700/50 border border-border/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tech Bar
function TechBar() {
  const [ref, isInView] = useInView();
  const techs = [
    { name: "Google Gemini", icon: "✦" },
    { name: "React", icon: "⚛" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Prisma", icon: "◆" },
    { name: "TypeScript", icon: "TS" },
    { name: "Node.js", icon: "⬢" },
    { name: "Clerk", icon: "🔐" },
  ];
  const doubled = [...techs, ...techs];

  return (
    <section ref={ref} className="py-16 border-y border-border/30 dark:border-zinc-800/40 overflow-hidden">
      <div className={`transition-all duration-700 ${isInView ? "opacity-100" : "opacity-0"}`}>
        <p className="text-center text-sm text-muted-foreground mb-8 tracking-wide uppercase font-medium">
          Built with modern technologies
        </p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex animate-scroll-left" style={{ width: "max-content" }}>
            {doubled.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-8 py-3 text-muted-foreground/70 hover:text-foreground transition-colors shrink-0"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="text-sm font-medium whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Features
function FeaturesSection() {
  const [ref, isInView] = useInView();

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Instant Generation",
      description: "Describe your idea and get a fully functional app in seconds. No boilerplate, no setup — just results.",
      color: "emerald",
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Live Preview",
      description: "Watch your app come to life in real-time with a built-in sandbox. See changes as the AI writes code.",
      color: "blue",
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      title: "Production-Ready Code",
      description: "Get clean, well-structured code using modern frameworks. React, Tailwind, and best practices built in.",
      color: "purple",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Conversational Iteration",
      description: "Refine your app through natural conversation. Say \"make it darker\" or \"add a sidebar\" and watch it update.",
      color: "amber",
    },
    {
      icon: <Layers className="w-5 h-5" />,
      title: "Template Library",
      description: "Start from pre-built templates — dashboards, e-commerce, clones of popular apps — and customize freely.",
      color: "rose",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure & Private",
      description: "Your projects are protected with enterprise-grade authentication. Your code stays yours, always.",
      color: "teal",
    },
  ];

  const colorMap = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-500", border: "border-emerald-500/20", hover: "hover:border-emerald-500/40" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-500", border: "border-blue-500/20", hover: "hover:border-blue-500/40" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-500", border: "border-purple-500/20", hover: "hover:border-purple-500/40" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-500", border: "border-amber-500/20", hover: "hover:border-amber-500/40" },
    rose: { bg: "bg-rose-500/10", text: "text-rose-500", border: "border-rose-500/20", hover: "hover:border-rose-500/40" },
    teal: { bg: "bg-teal-500/10", text: "text-teal-500", border: "border-teal-500/20", hover: "hover:border-teal-500/40" },
  };

  return (
    <section id="features" ref={ref} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Everything You Need to{" "}
            <span className="gradient-text">Ship Fast</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            From idea to deployed app — all through natural conversation with AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            return (
              <div
                key={i}
                className={`group glass-card rounded-2xl p-6 transition-all duration-500 ${colors.hover} border ${colors.border} hover:shadow-lg hover:-translate-y-1 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${colors.bg} ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// How It Works
function HowItWorksSection() {
  const [ref, isInView] = useInView();

  const steps = [
    {
      step: "01",
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Describe Your Idea",
      description: "Tell the AI what you want to build using plain English. Be as specific or as vague as you like — it understands context.",
    },
    {
      step: "02",
      icon: <Braces className="w-6 h-6" />,
      title: "AI Generates Code",
      description: "Gemini AI writes production-ready code in real-time. React components, styling, logic — everything, generated instantly.",
    },
    {
      step: "03",
      icon: <Globe className="w-6 h-6" />,
      title: "Preview & Iterate",
      description: "See your app running live in a sandbox. Want changes? Just ask. Refine through conversation until it's perfect.",
    },
  ];

  return (
    <section id="how-it-works" ref={ref} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Three Steps to{" "}
            <span className="gradient-text">Your Next App</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-emerald-500/30 via-emerald-500/50 to-emerald-500/30" />

          {steps.map((step, i) => (
            <div
              key={i}
              className={`relative text-center transition-all duration-700 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >

              <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 mb-6 mx-auto">
                <span className="text-emerald-600 dark:text-emerald-400">{step.icon}</span>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-lg">
                  {step.step}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Demo Preview
function DemoSection() {
  const [ref, isInView] = useInView();

  return (
    <section id="demo" ref={ref} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4">
            See It In Action
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            From Chat to{" "}
            <span className="gradient-text">Code</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Watch how a simple prompt transforms into a fully interactive application.
          </p>
        </div>

        <div className={`transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}`}>
          <div className="relative">

            <div className="absolute -inset-4 bg-emerald-500/5 dark:bg-emerald-500/8 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl border border-border/50 dark:border-zinc-800/60 overflow-hidden bg-white dark:bg-zinc-950 shadow-2xl">

              <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 dark:bg-zinc-900 border-b border-border/40 dark:border-zinc-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <div className="w-3 h-3 rounded-full bg-green-400/80" />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-mono">project-workspace</span>
                </div>
                <div className="w-12" />
              </div>


              <div className="grid grid-cols-12 min-h-[400px]">

                <div className="col-span-3 border-r border-border/30 dark:border-zinc-800/50 p-4">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">Explorer</p>
                  <div className="space-y-1.5 text-xs font-mono">
                    {["📁 src", "  📁 components", "    📄 Dashboard.jsx", "    📄 Sidebar.jsx", "    📄 Chart.jsx", "  📄 App.jsx", "  📄 index.css", "📄 package.json"].map(
                      (file, i) => (
                        <div
                          key={i}
                          className={`px-2 py-1 rounded text-muted-foreground/80 ${
                            file.includes("Dashboard") ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "hover:bg-accent/50"
                          }`}
                        >
                          {file}
                        </div>
                      )
                    )}
                  </div>
                </div>


                <div className="col-span-5 border-r border-border/30 dark:border-zinc-800/50 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-mono text-foreground">Dashboard.jsx</div>
                  </div>
                  <div className="font-mono text-[11px] leading-[1.7] text-muted-foreground">
                    <div><span className="text-purple-500 dark:text-purple-400">import</span> <span className="text-foreground">React</span> <span className="text-purple-500 dark:text-purple-400">from</span> <span className="text-emerald-600 dark:text-emerald-400">{`'react'`}</span>;</div>
                    <div><span className="text-purple-500 dark:text-purple-400">import</span> <span className="text-foreground">{`{ BarChart }`}</span> <span className="text-purple-500 dark:text-purple-400">from</span> <span className="text-emerald-600 dark:text-emerald-400">{`'recharts'`}</span>;</div>
                    <div className="mt-2"><span className="text-purple-500 dark:text-purple-400">export default function</span> <span className="text-blue-500 dark:text-blue-400">Dashboard</span>() {`{`}</div>
                    <div>  <span className="text-purple-500 dark:text-purple-400">return</span> (</div>
                    <div>    <span className="text-zinc-400">&lt;</span><span className="text-red-500 dark:text-red-400">div</span> <span className="text-amber-600 dark:text-amber-400">className</span>=<span className="text-emerald-600 dark:text-emerald-400">{`"p-6"`}</span><span className="text-zinc-400">&gt;</span></div>
                    <div>      <span className="text-zinc-400">&lt;</span><span className="text-blue-500 dark:text-blue-400">BarChart</span> <span className="text-amber-600 dark:text-amber-400">data</span>={`{data}`}<span className="text-zinc-400"> /&gt;</span></div>
                    <div>    <span className="text-zinc-400">&lt;/</span><span className="text-red-500 dark:text-red-400">div</span><span className="text-zinc-400">&gt;</span></div>
                    <div>  );</div>
                    <div>{`}`}</div>
                  </div>
                </div>


                <div className="col-span-4 p-4 bg-zinc-50 dark:bg-zinc-900/50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Preview</span>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      LIVE
                    </div>
                  </div>
                  <div className="rounded-lg bg-white dark:bg-zinc-800/50 border border-border/30 dark:border-zinc-700/40 p-3 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-2.5 w-20 rounded bg-zinc-300 dark:bg-zinc-600" />
                      <div className="h-2.5 w-12 rounded bg-emerald-500/30" />
                    </div>

                    <div className="flex items-end gap-1.5 h-24 pt-2">
                      {[60, 80, 45, 90, 70, 55, 85, 65, 75, 50].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-emerald-500/80 to-emerald-400/50 transition-all duration-500"
                          style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
                        />
                      ))}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <div className="flex-1 h-8 rounded bg-zinc-100 dark:bg-zinc-700/50" />
                      <div className="flex-1 h-8 rounded bg-zinc-100 dark:bg-zinc-700/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Pricing CTA
function PricingCTA() {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="py-24 px-4">
      <div className={`max-w-4xl mx-auto text-center transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <div className="relative glass-card rounded-3xl p-12 md:p-16 overflow-hidden">

          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-500/8 rounded-full blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Ready to{" "}
              <span className="gradient-text">Start Building?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Join thousands of developers shipping faster with AI. Free tier available — no credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignUpButton>
                <button className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white font-semibold rounded-xl text-base transition-all duration-300 animate-pulse-glow cursor-pointer">
                  Get Started Free
                  <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignUpButton>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border/60 hover:border-emerald-500/30 text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-all duration-300 text-base"
              >
                View Pricing Plans
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer 
function Footer() {
  return (
    <footer className="border-t border-border/30 dark:border-zinc-800/40 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <Image src="/logo.svg" width={28} height={28} alt="Vibe" className="invert dark:invert-0" />
              <span className="text-lg font-bold">Vibe</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Build apps and websites through conversation with AI. Fast, intuitive, and free to start.
            </p>
          </div>


          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Features", href: "#features" },
                { label: "How It Works", href: "#how-it-works" },
                { label: "Pricing", href: "/pricing" },
                { label: "Templates", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Documentation", href: "#" },
                { label: "Changelog", href: "#" },
                { label: "Blog", href: "#" },
                { label: "Support", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          <div>
            <h4 className="text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Cookie Policy", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-emerald-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>


        <div className="pt-8 border-t border-border/30 dark:border-zinc-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vibe. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-muted-foreground/60 hover:text-emerald-500 transition-colors">
              <Github className="w-4.5 h-4.5" />
            </Link>
            <Link href="#" className="text-muted-foreground/60 hover:text-emerald-500 transition-colors">
              <Twitter className="w-4.5 h-4.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}


export default function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <TechBar />
      <FeaturesSection />
      <HowItWorksSection />
      <DemoSection />
      <PricingCTA />
      <Footer />
    </div>
  );
}
