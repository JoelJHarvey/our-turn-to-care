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

const TOOLS_LINKS = [
  { label: "Care Assessment", href: "/tools/care-assessment" },
  { label: "Cost Calculator", href: "/tools/cost-calculator" },
  { label: "Medicaid Screener", href: "/tools/medicaid-screener" },
  { label: "VA Benefits Eligibility", href: "/tools/va-benefits" },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3.5 h-3.5 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const resourcesRef = useRef<HTMLDivElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);
  const resourcesCloseTimeout = useRef<NodeJS.Timeout | null>(null);
  const toolsCloseTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleToolsMouseEnter = () => {
    if (toolsCloseTimeout.current) {
      clearTimeout(toolsCloseTimeout.current);
      toolsCloseTimeout.current = null;
    }
    setToolsOpen(true);
  };

  const handleToolsMouseLeave = () => {
    toolsCloseTimeout.current = setTimeout(() => setToolsOpen(false), 150);
  };

  const handleResourcesMouseEnter = () => {
    if (resourcesCloseTimeout.current) {
      clearTimeout(resourcesCloseTimeout.current);
      resourcesCloseTimeout.current = null;
    }
    setResourcesOpen(true);
  };

  const handleResourcesMouseLeave = () => {
    resourcesCloseTimeout.current = setTimeout(() => setResourcesOpen(false), 150);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Clean up hover timeouts on unmount
  useEffect(() => {
    return () => {
      if (toolsCloseTimeout.current) clearTimeout(toolsCloseTimeout.current);
      if (resourcesCloseTimeout.current) clearTimeout(resourcesCloseTimeout.current);
    };
  }, []);

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setResourcesOpen(false);
        setToolsOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
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
          {/* Caregiver Tools dropdown */}
          <div
            className="relative"
            ref={toolsRef}
            onMouseEnter={handleToolsMouseEnter}
            onMouseLeave={handleToolsMouseLeave}
          >
            <button
              onClick={() => setToolsOpen((o) => !o)}
              className="flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors"
              aria-expanded={toolsOpen}
              aria-haspopup="true"
            >
              Caregiver Tools
              <ChevronIcon open={toolsOpen} />
            </button>

            <div
              className={`absolute right-0 top-full pt-2 w-56 z-50 transition-all duration-200 origin-top ${
                toolsOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 py-1.5">
              {TOOLS_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setToolsOpen(false)}
                  className="block px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            </div>
          </div>

          {/* Care Guides dropdown */}
          <div
            className="relative"
            ref={resourcesRef}
            onMouseEnter={handleResourcesMouseEnter}
            onMouseLeave={handleResourcesMouseLeave}
          >
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              className="flex items-center gap-1 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors"
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
            >
              Care Guides
              <ChevronIcon open={resourcesOpen} />
            </button>

            <div
              className={`absolute right-0 top-full pt-2 w-52 z-50 transition-all duration-200 origin-top ${
                resourcesOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
              }`}
            >
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 py-1.5">
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
            </div>
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
          {/* Caregiver Tools accordion */}
          <div>
            <button
              onClick={() => setMobileToolsOpen((o) => !o)}
              className="w-full flex items-center justify-between text-slate-700 text-sm font-medium px-2 py-3 border-b border-slate-100 hover:text-teal-700 transition-colors"
            >
              Caregiver Tools
              <ChevronIcon open={mobileToolsOpen} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${mobileToolsOpen ? "max-h-96" : "max-h-0"}`}
            >
              <div className="pl-4 flex flex-col border-b border-slate-100">
                {TOOLS_LINKS.map((link) => (
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
            </div>
          </div>

          {/* Care Guides accordion */}
          <div>
            <button
              onClick={() => setMobileResourcesOpen((o) => !o)}
              className="w-full flex items-center justify-between text-slate-700 text-sm font-medium px-2 py-3 border-b border-slate-100 hover:text-teal-700 transition-colors"
            >
              Care Guides
              <ChevronIcon open={mobileResourcesOpen} />
            </button>
            <div
              className={`overflow-hidden transition-all duration-200 ${mobileResourcesOpen ? "max-h-96" : "max-h-0"}`}
            >
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
            </div>
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
