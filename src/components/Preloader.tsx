import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const obj = { v: 0 };
    const tl = gsap.timeline();
    tl.from(".pl-word", { yPercent: 120, opacity: 0, stagger: 0.12, duration: 0.8, ease: "power4.out" })
      .to(obj, {
        v: 100,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => setCount(Math.round(obj.v)),
      }, 0.2)
      .to(bar.current, { scaleX: 1, duration: 2, ease: "power2.inOut" }, 0.2)
      .to(".pl-word, .pl-meta", { yPercent: -110, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.in" })
      .to(root.current, {
        yPercent: -100,
        duration: 1,
        ease: "expo.inOut",
        onComplete: onDone,
      }, "-=0.2");
    return () => { tl.kill(); };
  }, [onDone]);

  return (
    <div
      ref={root}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background grid-bg"
    >
      <div className="overflow-hidden">
        <p className="pl-word script text-3xl text-primary md:text-4xl">Measuring every detail</p>
      </div>
      <div className="overflow-hidden">
        <h1 className="pl-word font-display text-4xl font-semibold tracking-tight md:text-6xl">
          MOHAMED SARAFATH
        </h1>
      </div>
      <div className="pl-meta flex w-64 flex-col gap-3 md:w-96">
        <div className="h-px w-full bg-border">
          <div ref={bar} className="h-px w-full origin-left scale-x-0 bg-primary" />
        </div>
        <div className="flex justify-between font-display text-xs tracking-[0.3em] text-muted-foreground">
          <span>QUANTITY SURVEYOR</span>
          <span>{count}%</span>
        </div>
      </div>
    </div>
  );
}
