import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About · Rishit Yogesh Bafna",
  description: "How I build, work, and collaborate."
};

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <section className="panel">
        <div className="panel-header">who i am</div>
        <div className="panel-body">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>Software engineer focused on product-ready UI + backend systems</li>
            <li>Based in Tempe, AZ with ASU CS background</li>
            <li>Bias toward clarity, speed, and maintainability</li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">what i build</div>
        <div className="panel-body">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>Typed frontends with dependable state flows</li>
            <li>APIs that are stable, small, and easy to reason about</li>
            <li>Tools that reduce review and delivery time</li>
          </ul>
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">how i work</div>
        <div className="panel-body">
          <ul className="list-disc space-y-2 pl-5 text-sm">
            <li>Document decisions in short, searchable notes</li>
            <li>Start with a thin slice, then harden</li>
            <li>Use feedback loops early and often</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
