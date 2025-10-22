"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import siteData from "@/data/site.json";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const nav = siteData.nav;

  // قفل اسکرول وقتی منو باز است
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* لوگو */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={siteData.site.logo}
            alt={`${siteData.site.name} logo`}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full"
          />
          <span className="font-semibold text-gray-900">
            {siteData.site.name}
          </span>
        </Link>

        {/* منوی دسکتاپ */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              {i.label}
            </Link>
          ))}
        </nav>

        {/* دکمه موبایل */}
        <button
          ref={buttonRef}
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* منوی موبایل */}
      <MobileMenu
        open={open}
        setOpen={setOpen}
        nav={nav}
        site={siteData.site}
      />
    </header>
  );
}
