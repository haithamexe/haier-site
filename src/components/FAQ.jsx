// import React, { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
// import { motion, AnimatePresence } from "motion/react";

// /**
//  * React + Tailwind + Framer Motion – FAQ
//  * - Accessible: semantic markup, <button>, aria-expanded/controls, region
//  * - Minimal styling (Tailwind), easy to theme with className props
//  * - Smooth height animation with ResizeObserver (works with dynamic content)
//  * - Single or multiple-open modes
//  * - Keyboard-friendly
//  *
//  * Usage: export default component at bottom renders a live demo.
//  */

// // ---- Utilities
// function usePrefersReducedMotion() {
//   const [reduced, setReduced] = useState(false);
//   useEffect(() => {
//     if (typeof window === "undefined" || !window.matchMedia) return;
//     const m = window.matchMedia("(prefers-reduced-motion: reduce)");
//     const onChange = () => setReduced(!!m.matches);
//     onChange();
//     m.addEventListener?.("change", onChange);
//     return () => m.removeEventListener?.("change", onChange);
//   }, []);
//   return reduced;
// }

// function useMeasuredHeight(deps: React.DependencyList = []) {
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [height, setHeight] = useState(0);

//   useLayoutEffect(() => {
//     const el = ref.current;
//     if (!el || typeof ResizeObserver === "undefined") return;
//     const ro = new ResizeObserver(() => setHeight(el.scrollHeight));
//     ro.observe(el);
//     // initialize
//     setHeight(el.scrollHeight);
//     return () => ro.disconnect();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, deps);

//   return [ref, height] as const;
// }

// // ---- Collapsible with animated height
// function Collapsible({
//   open,
//   children,
//   id,
//   reduced,
//   className = "",
// }: {
//   open: boolean;
//   children: React.ReactNode;
//   id?: string;
//   reduced?: boolean;
//   className?: string;
// }) {
//   const [contentRef, height] = useMeasuredHeight([open, children]);

//   return (
//     <AnimatePresence initial={false}>
//       <motion.div
//         role="region"
//         id={id}
//         aria-hidden={!open}
//         initial={false}
//         animate={{ height: open ? height : 0, opacity: open ? 1 : 0 }}
//         exit={{ height: 0, opacity: 0 }}
//         style={{ overflow: "hidden" }}
//         transition={reduced ? { duration: 0 } : { duration: 0.26, ease: [0.22, 0.58, 0.12, 0.98] }}
//         className={className}
//       >
//         <div ref={contentRef} className="pt-2 pb-4 text-sm leading-relaxed text-gray-700">
//           {children}
//         </div>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// // ---- Single FAQ item
// function FAQItem({
//   index,
//   question,
//   answer,
//   open,
//   onToggle,
//   itemClassName = "",
//   buttonClassName = "",
//   contentClassName = "",
// }: {
//   index: number;
//   question: React.ReactNode;
//   answer: React.ReactNode;
//   open: boolean;
//   onToggle: () => void;
//   itemClassName?: string;
//   buttonClassName?: string;
//   contentClassName?: string;
// }) {
//   const uid = useId();
//   const btnId = `${uid}-btn-${index}`;
//   const panelId = `${uid}-panel-${index}`;

//   return (
//     <div className={"border-b last:border-none " + itemClassName} id={`faq-${index}`}>
//       <h3>
//         <button
//           id={btnId}
//           type="button"
//           aria-expanded={open}
//           aria-controls={panelId}
//           onClick={onToggle}
//           className={
//             "flex w-full items-center justify-between gap-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-xl " +
//             (buttonClassName || "")
//           }
//         >
//           <span className="font-medium text-gray-900">{question}</span>
//           {/* Simple plus -> rotates to x when open */}
//           <motion.span
//             initial={false}
//             animate={{ rotate: open ? 45 : 0 }}
//             transition={{ duration: 0.2 }}
//             aria-hidden="true"
//             className="select-none text-xl leading-none"
//           >
//             +
//           </motion.span>
//         </button>
//       </h3>
//       <Collapsible open={open} id={panelId} contentEditable={false as any} reduced={false} className={contentClassName}>
//         {answer}
//       </Collapsible>
//     </div>
//   );
// }

