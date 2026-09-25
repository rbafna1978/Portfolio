"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react"
import { useTheme } from "next-themes"
import { Bio, skills, experiences, education, projects } from "@/data/constants"

const RED = "var(--lab-red)"
const LIME = "var(--lab-lime)"
const INK = "var(--lab-ink)"
// colour with alpha that also works for CSS variables
const mix = (c: string, pct: number) => `color-mix(in srgb, ${c} ${pct}%, transparent)`
const BEBAS = { fontFamily: "var(--font-bebas-neue), sans-serif" }
const MONO = { fontFamily: "var(--font-ibm-plex-mono), monospace" }
const EASE = [0.22, 1, 0.36, 1] as const

const SECTIONS = [
  { id: "top", label: "Signal" },
  { id: "work", label: "Work" },
  { id: "proof", label: "Proof" },
  { id: "education", label: "Education" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
]

const CHARS = "!<>-_\\/[]{}—=+*^?#0123456789"
function Scramble({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [s, setS] = useState(text)
  useEffect(() => {
    if (!inView) return
    let i = 0
    const id = setInterval(() => {
      i++
      setS(text.split("").map((c, k) => (k < i / 2 || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)])).join(""))
      if (i / 2 >= text.length) {
        clearInterval(id)
        setS(text)
      }
    }, 38)
    return () => clearInterval(id)
  }, [inView, text])
  return <span ref={ref} className={className}>{s}</span>
}

/* ------------------------------------------------------------------ cursor */
function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [big, setBig] = useState(false)
  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setBig(!!(e.target as HTMLElement)?.closest?.("a,button,[data-hover]"))
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y])
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden rounded-full bg-white mix-blend-difference [@media(pointer:fine)]:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ width: big ? 72 : 14, height: big ? 72 : 14 }}
      transition={{ duration: 0.25, ease: EASE }}
    />
  )
}

/* -------------------------------------------------------------------- hero */
const ANNOTATIONS = [
  { k: "I build", t: "databases that keep working when servers crash", x: "6%", y: "12%" },
  { k: "I built", t: "a fraud detector that decides in under 50 milliseconds", x: "46%", y: "10%" },
  { k: "I trained", t: "an AI to plan F1 pit stops across 172 real races", x: "50%", y: "40%" },
  { k: "I made", t: "a slow dashboard load 4× faster (8s → 2s)", x: "5%", y: "46%" },
  { k: "I created", t: "a search engine for cybersecurity threats", x: "30%", y: "66%" },
  { k: "I shipped", t: "a 3D product designer that cut revisions by 35%", x: "52%", y: "72%" },
  { k: "I fixed", t: "a payments service so no one is ever charged twice", x: "6%", y: "84%" },
]

function Word({ children, stroke }: { children: string; stroke?: boolean }) {
  return (
    <div
      className="select-none whitespace-nowrap leading-[0.8] tracking-tighter text-[clamp(6rem,34vw,22rem)] lg:text-[clamp(8rem,27vw,30rem)]"
      style={{
        ...BEBAS,
        color: stroke ? "transparent" : undefined,
        WebkitTextStroke: stroke ? `2px ${LIME}` : undefined,
      }}
    >
      {children}
    </div>
  )
}

function Chrome() {
  return (
    <div className="mt-10 flex flex-wrap items-end justify-between gap-4 text-xs uppercase tracking-[0.25em] text-lab-fg/50" style={MONO}>
      <span>{Bio.roles.slice(0, 3).join(" / ")}</span>
      <span className="animate-pulse" style={{ color: LIME }}>◉ move your cursor to see what I actually build</span>
    </div>
  )
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const r = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 35 })
  const sy = useSpring(y, { stiffness: 300, damping: 35 })
  const sr = useSpring(r, { stiffness: 200, damping: 25 })
  const mask = useMotionTemplate`radial-gradient(circle ${sr}px at ${sx}px ${sy}px, #000 62%, transparent 100%)`
  const moved = useRef(false)
  const [first, last] = [Bio.name.split(" ")[0], Bio.name.split(" ").slice(1).join(" ")]

  // auto-sweep so people learn the trick before they touch anything
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const w = el.clientWidth
    x.set(w * 0.2)
    y.set(el.clientHeight * 0.45)
    const a = animate(x, [w * 0.2, w * 0.75], { duration: 2.6, delay: 1, ease: "easeInOut" })
    const b = animate(r, [0, 260, 260, 0], { duration: 2.6, delay: 1, times: [0, 0.2, 0.8, 1] })
    return () => {
      a.stop()
      b.stop()
    }
  }, [x, y, r])

  const onMove = (e: React.PointerEvent) => {
    const b = ref.current!.getBoundingClientRect()
    if (!moved.current) {
      moved.current = true
      x.stop()
      r.stop()
    }
    x.set(e.clientX - b.left)
    y.set(e.clientY - b.top)
    r.set(260)
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={() => r.set(0)}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-16 pt-28 lg:px-12"
    >
      {/* base layer */}
      <div className="relative z-0">
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE }} className="overflow-hidden">
          <Word>{first}</Word>
        </motion.div>
        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.12, ease: EASE }} className="overflow-hidden" style={{ color: RED }}>
          <Word>{last}</Word>
        </motion.div>
      </div>

      {/* x-ray layer */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ WebkitMaskImage: mask, maskImage: mask, background: INK }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `linear-gradient(${mix(LIME, 13)} 1px,transparent 1px),linear-gradient(90deg,${mix(LIME, 13)} 1px,transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-16 pt-28 lg:px-12">
          <div>
            <Word stroke>{first}</Word>
            <Word stroke>{last}</Word>
          </div>
          <div className="invisible"><Chrome /></div>
        </div>
        {ANNOTATIONS.map((a) => (
          <div key={a.t} className="absolute max-w-[15rem] text-xs sm:max-w-xs sm:text-sm" style={{ left: a.x, top: a.y, ...MONO }}>
            <div className="text-[10px] uppercase tracking-[0.25em]" style={{ color: LIME }}>
              <span className="mr-2 inline-block h-2 w-2 rounded-full" style={{ background: LIME, boxShadow: `0 0 12px ${LIME}` }} />
              {a.k}
            </div>
            <div className="mt-1 text-lab-fg">{a.t}</div>
          </div>
        ))}
      </motion.div>

      <div className="relative z-20"><Chrome /></div>
    </section>
  )
}

/* ---------------------------------------------------------------- projects */
const META: Record<number, { big: string; sub: string; hue: string }> = {
  0: { big: "<5ms", sub: "leader redirects · 5-node Raft cluster · zero data loss", hue: LIME },
  4: { big: "0.94", sub: "PR-AUC at 0.17% class imbalance · p99 < 50ms", hue: RED },
  5: { big: "400ms", sub: "end-to-end over 100K+ CVE/CWE/CAPEC records", hue: "var(--lab-blue)" },
  6: { big: "188K", sub: "laps · 172 races · multi-agent PPO", hue: "var(--lab-amber)" },
  1: { big: "C++", sub: "sockets + a hand-rolled thread pool. no frameworks.", hue: LIME },
  2: { big: "DAG", sub: "dependency graphs · cycle detection · vuln checks", hue: "var(--lab-cyan)" },
  3: { big: "STAR", sub: "live scoring of clarity, filler words, and pacing", hue: "var(--lab-amber)" },
  7: { big: "plain", sub: "English explanations of macOS memory pressure", hue: "var(--lab-mint)" },
}
const sorted = [...projects].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

function Card({ p, i }: { p: (typeof sorted)[number]; i: number }) {
  const wrap = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.7])
  const mx = useMotionValue(50)
  const my = useMotionValue(50)
  const m = META[p.id] ?? { big: "→", sub: p.category, hue: RED }
  const spot = useMotionTemplate`radial-gradient(600px circle at ${mx}% ${my}%, ${mix(m.hue, 15)}, transparent 60%)`

  return (
    <div ref={wrap} className="h-[92vh]">
      <motion.article
        style={{ scale, top: `calc(9vh + ${i * 22}px)` }}
        onPointerMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect()
          mx.set(((e.clientX - b.left) / b.width) * 100)
          my.set(((e.clientY - b.top) / b.height) * 100)
        }}
        className="sticky grid h-[78vh] min-h-[460px] origin-top grid-rows-[auto_1fr_auto] overflow-hidden rounded-3xl border border-lab-fg/10 bg-lab-card p-6 sm:p-10"
      >
        <motion.div className="pointer-events-none absolute inset-0" style={{ background: spot }} />
        <motion.div className="pointer-events-none absolute inset-0 bg-lab-ink" style={{ opacity: dim }} />
        <div className="relative flex items-start justify-between text-xs uppercase tracking-[0.25em] text-lab-fg/45" style={MONO}>
          <span>Case {String(i + 1).padStart(2, "0")} / {p.category}</span>
          <span>{p.date}</span>
        </div>

        <div className="relative flex flex-col justify-center">
          <div className="leading-[0.85]" style={{ ...BEBAS, fontSize: "clamp(5rem, 17vw, 15rem)", color: m.hue }}>
            <Scramble text={m.big} />
          </div>
          <div className="mt-3 max-w-xl text-sm uppercase tracking-widest text-lab-fg/60" style={MONO}>{m.sub}</div>
        </div>

        <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <h3 className="text-3xl text-lab-fg sm:text-4xl" style={BEBAS}>{p.title}</h3>
            <p className="mt-2 line-clamp-3 max-w-2xl text-sm text-lab-fg/60">{p.description}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:justify-end">
            {p.tags.slice(0, 4).map((t) => (
              <span key={t} className="rounded-full border border-lab-fg/15 px-3 py-1 text-[11px] text-lab-fg/70" style={MONO}>{t}</span>
            ))}
            {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="rounded-full px-4 py-1.5 text-xs font-medium text-lab-ink" style={{ background: m.hue }}>GitHub ↗</a>}
            {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-1.5 text-xs" style={{ borderColor: m.hue, color: m.hue }}>Live ↗</a>}
          </div>
        </div>
      </motion.article>
    </div>
  )
}

/* ------------------------------------------------------------------- proof */
function Race({ label, value, pct, color, delay }: { label: string; value: string; pct: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  return (
    <div ref={ref}>
      <div className="mb-2 flex justify-between text-xs uppercase tracking-widest text-lab-fg/50" style={MONO}><span>{label}</span><span style={{ color }}>{value}</span></div>
      <div className="h-6 overflow-hidden rounded-full bg-lab-fg/5">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 24px ${mix(color, 53)}` }}
          initial={{ width: "0%" }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: pct === 100 ? 2.4 : 0.6, delay, ease: pct === 100 ? "linear" : EASE }}
        />
      </div>
    </div>
  )
}

