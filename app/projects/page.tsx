import type { Metadata } from "next";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects · Rishit Yogesh Bafna",
  description: "Selected projects with clear problems, architecture, and decisions."
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <section className="panel">
        <div className="panel-header">projects/index</div>
        <div className="panel-body">
          <div className="text-sm text-muted">
            Each project includes the problem, approach, and architecture so it is
            easy to scan.
          </div>
        </div>
      </section>

      {projects.map((project) => (
        <section key={project.slug} className="panel">
          <div className="panel-header">
            <span>{project.name}</span>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ink"
              >
                GitHub ↗
              </a>
            )}
          </div>
          <div className="panel-body space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="tag">
                  {item}
                </span>
              ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="section-title">Problem</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {project.problem.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="section-title">Approach</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {project.approach.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="section-title">Architecture</div>
              <pre className="mt-2 overflow-x-auto rounded-md border border-border bg-bg p-3 text-xs font-mono">
{project.architecture.join("\n")}
              </pre>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="section-title">Key decisions</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {project.decisions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="section-title">What I’d improve next</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
                  {project.improvements.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
