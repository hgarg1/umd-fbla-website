import { Variants } from 'framer-motion'

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const staggerChildren: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export const slideIn: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 100, opacity: 0 }
}

export const cardEnter: Variants = {
  initial: { 
    y: 50,
    opacity: 0,
    scale: 0.95
  },
  animate: { 
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
}

export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 }
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  exit: { opacity: 0, y: -20 }
}

export const heroTextReveal: Variants = {
  initial: { y: 100, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
  }
}

export const cardHover: Variants = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
}

// New 3D animations
export const card3DHover: Variants = {
  initial: { 
    y: 50,
    opacity: 0,
    scale: 0.95,
    rotateX: 10
  },
  animate: { 
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    rotateX: -5,
    transition: {
      duration: 0.2
    }
  }
}

export const floatAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const particleEffect: Variants = {
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
}

export const parallaxScroll: Variants = {
  initial: { y: 0 },
  whileInView: { 
    y: -50,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

export const shimmerEffect: Variants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
}

export const gradientFlow: Variants = {
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
} 