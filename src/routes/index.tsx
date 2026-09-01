import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Preloader } from "@/components/Preloader";
import { Cursor } from "@/components/Cursor";
const PORTRAIT_URL = "/images/sarafath-portrait.png";
import {
  certifications,
  education,
  experience,
  memberships,
  postContract,
  preContract,
  skillGroups,
  stats,
} from "@/components/portfolio-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohamed Sarafath — Senior Quantity Surveyor & Estimator" },
      {
        name: "description",
        content:
          "Portfolio of Mohamed Sarafath, RICS-registered Quantity Surveyor and Estimator with 7+ years across KSA, UAE, Qatar and Sri Lanka.",
      },
      { property: "og:title", content: "Mohamed Sarafath — Senior Quantity Surveyor" },
      {
        property: "og:description",
        content: "Pre- and post-contract quantity surveying, BOQ, tendering, variation claims and cost control.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "expertise", label: "Expertise" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Index() {
  const [loading, setLoading] = useState(true);
  const scope = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line span", { yPercent: 120, duration: 1.1, stagger: 0.1 })
        .from(".hero-fade", { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.6")
        .from(".hero-photo", { scale: 1.15, opacity: 0, duration: 1.4, ease: "expo.out" }, 0.1)
        .from(".nav-item", { y: -20, opacity: 0, stagger: 0.06, duration: 0.6 }, 0.2);

      // Parallax layers
      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = parseFloat(el.dataset['speed'] || "0");
        gsap.to(el, {
          yPercent: speed * 100,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Section reveals
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });

      // Split heading reveals
      gsap.utils.toArray<HTMLElement>(".head-reveal").forEach((el) => {
        gsap.from(el, {
          yPercent: 110,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      // Timeline progress line
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        ease: "none",
        scrollTrigger: { trigger: "#experience", start: "top 60%", end: "bottom 80%", scrub: true },
      });

      // Counters
      gsap.utils.toArray<HTMLElement>(".counter").forEach((el) => {
        const end = Number(el.dataset['value']);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      // Marquee
      gsap.to(".marquee-track", {
        xPercent: -50,
        repeat: -1,
        duration: 22,
        ease: "none",
      });

      // Magnetic buttons
      gsap.utils.toArray<HTMLElement>(".magnetic").forEach((el) => {
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.3,
            y: (e.clientY - r.top - r.height / 2) * 0.4,
            duration: 0.5,
          });
        };
        const out = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", out);
      });

      // Progress bar
      gsap.to(".scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
      });
    }, scope);

    return () => ctx.revert();
  }, [loading]);

  return (
    <>
      {loading && <Preloader onDone={() => setLoading(false)} />}
      <Cursor />
      <div ref={scope} className="relative">
        <div className="scroll-progress fixed left-0 top-0 z-50 h-[2px] w-full origin-left scale-x-0 bg-primary" />

        {/* Nav */}
        <header className="fixed inset-x-0 top-0 z-40 border-b border-border/40 bg-background/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
            <a href="#top" className="nav-item font-signature text-2xl text-primary">
              Sarafath
            </a>
            <nav className="hidden items-center gap-7 md:flex">
              {nav.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="nav-item font-display text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-primary"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              className="nav-item magnetic rounded-full border border-primary px-5 py-2 font-display text-xs tracking-[0.2em] text-primary uppercase"
            >
              Hire me
            </a>
          </div>
        </header>

        {/* Hero */}
        <section id="top" className="relative min-h-screen overflow-hidden grid-bg">
          <div
            data-speed="0.25"
            className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]"
          />
          <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-5 pb-16 pt-28 md:grid-cols-2 md:pt-24">
            <div>
              <p className="hero-fade script mb-3 text-2xl text-primary md:text-3xl">
                Precision in every measurement
              </p>
              <h1 className="font-display text-[13vw] font-semibold leading-[0.92] tracking-tight md:text-[5.4vw]">
                <span className="hero-line block overflow-hidden">
                  <span className="block">MOHAMED</span>
                </span>
                <span className="hero-line block overflow-hidden">
                  <span className="block text-gradient">SARAFATH</span>
                </span>
              </h1>
              <p className="hero-fade mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
                Senior Quantity Surveyor & Estimator, BSc (Hons) QS. Over 7 years delivering pre- and
                post-contract commercial control on high-rise, commercial and infrastructure projects
                across KSA, UAE, Qatar and Sri Lanka.
              </p>
              <div className="hero-fade mt-8 flex flex-wrap gap-3">
                <a
                  href="#contact"
                  className="magnetic rounded-full bg-primary px-7 py-3 font-display text-sm font-medium text-primary-foreground"
                >
                  Let's work together
                </a>
                <a
                  href="#experience"
                  className="magnetic rounded-full border border-border px-7 py-3 font-display text-sm text-foreground"
                >
                  View experience
                </a>
              </div>
              <div className="hero-fade mt-10 flex flex-wrap gap-6 font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
                {memberships.map((m) => (
                  <span key={m.body}>
                    {m.body} <span className="text-primary">{m.id}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-border">
                <img
                  src={PORTRAIT_URL}
                  alt="Mohamed Sarafath, Quantity Surveyor, on a construction site at dusk"
                  className="hero-photo h-[420px] w-full object-cover object-top md:h-[620px]"
                  data-speed="-0.06"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <div className="hero-fade panel absolute -bottom-6 left-4 rounded-2xl px-5 py-4 md:left-auto md:right-6">
                <p className="script text-xl text-primary">Riyadh, Saudi Arabia</p>
                <p className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  Transferable Iqama · Immediate join
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee */}
        <div className="overflow-hidden border-y border-border py-5">
          <div className="marquee-track flex w-max gap-10 whitespace-nowrap font-display text-sm tracking-[0.3em] text-muted-foreground uppercase">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="flex gap-10">
                {[
                  "BOQ Preparation",
                  "Tendering",
                  "Cost Control",
                  "Variation Claims",
                  "FIDIC 1999",
                  "NRM2 · SMM7 · POMI",
                  "Value Engineering",
                  "Interim Valuations",
                ].map((t) => (
                  <span key={t} className="flex items-center gap-10">
                    {t} <span className="text-primary">◆</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>

        {/* About + stats */}
        <Section id="about" label="01 / About" title="Commercially minded, detail obsessed">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <div className="reveal space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I am a Quantity Surveyor and Estimator with{" "}
                <span className="text-foreground">7+ years</span> of Gulf and South Asian
                experience, specialising in accurate measurement, tender pricing and post-contract
                commercial control.
              </p>
              <p>
                From take-off in PlanSwift and AutoCAD to negotiating subcontract packages and
                certifying interim payments, my work protects project margin while keeping delivery
                teams moving.
              </p>
              <p className="script text-2xl text-primary">
                "Every quantity tells the truth about a project's cost."
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="reveal panel rounded-2xl p-5">
                  <p className="font-display text-4xl font-semibold text-gradient">
                    <span className="counter" data-value={s.value}>
                      0
                    </span>
                    {s.suffix}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" label="02 / Experience" title="Where I have delivered">
          <div className="relative pl-6 md:pl-10">
            <div className="timeline-line absolute left-0 top-2 h-full w-px bg-primary/60" />
            <div className="space-y-12">
              {experience.map((job) => (
                <article key={job.company} className="reveal relative">
                  <span className="absolute -left-[1.65rem] top-2 h-3 w-3 rounded-full border border-primary bg-background md:-left-[2.65rem]" />
                  <p className="font-display text-xs tracking-[0.3em] text-primary uppercase">
                    {job.period}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold md:text-3xl">{job.role}</h3>
                  <p className="script text-xl text-muted-foreground">
                    {job.company} — {job.location}
                  </p>
                  <ul className="mt-4 space-y-2 text-muted-foreground">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Section>

        {/* Expertise */}
        <Section id="expertise" label="03 / Expertise" title="Pre & post contract command">
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { title: "Pre-Contract", items: preContract },
              { title: "Post-Contract", items: postContract },
            ].map((col) => (
              <div key={col.title} className="reveal panel rounded-3xl p-7">
                <h3 className="script text-3xl text-primary">{col.title}</h3>
                <ul className="mt-5 space-y-3 text-muted-foreground">
                  {col.items.map((i) => (
                    <li key={i} className="border-b border-border/60 pb-3 last:border-0">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" label="04 / Skills" title="Tools, standards & strengths">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g) => (
              <div key={g.title} className="reveal panel rounded-2xl p-6">
                <h3 className="font-display text-xs tracking-[0.3em] text-primary uppercase">
                  {g.title}
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {g.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Education & certifications */}
        <Section id="education" label="05 / Education" title="Qualified and certified">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-5">
              {education.map((e) => (
                <div key={e.title} className="reveal border-l border-border pl-5">
                  <p className="font-display text-xs tracking-[0.25em] text-primary uppercase">{e.year}</p>
                  <h3 className="mt-1 text-lg font-medium">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">{e.org}</p>
                </div>
              ))}
            </div>
            <div className="space-y-5">
              <h3 className="script text-3xl text-primary">Certifications</h3>
              {certifications.map((c) => (
                <div key={c.title} className="reveal panel rounded-2xl p-5">
                  <h4 className="font-medium">{c.title}</h4>
                  <p className="text-sm text-muted-foreground">{c.org}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Contact */}
        <section id="contact" className="relative overflow-hidden border-t border-border py-24 grid-bg">
          <div
            data-speed="0.2"
            className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-primary/15 blur-[130px]"
          />
          <div className="relative mx-auto max-w-7xl px-5 text-center">
            <p className="script text-2xl text-primary">Let's build the numbers together</p>
            <h2 className="mt-3 font-display text-[10vw] font-semibold leading-none tracking-tight md:text-[5vw]">
              GET IN TOUCH
            </h2>
            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="mailto:mhdsarafath99@gmail.com"
                className="magnetic font-display text-lg text-foreground transition-colors hover:text-primary md:text-2xl"
              >
                mhdsarafath99@gmail.com
              </a>
              <a
                href="tel:+966557565892"
                className="magnetic font-display text-lg text-foreground transition-colors hover:text-primary md:text-2xl"
              >
                +966 55 756 5892
              </a>
              <a
                href="https://www.linkedin.com/in/rasleen-mohamed-sarafath-qs"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic rounded-full border border-primary px-7 py-3 font-display text-sm text-primary"
              >
                LinkedIn Profile
              </a>
            </div>
            <p className="mt-14 font-signature text-3xl text-primary">Mohamed Sarafath</p>
            <p className="mt-2 font-display text-xs tracking-[0.3em] text-muted-foreground uppercase">
              Quantity Surveyor · Riyadh, Saudi Arabia
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

function Section({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-5 py-24 md:py-32">
      <div className="mb-12">
        <p className="reveal font-display text-xs tracking-[0.35em] text-primary uppercase">{label}</p>
        <div className="mt-3 overflow-hidden">
          <h2 className="head-reveal font-display text-4xl font-semibold tracking-tight md:text-6xl">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}