function Dots() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  return (
    <div ref={ref} className="flex flex-wrap gap-2">
      {Array.from({ length: 20 }).map((_, i) => {
        const gone = i >= 13 // 35% fewer revisions
        return (
          <motion.span
            key={i}
            className="h-6 w-6 rounded-md"
            style={{ background: gone ? RED : LIME }}
            initial={{ opacity: 1, scale: 1 }}
            animate={inView && gone ? { opacity: 0.08, scale: 0.4 } : {}}
            transition={{ delay: 0.6 + (i - 13) * 0.12, duration: 0.5 }}
          />
        )
      })}
    </div>
  )
}

function Proof() {
  return (
    <section id="proof" className="px-6 py-32 lg:px-12">
      <Head n="02" title="Proof, not adjectives" />
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-lab-fg/10 bg-lab-card p-8">
          <div className="text-xs uppercase tracking-widest text-lab-fg/45" style={MONO}>Winssoft · analytics dashboard load</div>
          <div className="mt-8 space-y-6">
            <Race label="Before · composite index missing" value="8.0s" pct={100} color={RED} delay={0} />
            <Race label="After · indexes + materialized views" value="2.0s" pct={25} color={LIME} delay={0} />
          </div>
          <p className="mt-8 text-sm text-lab-fg/60">{experiences[1].desc}</p>
        </div>
        <div className="rounded-3xl border border-lab-fg/10 bg-lab-card p-8">
          <div className="text-xs uppercase tracking-widest text-lab-fg/45" style={MONO}>J. Miller Custom Cues · design revision cycles</div>
          <div className="mt-8"><Dots /></div>
          <div className="mt-4 text-6xl" style={{ ...BEBAS, color: LIME }}>−35%</div>
          <p className="mt-4 text-sm text-lab-fg/60">{experiences[0].desc}</p>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------------------------------------- education */
const COURSES = ["Operating Systems", "Distributed Systems", "Machine Learning", "Data Structures & Algorithms", "Software Design"]

function Ring({ pct, color, label }: { pct: number; color: string; label: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "-20%" })
  const R = 54
  const C = 2 * Math.PI * R
  return (
    <svg ref={ref} viewBox="0 0 128 128" className="h-32 w-32 -rotate-90">
      <circle cx="64" cy="64" r={R} fill="none" stroke="color-mix(in srgb, var(--lab-fg) 8%, transparent)" strokeWidth="8" />
      <motion.circle
        cx="64" cy="64" r={R} fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={C}
        initial={{ strokeDashoffset: C }}
        animate={inView ? { strokeDashoffset: C * (1 - pct) } : {}}
        transition={{ duration: 1.8, ease: EASE }}
        style={{ filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text x="64" y="64" textAnchor="middle" dominantBaseline="central" className="rotate-90 fill-lab-fg text-[15px]" style={{ ...MONO, transformOrigin: "64px 64px" }}>{label}</text>
    </svg>
  )
}

function Education() {
  // MS runs Jan 2026 – May 2027; progress is computed client-side so it stays current
  const [ms, setMs] = useState(0.5)
  useEffect(() => {
    const a = new Date(2026, 0, 1).getTime()
    const b = new Date(2027, 4, 1).getTime()
    setMs(Math.min(1, Math.max(0, (Date.now() - a) / (b - a))))
  }, [])
  const cards = [
    { e: education[1], pct: 1, label: "DONE", color: LIME, gpa: "3.42", tag: "Earned Dec 2025", extra: "Dean's List · multiple semesters" },
    { e: education[0], pct: ms, label: `${Math.round(ms * 100)}%`, color: RED, gpa: "3.44", tag: "In progress · May 2027", extra: "Graduate coursework underway" },
  ]
  return (
    <section id="education" className="px-6 py-32 lg:px-12">
      <Head n="03" title="Education" />
      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        {cards.map((c, i) => (
          <motion.div
            key={c.e.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: EASE }}
            className="relative overflow-hidden rounded-3xl border border-lab-fg/10 bg-lab-card p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-lab-fg/45" style={MONO}>{c.tag}</div>
                <h3 className="mt-3 max-w-xs text-3xl leading-none text-lab-fg sm:text-4xl" style={BEBAS}>{c.e.degree}</h3>
                <div className="mt-2 text-sm text-lab-fg/55">{c.e.school}</div>
              </div>
              <Ring pct={c.pct} color={c.color} label={c.label} />
            </div>
            <div className="mt-8 flex items-end gap-4">
              <div className="leading-[0.8]" style={{ ...BEBAS, fontSize: "clamp(5rem, 11vw, 9rem)", color: c.color }}><Scramble text={c.gpa} /></div>
              <div className="pb-2 text-xs uppercase tracking-widest text-lab-fg/45" style={MONO}>GPA<br />{c.extra}</div>
            </div>
            {i === 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {COURSES.map((t) => <span key={t} className="rounded-full border border-lab-fg/15 px-3 py-1 text-[11px] text-lab-fg/70" style={MONO}>{t}</span>)}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------- stack */
const wrapN = (min: number, max: number, v: number) => ((((v - min) % (max - min)) + (max - min)) % (max - min)) + min

function Row({ items, dir, outline }: { items: string[]; dir: 1 | -1; outline?: boolean }) {
  const base = useMotionValue(0)
  const { scrollY } = useScroll()
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const vf = useTransform(vel, [0, 1000], [0, 5], { clamp: false })
  const skew = useTransform(vel, [-2000, 2000], [-12, 12])
  const x = useTransform(base, (v) => `${wrapN(-25, 0, v)}%`)
  const d = useRef<1 | -1>(dir)
  useAnimationFrame((_, delta) => {
    let move = dir * 2.2 * (delta / 1000)
    if (vf.get() < 0) d.current = -1
    else if (vf.get() > 0) d.current = 1
    move += d.current * move * Math.abs(vf.get())
    base.set(base.get() + move)
  })
  const line = items.join("  ✦  ") + "  ✦  "
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX: skew, ...BEBAS, ...(outline ? { WebkitTextStroke: `1.5px ${LIME}`, color: "transparent" } : { color: "#fff" }) }} className="flex w-max text-[clamp(4rem,10vw,9rem)] leading-none">
        {[0, 1, 2, 3].map((k) => <span key={k}>{line}</span>)}
      </motion.div>
    </div>
  )
}

function Stack() {
  const a = skills.flatMap((g) => g.skills.map((s) => s.name))
  const b = ["XGBoost", "PyTorch", "PPO", "Qdrant", "MLflow", "gRPC", "Raft", "FastAPI", "Redis", "Docker"]
  return (
    <section id="stack" className="overflow-hidden py-32">
      <div className="px-6 lg:px-12"><Head n="04" title="Stack" /></div>
      <div className="mt-16 space-y-4">
        <Row items={a} dir={-1} />
        <Row items={b} dir={1} outline />
      </div>
      <p className="mt-8 px-6 text-xs uppercase tracking-widest text-lab-fg/35 lg:px-12" style={MONO}>scroll fast. it reacts.</p>
    </section>
  )
}

/* ----------------------------------------------------------------- contact */
function Magnetic({ children, href }: { children: ReactNode; href: string }) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })
  return (
    <motion.a
      href={href}
      data-hover
      style={{ x: sx, y: sy, background: RED, ...BEBAS }}
      onPointerMove={(e) => {
        const b = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - (b.left + b.width / 2)) * 0.35)
        y.set((e.clientY - (b.top + b.height / 2)) * 0.35)
      }}
      onPointerLeave={() => (x.set(0), y.set(0))}
      className="inline-flex h-44 w-44 items-center justify-center rounded-full text-center text-3xl leading-none text-white sm:h-56 sm:w-56 sm:text-4xl"
    >
      {children}
    </motion.a>
  )
}

