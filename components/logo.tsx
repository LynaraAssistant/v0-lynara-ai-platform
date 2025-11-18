"use client"

interface LogoProps {
  size?: "sm" | "md" | "lg"
}

export function Logo({ size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  return (
    <div className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-1 text-primary"
      >
        <rect width="32" height="32" rx="6" fill="currentColor" className="text-primary" />
        <g>
          <rect x="8" y="6" width="4" height="20" rx="2" fill="#0B132B" />
          <rect x="8" y="22" width="16" height="4" rx="2" fill="#0B132B" />
          <circle cx="26" cy="10" r="2" fill="#0B132B" opacity="0.6" />
        </g>
      </svg>
    </div>
  )
}

export default Logo
