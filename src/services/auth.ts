import { User } from '@/types/user'

// OAuth configuration
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const MICROSOFT_CLIENT_ID = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID
const MICROSOFT_TENANT_ID = process.env.NEXT_PUBLIC_MICROSOFT_TENANT_ID

// Google OAuth endpoints
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

// Microsoft OAuth endpoints
const MICROSOFT_AUTH_URL = `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`
const MICROSOFT_TOKEN_URL = `https://login.microsoftonline.com/${MICROSOFT_TENANT_ID}/oauth2/v2.0/token`
const MICROSOFT_USERINFO_URL = 'https://graph.microsoft.com/v1.0/me'

// Redirect URI for OAuth callbacks
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : ''

export const getGoogleAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID!,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent'
  })
  return `${GOOGLE_AUTH_URL}?${params.toString()}`
}

export const getMicrosoftAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: MICROSOFT_CLIENT_ID!,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'openid email profile',
    response_mode: 'query'
  })
  return `${MICROSOFT_AUTH_URL}?${params.toString()}`
}

export const handleGoogleCallback = async (code: string): Promise<User> => {
  // Exchange code for tokens
  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code'
    })
  })

  const { access_token } = await tokenResponse.json()

  // Get user info
  const userInfoResponse = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
  const userInfo = await userInfoResponse.json()

  // Create or update user
  return {
    id: userInfo.sub,
    name: userInfo.name,
    email: userInfo.email,
    password: '', // No password needed for SSO
    role: 'member', // Default role
    permissions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    profileImage: userInfo.picture
  }
}

export const handleMicrosoftCallback = async (code: string): Promise<User> => {
  // Exchange code for tokens
  const tokenResponse = await fetch(MICROSOFT_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: MICROSOFT_CLIENT_ID!,
      client_secret: process.env.MICROSOFT_CLIENT_SECRET!,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      scope: 'openid email profile'
    })
  })

  const { access_token } = await tokenResponse.json()

  // Get user info
  const userInfoResponse = await fetch(MICROSOFT_USERINFO_URL, {
    headers: { Authorization: `Bearer ${access_token}` }
  })
  const userInfo = await userInfoResponse.json()

  // Create or update user
  return {
    id: userInfo.id,
    name: userInfo.displayName,
    email: userInfo.mail || userInfo.userPrincipalName,
    password: '', // No password needed for SSO
    role: 'member', // Default role
    permissions: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'active',
    profileImage: userInfo.photo
  }
} 