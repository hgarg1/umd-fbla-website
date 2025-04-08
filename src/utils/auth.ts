'use client'

import { User } from '@/types/user'
import { cookies } from 'next/headers'

// Simple password hashing for demo purposes
// In production, use a proper hashing library like bcrypt
export const hashPassword = async (password: string): Promise<string> => {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export const verifyPassword = async (inputPassword: string, storedPassword: string): Promise<boolean> => {
  // In a real app, this would use proper password hashing
  return inputPassword === storedPassword
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined'

const setCookie = (name: string, value: string, days = 1) => {
  if (!isBrowser) return
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`
}

const getCookie = (name: string): string | null => {
  if (!isBrowser) return null
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null
  return null
}

export const isAuthenticated = (): boolean => {
  if (!isBrowser) return false
  const userInCookie = getCookie('currentUser')
  const userInStorage = localStorage.getItem('currentUser')
  return Boolean(userInCookie || userInStorage)
}

export const getCurrentUser = (): User | null => {
  if (!isBrowser) return null
  
  // Try to get user from cookie first
  const userStr = getCookie('currentUser') || localStorage.getItem('currentUser')
  if (!userStr) return null
  
  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const setCurrentUser = (user: User): void => {
  if (!isBrowser) return
  const userStr = JSON.stringify(user)
  localStorage.setItem('currentUser', userStr)
  setCookie('currentUser', userStr)
}

export const logout = (): void => {
  if (!isBrowser) return
  localStorage.removeItem('currentUser')
  document.cookie = 'currentUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  window.location.href = '/auth/login'
} 