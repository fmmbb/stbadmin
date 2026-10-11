'use client'

import Logout from "../actions/logout"
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const router = useRouter()

  // Check if pathname matches /users/[something] but not /users
  const showBackButton = /^\/users\/[^/]+$/.test(pathname)

  return (
    <div className="sticky top-0">
      <nav className="flex justify-between items-center px-5 bg-white py-3">
        
        {/* Left: Go Back button if needed */}
        <div className="w-1/5 flex items-center">
          {showBackButton && (
            <div
              onClick={() => router.back()}
              className="flex items-center cursor-pointer "
            >
              {/* SVG back arrow */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Back</span>
            </div>
          )}
        </div>

        {/* Center/Right: Header */}
        <header className="font-bold text-center w-3/5">SOUTHERN TRUSTS</header>

        {/* Right: Logout / empty space */}
        <div className="w-1/5 flex justify-end">
          {pathname === '/login' ? null : (
            <div onClick={Logout} className="flex justify-end cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-600 lucide lucide-log-out-icon lucide-log-out"
              >
                <path d="m16 17 5-5-5-5" />
                <path d="M21 12H9" />
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              </svg>
            </div>
          )}
        </div>

      </nav>
      <hr className="text-gray-100" />
    </div>
  )
}