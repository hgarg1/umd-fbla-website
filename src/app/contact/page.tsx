'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  fadeIn, 
  staggerChildren, 
  card3DHover,
  floatAnimation,
  shimmerEffect
} from '@/utils/animations'

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

      {/* Contact Form Section */}
      <motion.div 
        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
        variants={staggerChildren}
      >
        <div className="mx-auto max-w-2xl lg:mx-0">
          <motion.h2 
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            variants={fadeIn}
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-gray-600"
            variants={fadeIn}
          >
            Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <motion.form 
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          variants={fadeIn}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fbla-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fbla-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="subject" className="block text-sm font-semibold leading-6 text-gray-900">
                Subject
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fbla-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-fbla-blue sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <motion.button
              type="submit"
              className="block w-full rounded-md bg-fbla-blue px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </div>
        </motion.form>
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