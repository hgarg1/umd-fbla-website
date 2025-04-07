'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Modal from '@/components/Modal'
import { 
  fadeIn, 
  staggerChildren, 
  card3DHover,
  floatAnimation,
  shimmerEffect,
  heroTextReveal,
  cardEnter
} from '@/utils/animations'

const leadership = [
  {
    name: 'Alex Thompson',
    role: 'CEO',
    description: 'Leading our organization\'s strategic vision and growth.',
    image: '/team/placeholder-1.jpg',
    bio: `Alex Thompson brings over 3 years of leadership experience in student organizations. As CEO of UMD FBLA, Alex has implemented innovative programs that increased member engagement by 150%. A senior majoring in Business Administration with a concentration in Leadership and Innovation, Alex is passionate about developing the next generation of business leaders.

    Notable achievements:
    • Led the chapter to win "Outstanding Chapter" award in 2023
    • Established partnerships with 5 Fortune 500 companies
    • Created mentorship program connecting students with industry professionals
    
    "My goal is to ensure every member of UMD FBLA has the resources and opportunities they need to succeed in their future careers."`
  },
  {
    name: 'Sarah Chen',
    role: 'President',
    description: 'Overseeing daily operations and implementing strategic initiatives.',
    image: '/team/placeholder-2.jpg',
    bio: `Sarah Chen is a junior studying Finance and Data Analytics. With her strong analytical background, she has revolutionized how UMD FBLA approaches chapter management and event planning. Sarah previously served as Vice President of Operations before taking on the role of President.

    Key initiatives:
    • Implemented data-driven decision making for event planning
    • Launched digital transformation of chapter operations
    • Established quarterly goal-setting and review processes
    
    "I believe in creating an inclusive environment where every member can grow and thrive."`
  },
  {
    name: 'Michael Rodriguez',
    role: 'Executive Vice President',
    description: 'Supporting the president and managing key partnerships.',
    image: '/team/placeholder-3.jpg',
    bio: `Michael Rodriguez, a junior in International Business, brings a global perspective to UMD FBLA. His experience in cross-cultural communication has been instrumental in expanding the chapter's reach and diversity.

    Achievements:
    • Established international student mentorship program
    • Coordinated with 3 other universities for joint events
    • Led diversity and inclusion initiatives
    
    "My vision is to prepare our members for success in an increasingly global business environment."`
  },
  {
    name: 'Emily Parker',
    role: 'Chief Events Officer',
    description: 'Planning and executing all chapter events and competitions.',
    image: '/team/placeholder-4.jpg',
    bio: `Emily Parker excels in event management and competition coordination. A senior in Marketing, she has transformed UMD FBLA's event strategy to create more engaging and valuable experiences for members.

    Recent successes:
    • Organized largest-ever Leadership Conference with 300+ attendees
    • Implemented hybrid event format increasing accessibility
    • Created comprehensive competition preparation program
    
    "I'm committed to creating events that provide real value and practical experience for our members."`
  },
  {
    name: 'David Kim',
    role: 'Chief Technology Officer',
    description: 'Managing our digital presence and technical infrastructure.',
    image: '/team/placeholder-5.jpg',
    bio: `David Kim, a senior in Computer Science and Business, leads UMD FBLA's digital transformation. His technical expertise has modernized the chapter's operations and online presence.

    Technical achievements:
    • Developed chapter management platform
    • Implemented automated event registration system
    • Created mobile app for member engagement
    
    "Technology should enhance, not complicate, our chapter's operations and member experience."`
  },
  {
    name: 'Rachel Foster',
    role: 'Chief Marketing Officer',
    description: 'Leading our branding and marketing strategies.',
    image: '/team/placeholder-6.jpg',
    bio: `Rachel Foster brings creative vision and strategic thinking to UMD FBLA's marketing efforts. A junior in Marketing and Design, she has revamped the chapter's brand identity and social media presence.

    Marketing initiatives:
    • Increased social media engagement by 200%
    • Developed comprehensive brand guidelines
    • Created successful alumni outreach campaign
    
    "Strong branding and effective communication are key to building a thriving chapter community."`
  },
  {
    name: 'James Wilson',
    role: 'Chief Operations Officer',
    description: 'Ensuring smooth day-to-day chapter operations.',
    image: '/team/placeholder-7.jpg',
    bio: `James Wilson applies his Operations Management major expertise to streamline UMD FBLA's processes. His systematic approach has improved efficiency across all chapter activities.

    Operational improvements:
    • Reduced event planning time by 40%
    • Implemented project management system
    • Created standard operating procedures
    
    "Efficient operations allow us to focus more on what matters: developing our members."`
  },
  {
    name: 'Lisa Martinez',
    role: 'Chief Financial Officer',
    description: 'Managing chapter finances and budgeting.',
    image: '/team/placeholder-8.jpg',
    bio: `Lisa Martinez, a senior in Finance and Accounting, ensures UMD FBLA's financial health and sustainability. Her strategic financial planning has enabled expanded programming and scholarships.

    Financial achievements:
    • Secured 50% increase in chapter funding
    • Established emergency fund
    • Created transparent financial reporting system
    
    "Sound financial management is the foundation for achieving our chapter's ambitious goals."`
  },
  {
    name: 'Amanda Lee',
    role: 'Secretary',
    description: 'Maintaining records and facilitating communication.',
    image: '/team/placeholder-9.jpg',
    bio: `Amanda Lee, a sophomore in Business Communication, keeps UMD FBLA running smoothly through effective documentation and communication. Her organizational skills ensure nothing falls through the cracks.

    Key contributions:
    • Implemented digital documentation system
    • Created weekly newsletter reaching 1000+ subscribers
    • Established internal communication protocols
    
    "Clear communication and proper documentation are essential for our chapter's success."`
  }
]

