import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import heroImage from "../assets/hero-peony-garden.jpg";
import coupleImage from "../assets/couple-library.jpg";

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

function Index() {
  const containerRef = useRef<HTMLElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const [rsvpName, setRsvpName] = useState("");
  const [rsvpEmail, setRsvpEmail] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const heroElements = heroTextRef.current?.querySelectorAll(".hero-reveal");
      if (heroElements && heroElements.length > 0) {
        gsap.fromTo(
          heroElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.3,
          }
        );
      }

      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: 1.1, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
        );
      }

      if (scrollLineRef.current) {
        gsap.fromTo(
          scrollLineRef.current,
          { scaleY: 0 },
          { scaleY: 1, duration: 1, ease: "power2.out", delay: 1.2 }
        );
      }

      const revealSections = containerRef.current?.querySelectorAll(".reveal-section");
      revealSections?.forEach((section) => {
        const targets = section.querySelectorAll(".reveal-up");
        gsap.fromTo(
          targets,
          { opacity: 0, y: 48 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const timelineItems = containerRef.current?.querySelectorAll(".timeline-item");
      timelineItems?.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      if (heroImageRef.current && heroSectionRef.current) {
        gsap.to(heroImageRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpName.trim() && rsvpEmail.trim()) {
      setRsvpSubmitted(true);
    }
  };

  return (
    <main ref={containerRef} className="bg-champagne text-charcoal font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-6 mix-blend-difference text-white">
        <span className="font-serif text-xl font-normal uppercase tracking-widest italic">
          E & J
        </span>
        <div className="hidden gap-8 text-[10px] font-medium uppercase tracking-[0.3em] md:flex">
          <a href="#story" className="transition-colors duration-300 hover:text-gold">
            Story
          </a>
          <a href="#details" className="transition-colors duration-300 hover:text-gold">
            Details
          </a>
          <a href="#rsvp" className="transition-colors duration-300 hover:text-gold">
            RSVP
          </a>
        </div>
        <div className="md:hidden text-[10px] font-medium uppercase tracking-widest">
          Menu
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-4 text-center"
      >
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            ref={heroImageRef}
            src={heroImage}
            alt="White peony garden at dawn"
            width={1920}
            height={1088}
            className="h-full w-full object-cover"
          />
        </div>

        <div ref={heroTextRef} className="relative z-10 flex flex-col items-center">
          <span className="hero-reveal mb-8 text-xs font-normal uppercase tracking-[0.4em] text-sage">
            Save the Date
          </span>
          <h1 className="hero-reveal font-serif text-6xl font-light leading-none md:text-9xl">
            Evelyn <br />
            <span className="px-4 font-light italic md:px-12">&</span> <br />
            Julian
          </h1>
          <p className="hero-reveal mt-4 font-serif text-xl font-light italic text-sage/80 md:text-2xl">
            October 24, 2025 • Tuscany, Italy
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div
            ref={scrollLineRef}
            className="h-12 w-px origin-top bg-sage/30"
          ></div>
        </div>
      </section>

      {/* Intro Section */}
      <section id="story" className="reveal-section max-w-5xl px-8 py-32 text-center">
        <div className="mx-auto mb-20">
          <h2 className="reveal-up mb-12 font-serif text-4xl font-light italic text-sage md:text-5xl">
            The beginning of forever
          </h2>
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div className="reveal-up">
              <img
                src={coupleImage}
                alt="Evelyn and Julian laughing together in a vintage library"
                width={800}
                height={1008}
                loading="lazy"
                className="aspect-[4/5] w-full rounded-sm object-cover"
              />
            </div>
            <div className="space-y-6 text-left">
              <p className="reveal-up text-lg leading-relaxed text-charcoal/70">
                It started with a shared love for vintage poetry and a chance meeting at a
                rain-soaked bookstore in Florence. Three years and a thousand sunrises later,
                we're ready to start our greatest chapter yet.
              </p>
              <p className="reveal-up text-lg leading-relaxed text-charcoal/70">
                We invite you to join us in the heart of the Tuscan hills as we exchange vows
                under the olive trees, surrounded by the people who mean the most to us.
              </p>
              <div className="reveal-up pt-8">
                <span className="border-b border-gold/40 pb-2 font-serif text-2xl font-light italic text-sage">
                  E & J
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section id="details" className="reveal-section bg-sage px-8 py-32 text-champagne">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-12 md:flex-row">
            <div className="md:w-1/3">
              <h3 className="reveal-up mb-6 font-serif text-5xl font-light italic">
                The Details
              </h3>
              <p className="reveal-up text-[10px] uppercase tracking-widest text-champagne/60">
                Villa di Lorenzo, Siena
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-12 md:grid-cols-2">
              <div className="reveal-up border-l border-champagne/20 pl-8">
                <h4 className="mb-4 font-serif text-2xl font-normal text-gold">
                  The Ceremony
                </h4>
                <p className="font-light text-champagne/80">
                  Four o'clock in the afternoon
                  <br />
                  The Olive Grove Garden
                  <br />
                  Formal Attire requested
                </p>
              </div>
              <div className="reveal-up border-l border-champagne/20 pl-8">
                <h4 className="mb-4 font-serif text-2xl font-normal text-gold">
                  The Celebration
                </h4>
                <p className="font-light text-champagne/80">
                  Six o'clock in the evening
                  <br />
                  Reception & Dinner under the stars
                  <br />
                  Dancing until dawn
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="reveal-section bg-white/50 px-8 py-32">
        <div className="mx-auto max-w-xl">
          <h3 className="reveal-up mb-16 text-center font-serif text-4xl font-light">
            The Weekend Schedule
          </h3>
          <div className="space-y-12">
            <div className="timeline-item flex items-start gap-8">
              <div className="w-24 shrink-0 text-right font-serif text-xl font-light italic text-gold">
                Fri 6 PM
              </div>
              <div className="flex-1 border-b border-stone-100 pb-8">
                <h5 className="mb-2 font-medium">Welcome Aperitivo</h5>
                <p className="text-sm text-stone-500">
                  Join us for cocktails and small bites at the main villa pool.
                </p>
              </div>
            </div>
            <div className="timeline-item flex items-start gap-8">
              <div className="w-24 shrink-0 text-right font-serif text-xl font-light italic text-gold">
                Sat 4 PM
              </div>
              <div className="flex-1 border-b border-stone-100 pb-8">
                <h5 className="mb-2 font-medium">The Vows</h5>
                <p className="text-sm text-stone-500">
                  Exchange of rings in the garden followed by champagne toasts.
                </p>
              </div>
            </div>
            <div className="timeline-item flex items-start gap-8">
              <div className="w-24 shrink-0 text-right font-serif text-xl font-light italic text-gold">
                Sun 11 AM
              </div>
              <div className="flex-1 pb-8">
                <h5 className="mb-2 font-medium">Farewell Brunch</h5>
                <p className="text-sm text-stone-500">
                  A casual morning feast before we all head our separate ways.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RSVP CTA */}
      <section id="rsvp" className="reveal-section px-8 py-32">
        <div className="mx-auto max-w-4xl rounded-sm bg-stone-100 p-12 text-center md:p-24">
          <h3 className="reveal-up mb-8 font-serif text-5xl font-light">
            We hope you'll join us.
          </h3>
          <p className="reveal-up mx-auto mb-12 max-w-md text-charcoal/60">
            Kindly RSVP by August 15th to help us prepare for our celebration.
          </p>

          {rsvpSubmitted ? (
            <div className="reveal-up mx-auto max-w-sm space-y-4">
              <div className="rounded-sm border border-sage/20 bg-sage/5 p-6 text-sage">
                <p className="font-serif text-xl font-light italic">
                  Thank you, {rsvpName.split(" ")[0]}
                </p>
                <p className="mt-2 text-sm text-charcoal/60">
                  We can't wait to celebrate with you.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleRsvpSubmit}
              className="reveal-up mx-auto max-w-sm space-y-6"
            >
              <input
                type="text"
                placeholder="Your Name"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                required
                className="w-full border-b border-stone-300 bg-transparent px-1 py-3 text-center outline-hidden transition-colors placeholder:text-charcoal/30 focus:border-gold"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={rsvpEmail}
                onChange={(e) => setRsvpEmail(e.target.value)}
                required
                className="w-full border-b border-stone-300 bg-transparent px-1 py-3 text-center outline-hidden transition-colors placeholder:text-charcoal/30 focus:border-gold"
              />
              <button
                type="submit"
                className="mt-8 w-full bg-sage py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-charcoal"
              >
                Confirm Attendance
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] uppercase tracking-widest text-stone-400">
        Evelyn & Julian • October 24, 2025 • Siena, Italy
      </footer>
    </main>
  );
}
