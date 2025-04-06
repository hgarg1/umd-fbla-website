'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeIn, staggerChildren, heroTextReveal, cardHover, slideIn } from '@/utils/animations'

const events = [
  {
    name: 'Spring Leadership Conference',
    description: 'Join us for our annual leadership conference featuring workshops, networking opportunities, and guest speakers.',
    date: 'March 15, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Van Munching Hall',
    attendees: '150+',
  },
  {
    name: 'Business Networking Night',
    description: 'Connect with industry professionals and alumni in a casual networking environment.',
    date: 'April 5, 2024',
    time: '6:00 PM - 9:00 PM',
    location: 'Stamp Student Union',
    attendees: '100+',
  },
  {
    name: 'State Competition Prep Workshop',
    description: 'Get ready for state competitions with this comprehensive preparation workshop.',
    date: 'April 20, 2024',
    time: '10:00 AM - 3:00 PM',
    location: 'Tydings Hall',
    attendees: '50+',
  },
]

export default function Events() {
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
            Upcoming Events
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Join us for exciting events that will help you develop your leadership skills, network with professionals,
            and prepare for competitions.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          variants={staggerChildren}
        >
          {events.map((event) => (
            <motion.article
              key={event.name}
              className="flex flex-col items-start p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              variants={slideIn}
              whileHover="hover"
              initial="initial"
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
                  <motion.time 
                    className="text-gray-500"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {event.date}
                  </motion.time>
                  <motion.span 
                    className="relative z-10 rounded-full bg-fbla-gold/10 px-3 py-1.5 font-medium text-fbla-gold"
                    whileHover={{ scale: 1.1 }}
                  >
                    {event.attendees}
                  </motion.span>
                </motion.div>
                <motion.div className="group relative">
                  <motion.h3 
                    className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-fbla-blue transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    <span>
                      <span className="absolute inset-0" />
                      {event.name}
                    </span>
                  </motion.h3>
                  <motion.p 
                    className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {event.description}
                  </motion.p>
                </motion.div>
                <motion.div 
                  className="mt-6 flex items-center gap-x-4"
                  variants={fadeIn}
                >
                  <motion.div 
                    className="text-sm leading-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.p className="text-gray-600">
                      <motion.span 
                        className="text-fbla-blue font-semibold"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {event.time}
                      </motion.span>
                    </motion.p>
                    <motion.p 
                      className="text-gray-600"
                      whileHover={{ x: 5 }}
                    >
                      {event.location}
                    </motion.p>
                  </motion.div>
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
            Event Guidelines
          </motion.h3>
          <motion.div 
            className="mt-6 space-y-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            <motion.p 
              whileHover={{ x: 5 }}
              className="flex items-center gap-x-3"
            >
              <motion.span 
                className="text-fbla-gold text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                •
              </motion.span>
              Registration is required for all events
            </motion.p>
            <motion.p 
              whileHover={{ x: 5 }}
              className="flex items-center gap-x-3"
            >
              <motion.span 
                className="text-fbla-gold text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                •
              </motion.span>
              Business casual attire is recommended
            </motion.p>
            <motion.p 
              whileHover={{ x: 5 }}
              className="flex items-center gap-x-3"
            >
              <motion.span 
                className="text-fbla-gold text-2xl"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              >
                •
              </motion.span>
              Please arrive 15 minutes early for check-in
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-16 flex items-center justify-center"
          variants={fadeIn}
        >
          <Link
            href="/calendar"
            className="relative inline-flex items-center justify-center rounded-md bg-fbla-blue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fbla-blue overflow-hidden group"
          >
            <motion.span
              className="absolute w-0 h-full bg-white left-0 top-0 group-hover:w-full transition-all ease-in-out duration-300 opacity-10"
            />
            View Full Calendar
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