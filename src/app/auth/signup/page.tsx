'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fadeIn, staggerChildren, heroTextReveal } from '@/utils/animations'
import { EnvelopeIcon, LockClosedIcon, UserIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { getGoogleAuthUrl, getMicrosoftAuthUrl } from '@/services/auth'

interface PasswordRequirement {
  id: string
  text: string
  validator: (password: string) => boolean
}

const passwordRequirements: PasswordRequirement[] = [
  {
    id: 'length',
    text: 'At least 8 characters long',
    validator: (password) => password.length >= 8,
  },
  {
    id: 'uppercase',
    text: 'Contains uppercase letter',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    text: 'Contains lowercase letter',
    validator: (password) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    text: 'Contains number',
    validator: (password) => /[0-9]/.test(password),
  },
  {
    id: 'special',
    text: 'Contains special character',
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
]

export default function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const validatePassword = (password: string) => {
    return passwordRequirements.every((req) => req.validator(password))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (!validatePassword(password)) {
      setError('Password does not meet complexity requirements')
      return
    }

    // Store user data in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const existingUser = users.find((user: any) => user.email === email)
    
    if (existingUser) {
      setError('An account with this email already exists')
      return
    }

    // Store new user
    users.push({
      name,
      email,
      password, // In a real app, this should be hashed!
      role: 'user',
      createdAt: new Date().toISOString()
    })
    localStorage.setItem('users', JSON.stringify(users))

    // Auto login after signup
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userRole', 'user')
    localStorage.setItem('currentUser', email)

    router.push('/')
  }

  const handleGoogleSignup = () => {
    window.location.href = getGoogleAuthUrl() + '&state=google'
  }

  const handleMicrosoftSignup = () => {
    window.location.href = getMicrosoftAuthUrl() + '&state=microsoft'
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
          Create your account
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
            sign in to your existing account
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <motion.div 
                className="mt-1 relative rounded-md shadow-sm"
                variants={fadeIn}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue sm:text-sm"
                  required
                />
              </motion.div>
            </div>

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
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue sm:text-sm"
                  required
                />
              </motion.div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <motion.div 
                className="mt-1 relative rounded-md shadow-sm"
                variants={fadeIn}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue sm:text-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <span className="text-sm text-gray-500 hover:text-gray-700">
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                </button>
              </motion.div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <motion.div 
                className="mt-1 relative rounded-md shadow-sm"
                variants={fadeIn}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue sm:text-sm"
                  required
                />
              </motion.div>
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
              <div className="space-y-2">
                {passwordRequirements.map((req) => (
                  <div key={req.id} className="flex items-center space-x-2">
                    {req.validator(password) ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`text-sm ${req.validator(password) ? 'text-green-700' : 'text-red-700'}`}>
                      {req.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-md bg-red-50 p-4"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-fbla-blue hover:bg-fbla-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fbla-blue"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create account
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <motion.button
                type="button"
                onClick={handleGoogleSignup}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </motion.button>

              <motion.button
                type="button"
                onClick={handleMicrosoftSignup}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                Microsoft
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
} 