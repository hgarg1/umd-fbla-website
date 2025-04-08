import { createAdminUser } from '@/services/admin'

// Initialize admin user if it doesn't exist
export const initAdmin = async () => {
  try {
    const adminUser = localStorage.getItem('adminUser')
    if (!adminUser) {
      console.log('Creating admin user...')
      await createAdminUser()
      console.log('Admin user created successfully')
    } else {
      console.log('Admin user already exists')
    }
  } catch (error) {
    console.error('Error initializing admin:', error)
  }
}

// Run the initialization
initAdmin() 