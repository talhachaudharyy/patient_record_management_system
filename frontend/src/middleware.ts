import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userData = request.cookies.get('userData');
  const adminData = request.cookies.get('adminData');

  // Allow access to admin login page if no user or admin data is present
  if (!userData && !adminData && request.nextUrl.pathname === '/pages/adminLogin') {
    return NextResponse.next();
  }

  if (userData) {
    const user = JSON.parse(userData.value);

    // Redirect to appropriate home page based on user type
    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/pages/user_sign-in' || request.nextUrl.pathname === '/pages/user_sign-up' || request.nextUrl.pathname === '/pages/adminLogin') {
      return NextResponse.redirect(new URL(user.type === 'patient' ? '/pages/patientHome' : '/pages/doctorHome', request.url));
    }

    // Restrict access based on user type
    if (user.type === 'patient' && !request.nextUrl.pathname.startsWith('/pages/patient')) {
      return NextResponse.redirect(new URL('/pages/patientHome', request.url));
    }

    if (user.type === 'doctor' && !request.nextUrl.pathname.startsWith('/pages/doctor')) {
      return NextResponse.redirect(new URL('/pages/doctorHome', request.url));
    }

    // Restrict access to admin pages for patients and doctors
    if (request.nextUrl.pathname.startsWith('/pages/admin')) {
      return NextResponse.redirect(new URL(user.type === 'patient' ? '/pages/patientHome' : '/pages/doctorHome', request.url));
    }
  } else if (adminData) {
    const admin = JSON.parse(adminData.value);

    // Redirect to appropriate home page based on admin type
    if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/pages/user_sign-in' || request.nextUrl.pathname === '/pages/user_sign-up' || request.nextUrl.pathname === '/pages/adminLogin') {
      return NextResponse.redirect(new URL('/pages/adminHome', request.url));
    }

    // Restrict access to non-admin pages for admin users
    if (!request.nextUrl.pathname.startsWith('/pages/admin')) {
      return NextResponse.redirect(new URL('/pages/adminHome', request.url));
    }
  } else {
    // If no user or admin data is present, restrict access to protected pages
    // except for the admin login page
    if ((request.nextUrl.pathname.startsWith('/pages/doctor') ||
         request.nextUrl.pathname.startsWith('/pages/patient') ||
         request.nextUrl.pathname.startsWith('/pages/admin')) &&
        request.nextUrl.pathname !== '/pages/adminLogin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/pages/user_sign-in',
    '/pages/user_sign-up',
    '/pages/adminLogin',
    '/pages/doctorHome',
    '/pages/patientHome',
    '/pages/adminHome',
    '/pages/patient/:path*',
    '/pages/doctor/:path*',
    '/pages/admin/:path*',
  ],
};
