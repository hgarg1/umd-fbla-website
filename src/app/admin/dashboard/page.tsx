'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { User, Permission } from '@/types/user'
import { getAdminUser, hasPermission } from '@/services/admin'
import { isAuthenticated, getCurrentUser, logout } from '@/utils/auth'
import { staggerChildren, fadeIn, slideIn } from '@/utils/animations'

const AdminDashboard = () => {
  const router = useRouter()
  const [admin, setAdmin] = useState<User | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        router.push('/auth/login')
        return
      }

      const currentUser = getCurrentUser()
      if (!currentUser || currentUser.role !== 'admin') {
        router.push('/auth/login')
        return
      }

      setCurrentUser(currentUser)
      setAdmin(getAdminUser())
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fbla-blue"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={staggerChildren}
      className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8"
    >
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeIn}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* Quick Stats */}
          <motion.div
            variants={slideIn('up')}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium text-gray-900">Quick Stats</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">0</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Active Events</p>
                <p className="mt-1 text-2xl font-semibold text-gray-900">0</p>
              </div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            variants={slideIn('up')}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div className="mt-4 space-y-4">
              <p className="text-sm text-gray-500">No recent activity</p>
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            variants={slideIn('up')}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-lg font-medium text-gray-900">System Status</h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
                <span className="text-sm text-gray-600">All systems operational</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Admin Tools */}
        <motion.div
          variants={fadeIn}
          className="mt-8"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Admin Tools</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hasPermission(currentUser!, Permission.MANAGE_USERS) && (
              <motion.button
                variants={slideIn('up')}
                onClick={() => router.push('/admin/users')}
                className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">User Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Manage user accounts, roles, and permissions
                </p>
              </motion.button>
            )}

            {hasPermission(currentUser!, Permission.MANAGE_EVENTS) && (
              <motion.button
                variants={slideIn('up')}
                onClick={() => router.push('/admin/events')}
                className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">Event Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Create and manage events and competitions
                </p>
              </motion.button>
            )}

            {hasPermission(currentUser!, Permission.MANAGE_RESOURCES) && (
              <motion.button
                variants={slideIn('up')}
                onClick={() => router.push('/admin/resources')}
                className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">Resource Management</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Upload and manage resources and documents
                </p>
              </motion.button>
            )}

            {hasPermission(currentUser!, Permission.VIEW_ANALYTICS) && (
              <motion.button
                variants={slideIn('up')}
                onClick={() => router.push('/admin/analytics')}
                className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                <p className="mt-2 text-sm text-gray-500">
                  View system usage and performance metrics
                </p>
              </motion.button>
            )}

            {hasPermission(currentUser!, Permission.MANAGE_SETTINGS) && (
              <motion.button
                variants={slideIn('up')}
                onClick={() => router.push('/admin/settings')}
                className="bg-white rounded-lg shadow-sm p-6 text-left hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-medium text-gray-900">Settings</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Configure system settings and preferences
                </p>
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdminDashboard 