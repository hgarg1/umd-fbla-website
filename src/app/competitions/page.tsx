'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, staggerChildren, heroTextReveal, cardEnter } from '@/utils/animations'
import { 
  UserGroupIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  AcademicCapIcon,
  BookOpenIcon,
  PresentationChartLineIcon
} from '@heroicons/react/24/outline'

interface CompetitionCategory {
  name: string
  description: string
  icon: typeof UserGroupIcon
  events: string[]
}

const competitionCategories: CompetitionCategory[] = [
  {
    name: 'Individual Events',
    description: 'Test your knowledge and skills in various business subjects.',
    icon: UserIcon,
    events: [
      'Business Calculations',
      'Business Law',
      'Economics',
      'Financial Math',
      'Marketing'
    ]
  },
  {
    name: 'Team Events',
    description: 'Collaborate with peers to solve business challenges.',
    icon: UserGroupIcon,
    events: [
      'Business Ethics',
      'Entrepreneurship',
      'Global Business',
      'Management Decision Making',
      'Sports & Entertainment Management'
    ]
  },
  {
    name: 'Chapter Events',
    description: 'Showcase your chapter\'s achievements and community impact.',
    icon: BuildingOfficeIcon,
    events: [
      'American Enterprise Project',
      'Community Service Project',
      'Local Chapter Annual Business Report',
      'Partnership with Business Project'
    ]
  }
]

const resources = [
  {
    name: 'Competition Guidelines',
    description: 'Detailed rules and requirements for all events.',
    icon: BookOpenIcon
  },
  {
    name: 'Study Materials',
    description: 'Comprehensive resources to help you prepare.',
    icon: AcademicCapIcon
  },
  {
    name: 'Past Winners',
    description: 'Learn from previous competition presentations.',
    icon: PresentationChartLineIcon
  }
]

export default function Competitions() {
  return (
    <motion.div 
      className="bg-white"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-fbla-blue/20">
        <motion.div 
          className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40"
          variants={staggerChildren}
        >
          <motion.div 
            className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
            variants={fadeIn}
          >
            <motion.h1 
              className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"
              variants={heroTextReveal}
            >
              Competitions
            </motion.h1>
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

      {/* Competition Categories Section */}
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
            Competition Categories
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={heroTextReveal}
          >
            Choose Your Challenge
          </motion.p>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Select from a variety of competition categories that match your interests and skills.
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
            {competitionCategories.map((category) => (
              <motion.div 
                key={category.name}
                className="flex flex-col p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={cardEnter}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <motion.div 
                  className="relative h-12 w-12 mx-auto mb-6"
                  variants={fadeIn}
                >
                  <category.icon className="h-12 w-12 text-fbla-blue" />
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={fadeIn}
                >
                  <motion.h3 
                    className="text-lg font-semibold leading-7 text-gray-900"
                    variants={heroTextReveal}
                  >
                    {category.name}
                  </motion.h3>
                  <motion.p 
                    className="mt-4 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {category.description}
                  </motion.p>
                  <motion.ul 
                    className="mt-6 space-y-2 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {category.events.map((event) => (
                      <motion.li 
                        key={event}
                        variants={fadeIn}
                      >
                        {event}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* Resources Section */}
      <motion.div 
        className="bg-gray-50 py-24 sm:py-32"
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:text-center"
            variants={fadeIn}
          >
            <motion.h2 
              className="text-base font-semibold leading-7 text-fbla-blue"
              variants={heroTextReveal}
            >
              Resources
            </motion.h2>
            <motion.p 
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              variants={heroTextReveal}
            >
              Competition Resources
            </motion.p>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600"
              variants={fadeIn}
            >
              Access all the resources you need to prepare for competitions.
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
              {resources.map((resource) => (
                <motion.div 
                  key={resource.name}
                  className="flex flex-col p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={cardEnter}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div 
                    className="relative h-12 w-12 mx-auto mb-6"
                    variants={fadeIn}
                  >
                    <resource.icon className="h-12 w-12 text-fbla-blue" />
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    variants={fadeIn}
                  >
                    <motion.h3 
                      className="text-lg font-semibold leading-7 text-gray-900"
                      variants={heroTextReveal}
                    >
                      {resource.name}
                    </motion.h3>
                    <motion.p 
                      className="mt-4 text-sm leading-6 text-gray-600"
                      variants={fadeIn}
                    >
                      {resource.description}
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
} 