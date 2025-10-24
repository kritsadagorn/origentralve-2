"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP as any);

type Slide = {
	title: string;
	subtitle?: string;
	image: string;
};

// Simple, tasteful GSAP-powered slideshow for Programs
export default function ProgramsHighlight() {
	const container = useRef<HTMLDivElement | null>(null);
	const [index, setIndex] = useState(0);
	const [paused, setPaused] = useState(false);
	const autoTimer = useRef<ReturnType<typeof setInterval> | null>(null);

	const slides: Slide[] = useMemo(
		() => [
			{ title: "Esports Bootcamp", subtitle: "Intensive 3-day program", image: "/images/placeholder600x400.svg" },
			{ title: "Team Building", subtitle: "For companies and groups", image: "/images/placeholder600x400.svg" },
			{ title: "Coaching Clinic", subtitle: "Pro-led skill sessions", image: "/images/placeholder600x400.svg" },
			{ title: "Youth Program", subtitle: "Fun + fundamentals", image: "/images/placeholder600x400.svg" },
			{ title: "Elite Training", subtitle: "Peak performance", image: "/images/placeholder600x400.svg" },
		],
		[]
	);

	// Animate on mount: subtle entrance
	useGSAP(
		() => {
			gsap.from("[data-ph-title]", { y: 18, opacity: 0, duration: 0.6, ease: "power2.out" });
			gsap.from("[data-ph-lead]", { y: 18, opacity: 0, duration: 0.6, delay: 0.1, ease: "power2.out" });
		},
		{ scope: container }
	);

	// Core slide transition
	useGSAP(
		() => {
			const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
			const slidesEls = gsap.utils.toArray<HTMLDivElement>("[data-slide]");
			const current = slidesEls[index];
			const prevIndex = (index - 1 + slidesEls.length) % slidesEls.length;
			const prev = slidesEls[prevIndex];

			// Initialize all slides
			gsap.set(slidesEls, { opacity: 0, xPercent: 0, scale: 1, zIndex: 1 });
			if (current) gsap.set(current, { opacity: 1, zIndex: 3, scale: 1 });

			if (prev && current && !reduceMotion) {
				const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 0.6 } });
				gsap.set(current, { xPercent: 12, opacity: 0, scale: 1.02, zIndex: 3 });
				gsap.set(prev, { xPercent: 0, opacity: 1, zIndex: 2, scale: 1 });

				tl.to(prev, { xPercent: -10, opacity: 0, scale: 0.98, duration: 0.5 }, 0)
					.to(current, { xPercent: 0, opacity: 1, scale: 1 }, 0.05);
			}
		},
		{ dependencies: [index], scope: container }
	);

	// Autoplay with pause on hover/focus
	useEffect(() => {
		if (paused) {
			if (autoTimer.current) {
				clearInterval(autoTimer.current);
				autoTimer.current = null;
			}
			return;
		}
		autoTimer.current = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
		return () => {
			if (autoTimer.current) clearInterval(autoTimer.current);
			autoTimer.current = null;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paused, slides.length]);

	const next = () => setIndex((i) => (i + 1) % slides.length);
	const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

	return (
		<section
			ref={container}
			className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
			role="region"
			aria-roledescription="carousel"
			aria-label="Programs highlight slideshow"
		>
			{/* soft background accents */}
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[#7B1FA2]/10 blur-3xl" />
				<div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#C2185B]/10 blur-3xl" />
			</div>

			<header className="mb-8 text-center">
				<p data-ph-lead className="text-sm font-medium text-pink-600">Programs</p>
				<h2 data-ph-title className="mt-2 text-2xl font-semibold sm:text-3xl text-gray-900">Explore Our Programs</h2>
			</header>

			<div
				className="relative"
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}
				onFocusCapture={() => setPaused(true)}
				onBlurCapture={() => setPaused(false)}
				tabIndex={0}
				onKeyDown={(e) => {
					if (e.key === "ArrowLeft") {
						e.preventDefault();
						prev();
					} else if (e.key === "ArrowRight") {
						e.preventDefault();
						next();
					}
				}}
			>
				{/* Frame */}
				<div className="relative overflow-hidden rounded-3xl bg-white ring-1 ring-black/5 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
					{/* Progress bar */}
					<ProgressBar key={index} />

					{/* Slides */}
					<div className="relative aspect-[16/9] w-full">
						{slides.map((s, i) => (
							<SlideItem key={i} data={s} active={i === index} />
						))}
					</div>

					{/* Controls */}
					<div className="pointer-events-none absolute inset-0 flex items-center justify-between p-3">
						<button
							aria-label="Previous program"
							onClick={prev}
							className="pointer-events-auto rounded-full bg-white/80 backdrop-blur p-2 shadow hover:shadow-md transition"
						>
							<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							aria-label="Next program"
							onClick={next}
							className="pointer-events-auto rounded-full bg-white/80 backdrop-blur p-2 shadow hover:shadow-md transition"
						>
							<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>

				{/* Dots */}
				<div className="mt-5 flex items-center justify-center gap-2">
					{slides.map((_, i) => (
						<button
							key={i}
							aria-label={`Go to slide ${i + 1}`}
							onClick={() => setIndex(i)}
							className={
								"h-2.5 rounded-full transition-all " +
								(i === index ? "w-6 bg-pink-600" : "w-2.5 bg-gray-300 hover:bg-gray-400")
							}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

function SlideItem({ data, active }: { data: Slide; active: boolean }) {
	const ref = useRef<HTMLDivElement | null>(null);

	// Per-slide subtle ken-burns on active
	useGSAP(
		() => {
			const image = ref.current?.querySelector<HTMLDivElement>("[data-img]");
			if (!image) return;
			const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
			gsap.killTweensOf(image);
			if (active && !reduceMotion) {
				gsap.fromTo(image, { scale: 1.02 }, { scale: 1.06, duration: 6, ease: "sine.inOut" });
			} else {
				gsap.to(image, { scale: 1, duration: 0.3, ease: "power2.out" });
			}
		},
		{ dependencies: [active] }
	);

	return (
		<div
			ref={ref}
			data-slide
			aria-hidden={!active}
			className="absolute inset-0"
			style={{ pointerEvents: active ? "auto" : "none" }}
		>
			<div className="absolute inset-0">
				<div data-img className="absolute inset-0 will-change-transform">
					<Image
						src={data.image}
						alt={data.title}
						fill
						sizes="(max-width: 1024px) 100vw, 960px"
						className="object-cover"
						priority={active}
					/>
				</div>
				{/* gradient overlay for text legibility */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
			</div>

			{/* caption */}
			<div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
				<div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
					<span className="h-2 w-2 rounded-full bg-pink-500" />
					<span className="text-xs font-medium tracking-wide">Featured Program</span>
				</div>
				<h3 className="mt-3 text-xl sm:text-2xl font-semibold leading-tight drop-shadow-md">{data.title}</h3>
				{data.subtitle && <p className="text-sm/6 opacity-90">{data.subtitle}</p>}
			</div>
		</div>
	);
}

function ProgressBar() {
	const ref = useRef<HTMLDivElement | null>(null);
	useGSAP(() => {
		const el = ref.current;
		if (!el) return;
		const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
		gsap.fromTo(
			el,
			{ scaleX: 0 },
			{ scaleX: 1, transformOrigin: "left", duration: reduceMotion ? 0 : 4.4, ease: "none" }
		);
	});
	return <div className="absolute left-0 right-0 top-0 h-1 bg-white/40"><div ref={ref} className="h-full bg-pink-600" /></div>;
}
