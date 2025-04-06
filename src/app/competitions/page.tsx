'use client'

import Link from 'next/link'
import { motion, Variants } from 'framer-motion'
import { 
  fadeIn, 
  staggerChildren, 
  heroTextReveal,
  cardHover,
  slideIn,
  card3DHover,
  floatAnimation,
  shimmerEffect
} from '@/utils/animations'

const categories = [
  {
    name: 'Individual Events',
    description: 'Test your skills in various business disciplines through individual competitions.',
    events: [
      'Business Communication',
      'Financial Analysis',
      'Marketing Concepts',
      'Business Law',
      'Computer Applications',
    ],
    icon: '🎯',
  },
  {
    name: 'Team Events',
    description: 'Collaborate with fellow members in team-based business challenges.',
    events: [
      'Business Plan',
      'Marketing Presentation',
      'Financial Services',
      'Management Decision Making',
      'Global Business',
    ],
    icon: '🤝',
  },
  {
    name: 'Chapter Events',
    description: 'Showcase your chapter\'s achievements and community involvement.',
    events: [
      'Community Service',
      'Local Chapter Annual Business Report',
      'Partnership with Business',
      'American Enterprise Project',
      'Social Media Campaign',
    ],
    icon: '🏆',
  },
]

const resources = [
  {
    name: 'Competition Guidelines',
    description: 'Detailed rules and requirements for each competition category.',
  },
  {
    name: 'Study Materials',
    description: 'Comprehensive study guides and practice materials.',
  },
  {
    name: 'Previous Winners',
    description: 'Examples of winning presentations and projects.',
  },
  {
    name: 'Tips & Strategies',
    description: 'Expert advice from past competition winners.',
  },
]

const competitionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
}

export default function Competitions() {
  return (
    <motion.div 
      className="bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={staggerChildren}
    >
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-fbla-blue to-indigo-900">
        <motion.div 
          className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40"
          variants={fadeIn}
        >
          <motion.div 
            className="mx-auto max-w-2xl lg:mx-0"
            variants={staggerChildren}
          >
            <motion.h2 
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              variants={heroTextReveal}
            >
              Competition Categories
            </motion.h2>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600"
              variants={fadeIn}
            >
              Participate in various business competitions to showcase your skills and knowledge.
              Choose from individual, team, or chapter events to find the perfect challenge.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Categories Section */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        variants={staggerChildren}
      >
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          variants={fadeIn}
        >
          {/* ... categories content ... */}
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:mx-0 lg:max-w-none"
          variants={staggerChildren}
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              className="flex flex-col items-center"
              variants={fadeIn}
              whileHover="hover"
              initial="initial"
            >
              {/* ... category content ... */}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Resources Section */}
      <motion.div 
        className="bg-gray-50 py-24 sm:py-32"
        variants={staggerChildren}
      >
        {/* ... resources content ... */}
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32"
        variants={staggerChildren}
      >
        {/* ... CTA content ... */}
      </motion.div>
    </motion.div>
  )
} 