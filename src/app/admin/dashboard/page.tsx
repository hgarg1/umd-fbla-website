'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import UserManagement from '@/components/admin/UserManagement'
import EventManagement from '@/components/admin/EventManagement'
import ResourceManagement from '@/components/admin/ResourceManagement'

type TabType = 'events' | 'resources' | 'users'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabType>('events')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check authentication and admin status
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (!user) {
      router.push('/auth/login')
      return
    }

    setIsAuthenticated(true)
    setIsAdmin(user.role === 'administrator')

    if (user.role !== 'administrator') {
      router.push('/')
    }
  }, [router])

  if (!isAuthenticated || !isAdmin) {
    return null
  }

  const tabs = [
    { id: 'events', name: 'Events', count: '3' },
    { id: 'resources', name: 'Resources', count: '2' },
    { id: 'users', name: 'Users', count: '5' },
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Admin Dashboard</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`
                      whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium
                      ${activeTab === tab.id
                        ? 'border-fbla-blue text-fbla-blue'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      }
                    `}
                  >
                    {tab.name}
                    {tab.count ? (
                      <span
                        className={`ml-3 rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block
                          ${activeTab === tab.id
                            ? 'bg-fbla-blue/10 text-fbla-blue'
                            : 'bg-gray-100 text-gray-900'
                          }
                        `}
                      >
                        {tab.count}
                      </span>
                    ) : null}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="mt-6">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'events' && (
                  <div className="rounded-lg bg-white shadow">
                    <EventManagement />
                  </div>
                )}

                {activeTab === 'resources' && (
                  <div className="rounded-lg bg-white shadow">
                    <ResourceManagement />
                  </div>
                )}

                {activeTab === 'users' && (
                  <div className="rounded-lg bg-white shadow">
                    <UserManagement />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 