function Contact() {
  return (
    <section id="contact" className="px-6 pb-16 pt-32 lg:px-12">
      <Head n="05" title="Contact" />
      <div className="mt-16 flex flex-col items-start justify-between gap-12 lg:flex-row lg:items-center">
        <h2 className="max-w-4xl leading-[0.85] text-lab-fg" style={{ ...BEBAS, fontSize: "clamp(3.5rem, 11vw, 10rem)" }}>
          Let&apos;s build something that <span style={{ color: RED }}>doesn&apos;t fall over.</span>
        </h2>
        <Magnetic href={`mailto:${Bio.email}`}>Say<br />hello ↗</Magnetic>
      </div>
      <div className="mt-24 flex flex-wrap gap-x-8 gap-y-2 text-sm text-lab-fg/50" style={MONO}>
        {[["GitHub", Bio.github], ["LinkedIn", Bio.linkedin], ["Resume", Bio.resume]].map(([l, h]) => (
          <a key={l} href={h} target="_blank" rel="noreferrer" className="uppercase tracking-widest transition-colors hover:text-lab-fg">{l} ↗</a>
        ))}
        <span className="ml-auto">© {new Date().getFullYear()} Rishit Bafna</span>
      </div>
    </section>
  )
}

function Head({ n, title }: { n: string; title: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: EASE }} className="flex items-baseline gap-4 border-b border-lab-fg/10 pb-4">
      <span className="text-xs tracking-[0.3em]" style={{ ...MONO, color: LIME }}>{n}</span>
      <h2 className="text-5xl uppercase text-lab-fg sm:text-7xl" style={BEBAS}>{title}</h2>
    </motion.div>
  )
}

/* ----------------------------------------------------------------- sidebar */
function Sidebar() {
  const [active, setActive] = useState("top")
  const [time, setTime] = useState("")
  const pos = useMotionValue(0)
  const fill = useSpring(pos, { stiffness: 140, damping: 26 })

  // one calculation drives both the highlighted item and the line, so they can never disagree
  useEffect(() => {
    const update = () => {
      const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
      const y = window.scrollY + window.innerHeight * 0.4
      const tops = els.map((e) => e.getBoundingClientRect().top + window.scrollY)
      let i = 0
      tops.forEach((t, k) => { if (t <= y) i = k })
      const end = i + 1 < els.length ? tops[i + 1] : tops[i] + els[i].offsetHeight
      const t = Math.min(1, Math.max(0, (y - tops[i]) / Math.max(1, end - tops[i])))
      setActive(SECTIONS[i].id)
      // item i's dot sits at (i + 0.5) / n along the line
      pos.set(Math.min(1, (i + t + 0.5) / els.length))
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [pos])

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { timeZone: "America/Phoenix", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col justify-between border-r border-lab-fg/10 bg-lab-ink/80 p-8 backdrop-blur-xl lg:flex" style={MONO}>
      <div>
        <div className="text-3xl leading-none text-lab-fg" style={BEBAS}>RB<span style={{ color: RED }}>.</span></div>
        <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-lab-fg/40">Software Engineer</div>
      </div>

      <nav className="relative pl-6">
        <div className="absolute bottom-0 left-0 top-0 w-px bg-lab-fg/10" />
        <motion.div className="absolute left-0 top-0 h-full w-px origin-top" style={{ scaleY: fill, background: LIME, boxShadow: `0 0 10px ${LIME}` }} />
        {SECTIONS.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} data-hover className="group flex items-baseline gap-3 py-3 text-xs uppercase tracking-[0.2em] transition-colors" style={{ color: active === s.id ? "#fff" : "color-mix(in srgb, var(--lab-fg) 33%, transparent)" }}>
            <span style={{ color: active === s.id ? LIME : undefined }}>{String(i).padStart(2, "0")}</span>
            <span className="transition-transform group-hover:translate-x-1">{s.label}</span>
            {active === s.id && <motion.span layoutId="dot" className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: LIME }} />}
          </a>
        ))}
      </nav>

      <div className="space-y-1 text-[10px] uppercase tracking-[0.2em] text-lab-fg/40">
        <div>Tempe, AZ · <span className="text-lab-fg/70">{time || "--:--:--"}</span></div>
        <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: LIME }} />Open to opportunities</div>
        <a href={Bio.resume} target="_blank" rel="noreferrer" data-hover className="mt-3 inline-block border-b border-lab-fg/30 pb-0.5 text-lab-fg/80 hover:text-lab-fg">Resume ↗</a>
      </div>
    </aside>
  )
}

