import { Variants } from 'framer-motion'

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
} as const

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
} as const

export const slideIn = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
} as const

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
} as const

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: -20 }
} as const

export const heroTextReveal = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  }
} as const

export const cardHover = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
} as const

// New 3D animations
export const card3DHover = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2
    }
  }
} as const

export const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
} as const

export const particleEffect = {
  initial: { 
    scale: 0,
    opacity: 0
  },
  animate: { 
    scale: [0, 1, 0],
    opacity: [0, 1, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 0.5
    }
  }
} as const

export const parallaxScroll = {
  initial: { y: 0 },
  whileInView: { 
    y: -50,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
} as const

export const shimmerEffect = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
} as const

export const gradientFlow = {
  initial: { 
    backgroundPosition: '0% 0%',
    backgroundSize: '200% 200%'
  },
  animate: { 
    backgroundPosition: ['0% 0%', '100% 100%'],
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
} as const 