export interface Permission {
  id: string
  name: string
  description: string
  key: string
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
  role: string
  permissions: string[] // Additional individual permissions
  position?: string // Officer position if applicable
  createdAt: string
  updatedAt: string
  lastLogin?: string
  status: 'active' | 'inactive' | 'pending'
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

// Default permissions based on FBLA structure
export const DEFAULT_PERMISSIONS: Permission[] = [
  {
    id: 'events_manage',
    name: 'Manage Events',
    description: 'Create, edit, and delete events',
    key: 'events_manage'
  },
  {
    id: 'resources_manage',
    name: 'Manage Resources',
    description: 'Upload, edit, and delete resources',
    key: 'resources_manage'
  },
  {
    id: 'users_manage',
    name: 'Manage Users',
    description: 'Create, edit, and delete users',
    key: 'users_manage'
  },
  {
    id: 'competitions_manage',
    name: 'Manage Competitions',
    description: 'Manage competition information and registrations',
    key: 'competitions_manage'
  },
  {
    id: 'finance_manage',
    name: 'Manage Finance',
    description: 'Handle financial records and transactions',
    key: 'finance_manage'
  },
  {
    id: 'content_manage',
    name: 'Manage Content',
    description: 'Edit website content and pages',
    key: 'content_manage'
  }
]

// Default roles based on FBLA officer positions
export const DEFAULT_ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    permissions: DEFAULT_PERMISSIONS.map(p => p.key)
  },
  {
    id: 'president',
    name: 'President',
    description: 'Chapter president with high-level management access',
    permissions: [
      'events_manage',
      'resources_manage',
      'users_manage',
      'competitions_manage',
      'content_manage'
    ]
  },
  {
    id: 'vice_president',
    name: 'Vice President',
    description: 'Chapter vice president with management access',
    permissions: [
      'events_manage',
      'resources_manage',
      'competitions_manage',
      'content_manage'
    ]
  },
  {
    id: 'secretary',
    name: 'Secretary',
    description: 'Chapter secretary with content management access',
    permissions: [
      'events_manage',
      'resources_manage',
      'content_manage'
    ]
  },
  {
    id: 'treasurer',
    name: 'Treasurer',
    description: 'Chapter treasurer with financial management access',
    permissions: [
      'finance_manage',
      'content_manage'
    ]
  },
  {
    id: 'reporter',
    name: 'Reporter',
    description: 'Chapter reporter with content creation access',
    permissions: [
      'content_manage',
      'events_manage'
    ]
  },
  {
    id: 'member',
    name: 'Member',
    description: 'Regular chapter member',
    permissions: []
  }
] 