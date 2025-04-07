'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  fadeIn, 
  staggerChildren, 
  card3DHover,
  floatAnimation,
  shimmerEffect,
  heroTextReveal,
  cardEnter
} from '@/utils/animations'
import Link from 'next/link'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

interface ContactMethod {
  name: string
  description: string
  icon: typeof EnvelopeIcon
  href: string
  linkText: string
}

interface SocialLink {
  name: string
  description: string
  href: string
  icon: string
  linkText: string
}

const contactMethods: ContactMethod[] = [
  {
    name: 'Email',
    description: 'Send us an email and we\'ll get back to you as soon as possible.',
    icon: EnvelopeIcon,
    href: 'mailto:contact@umdfbla.org',
    linkText: 'contact@umdfbla.org'
  },
  {
    name: 'Phone',
    description: 'Give us a call during our office hours.',
    icon: PhoneIcon,
    href: 'tel:+13015551234',
    linkText: '(301) 555-1234'
  },
  {
    name: 'Location',
    description: 'Visit us at our office in Van Munching Hall.',
    icon: MapPinIcon,
    href: 'https://maps.google.com',
    linkText: 'View on Map'
  }
]

const socialLinks: SocialLink[] = [
  {
    name: 'Facebook',
    description: 'Follow us on Facebook for updates and events.',
    href: 'https://facebook.com/umdfbla',
    icon: '📱',
    linkText: 'Follow on Facebook'
  },
  {
    name: 'Instagram',
    description: 'Check out our Instagram for photos and stories.',
    href: 'https://instagram.com/umdfbla',
    icon: '📸',
    linkText: 'Follow on Instagram'
  },
  {
    name: 'Twitter',
    description: 'Connect with us on Twitter for news and announcements.',
    href: 'https://twitter.com/umdfbla',
    icon: '🐦',
    linkText: 'Follow on Twitter'
  }
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

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
              Contact Us
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-300"
              variants={fadeIn}
            >
              Have questions or want to get involved? We'd love to hear from you. Reach out to us through the form below or connect with us on social media.
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Contact Information Section */}
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
            Contact Information
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={heroTextReveal}
          >
            Get in Touch
          </motion.p>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Have questions or want to get involved? We'd love to hear from you.
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
            {contactMethods.map((method) => (
              <motion.div 
                key={method.name}
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
                  <method.icon className="h-12 w-12 text-fbla-blue" />
                </motion.div>
                <motion.div 
                  className="text-center"
                  variants={fadeIn}
                >
                  <motion.h3 
                    className="text-lg font-semibold leading-7 text-gray-900"
                    variants={heroTextReveal}
                  >
                    {method.name}
                  </motion.h3>
                  <motion.p 
                    className="mt-4 text-sm leading-6 text-gray-600"
                    variants={fadeIn}
                  >
                    {method.description}
                  </motion.p>
                  <motion.div 
                    className="mt-6"
                    variants={fadeIn}
                  >
                    <Link
                      href={method.href}
                      className="text-sm font-semibold leading-6 text-fbla-blue hover:text-fbla-gold"
                    >
                      {method.linkText} <span aria-hidden="true">→</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.dl>
        </motion.div>
      </motion.div>

      {/* Social Media Section */}
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
              Connect With Us
            </motion.h2>
            <motion.p 
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
              variants={heroTextReveal}
            >
              Follow Our Journey
            </motion.p>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600"
              variants={fadeIn}
            >
              Stay updated with our latest news and events through our social media channels.
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
              {socialLinks.map((link) => (
                <motion.div 
                  key={link.name}
                  className="flex flex-col p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
                  variants={cardEnter}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                >
                  <motion.div 
                    className="relative h-12 w-12 mx-auto mb-6 text-4xl"
                    variants={fadeIn}
                  >
                    {link.icon}
                  </motion.div>
                  <motion.div 
                    className="text-center"
                    variants={fadeIn}
                  >
                    <motion.h3 
                      className="text-lg font-semibold leading-7 text-gray-900"
                      variants={heroTextReveal}
                    >
                      {link.name}
                    </motion.h3>
                    <motion.p 
                      className="mt-4 text-sm leading-6 text-gray-600"
                      variants={fadeIn}
                    >
                      {link.description}
                    </motion.p>
                    <motion.div 
                      className="mt-6"
                      variants={fadeIn}
                    >
                      <Link
                        href={link.href}
                        className="text-sm font-semibold leading-6 text-fbla-blue hover:text-fbla-gold"
                      >
                        {link.linkText} <span aria-hidden="true">→</span>
                      </Link>
                    </motion.div>
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