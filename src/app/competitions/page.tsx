'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, staggerChildren, heroTextReveal, cardHover, slideIn } from '@/utils/animations'

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

export default function Competitions() {
  return (
    <motion.div 
      className="bg-white py-24 sm:py-32"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
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

        <motion.div 
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          variants={staggerChildren}
        >
          {categories.map((category) => (
            <motion.article
              key={category.name}
              className="flex flex-col items-start p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              variants={slideIn}
              whileHover={cardHover.hover}
              initial={cardHover.initial}
            >
              {/* Animated background gradient */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-fbla-blue/5 to-fbla-gold/5"
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%'],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity,
                  repeatType: "reverse" 
                }}
              />
              
              <motion.div 
                className="relative z-10"
                variants={fadeIn}
              >
                <motion.div 
                  className="flex items-center gap-x-4 text-xs"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.span 
                    className="text-4xl"
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {category.icon}
                  </motion.span>
                </motion.div>
                <motion.div className="group relative">
                  <motion.h3 
                    className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-fbla-blue transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <span>
                      <span className="absolute inset-0" />
                      {category.name}
                    </span>
                  </motion.h3>
                  <motion.p 
                    className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {category.description}
                  </motion.p>
                </motion.div>
                <motion.div 
                  className="mt-6"
                  variants={fadeIn}
                >
                  <motion.ul 
                    className="space-y-2"
                    variants={staggerChildren}
                  >
                    {category.events.map((event) => (
                      <motion.li 
                        key={event}
                        className="flex items-center gap-x-2 text-sm text-gray-600"
                        whileHover={{ x: 5 }}
                      >
                        <motion.span 
                          className="text-fbla-gold"
                          animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 1,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        >
                          •
                        </motion.span>
                        {event}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 max-w-2xl lg:mx-0"
          variants={staggerChildren}
        >
          <motion.h3 
            className="text-2xl font-bold tracking-tight text-fbla-blue sm:text-3xl"
            variants={heroTextReveal}
          >
            Competition Resources
          </motion.h3>
          <motion.div 
            className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerChildren}
          >
            {resources.map((resource) => (
              <motion.div
                key={resource.name}
                className="flex flex-col items-start p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                variants={fadeIn}
                whileHover={cardHover.hover}
                initial={cardHover.initial}
              >
                <motion.div 
                  className="relative z-10"
                  variants={fadeIn}
                >
                  <motion.h4 
                    className="text-lg font-semibold leading-6 text-gray-900"
                    whileHover={{ x: 5 }}
                  >
                    {resource.name}
                  </motion.h4>
                  <motion.p 
                    className="mt-2 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {resource.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 flex items-center justify-center gap-x-6"
          variants={fadeIn}
        >
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center rounded-md bg-fbla-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fbla-blue overflow-hidden group"
          >
            <motion.span
              className="absolute w-0 h-full bg-white left-0 top-0 group-hover:w-full transition-all ease-in-out duration-300 opacity-10"
            />
            Register for Competitions
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
          <Link
            href="/resources"
            className="text-sm font-semibold leading-6 text-gray-900 group"
          >
            View Resources
            <motion.span 
              className="ml-2"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
} 