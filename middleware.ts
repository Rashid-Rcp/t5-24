import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('T5authToken');
  
  const { pathname } = request.nextUrl;
  // List of public paths that don't require authentication
  const publicPaths = ['/login', '/register'];

  // Check if the path is public
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  let userId: string | undefined;

  if (authToken) {
    try {
      // Create TextEncoder for the JWT secret
      const encoder = new TextEncoder();
      const jwtSecret = encoder.encode(process.env.JWT_SECRET);

      // Verify the JWT token
      const { payload } = await jwtVerify(authToken.value, jwtSecret);
      userId = payload.userId as string;

      // If authenticated and accessing login or register, redirect to home
      if (pathname === '/login' || pathname === '/register') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (err) {
      console.error('Invalid or expired token:', err);
      
      if (!isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // If no auth token and trying to access protected route
  if (!authToken && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed
  const response = NextResponse.next();
  if (userId) {
    response.headers.set('userId', userId);
  }
  return response;
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     * - images (your image files)
     * - img (your img files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|images|img).*)',
  ],
};
