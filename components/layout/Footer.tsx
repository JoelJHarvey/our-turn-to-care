import Link from "next/link";

const TOOLS_LINKS = [
  { label: "Care Assessment", href: "/tools/care-assessment" },
  { label: "Cost Calculator", href: "/tools/cost-calculator" },
  { label: "Medicaid Screener", href: "/tools/medicaid-screener" },
  { label: "VA Benefits Eligibility", href: "/tools/va-benefits" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: Brand + tagline + site links */}
          <div>
            <p className="text-lg font-bold text-slate-800 mb-2">OurTurnToCare</p>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Helping families navigate care decisions with confidence.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "About Us", href: "#" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Caregiver Tools */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Caregiver Tools
            </p>
            <ul className="flex flex-col gap-2">
              {TOOLS_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Care Guides */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Care Guides
            </p>
            <ul className="flex flex-col gap-2">
              {[
                { label: "Memory Care", href: "/memory-care/" },
                { label: "Assisted Living", href: "/assisted-living/" },
                { label: "Home Care", href: "/home-care/" },
                { label: "Aging in Place", href: "/aging-in-place/" },
                { label: "Nursing Homes", href: "/nursing-homes/" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-teal-700 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Contact
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Questions? Email us at{" "}
              <a
                href="mailto:hello@ourturntocare.com"
                className="text-teal-700 hover:underline"
              >
                hello@ourturntocare.com
              </a>
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-slate-400">
            © 2026 OurTurnToCare. All rights reserved.
          </p>
          <p className="text-xs text-slate-400">
            This site provides general information, not medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
