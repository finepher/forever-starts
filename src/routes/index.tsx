import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import heroImage from "../assets/hero-peony-garden.jpg";
import coupleImage from "../assets/couple-library.jpg";
import oliveGrove from "../assets/gallery-olive-grove.jpg";
import dinnerTable from "../assets/gallery-dinner-table.jpg";
import bouquet from "../assets/gallery-bouquet.jpg";
import villa from "../assets/gallery-villa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Evelyn & Julian — Wedding Invitation" },
      {
        name: "description",
        content:
          "Join us for our wedding celebration on October 24, 2025 in the hills of Tuscany, Italy.",
      },
      { property: "og:title", content: "Evelyn & Julian — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Join us for our wedding celebration on October 24, 2025 in the hills of Tuscany, Italy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------- text splitting helpers (render-safe, no plugin needed) ---------- */

function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {text.split("").map((ch, i) => (
        <span key={i} className="split-char inline-block will-change-transform">
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function SplitWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="split-word inline-block will-change-transform">
            {w}
            {"\u00A0"}
          </span>
        </span>
      ))}
    </span>
  );
}

const GALLERY = [
  { src: oliveGrove, label: "The Olive Grove", caption: "Where we say yes" },
  { src: dinnerTable, label: "Under the Lights", caption: "Dinner at dusk" },
  { src: bouquet, label: "Wildflowers", caption: "Gathered that morning" },
  { src: coupleImage, label: "Us", caption: "Florence, 2022" },
];

