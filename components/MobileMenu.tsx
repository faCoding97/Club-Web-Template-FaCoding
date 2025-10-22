"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

type NavItem = { label: string; href: string };
type SiteMeta = { name: string; logo: string };

type MobileMenuProps = {
  open: boolean;
  setOpen: (v: boolean) => void;
  nav: NavItem[];
  site: SiteMeta;
};

export default function MobileMenu({
  open,
  setOpen,
  nav,
  site,
}: MobileMenuProps) {
  const pathname = usePathname();

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, setOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on route change
  useEffect(() => {
    if (open) setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // case-insensitive filter to hide "Contact"
  const menuItems = (nav ?? []).filter(
    (i) => i.label?.toLowerCase() !== "contact"
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile menu"
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Panel */}
      <aside
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

        <nav
          className="flex flex-col gap-2 p-4 bg-gray-50 text-gray-900"
          aria-label="Mobile"
        >
          {menuItems.map((i) => (
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
      </aside>
    </div>
  );
}