// // ---- Main FAQ component
// export function FAQ({
//   items,
//   allowMultiple = false,
//   defaultOpen = [],
//   className = "",
//   itemClassName = "",
//   buttonClassName = "",
//   contentClassName = "",
//   onToggle,
// }: {
//   items: { q: React.ReactNode; a: React.ReactNode }[];
//   allowMultiple?: boolean;
//   defaultOpen?: number[]; // indices
//   className?: string;
//   itemClassName?: string;
//   buttonClassName?: string;
//   contentClassName?: string;
//   onToggle?: (index: number, isOpen: boolean) => void;
// }) {
//   const reduced = usePrefersReducedMotion();
//   const [openSet, setOpenSet] = useState<Set<number>>(() => new Set(defaultOpen));
//   const toggle = (i: number) => {
//     setOpenSet((prev) => {
//       const next = new Set(prev);
//       const willOpen = !next.has(i);
//       if (allowMultiple) {
//         willOpen ? next.add(i) : next.delete(i);
//       } else {
//         next.clear();
//         if (willOpen) next.add(i);
//       }
//       onToggle?.(i, willOpen);
//       return next;
//     });
//   };

//   // Open from hash (#faq-2)
//   useEffect(() => {
//     const id = decodeURIComponent((typeof window !== "undefined" && window.location.hash || "").replace("#", ""));
//     if (!id) return;
//     const match = /^faq-(\d+)$/.exec(id);
//     if (match) {
//       const idx = Number(match[1]);
//       setOpenSet(new Set([idx]));
//       setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
//     }
//   }, []);

//   return (
//     <div
//       className={
//         "mx-auto w-full max-w-2xl rounded-2xl border bg-white/80 shadow-sm backdrop-blur p-2 sm:p-4 " +
//         className
//       }
//       role="list"
//       aria-label="Frequently Asked Questions"
//     >
//       {items.map((it, i) => (
//         <FAQItem
//           key={i}
//           index={i}
//           question={it.q}
//           answer={<div className="prose prose-sm max-w-none">{it.a}</div>}
//           open={openSet.has(i)}
//           onToggle={() => toggle(i)}
//           itemClassName={itemClassName}
//           buttonClassName={buttonClassName}
//           contentClassName={contentClassName}
//         />)
//       )}
//     </div>
//   );
// }

// // ---- Demo for copy/paste
// export default function FAQDemo() {
//   const items = useMemo(
//     () => [
//       {
//         q: "What is this component?",
//         a: (
//           <>
//             <p>
//               A minimal, accessible FAQ built with <strong>React</strong>,
//               <strong> Tailwind</strong>, and <strong>Framer Motion</strong>.
//               It animates height using a <code>ResizeObserver</code>-powered
//               measurement for smooth transitions, even with dynamic content.
//             </p>
//             <p>
//               You can open via URL hash like <code>#faq-2</code> to deep-link to
//               a specific question.
//             </p>
//           </>
//         ),
//       },
//       {
//         q: "Does it support multiple items open?",
//         a: (
//           <>
//             <p>Yes. Pass <code>allowMultiple</code> to the FAQ component.</p>
//             <pre className="bg-zinc-900 text-zinc-100 rounded-lg p-3 text-xs overflow-auto">{`
// <FAQ items={items} allowMultiple />
// `}</pre>
//           </>
//         ),
//       },
//       {
//         q: "How do I style it?",
//         a: (
//           <>
//             <p>
//               Override <code>className</code> props: <code>className</code>,
//               <code> itemClassName</code>, <code>buttonClassName</code>, and
//               <code> contentClassName</code>. Keep it minimal or theme it fully.
//             </p>
//           </>
//         ),
//       },
//       {
//         q: "Accessibility notes?",
//         a: (
//           <>
//             <ul>
//               <li>Uses semantic headings and buttons.</li>
//               <li>Announces state via <code>aria-expanded</code>.</li>
//               <li>
//                 Respects <code>prefers-reduced-motion</code> (animations disabled
//                 when user prefers reduced motion).
//               </li>
//             </ul>
//           </>
//         ),
//       },
//     ],
//     []
//   );

//   return (
//     <main className="min-h-dvh w-full bg-gradient-to-b from-white to-zinc-50 p-6 sm:p-10">
//       <section className="mx-auto max-w-3xl">
//         <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">FAQ</h1>
//         <p className="text-zinc-600 mb-6">
//           Drop this component into any page. Minimal styles, production-ready,
//           smooth animations.
//         </p>
//         <FAQ items={items} allowMultiple className="" />
//       </section>
//     </main>
//   );
// }

//unuasable ai slop
