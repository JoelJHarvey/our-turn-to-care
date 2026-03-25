import Link from "next/link";

interface Section {
  heading: string;
  content: React.ReactNode;
}

interface ContentHubPageProps {
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  sections: Section[];
}

function SidebarCTA() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <p className="text-sm font-semibold text-slate-700 mb-1">
        Not sure what care is right?
      </p>
      <p className="text-sm text-slate-500 leading-relaxed mb-4">
        Answer a few questions and get a personalized recommendation in about 4
        minutes.
      </p>
      <Link
        href="/tools/care-assessment"
        className="block text-center bg-teal-600 text-white text-sm font-semibold px-5 py-3 rounded-xl hover:bg-teal-700 transition-colors"
      >
        Take the Assessment →
      </Link>
    </div>
  );
}

export default function ContentHubPage({
  title,
  subtitle,
  breadcrumbLabel,
  sections,
}: ContentHubPageProps) {
  return (
    <>
      {/* Hero */}
      <section
        className="px-4 sm:px-6 py-14 sm:py-20"
        style={{ background: "linear-gradient(to bottom, #f0fdfa, #ffffff)" }}
      >
        <div className="max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-5 flex items-center gap-1.5 text-sm text-slate-500">
            <Link href="/" className="hover:text-teal-700 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-700 font-medium">{breadcrumbLabel}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight mb-4 max-w-[800px]">
            {title}
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-[600px]">
            {subtitle}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="px-4 sm:px-6 py-16 bg-white">
        <div className="max-w-[1100px] mx-auto">
          <div className="lg:flex lg:gap-12 lg:items-start">

            {/* Main article content */}
            <article className="lg:flex-1 min-w-0">
              {sections.map((section, i) => (
                <div key={i}>
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-slate-800 mb-5 leading-snug">
                      {section.heading}
                    </h2>
                    <div className="prose-content">{section.content}</div>
                  </div>

                  {/* Mobile-only inline CTA after section 2 */}
                  {i === 1 && (
                    <div className="lg:hidden mb-12">
                      <SidebarCTA />
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile-only CTA at bottom of article */}
              <div className="lg:hidden mt-4 mb-12">
                <SidebarCTA />
              </div>
            </article>

            {/* Desktop sticky sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-24">
                <SidebarCTA />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 bg-teal-700 text-center">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take the Free Care Assessment
          </h2>
          <p className="text-teal-100 leading-relaxed mb-8">
            Get a personalized recommendation for your loved one&apos;s specific
            situation. Takes about 4 minutes. No login required.
          </p>
          <Link
            href="/tools/care-assessment"
            className="inline-flex items-center bg-white text-teal-700 text-base font-semibold px-7 py-4 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-colors shadow-md"
          >
            Start the Assessment →
          </Link>
        </div>
      </section>
    </>
  );
}
