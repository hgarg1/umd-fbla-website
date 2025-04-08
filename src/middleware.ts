import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is an admin route
  const isAdminRoute = pathname.startsWith('/admin')

  // Get the current user from cookies instead of localStorage
  const currentUser = request.cookies.get('currentUser')?.value
  const user = currentUser ? JSON.parse(currentUser) : null

  // If it's an admin route and no user is logged in, redirect to login
  if (isAdminRoute && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If it's an admin route and the user is not an admin, redirect to home
  if (isAdminRoute && user?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is logged in and tries to access login/signup, redirect to dashboard
  if (user && (pathname === '/auth/login' || pathname === '/auth/signup')) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/login',
    '/auth/signup'
  ]
} 