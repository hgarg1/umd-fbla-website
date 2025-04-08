export enum Permission {
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_EVENTS = 'MANAGE_EVENTS',
  MANAGE_RESOURCES = 'MANAGE_RESOURCES',
  MANAGE_SETTINGS = 'MANAGE_SETTINGS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  MANAGE_ROLES = 'MANAGE_ROLES',
  MANAGE_PERMISSIONS = 'MANAGE_PERMISSIONS'
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: string[] // Array of permission keys
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'member' | 'officer'
  permissions: Permission[]
  position?: string // Officer position if applicable
  createdAt: string
  updatedAt: string
  lastLogin?: string
  status: 'active' | 'inactive' | 'suspended'
  profileImage?: string
  bio?: string
  contactInfo?: {
    phone?: string
    socialMedia?: {
      linkedin?: string
      twitter?: string
      instagram?: string
    }
  }
}

export const ADMIN_PERMISSIONS = [
  Permission.MANAGE_USERS,
  Permission.MANAGE_EVENTS,
  Permission.MANAGE_RESOURCES,
  Permission.MANAGE_SETTINGS,
  Permission.VIEW_ANALYTICS,
  Permission.MANAGE_ROLES,
  Permission.MANAGE_PERMISSIONS
]

// Default roles based on FBLA officer positions
export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: ADMIN_PERMISSIONS.map(p => p.toString())
  },
  {
    id: 'president',
    name: 'President',
    description: 'Chapter president with high-level management access',
    permissions: ADMIN_PERMISSIONS.map(p => p.toString())
  },
  {
    id: 'vice_president',
    name: 'Vice President',
    description: 'Chapter vice president with management access',
    permissions: ADMIN_PERMISSIONS.map(p => p.toString())
  },
  {
    id: 'secretary',
    name: 'Secretary',
    description: 'Chapter secretary with content management access',
    permissions: ADMIN_PERMISSIONS.map(p => p.toString())
  },
  {
    id: 'treasurer',
    name: 'Treasurer',
    description: 'Chapter treasurer with financial management access',
    permissions: ADMIN_PERMISSIONS.map(p => p.toString())
  },
  {
    id: 'reporter',
    name: 'Reporter',
    description: 'Chapter reporter with content creation access',
    permissions: ADMIN_PERMISSIONS.map(p => p.toString())
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Regular chapter member',
    permissions: []
  }
]

export const DEFAULT_PERMISSIONS = [
  { id: Permission.MANAGE_USERS, name: 'Manage Users', description: 'Create, edit, and delete user accounts' },
  { id: Permission.MANAGE_EVENTS, name: 'Manage Events', description: 'Create, edit, and delete events' },
  { id: Permission.MANAGE_RESOURCES, name: 'Manage Resources', description: 'Upload, edit, and delete resources' },
  { id: Permission.VIEW_ANALYTICS, name: 'View Analytics', description: 'Access analytics and reports' },
  { id: Permission.MANAGE_SETTINGS, name: 'Manage Settings', description: 'Configure system settings' }
] 