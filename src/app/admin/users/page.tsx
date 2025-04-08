'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Permission } from '@/types/user'
import { getCurrentUser } from '@/utils/auth'
import { cardEnter } from '@/utils/animations'
import UserManagement from '@/components/admin/UserManagement'

export default function UsersPage() {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = getCurrentUser()
    if (!user || !user.permissions.includes(Permission.MANAGE_USERS)) {
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        </div>
        <UserManagement />
      </div>
    </motion.div>
  )
} 