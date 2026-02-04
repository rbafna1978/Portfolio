import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";
import { experiences } from "@/content/experience";

export const metadata: Metadata = {
  title: "Home · Rishit Yogesh Bafna",
  description: "Engineer-focused portfolio with projects, experience, and resume."
};

export default function HomePage() {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <div className="space-y-6">
      <section className="panel">
        <div className="panel-header">overview</div>
        <div className="panel-body space-y-4">
          <div className="flex flex-col gap-3">
            <div className="text-xs font-mono uppercase tracking-wider text-muted">
              Rishit Yogesh Bafna · Tempe, AZ
            </div>
            <h1 className="text-2xl font-semibold md:text-3xl">
              Product-minded engineer shipping typed UI and reliable backends.
            </h1>
            <div className="flex flex-wrap gap-2">
              <span className="tag">Java</span>
              <span className="tag">Python</span>
              <span className="tag">JS/TS</span>
              <span className="tag">React</span>
              <span className="tag">AWS</span>
            </div>
          </div>
          <div className="rounded-md border border-border bg-bg px-4 py-3">
            <div className="section-title">Currently</div>
            <div className="mt-2 text-sm font-medium">
              MS CS @ Arizona State University · Focused on systems + product
              engineering
            </div>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">featured projects</div>
        <div className="panel-body grid gap-4 md:grid-cols-3">
          {featured.map((project) => (
            <div key={project.slug} className="rounded-md border border-border p-4">
              <div className="text-sm font-semibold">{project.name}</div>
              <div className="mt-1 text-sm text-muted">{project.summary}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span key={item} className="tag">
                    {item}
                  </span>
                ))}
              </div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {project.homeHighlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="panel-body pt-0">
          <Link
            className="text-sm font-mono text-accent hover:underline"
            href="/projects"
          >
            view all projects →
          </Link>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">experience snapshot</div>
        <div className="panel-body space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.company}
              className="rounded-md border border-border bg-panel p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold">
                  {exp.role} · {exp.company}
                </div>
                <span className="tag">{exp.context}</span>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div>
                  <div className="section-title">Scope</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {exp.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="section-title">Tech</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {exp.tech.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="section-title">Impact</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                    {exp.impact.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="panel-body pt-0">
          <Link
            className="text-sm font-mono text-accent hover:underline"
            href="/experience"
          >
            view full experience →
          </Link>
        </div>
      </section>
    </div>
  );
}
