'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { getGoogleAuthUrl, getMicrosoftAuthUrl } from '@/services/auth'
import { cardEnter } from '@/utils/animations'
import { verifyPassword, setCurrentUser, isAuthenticated, getCurrentUser } from '@/utils/auth'
import { getAdminUser } from '@/services/admin'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated()) {
      const user = getCurrentUser()
      if (user?.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/')
      }
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const adminUser = getAdminUser()
      if (!adminUser) {
        setError('Admin user not found. Please contact system administrator.')
        return
      }

      if (email !== adminUser.email) {
        setError('Invalid email or password')
        return
      }

      const isValidPassword = await verifyPassword(password, adminUser.password)
      if (!isValidPassword) {
        setError('Invalid email or password')
        return
      }

      // Store user in both localStorage and cookies
      setCurrentUser(adminUser)
      
      // Show success message
      setSuccess(true)
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/dashboard')
      }, 1500)
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = getGoogleAuthUrl() + '&state=google'
  }

  const handleMicrosoftLogin = () => {
    window.location.href = getMicrosoftAuthUrl() + '&state=microsoft'
  }

  return (
    <motion.div
      variants={cardEnter}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-fbla-blue focus:border-fbla-blue focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-50 p-4">
              <p className="text-sm text-green-700">Login successful! Redirecting...</p>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading || success}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-fbla-blue hover:bg-fbla-gold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fbla-blue disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Google
              </button>
              <button
                type="button"
                onClick={handleMicrosoftLogin}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Microsoft
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  )
} 