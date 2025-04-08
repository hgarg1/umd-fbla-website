'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Permission } from '@/types/user'
import { getCurrentUser } from '@/utils/auth'
import { cardEnter } from '@/utils/animations'
import EventManagement from '@/components/admin/EventManagement'

export default function EventsPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || !user.permissions.includes(Permission.MANAGE_EVENTS)) {
      router.push('/auth/login')
      return
    }
    setCurrentUser(user)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-fbla-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <motion.div
      variants={cardEnter}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
    >
      <div className="px-4 py-6 sm:px-0">
        <EventManagement />
      </div>
    </motion.div>
  )
} 