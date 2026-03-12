import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Cek apakah user punya "tiket masuk" (cookie dummy kita namain 'isLogin')
  const isLogin = request.cookies.get('isLogin')?.value;

  // Aturan 1: Kalau user mau masuk ke area /portal TAPI belum login
  if (request.nextUrl.pathname.startsWith('/portal') && !isLogin) {
    // Tendang balik ke halaman login!
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Aturan 2: Kalau user mau buka halaman /login TAPI dia udah login
  if (request.nextUrl.pathname.startsWith('/login') && isLogin) {
     // Langsung masukin ke portal, ngapain login lagi kan?
     return NextResponse.redirect(new URL('/portal', request.url))
  }

  // Kalau aman, silakan lewat
  return NextResponse.next()
}