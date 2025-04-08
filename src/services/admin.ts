import { User, Permission } from '@/types/user'
import { hashPassword } from '@/utils/auth'

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

export const createAdminUser = async (): Promise<User> => {
  const adminUser: User = {
    id: 'admin',
    name: 'Administrator',
    email: 'admin@umdfbla.org',
    password: await hashPassword('admin123'),
    role: 'admin',
    permissions: [Permission.MANAGE_USERS, Permission.MANAGE_EVENTS, Permission.MANAGE_RESOURCES],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    profileImage: '/images/admin-avatar.png'
  }

  if (isBrowser) {
    localStorage.setItem('adminUser', JSON.stringify(adminUser))
  }
  
  return adminUser
}

export const getAdminUser = (): User | null => {
  if (!isBrowser) return null
  
  const adminUser = localStorage.getItem('adminUser')
  if (!adminUser) {
    // Create admin user if it doesn't exist
    createAdminUser().then(user => {
      localStorage.setItem('adminUser', JSON.stringify(user))
      return user
    })
    return null
  }
  
  try {
    return JSON.parse(adminUser)
  } catch {
    return null
  }
}

export const updateAdminUser = async (updates: Partial<User>): Promise<User> => {
  if (!isBrowser) throw new Error('Cannot update admin user in server environment')

  const currentAdmin = getAdminUser()
  if (!currentAdmin) {
    throw new Error('Admin user not found')
  }

  const updatedAdmin: User = {
    ...currentAdmin,
    ...updates,
    updatedAt: new Date().toISOString()
  }

  localStorage.setItem('adminUser', JSON.stringify(updatedAdmin))
  return updatedAdmin
}

export const deleteAdminUser = (): void => {
  if (!isBrowser) return
  localStorage.removeItem('adminUser')
}

export const hasPermission = (user: User, permission: Permission): boolean => {
  return user.permissions.includes(permission)
}

export const hasAllPermissions = (user: User, permissions: Permission[]): boolean => {
  return permissions.every(permission => hasPermission(user, permission))
} 