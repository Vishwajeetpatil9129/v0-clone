"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <nav
      className={`p-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto w-full flex justify-between items-center">
        {/* Logo */}
        <Link href={"/"} className="flex items-center gap-2.5">
          <Image
            src={"/logo.svg"}
            alt="Omnix"
            width={32}
            height={32}
            className="shrink-0 invert dark:invert-0"
          />
          <span className="font-bold text-lg hidden sm:inline">Omnix</span>
        </Link>

        {/* Desktop Nav Links (visible to signed-out users) */}
        <SignedOut>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SignedOut>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <SignedOut>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-accent/50 transition-colors text-foreground cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop auth buttons */}
            <div className="hidden md:flex gap-2">
              <SignInButton>
                <Button variant={"outline"} size={"sm"}>
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size={"sm"}>Sign Up</Button>
              </SignUpButton>
            </div>
          </SignedOut>
          
          <SignedIn>
            <Link
              href="/projects"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Projects
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      {/* Mobile menu (signed-out only) */}
      <SignedOut>
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/30 pt-4 animate-fade-in-up">
            <div className="flex flex-col gap-3 max-w-5xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 pt-2">
                <SignInButton>
                  <Button variant={"outline"} size={"sm"} className="flex-1">
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button size={"sm"} className="flex-1">
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </div>
          </div>
        )}
      </SignedOut>
    </nav>
  );
};

export default Navbar;
