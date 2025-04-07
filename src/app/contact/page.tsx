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

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/umdfbla',
    icon: '📸'
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/umdfbla',
    icon: '💼'
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/umdfbla',
    icon: '🐦'
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/umdfbla',
    icon: '👍'
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

      {/* Contact Methods Section */}
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
            Get in Touch
          </motion.h2>
          <motion.p 
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={heroTextReveal}
          >
            Contact Us
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

      {/* Contact Information Section */}
      <motion.div 
        className="bg-gray-50 py-24 sm:py-32"
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            className="mx-auto max-w-2xl lg:mx-0"
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Contact Information</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              You can also reach us through these channels:
            </p>
          </motion.div>
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <motion.div
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
                <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                <p className="mt-2 text-gray-600">info@umdfbla.org</p>
              </motion.div>
            </motion.div>
            <motion.div
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
                <h3 className="text-lg font-semibold text-gray-900">Location</h3>
                <p className="mt-2 text-gray-600">Van Munching Hall<br />University of Maryland<br />College Park, MD 20742</p>
              </motion.div>
            </motion.div>
            <motion.div
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
                <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                <p className="mt-2 text-gray-600">Monday - Friday<br />9:00 AM - 5:00 PM</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Social Media Section */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        variants={staggerChildren}
      >
        <motion.div 
          className="mx-auto max-w-2xl lg:mx-0"
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Connect With Us</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Follow us on social media to stay updated with our latest news and events.
          </p>
        </motion.div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
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
                  {link.icon}
                </motion.span>
                <h3 className="text-lg font-semibold text-gray-900">{link.name}</h3>
              </motion.div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
} 