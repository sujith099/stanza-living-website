import { Variants, Transition } from "framer-motion";

/**
 * Editorial cubic bezier easing for Roomly
 * Creates responsive, smooth, luxury editorial motion without bounce
 */
export const ROOMLY_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const defaultTransition: Transition = {
  duration: 0.6,
  ease: ROOMLY_EASE,
};

export const snappyTransition: Transition = {
  duration: 0.4,
  ease: ROOMLY_EASE,
};

export const gentleTransition: Transition = {
  duration: 0.8,
  ease: ROOMLY_EASE,
};

/**
 * 1. Word-by-word text entrance variants
 */
export const wordContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delayChildren?: number; staggerChildren?: number } = {}) => ({
    opacity: 1,
    transition: {
      delayChildren: custom.delayChildren ?? 0.05,
      staggerChildren: custom.staggerChildren ?? 0.04,
    },
  }),
};

export const wordItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100%",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: ROOMLY_EASE,
    },
  },
};

/**
 * 2. Fade + upward reveal variants
 */
export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration ?? 0.6,
      delay: custom.delay ?? 0,
      ease: ROOMLY_EASE,
    },
  }),
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { delay?: number; duration?: number } = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration ?? 0.5,
      delay: custom.delay ?? 0,
      ease: ROOMLY_EASE,
    },
  }),
};

/**
 * 3. Image reveal variants (mask curtain / scale reveal)
 */
export const imageCurtainVariants: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
  },
  visible: (custom: { delay?: number } = {}) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 0.85,
      delay: custom.delay ?? 0.1,
      ease: ROOMLY_EASE,
    },
  }),
};

export const imageZoomVariants: Variants = {
  hidden: {
    scale: 1.08,
    opacity: 0.8,
  },
  visible: (custom: { delay?: number } = {}) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: custom.delay ?? 0.1,
      ease: ROOMLY_EASE,
    },
  }),
};

/**
 * 4. Hover image zoom presets (for cards and galleries)
 */
export const cardImageHover = {
  rest: {
    scale: 1,
    transition: {
      duration: 0.5,
      ease: ROOMLY_EASE,
    },
  },
  hover: {
    scale: 1.04,
    transition: {
      duration: 0.6,
      ease: ROOMLY_EASE,
    },
  },
};

/**
 * 5. Button arrow movement
 */
export const arrowHoverVariants: Variants = {
  rest: {
    x: 0,
    transition: {
      duration: 0.3,
      ease: ROOMLY_EASE,
    },
  },
  hover: {
    x: 4,
    transition: {
      duration: 0.3,
      ease: ROOMLY_EASE,
    },
  },
};

export const dotPulseVariants: Variants = {
  rest: {
    scale: 1,
    opacity: 0.6,
  },
  hover: {
    scale: 1.25,
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: ROOMLY_EASE,
    },
  },
};

/**
 * 6. Card lift
 */
export const cardLiftVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 1px 3px 0 rgba(17, 20, 18, 0.03)",
    transition: {
      duration: 0.4,
      ease: ROOMLY_EASE,
    },
  },
  hover: {
    y: -4,
    boxShadow: "0 16px 32px -8px rgba(17, 20, 18, 0.08)",
    transition: {
      duration: 0.4,
      ease: ROOMLY_EASE,
    },
  },
};

/**
 * 7. Page transition
 */
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: ROOMLY_EASE,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: {
      duration: 0.35,
      ease: ROOMLY_EASE,
    },
  },
};

/**
 * 8. Navigation transition (Mobile drawer & overlay)
 */
export const navDrawerVariants: Variants = {
  closed: {
    opacity: 0,
    y: -16,
    transition: {
      duration: 0.3,
      ease: ROOMLY_EASE,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: ROOMLY_EASE,
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const navItemVariants: Variants = {
  closed: {
    opacity: 0,
    y: 12,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: ROOMLY_EASE,
    },
  },
};
