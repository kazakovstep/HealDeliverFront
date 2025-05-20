import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Add paths that should be accessible without authentication
const publicPaths = ['/login', '/register']

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl

	// Allow access to public paths
	if (publicPaths.includes(pathname)) {
		return NextResponse.next()
	}

	// For client-side routes, we'll handle the redirect in the components
	// This middleware will only handle server-side redirects
	return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
	matcher: [
		/*
		 * Match all request paths except:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /fonts (inside /public)
		 * 4. /examples (inside /public)
		 * 5. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
	],
}
