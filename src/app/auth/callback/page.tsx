'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleGoogleCallback, handleMicrosoftCallback } from '@/services/auth'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  const state = searchParams.get('state')

  useEffect(() => {
    const handleCallback = async () => {
      if (!code) {
        router.push('/auth/login')
        return
      }

      try {
        let user
        if (state === 'google') {
          user = await handleGoogleCallback(code)
        } else if (state === 'microsoft') {
          user = await handleMicrosoftCallback(code)
        } else {
          throw new Error('Invalid state parameter')
        }

        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user))
        
        // Redirect to dashboard or home page
        router.push('/admin/dashboard')
      } catch (error) {
        console.error('Authentication error:', error)
        router.push('/auth/login?error=authentication_failed')
      }
    }

    handleCallback()
  }, [code, state, router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Authenticating...</h2>
        <p className="mt-2 text-gray-600">Please wait while we complete the authentication process.</p>
      </div>
    </div>
  )
}

export default function AuthCallback() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Loading...</h2>
            <p className="mt-2 text-gray-600">Please wait...</p>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
} 