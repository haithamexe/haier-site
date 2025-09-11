import React from "react";
import { IoLogoWhatsapp } from "react-icons/io";
import { useState, useEffect } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
} from "motion/react";
import { useIsMobile } from "../contexts/MobileProvider";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { isMobile } = useIsMobile();

  const { scrollYProgress } = useScroll();

  const [elementInScroll, setElementInScroll] = useState("Home");

  useEffect(() => {
    const TOL = 2;
    const HeaderHeight = 100;

    const topOffset = -HeaderHeight;
    const bottomOffset = -(window.innerHeight - HeaderHeight);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Will fire when the element crosses the top "line"
          if (!entry.isIntersecting) return;

          const lineTop = entry.rootBounds
            ? entry.rootBounds.top
            : HeaderHeight;

          if (entry.boundingClientRect.top <= lineTop + TOL) {
            // With this rootMargin, intersecting ~means the top is at (or very near) 0
            setElementInScroll(entry.target.id);
          }
        });
      },
      {
        root: null,
        // Pull the bottom of the root up by 100% of viewport height,
        // leaving effectively the top edge as the observable boundary.
        rootMargin: `${topOffset}px 0px ${bottomOffset}px 0px`,
        threshold: 0,
      }
    );

    document
      .querySelectorAll(".sectionToObserve")
      .forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!isInitialRender) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 300); // Duration of the animation
      return () => clearTimeout(timer);
    } else {
      setIsInitialRender(false);
    }
  }, [isMenuOpen]);

  return (
    <div className="fixed top-0 left-0 w-full z-100 p-2 bg-back rounded-b-4xl">
      <nav
        className="h-10 bg-secondary text-white flex justify-between items-center p-4 text-[0.6rem] z-50 font-semibold rounded-full 
        md:text-lg md:px-6 md:py-4 relative"
      >
        {isMobile ? (
          <section className="absolute top-0 left-0 w-full h-full">
            {/* <div className="absolute top-[0.2vw] right-3 bg-amber-900 text-white p-2 rounded-2xl w-[25vw] h-[10vw] flex items-center justify-center text-[1rem] font-bold ">
              Close
            </div> */}
            <section className="absolute top-[6px] left-1 flex gap-2 items-center font-bold -z-2">
              {/* <div className="text-black -300 p-1 bg-amber-100 rounded-full text-lg">
                <IoLogoWhatsapp />
              </div> */}
              <motion.div className="text-text p-1 px-2 bg-tertiary rounded-full text-sm">
                {elementInScroll}
              </motion.div>
            </section>
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul className="flex flex-col gap-4 absolute top-10 left-10 w-full text-[7vw] select-none font-bold cursor-pointer">
                    <motion.li
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.05, type: "spring" }}
                      className="hover:text-black"
                    >
                      HOME
                    </motion.li>
                    <motion.li
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring" }}
                    >
                      ABOUT
                    </motion.li>
                    <motion.li
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      SERVICES
                    </motion.li>
                    <motion.li
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      FAQ
                    </motion.li>
                    <motion.li
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      CONTACT
                    </motion.li>
                  </ul>

                  <img
                    src="/images/blob1.png"
                    alt="Header Background"
                    className="w-full h-auto object-contain rounded-lg"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {isMenuOpen && (
              <div className="fixed top-0 left-0 w-full h-full bg-black opacity-70 -z-10"></div>
            )}

            <button
              onClick={(e) => {
                e.preventDefault();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="absolute top-[5px] right-2 bg-tertiary text-text w-21 h-[1.8rem] rounded-full text-[1rem] flex items-center justify-center font-bold overflow-hidden z-90"
            >
              <motion.h1
                initial={{}}
                animate={{
                  opacity: isAnimating ? 0 : 1,
                  // scale: isAnimating ? 1.2 : 1,
                  y:
                    isAnimating && !isMenuOpen
                      ? 20
                      : isAnimating && isMenuOpen
                      ? -20
                      : 0,
                  // rotate: isAnimating ? 180 : 0,

                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    // duration: 1,
                  },
                  rotateX: isAnimating ? 270 : 0,
                }}
                exit={{ opacity: 0 }}
              >
                {isMenuOpen ? "Close" : "Menu ☰"}
              </motion.h1>
            </button>
          </section>
        ) : (
          <div className="flex justify-between gap-4 w-full">
            <ul className="flex gap-2">
              <li>HOME</li>
              <li>ABOUT</li>
              <li>SERVICES</li>
              <li>FAQ</li>
              <li>CONTACT</li>
            </ul>
            <div>
              <IoLogoWhatsapp
                className="text-green-300 text-xl
                  md:text-2xl"
              />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
