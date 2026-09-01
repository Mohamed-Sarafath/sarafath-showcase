import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const xTo = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });

    const move = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
      const t = e.target as HTMLElement;
      const hot = !!t.closest("a,button,[data-cursor]");
      gsap.to(ring.current, {
        scale: hot ? 1.9 : 1,
        borderColor: hot ? "var(--primary)" : "var(--border)",
        duration: 0.3,
      });
    };
    window.addEventListener("mousemove", move);
    document.documentElement.style.cursor = "none";
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <div
        ref={ring}
        className="absolute -left-5 -top-5 h-10 w-10 rounded-full border border-border mix-blend-difference"
      />
      <div ref={dot} className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-primary" />
    </div>
  );
}
