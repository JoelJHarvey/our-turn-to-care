"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const RESOURCES_LINKS = [
  { label: "Memory Care", href: "/memory-care/" },
  { label: "Assisted Living", href: "/assisted-living/" },
  { label: "Home Care", href: "/home-care/" },
  { label: "Aging in Place", href: "/aging-in-place/" },
  { label: "Nursing Homes", href: "/nursing-homes/" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo / site name */}
        <Link
          href="/"
          className="text-xl font-bold text-slate-800 tracking-tight hover:text-teal-700 transition-colors"
        >
          OurTurnToCare
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {/* Resources dropdown */}
          <div className="relative" ref={resourcesRef}>
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              className="flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors"
              aria-expanded={resourcesOpen}
            >
              Resources
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-150 ${resourcesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {resourcesOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                {RESOURCES_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setResourcesOpen(false)}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* About link */}
          <Link
            href="#"
            className="text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors"
          >
            About
          </Link>

          {/* CTA */}
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
          >
            Care Assessment
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-md hover:bg-slate-100 transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-200 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-700 transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-200 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <nav className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2 flex flex-col gap-1">
          {/* Resources accordion */}
          <div>
            <button
              onClick={() => setMobileResourcesOpen((o) => !o)}
              className="w-full flex items-center justify-between text-slate-700 text-sm font-medium px-2 py-3 border-b border-slate-100 hover:text-teal-700 transition-colors"
            >
              Resources
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-150 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileResourcesOpen && (
              <div className="pl-4 flex flex-col border-b border-slate-100">
                {RESOURCES_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-sm text-slate-600 py-2.5 hover:text-teal-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className="block text-slate-700 text-sm font-medium px-2 py-3 border-b border-slate-100 hover:text-teal-700 transition-colors"
          >
            About
          </Link>

          <Link
            href="/tools/care-assessment"
            onClick={() => setMenuOpen(false)}
            className="block bg-teal-600 text-white text-sm font-semibold px-4 py-3 rounded-lg hover:bg-teal-700 transition-colors text-center mt-1"
          >
            Care Assessment
          </Link>
        </nav>
      )}
    </header>
  );
}
