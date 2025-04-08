import { verifyPassword, isAuthenticated, getCurrentUser } from '@/utils/auth'
import { getAdminUser } from '@/services/admin'
import { User } from '@/types/user'

const mockAdminUser: User = {
  id: 'admin',
  name: 'Administrator',
  email: 'admin@umdfbla.org',
  password: 'hashed_password',
  role: 'admin',
  permissions: ['manage_users', 'manage_events', 'manage_resources'],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  status: 'active',
  profileImage: '/images/admin-avatar.png'
}

describe('Authentication Tests', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('verifyPassword should correctly verify passwords', async () => {
    const password = 'admin123'
    const hashedPassword = await verifyPassword(password, 'admin123')
    expect(hashedPassword).toBe(true)
  })

  it('getAdminUser should return admin user when available', () => {
    localStorage.setItem('adminUser', JSON.stringify(mockAdminUser))
    const adminUser = getAdminUser()
    expect(adminUser).toBeDefined()
    expect(adminUser?.email).toBe('admin@umdfbla.org')
  })

  it('isAuthenticated should return false when no user is logged in', () => {
    expect(isAuthenticated()).toBe(false)
  })

  it('isAuthenticated should return true when user is logged in', () => {
    localStorage.setItem('currentUser', JSON.stringify(mockAdminUser))
    expect(isAuthenticated()).toBe(true)
  })

  it('getCurrentUser should return null when no user is logged in', () => {
    expect(getCurrentUser()).toBeNull()
  })

  it('getCurrentUser should return user when logged in', () => {
    localStorage.setItem('currentUser', JSON.stringify(mockAdminUser))
    const user = getCurrentUser()
    expect(user).toBeDefined()
    expect(user?.email).toBe('admin@umdfbla.org')
  })
}) 