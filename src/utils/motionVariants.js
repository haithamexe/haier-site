const motionVariants = {
  textHidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  textVisible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  textExit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  headingHidden: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  headingVisible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut" },
  },
  headingExit: {
    opacity: 0,
    y: 50,
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  smallTextHidden: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.4, delay: 0.1, ease: "easeInOut" },
  },
  smallTextVisible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.1, ease: "easeInOut" },
  },
  smallTextExit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.4, delay: 0.1, ease: "easeInOut" },
  },

  bigStarVisible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.6,
      stiffness: 100,
    },

    transform: "rotateY(0deg) translateY(0px)",
  },
  bigStarHidden: {
    opacity: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.15,
    },
    transform: "rotateY(360deg) translateY(50px)",
  },

  smallStarVisible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.15,
      delay: 0.5,
    },
    transform: "rotateY(0deg) translateY(0px)",
  },
  smallStarHidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.15,
      delay: 0.2,
    },
    transform: "rotateY(180deg) translateY(5px)",
  },
};

export default motionVariants;