const STORY_WORDS =
  "It began with borrowed poetry in a rain-soaked bookstore in Florence. Three years and a thousand sunrises later, we are ready to begin the longest chapter."
    .split(" ");

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });
      const q = gsap.utils.selector(containerRef);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        gsap.set(".loader", { display: "none" });
        setLoaded(true);
        return;
      }

      /* ---------------- preloader ---------------- */
      document.body.style.overflow = "hidden";
      const counter = { v: 0 };
      const intro = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "";
          setLoaded(true);
          ScrollTrigger.refresh();
        },
      });

      intro
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            const el = q(".loader-count")[0];
            if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
        .to(q(".loader-bar"), { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0)
        .to(q(".loader-inner"), { opacity: 0, duration: 0.4 }, "+=0.1")
        .to(q(".loader-panel"), {
          yPercent: -100,
          duration: 1,
          ease: "expo.inOut",
          stagger: 0.08,
        })
        .set(q(".loader"), { display: "none" })
        /* ---------------- hero entrance ---------------- */
        .fromTo(
          q(".hero-image-mask"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.4, ease: "expo.out" },
          "-=0.6"
        )
        .fromTo(
          q(".hero-img"),
          { scale: 1.35 },
          { scale: 1, duration: 1.8, ease: "expo.out" },
          "<"
        )
        .fromTo(
          q("#hero .split-char"),
          { yPercent: 115, rotate: 6 },
          {
            yPercent: 0,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: { each: 0.035, from: "start" },
          },
          "-=1.1"
        )
        .fromTo(
          q(".hero-fade"),
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.1 },
          "-=0.7"
        )
        .fromTo(
          q(".hero-rule"),
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power3.inOut" },
          "-=0.8"
        );

      /* ---------------- hero scroll-out ---------------- */
      gsap.to(q(".hero-inner"), {
        yPercent: -18,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(q(".hero-img"), {
        yPercent: 18,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });

      /* ---------------- velocity marquee ---------------- */
      q(".marquee-track").forEach((track, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        const tween = gsap.to(track, {
          xPercent: dir * 50,
          repeat: -1,
          duration: 22,
          ease: "none",
          modifiers: {
            xPercent: gsap.utils.unitize((x: number) => (parseFloat(x) % 50) - (dir < 0 ? 50 : 0)),
          },
        });
        ScrollTrigger.create({
          trigger: ".marquee",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const v = gsap.utils.clamp(0.4, 6, Math.abs(self.getVelocity() / 260));
            gsap.to(tween, { timeScale: v * (self.direction === 1 ? 1 : -1), overwrite: true });
          },
        });
      });

      /* ---------------- story: word-by-word highlight ---------------- */
      gsap.fromTo(
        q(".story-word"),
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 1,
          scrollTrigger: {
            trigger: "#story",
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      /* ---------------- horizontal pinned gallery (desktop + mobile) ---------------- */
      const track = q(".h-track")[0] as HTMLElement | undefined;
      const gallery = q(".h-gallery")[0] as HTMLElement | undefined;
      if (track && gallery) {
        const scrollLen = () => Math.max(track.scrollWidth - window.innerWidth, 1);
        const hTween = gsap.to(track, {
          x: () => -scrollLen(),
          ease: "none",
          scrollTrigger: {
            trigger: gallery,
            start: "top top",
            end: () => `+=${scrollLen()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });
        q(".h-card").forEach((card) => {
          const img = card.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { scale: 1.25, xPercent: -6 },
            {
              scale: 1,
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: hTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      }

      /* ---------------- generic reveals ---------------- */
      q(".reveal-section").forEach((section) => {
        const words = section.querySelectorAll(".split-word");
        if (words.length) {
          gsap.fromTo(
            words,
            { yPercent: 110 },
            {
              yPercent: 0,
              duration: 1,
              ease: "expo.out",
              stagger: 0.04,
              scrollTrigger: { trigger: section, start: "top 78%" },
            }
          );
        }
        const ups = section.querySelectorAll(".reveal-up");
        if (ups.length) {
          gsap.fromTo(
            ups,
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
              scrollTrigger: { trigger: section, start: "top 78%" },
            }
          );
        }
        const masks = section.querySelectorAll(".mask-reveal");
        masks.forEach((m) => {
          gsap.fromTo(
            m,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.4,
              ease: "expo.out",
              scrollTrigger: { trigger: m, start: "top 85%" },
            }
          );
        });
      });

      /* ---------------- details: pinned counter panels ---------------- */
      q(".detail-panel").forEach((panel, i) => {
        gsap.fromTo(
          panel,
          { yPercent: 12, opacity: 0, rotate: i % 2 ? 1.5 : -1.5 },
          {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: panel, start: "top 85%" },
          }
        );
      });

      /* ---------------- timeline progress line ---------------- */
      const line = q(".timeline-line")[0];
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#schedule",
              start: "top 70%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }
      q(".timeline-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -32 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 85%" },
          }
        );
      });

      /* ---------------- parallax portrait ---------------- */
      q(".parallax-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: img, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });

      /* ---------------- footer names scale ---------------- */
      gsap.fromTo(
        q(".footer-names"),
        { scale: 0.86, opacity: 0.2 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: { trigger: "footer", start: "top 90%", end: "bottom bottom", scrub: true },
        }
      );
    },
    { scope: containerRef }
  );

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName.trim() && rsvpEmail.trim()) {
      setRsvpSubmitted(true);
      gsap.fromTo(
        ".rsvp-thanks",
        { opacity: 0, y: 20, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "expo.out" }
      );
    }
  };

  return (
    <div ref={containerRef} className="relative bg-champagne text-charcoal font-sans">
      {/* Preloader */}
      <div className="loader fixed inset-0 z-100 flex">
        <div className="loader-panel h-full w-1/3 bg-sage" />
        <div className="loader-panel h-full w-1/3 bg-sage" />
        <div className="loader-panel h-full w-1/3 bg-sage" />
        <div className="loader-inner pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-champagne">
          <span className="mb-6 font-serif text-4xl font-light italic">Evelyn & Julian</span>
          <div className="h-px w-40 overflow-hidden bg-champagne/20">
            <div className="loader-bar h-full w-full origin-left scale-x-0 bg-gold" />
          </div>
          <span className="loader-count mt-6 text-[10px] tracking-[0.4em]">000</span>
        </div>
      </div>

      {/* Grain overlay */}
      <div className="grain pointer-events-none fixed inset-0 z-40 opacity-[0.35] mix-blend-multiply" />

      <main>
        {/* Nav */}
        <nav
          className={`fixed top-0 z-50 flex w-full items-center justify-between px-6 py-6 text-white mix-blend-difference transition-opacity duration-700 md:px-10 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="font-serif text-xl italic tracking-widest">E & J</span>
          <div className="hidden gap-8 text-[10px] font-medium uppercase tracking-[0.3em] md:flex">
            <a href="#story" className="transition-opacity hover:opacity-60">Story</a>
            <a href="#gallery" className="transition-opacity hover:opacity-60">Moments</a>
            <a href="#details" className="transition-opacity hover:opacity-60">Details</a>
            <a href="#rsvp" className="transition-opacity hover:opacity-60">RSVP</a>
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em]">24.10.25</span>
        </nav>

        {/* Hero */}
        <section id="hero" className="relative h-screen overflow-hidden">
          <div className="hero-image-mask absolute inset-0">
            <img
              src={heroImage}
              alt="White peony garden at dawn"
              width={1920}
              height={1088}
              className="hero-img h-[115%] w-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/25" />
          </div>

          <div className="hero-inner relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-champagne">
            <span className="hero-fade mb-8 text-[10px] uppercase tracking-[0.5em]">
              Together with their families
            </span>
            <h1 className="font-serif text-[16vw] font-light leading-[0.85] md:text-[11vw]">
              <SplitChars text="Evelyn" />
              <span className="hero-fade block font-serif text-[6vw] italic md:text-[3vw]">and</span>
              <SplitChars text="Julian" />
            </h1>
            <div className="hero-rule my-8 h-px w-40 origin-center bg-champagne/50" />
            <p className="hero-fade text-[10px] uppercase tracking-[0.45em]">
              24 October 2025 &nbsp;·&nbsp; Siena, Tuscany
            </p>
          </div>

          <div className="hero-fade absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[9px] uppercase tracking-[0.4em] text-champagne/70">
            Scroll
          </div>
        </section>

        {/* Marquee */}
        <div className="marquee overflow-hidden border-y border-charcoal/10 bg-champagne py-6">
          <div className="marquee-track flex w-max whitespace-nowrap">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="flex items-center gap-8 px-8 font-serif text-4xl font-light italic text-sage/80 md:text-6xl"
              >
                Evelyn & Julian <span className="text-gold">✦</span> 24.10.2025
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Story — word highlight */}
        <section
          id="story"
          className="reveal-section mx-auto flex min-h-[80vh] max-w-5xl items-center px-6 py-32 md:px-10"
        >
          <div>
            <span className="reveal-up mb-10 block text-[10px] uppercase tracking-[0.4em] text-gold">
              (01) — The Beginning
            </span>
            <p className="font-serif text-3xl font-light leading-[1.35] md:text-5xl">
              {STORY_WORDS.map((w, i) => (
                <span key={i} className="story-word inline-block">
                  {w}&nbsp;
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* Horizontal gallery — vertical scroll drives sideways motion on all screens */}
        <section
          id="gallery"
          className="h-gallery relative h-dvh overflow-hidden bg-charcoal text-champagne touch-pan-y"
        >
          <div className="h-track flex h-full w-max items-center gap-6 px-6 will-change-transform md:gap-12 md:px-[12vw]">
            <div className="h-intro w-[78vw] shrink-0 md:w-[26vw]">
              <span className="mb-6 block text-[10px] uppercase tracking-[0.4em] text-gold">
                (02) — Moments
              </span>
              <h2 className="font-serif text-5xl font-light italic leading-tight md:text-7xl">
                A weekend
                <br />
                in the hills
              </h2>
              <p className="mt-6 max-w-xs text-sm leading-relaxed text-champagne/60">
                Three days of long tables, olive shade and late music — kept for the people we
                love most.
              </p>
            </div>

            {GALLERY.map((item) => (
              <figure key={item.label} className="h-card w-[78vw] shrink-0 md:w-[30vw]">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.label}
                    loading="lazy"
                    width={1200}
                    height={1500}
                    className="h-full w-full scale-110 object-cover"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between border-t border-champagne/20 pt-3">
                  <span className="font-serif text-xl italic">{item.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-champagne/50">
                    {item.caption}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Villa banner */}
        <section className="reveal-section relative overflow-hidden">
          <div className="mask-reveal relative h-[70vh] overflow-hidden">
            <img
              src={villa}
              alt="Tuscan villa at dusk"
              loading="lazy"
              width={1600}
              height={1000}
              className="parallax-img h-[120%] w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/30">
              <h3 className="text-center font-serif text-5xl font-light italic text-champagne md:text-8xl">
                <SplitWords text="Villa di Lorenzo" />
              </h3>
            </div>
          </div>
        </section>

        {/* Details */}
        <section id="details" className="reveal-section bg-sage px-6 py-32 text-champagne md:px-10">
          <div className="mx-auto max-w-6xl">
            <span className="reveal-up mb-4 block text-[10px] uppercase tracking-[0.4em] text-gold">
              (03) — The Details
            </span>
            <h3 className="mb-16 font-serif text-5xl font-light md:text-8xl">
              <SplitWords text="How it unfolds" />
            </h3>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  n: "I",
                  t: "The Ceremony",
                  b: ["Four o'clock", "The Olive Grove Garden", "Formal attire"],
                },
                {
                  n: "II",
                  t: "The Celebration",
                  b: ["Six o'clock", "Dinner beneath the stars", "Dancing until dawn"],
                },
                {
                  n: "III",
                  t: "Getting There",
                  b: ["Florence airport, 1h", "Shuttles from Siena", "Rooms held at the villa"],
                },
              ].map((c) => (
                <div
                  key={c.n}
                  className="detail-panel border border-champagne/15 bg-champagne/5 p-8 backdrop-blur-sm"
                >
                  <span className="font-serif text-5xl font-light italic text-gold">{c.n}</span>
                  <h4 className="mt-6 font-serif text-2xl">{c.t}</h4>
                  <ul className="mt-4 space-y-1 text-sm font-light text-champagne/70">
                    {c.b.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section id="schedule" className="reveal-section px-6 py-32 md:px-10">
          <div className="mx-auto max-w-3xl">
            <span className="reveal-up mb-4 block text-[10px] uppercase tracking-[0.4em] text-gold">
              (04) — The Weekend
            </span>
            <h3 className="mb-20 font-serif text-4xl font-light md:text-6xl">
              <SplitWords text="Three days, slowly" />
            </h3>

            <div className="relative pl-10">
              <div className="timeline-line absolute left-0 top-0 h-full w-px origin-top bg-gold/50" />
              {[
                {
                  d: "Fri · 6 PM",
                  t: "Welcome Aperitivo",
                  s: "Cocktails and small bites by the villa pool.",
                },
                {
                  d: "Sat · 4 PM",
                  t: "The Vows",
                  s: "Rings exchanged in the grove, champagne after.",
                },
                {
                  d: "Sat · 8 PM",
                  t: "Long Table Dinner",
                  s: "One table, candlelight, far too many toasts.",
                },
                {
                  d: "Sun · 11 AM",
                  t: "Farewell Brunch",
                  s: "A slow morning feast before goodbyes.",
                },
              ].map((item) => (
                <div key={item.t} className="timeline-item relative pb-14">
                  <span className="absolute -left-[42px] top-2 h-2 w-2 rounded-full bg-gold" />
                  <span className="font-serif text-lg italic text-gold">{item.d}</span>
                  <h5 className="mt-1 font-serif text-2xl md:text-3xl">{item.t}</h5>
                  <p className="mt-2 text-sm text-charcoal/60">{item.s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portrait split */}
        <section className="reveal-section grid items-center gap-12 px-6 pb-32 md:grid-cols-2 md:px-10">
          <div className="mask-reveal overflow-hidden">
            <img
              src={bouquet}
              alt="Bride holding a wildflower bouquet"
              loading="lazy"
              width={1200}
              height={1500}
              className="parallax-img aspect-[4/5] w-full scale-110 object-cover"
            />
          </div>
          <div className="max-w-md">
            <h4 className="font-serif text-4xl font-light italic md:text-5xl">
              <SplitWords text="Come as you are, stay as long as you can." />
            </h4>
            <p className="reveal-up mt-6 text-charcoal/60">
              No gifts, no speeches you didn't volunteer for. Just bring good shoes for the
              gravel and an appetite for far too much pasta.
            </p>
          </div>
        </section>

        {/* RSVP */}
        <section id="rsvp" className="reveal-section bg-charcoal px-6 py-32 text-champagne md:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="reveal-up mb-4 block text-[10px] uppercase tracking-[0.4em] text-gold">
              (05) — RSVP
            </span>
            <h3 className="mb-6 font-serif text-5xl font-light md:text-7xl">
              <SplitWords text="We hope you'll join us" />
            </h3>
            <p className="reveal-up mb-12 text-sm text-champagne/60">
              Kindly reply by 15 August so we can set your place at the table.
            </p>

            {rsvpSubmitted ? (
              <div className="rsvp-thanks mx-auto max-w-sm border border-gold/30 p-10">
                <p className="font-serif text-3xl font-light italic text-gold">
                  Thank you, {rsvpName.split(" ")[0]}
                </p>
                <p className="mt-3 text-sm text-champagne/60">
                  Your seat is saved. We can't wait to celebrate with you.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="reveal-up mx-auto max-w-sm space-y-6">
                <input
                  type="text"
                  placeholder="Your name"
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  required
                  className="w-full border-b border-champagne/25 bg-transparent px-1 py-3 text-center outline-hidden transition-colors placeholder:text-champagne/35 focus:border-gold"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={rsvpEmail}
                  onChange={(e) => setRsvpEmail(e.target.value)}
                  required
                  className="w-full border-b border-champagne/25 bg-transparent px-1 py-3 text-center outline-hidden transition-colors placeholder:text-champagne/35 focus:border-gold"
                />
                <button
                  type="submit"
                  className="mt-6 w-full border border-gold/60 py-4 text-[10px] font-medium uppercase tracking-[0.3em] text-gold transition-colors duration-300 hover:bg-gold hover:text-charcoal"
                >
                  Confirm Attendance
                </button>
              </form>
            )}
          </div>
        </section>

        <footer className="overflow-hidden bg-charcoal px-6 pb-10 text-center text-champagne">
          <h2 className="footer-names font-serif text-[18vw] font-light italic leading-none text-champagne/90">
            E & J
          </h2>
          <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-champagne/40">
            Evelyn & Julian · October 24, 2025 · Siena, Italy
          </p>
        </footer>
      </main>
    </div>
  );
}