export default function About() {
  const [selectedMember, setSelectedMember] = useState<typeof leadership[0] | null>(null)

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
              About UMD FBLA
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={fadeIn}
            >
              Empowering future business leaders at the University of Maryland through professional development, networking, and competitive excellence.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Mission Section */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        variants={staggerChildren}
      >
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          variants={fadeIn}
        >
          <h2 className="text-base font-semibold leading-7 text-fbla-gold">Our Mission</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Developing Tomorrow's Business Leaders
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            At UMD FBLA, we are dedicated to inspiring and preparing students to become community-minded business leaders in a global society through relevant career preparation and leadership experiences.
          </p>
        </motion.div>
      </motion.div>

      {/* Leadership Section */}
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
            Our Leadership Team
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={heroTextReveal}
          >
            Meet the Team
          </motion.p>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Our dedicated team of officers works tirelessly to provide the best experience for our members.
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
            {leadership.map((person) => (
              <motion.div 
                key={person.name}
                className="flex flex-col p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                variants={cardEnter}
                initial="initial"
                animate="animate"
                whileHover="hover"
              >
                <motion.div 
                  className="relative h-48 w-48 mx-auto mb-6 overflow-hidden rounded-full"
                  variants={fadeIn}
                >
                  <motion.img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={fadeIn}
                >
                  <motion.h3 
                    className="text-lg font-semibold leading-7 text-gray-900"
                    variants={heroTextReveal}
                  >
                    {person.name}
                  </motion.h3>
                  <motion.p 
                    className="text-sm leading-6 text-fbla-blue"
                    variants={fadeIn}
                  >
                    {person.role}
                  </motion.p>
                  <motion.p 
                    className="mt-4 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {person.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* Bio Modal */}
      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name}
      >
        {selectedMember && (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-24 h-24 rounded-full overflow-hidden">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900">{selectedMember.name}</h4>
                <p className="text-lg font-medium text-fbla-blue">{selectedMember.role}</p>
              </div>
            </div>
            <div className="prose prose-blue max-w-none">
              {selectedMember.bio.split('\n\n').map((paragraph, index) => (
                <p key={index} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* CTA Section */}
      <motion.div 
        className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32"
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl text-center"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join Our Chapter
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Ready to develop your leadership skills and kickstart your business career? Join UMD FBLA today!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-fbla-gold px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
} 