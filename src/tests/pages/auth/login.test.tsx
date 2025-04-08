import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPage from '@/app/auth/login/page'
import { getAdminUser } from '@/services/admin'
import { verifyPassword } from '@/utils/auth'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// Mock auth services
jest.mock('@/services/auth', () => ({
  verifyPassword: jest.fn(),
  getGoogleAuthUrl: jest.fn(),
  getMicrosoftAuthUrl: jest.fn(),
}))

jest.mock('@/services/admin', () => ({
  getAdminUser: jest.fn(),
}))

describe('LoginPage', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
    ;(getAdminUser as jest.Mock).mockReturnValue({
      email: 'admin@umdfbla.org',
      password: 'hashed_password',
    })
    ;(verifyPassword as jest.Mock).mockResolvedValue(true)
  })

  it('renders login form', () => {
    render(<LoginPage />)
    expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('handles successful login', async () => {
    render(<LoginPage />)

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'admin@umdfbla.org' },
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'admin123' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    // Wait for success message and redirect
    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument()
    })

    // Wait for redirect
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/dashboard')
    }, { timeout: 2000 })
  })

  it('shows error message for invalid credentials', async () => {
    ;(verifyPassword as jest.Mock).mockResolvedValue(false)

    render(<LoginPage />)

    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText(/email address/i), {
      target: { value: 'admin@umdfbla.org' },
    })
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: 'wrongpassword' },
    })

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid email or password/i)).toBeInTheDocument()
    })
  })
}) 