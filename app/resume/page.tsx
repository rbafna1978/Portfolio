import type { Metadata } from "next";
import { education } from "@/content/education";
import { experiences } from "@/content/experience";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Resume · Rishit Yogesh Bafna",
  description: "Resume view with downloadable PDF."
};

export default function ResumePage() {
  return (
    <div className="space-y-6">
      <section className="panel">
        <div className="panel-header">resume.pdf</div>
        <div className="panel-body flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-semibold">Rishit Yogesh Bafna</div>
            <div className="text-sm text-muted">Tempe, AZ</div>
          </div>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded border border-border bg-panel px-4 py-2 text-xs font-mono uppercase tracking-wider text-ink"
          >
            Open PDF
          </a>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">resume.html</div>
        <div className="panel-body space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="section-title">Contact</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Tempe, AZ</li>
                <li>602-815-2575</li>
                <li>bafnarishit@gmail.com</li>
                <li>linkedin.com/in/rishit-bafna</li>
                <li>github.com/rbafna1978</li>
              </ul>
            </div>
            <div>
              <div className="section-title">Skills</div>
              <ul className="mt-2 space-y-1 text-sm">
                <li>Java, Python, JS/TS, C++, SQL</li>
                <li>React, Node.js, FastAPI, AWS</li>
                <li>PostgreSQL, Redis, Docker, Git</li>
              </ul>
            </div>
          </div>

          <div>
            <div className="section-title">Education</div>
            <div className="mt-2 space-y-3 text-sm">
              {education.map((item) => (
                <div key={item.program}>
                  <div className="font-semibold">
                    {item.program} · {item.school}
                  </div>
                  <div className="text-muted">{item.timeframe}</div>
                  {item.detail ? (
                    <div className="text-muted">{item.detail}</div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-title">Experience</div>
            <div className="mt-2 space-y-4 text-sm">
              {experiences.map((exp) => (
                <div key={exp.company}>
                  <div className="font-semibold">
                    {exp.role} · {exp.company}
                  </div>
                  <div className="text-muted">{exp.context}</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {exp.scope.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-title">Projects</div>
            <div className="mt-2 space-y-4 text-sm">
              {projects.map((project) => (
                <div key={project.slug}>
                  <div className="font-semibold">{project.name}</div>
                  <div className="text-muted">{project.tech.join(" · ")}</div>
                  <ul className="mt-2 list-disc space-y-1 pl-5">
                    {project.homeHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
