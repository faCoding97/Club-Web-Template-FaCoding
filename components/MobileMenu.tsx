"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

export default function MobileMenu({ open, setOpen, nav, site }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [setOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* بک‌دراپ تیره */}
      <div
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* پنل منو */}
      <div
        className={`absolute right-0 top-0 h-full w-72 bg-white shadow-2xl border-l border-gray-200 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-gray-50">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3"
          >
            <Image
              src={site.logo}
              alt={site.name}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold text-gray-900">{site.name}</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-700"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-2 p-4 bg-gray-50 text-gray-900">
          {nav
            .filter((i) => !["contact", "Contact", "CONTACT"].includes(i.label))
            .map((i) => (
              <Link
                key={i.href}
                href={i.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-gray-800 hover:bg-gray-100 font-medium transition"
              >
                {i.label}
              </Link>
            ))}
        </nav>

        <div className="mt-auto border-t border-gray-200 p-4 bg-gray-50 text-gray-900">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block w-full rounded-lg bg-gray-900 text-white text-center py-2 font-medium hover:bg-gray-800 transition"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
