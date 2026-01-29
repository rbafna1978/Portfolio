import type { Metadata } from "next";
import { experiences } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience · Rishit Yogesh Bafna",
  description: "Internships and capstone work focused on shippable software."
};

export default function ExperiencePage() {
  return (
    <div className="space-y-6">
      <section className="panel">
        <div className="panel-header">experience/log</div>
        <div className="panel-body space-y-4">
          {experiences.map((exp) => (
            <div key={exp.company} className="rounded-md border border-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold">{exp.role}</div>
                  <div className="text-sm text-muted">{exp.company}</div>
                </div>
                <span className="tag">{exp.context}</span>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
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
      </section>

      <section className="panel">
        <div className="panel-header">what i care about in code</div>
        <div className="panel-body">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>Typed API contracts and predictable data flow</li>
            <li>UI state validation before transitions</li>
            <li>Readable boundaries between layers</li>
            <li>Small, composable modules</li>
            <li>Fast feedback loops with tests and reviews</li>
            <li>Performance budgets that are visible</li>
            <li>Documentation that stays close to code</li>
            <li>Incremental refactors over rewrites</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
