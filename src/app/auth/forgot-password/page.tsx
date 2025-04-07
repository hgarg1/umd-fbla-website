'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeIn, staggerChildren, heroTextReveal } from '@/utils/animations'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Mock password reset - in production, this would call your auth API
    if (email === 'admin@umdfbla.org') {
      setSuccess(true)
      setError('')
    } else {
      setError('No account found with that email address')
      setSuccess(false)
    }
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md"
        variants={staggerChildren}
      >
        <motion.h2 
          className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
          variants={heroTextReveal}
        >
          Reset your password
        </motion.h2>
        <motion.p 
          className="mt-2 text-center text-sm text-gray-600"
          variants={fadeIn}
        >
          Or{' '}
          <Link 
            href="/auth/login" 
            className="font-medium text-fbla-blue hover:text-fbla-gold"
          >
            return to sign in
          </Link>
        </motion.p>
      </motion.div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        variants={staggerChildren}
      >
        <motion.div 
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          variants={fadeIn}
        >
          {success ? (
            <motion.div 
              className="text-center"
              variants={fadeIn}
            >
              <motion.h3 
                className="text-lg font-medium text-gray-900"
                variants={heroTextReveal}
              >
                Check your email
              </motion.h3>
              <motion.p 
                className="mt-2 text-sm text-gray-600"
                variants={fadeIn}
              >
                We've sent you a password reset link. Please check your email and follow the instructions to reset your password.
              </motion.p>
              <motion.div 
                className="mt-6"
                variants={fadeIn}
              >
                <Link
                  href="/auth/login"
                  className="text-sm font-medium text-fbla-blue hover:text-fbla-gold"
                >
                  Return to sign in
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <motion.div 
                  className="mt-1 relative rounded-md shadow-sm"
                  variants={fadeIn}
                >
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue sm:text-sm"
                    required
                  />
                </motion.div>
              </div>

              {error && (
                <motion.div 
                  className="text-red-600 text-sm"
                  variants={fadeIn}
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fbla-blue hover:bg-fbla-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fbla-blue"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send reset link
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 