/* ------------------------------------------------------------ theme toggle */
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const dark = mounted ? resolvedTheme === "dark" : true
  return (
    <button
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      data-hover
      className="fixed right-5 top-5 z-[60] flex h-11 w-11 items-center justify-center rounded-full border border-lab-fg/20 bg-lab-ink/70 text-lg backdrop-blur-md transition-transform hover:scale-110"
    >
      {dark ? "☀" : "☾"}
    </button>
  )
}

/* -------------------------------------------------------------------- page */
export default function Lab() {
  return (
    <div className="lab relative min-h-screen text-lab-fg" style={{ background: INK }}>
      {/* hide the main site's header on this experimental route */}
      <style>{`header{display:none!important}html{scroll-behavior:smooth}`}</style>
      <Cursor />
      <Sidebar />
      <ThemeToggle />
      {/* grain */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[150] opacity-[0.07] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
      />
      <main className="lg:pl-64">
        <Hero />
        <section id="work" className="px-6 pt-24 lg:px-12">
          <Head n="01" title="Selected work" />
          <div className="mt-12">
            {sorted.map((p, i) => <Card key={p.id} p={p} i={i} />)}
          </div>
        </section>
        <Proof />
        <Education />
        <Stack />
        <Contact />
      </main>
    </div>
  )
}
