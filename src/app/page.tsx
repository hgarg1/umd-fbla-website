'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  fadeIn, 
  staggerChildren, 
  heroTextReveal, 
  cardHover, 
  card3DHover,
  floatAnimation,
  particleEffect,
  parallaxScroll,
  shimmerEffect,
  gradientFlow,
  slideIn
} from '@/utils/animations'

const features = [
  {
    name: 'Leadership Development',
    description: 'Develop essential leadership skills through workshops, seminars, and hands-on experiences.',
    icon: '🌟',
  },
  {
    name: 'Competitive Events',
    description: 'Participate in state and national competitions to showcase your business and leadership abilities.',
    icon: '🏆',
  },
  {
    name: 'Networking',
    description: 'Connect with business professionals, alumni, and fellow students to build lasting relationships.',
    icon: '🤝',
  },
  {
    name: 'Professional Development',
    description: 'Access resources and opportunities to enhance your professional growth and career readiness.',
    icon: '📈',
  },
]

export default function Home() {
  return (
    <motion.div 
      className="bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero section with particle effects */}
      <motion.div 
        className="relative isolate overflow-hidden bg-gradient-to-b from-fbla-blue/20"
        variants={staggerChildren}
      >
        {/* Animated background particles */}
        <motion.div 
          className="absolute inset-0 -z-10"
          variants={staggerChildren}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-fbla-gold/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              variants={particleEffect}
              transition={{ delay: i * 0.1 }}
            />
          ))}
        </motion.div>

        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 -z-10 bg-gradient-to-b from-fbla-blue to-indigo-900"
          variants={gradientFlow}
        />
        
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
          <motion.div 
            className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
            variants={staggerChildren}
          >
            <motion.h1 
              className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl"
              variants={heroTextReveal}
            >
              University of Maryland FBLA
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={fadeIn}
            >
              Join Maryland's premier collegiate business organization. Develop leadership skills, compete in business events,
              and connect with industry professionals.
            </motion.p>
            <motion.div 
              className="mt-10 flex items-center gap-x-6"
              variants={fadeIn}
            >
              <Link
                href="/about"
                className="relative inline-flex items-center justify-center rounded-md bg-fbla-gold px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                <motion.span
                  className="absolute w-0 h-full bg-white left-0 top-0 group-hover:w-full transition-all ease-in-out duration-300 opacity-10"
                />
                <motion.span
                  className="relative z-10"
                  whileHover={{ scale: 1.05 }}
                >
                  Learn more
                </motion.span>
              </Link>
              <Link href="/contact" className="text-sm font-semibold leading-6 text-white group">
                Contact us{' '}
                <motion.span 
                  aria-hidden="true"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Feature section with 3D cards */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32"
        variants={staggerChildren}
      >
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          variants={fadeIn}
        >
          <motion.h2 
            className="text-base font-semibold leading-7 text-fbla-blue"
            variants={heroTextReveal}
          >
            Why Join FBLA?
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={heroTextReveal}
          >
            Everything you need to succeed
          </motion.p>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Join the University of Maryland FBLA chapter to develop your leadership skills,
            network with professionals, and prepare for your future career.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
          variants={staggerChildren}
        >
          <motion.dl 
            className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3"
            variants={staggerChildren}
          >
            {features.map((feature) => (
              <motion.div 
                key={feature.name}
                className="flex flex-col p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={slideIn}
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
                    {feature.icon}
                  </motion.span>
                  <dt className="text-base font-semibold leading-7 text-gray-900">{feature.name}</dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* CTA section with parallax effect */}
      <motion.div 
        className="relative isolate mt-32 px-6 py-32 sm:mt-56 sm:py-40 lg:px-8"
        variants={staggerChildren}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-fbla-blue/10 to-fbla-gold/10"
          variants={gradientFlow}
        />
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={heroTextReveal}
          >
            Ready to start your journey?
          </motion.h2>
          <motion.p 
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Join UMD FBLA today and take the first step towards becoming a future business leader.
          </motion.p>
          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            variants={fadeIn}
          >
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center rounded-md bg-fbla-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <motion.span
                className="absolute w-0 h-full bg-white left-0 top-0 group-hover:w-full transition-all ease-in-out duration-300 opacity-10"
              />
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.05 }}
              >
                Get started
              </motion.span>
            </Link>
            <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900 group">
              Learn more{' '}
              <motion.span 
                aria-hidden="true"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
} 