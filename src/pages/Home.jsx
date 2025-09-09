import React from "react";
import { FaQuestion } from "react-icons/fa";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
} from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "../contexts/MobileProvider";
import motionVariants from "../utils/motionVariants";

const Home = () => {
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const [aboutSection, setAboutSection] = useState();

  const { isMobile } = useIsMobile();

  // Adjust these values based on your header height and desired offset
  const headerHeight = 900;
  const stickyOffset = isMobile ? 57 : 60;

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel goes out of view (scrolled past), make content sticky
        setIsSticky(!entry.isIntersecting);
      },
      {
        // Trigger when sentinel crosses the sticky position
        rootMargin: `-${headerHeight + stickyOffset}px 0px 0px 0px`,
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [headerHeight, stickyOffset]);

  return (
    <div>
      <section
        id="Home"
        className="sectionToObserve w-full flex items-center justify-center relative bg-amber-600 py-5 pb-16 rounded-2xl"
      >
        <img
          src="/images/hajer home.png"
          alt="hajer home image"
          className="absolute w-[53vw]"
        />
        {/* <motion.img
            src="/images/bone1.png"
            alt="hajer home image"
            className="absolute w-20 -bottom-6 right-[18vw] "
            initial={{ opacity: 0, scale: 0.7, y: 90 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
            }}
          />
          <motion.img
            src="/images/bone2.png"
            alt="hajer home image"
            className="absolute w-20 top-6 left-[18vw] rotate-20"
            initial={{ opacity: 0, scale: 0.7, y: 90 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.6,
            }}
          /> */}
        <img
          src="/images/mhrab.png"
          alt="hero image"
          className="w-[47.5vw] h-auto object-contain"
        />
        <div className="absolute bottom-5 w-full pl-6">
          <h1 className="text-[20vw] leading-[20vw] font-extrabold font-name">
            Hajer AlKanani
          </h1>
          <p className="text-xs font-bold">physcotyherapist && Envernmalist</p>
        </div>
      </section>
      <section
        id="About"
        className="sectionToObserve w-full relative my-2 rounded-2xl overflow-hidden"
      >
        <img
          src="/images/blob1.png"
          alt="about image"
          className="w-full h-auto object-contain rotate-y-180"
        />
        <h2 className=" w-[27vw] h-[9vw] absolute bg-amber-500 rounded-4xl flex items-center justify-center top-[1vw] left-[1vw] text-[5vw] font-bold ">
          About
        </h2>
        <p className="absolute z-10 top-[1vw] p-3 text-[7vw] leading-[8.5vw] ">
          <span className="ml-[35vw] ">lorem khadsjk hkjhasdk jhas </span>
          kjdhkjh kjashdkj haskdj haskj dh hkjsadh kjashd kjahsd aksjdh kjashd
          kjsah kjash ah dkjash dkajsh dkjashdkjashkjashdkjsah hasdkj haskjd
          hkjhjk ashdj hjh askjdh kjashdkjsahdh kjasdh kjh
        </p>
      </section>
      {/* <section className="h-[100]">
        <h2>Services</h2>
        <p>Discover the services we offer to help you succeed.</p>
      </section> */}

      {/* STICKY SECTION */}
      <section id="Services" className="sectionToObserve relative h-400">
        {/* Sentinel - invisible trigger element */}
        <div
          ref={sentinelRef}
          className="absolute top-0 left-0 w-1 h-1 pointer-events-none"
          style={{ top: `${stickyOffset}px` }}
        />

        {/* Sticky Container */}
        <div
          ref={stickyContainerRef}
          className="" // Ensure enough height for scrolling
        >
          {/* About Section */}
          <div
            className={`bg-purple-200 rounded-2xl  transition-all duration-300 mb-2 ${
              isSticky ? "sticky" : "relative"
            }`}
            style={isSticky ? { top: `${stickyOffset}px` } : {}}
          >
            <motion.h1
              className="text-black bg-purple-300 text-lg px-2 py-1 border-b-1 border-b-purple-400 block rounded-xl 
              font-bold font-arniya w-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.6 }}
            >
              Service 1
            </motion.h1>
            <motion.p
              variants={motionVariants}
              initial="smallTextHidden"
              animate="smallTextVisible"
              exit="smallTextExit"
              className="text-black text-[1.2rem] p-4 pt-1"
            >
              I'm a certified Fitness Trainer with a strong academic background
              in Physiotherapy and Rehabilitation, and advanced studies in
              Nutrition & Diet from Warsaw University of Life Sciences. With a
              passion for helping people transform their health, I combine
              movement, recovery, and nutrition to create customized,
              science-backed programs.
            </motion.p>
          </div>

          {/* Education Section */}
          <div
            className={`bg-purple-200 rounded-2xl  transition-all duration-300  mb-2 ${
              isSticky ? "sticky" : "relative"
            }`}
            style={isSticky ? { top: `${stickyOffset + 10}px` } : {}}
          >
            <motion.h1
              className="text-black bg-purple-400 text-lg px-2 py-1 border-b-1 border-b-purple-500 block rounded-xl
              font-bold font-arniya w-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.6 }}
            >
              Service 2
            </motion.h1>
            <motion.p
              variants={motionVariants}
              initial="smallTextHidden"
              animate="smallTextVisible"
              exit="smallTextExit"
              className="text-black text-[1.2rem] p-4 pt-1"
            >
              I'm a certified Fitness Trainer with a strong academic background
              in Physiotherapy and Rehabilitation, and advanced studies in
              Nutrition & Diet from Warsaw University of Life Sciences. With a
              passion for helping people transform their health, I combine
              movement, recovery, and nutrition to create customized,
              science-backed programs.
            </motion.p>
          </div>

          {/* Experience Section */}
          <div
            className={`bg-purple-200 rounded-2xl   transition-all duration-300 ${
              isSticky ? "sticky" : "relative"
            }`}
            style={isSticky ? { top: `${stickyOffset + 0}px` } : {}}
          >
            <motion.h1
              className="text-black bg-purple-500 text-lg px-2 py-1 border-b-1 border-b-purple-600 block rounded-xl
              font-bold font-arniya w-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeInOut", delay: 0.6 }}
            >
              Service 3
            </motion.h1>
            <motion.p
              variants={motionVariants}
              initial="smallTextHidden"
              animate="smallTextVisible"
              exit="smallTextExit"
              className="text-black text-[1.2rem] p-4 pt-1"
            >
              I'm a certified Fitness Trainer with a strong academic background
              in Physiotherapy and Rehabilitation, and advanced studies in
              Nutrition & Diet from Warsaw University of Life Sciences. With a
              passion for helping people transform their health, I combine
              movement, recovery, and nutrition to create customized,
              science-backed programs.
            </motion.p>
          </div>
        </div>
      </section>

      <section id="FAQ" className="sectionToObserve h-[100]">
        <p>Find answers to common questions.</p>
      </section>
      <section id="Contact" className="sectionToObserve h-[100]">
        <p>Get in touch with us for more information.</p>
      </section>
    </div>
  );
};

export default Home;
