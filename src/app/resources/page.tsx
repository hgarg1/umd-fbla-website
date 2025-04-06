'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  fadeIn, 
  staggerChildren, 
  card3DHover,
  floatAnimation,
  shimmerEffect
} from '@/utils/animations'

const studyMaterials = [
  {
    name: 'Business Concepts',
    description: 'Comprehensive guides covering fundamental business principles and theories.',
    resources: [
      'Business Management Guide',
      'Financial Analysis Handbook',
      'Marketing Strategy Templates'
    ]
  },
  {
    name: 'Competition Preparation',
    description: 'Resources to help you prepare for FBLA competitive events.',
    resources: [
      'Competition Guidelines',
      'Sample Tests & Solutions',
      'Presentation Templates'
    ]
  },
  {
    name: 'Professional Skills',
    description: 'Materials to develop essential business and leadership skills.',
    resources: [
      'Public Speaking Guide',
      'Resume Writing Templates',
      'Interview Preparation Kit'
    ]
  }
]

const professionalResources = [
  {
    name: 'Career Development',
    description: 'Resources to help you plan and advance your career.',
    icon: '📈'
  },
  {
    name: 'Networking',
    description: 'Tools and tips for building professional relationships.',
    icon: '🤝'
  },
  {
    name: 'Industry Insights',
    description: 'Stay updated with the latest business trends and practices.',
    icon: '📊'
  }
]

export default function Resources() {
  return (
    <motion.div 
      className="bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-fbla-blue to-indigo-900">
        <motion.div 
          className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40"
          variants={staggerChildren}
        >
          <motion.div 
            className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
            variants={fadeIn}
          >
            <motion.h1 
              className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
              variants={floatAnimation}
            >
              Resources
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={fadeIn}
            >
              Access comprehensive study materials, competition resources, and professional development tools to help you succeed in FBLA and beyond.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Study Materials Section */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        variants={staggerChildren}
      >
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          variants={fadeIn}
        >
          <h2 className="text-base font-semibold leading-7 text-fbla-gold">Study Materials</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Comprehensive Learning Resources
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Access our curated collection of study materials and resources to help you prepare for competitions and develop your business knowledge.
          </p>
        </motion.div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {studyMaterials.map((category) => (
              <motion.div
                key={category.name}
                className="flex flex-col backdrop-blur-lg bg-white/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                variants={fadeIn}
                whileHover="hover"
                initial="initial"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-fbla-blue/5 to-fbla-gold/5"
                  variants={shimmerEffect}
                />
                <motion.div 
                  className="relative z-10"
                  variants={fadeIn}
                >
                  <dt className="text-base font-semibold leading-7 text-gray-900">{category.name}</dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{category.description}</p>
                    <ul className="mt-4 space-y-2">
                      {category.resources.map((resource) => (
                        <li key={resource} className="flex items-center gap-x-2">
                          <span className="text-fbla-gold">•</span>
                          {resource}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </motion.div>
              </motion.div>
            ))}
          </dl>
        </div>
      </motion.div>

      {/* Professional Development Section */}
      <motion.div 
        className="bg-gray-50 py-24 sm:py-32"
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:text-center"
            variants={fadeIn}
          >
            <h2 className="text-base font-semibold leading-7 text-fbla-gold">Professional Development</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Career Growth Resources
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Tools and resources to help you develop professionally and prepare for your future career.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {professionalResources.map((resource) => (
                <motion.div
                  key={resource.name}
                  className="flex flex-col backdrop-blur-lg bg-white/50 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
                  variants={fadeIn}
                  whileHover="hover"
                  initial="initial"
                >
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-fbla-blue/5 to-fbla-gold/5"
                    variants={shimmerEffect}
                  />
                  <motion.div 
                    className="relative z-10"
                    variants={fadeIn}
                  >
                    <motion.span 
                      className="text-4xl mb-4 block"
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
                      {resource.icon}
                    </motion.span>
                    <dt className="text-base font-semibold leading-7 text-gray-900">{resource.name}</dt>
                    <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{resource.description}</p>
                    </dd>
                  </motion.div>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8"
        variants={staggerChildren}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-fbla-blue/10 to-fbla-gold/10"
          variants={shimmerEffect}
        />
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={fadeIn}
          >
            Need Additional Resources?
          </motion.h2>
          <motion.p 
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Contact our team for personalized guidance and additional resources.
          </motion.p>
          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            variants={fadeIn}
          >
            <Link
              href="/contact"
              className="rounded-md bg-fbla-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
} 