/**
 * Input Sanitization Utilities
 * 
 * Protects against XSS and injection attacks
 */

/**
 * Sanitize general text input
 * Removes dangerous HTML tags and scripts
 */
export function sanitizeInput(input: string): string {
  if (!input) return ""
  
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .replace(/[<>]/g, "")
    .trim()
}

/**
 * Sanitize URL input
 * Only allows http(s) protocols
 */
export function sanitizeUrl(url: string): string {
  if (!url) return ""
  
  const trimmed = url.trim()
  
  // Only allow http(s) protocols
  if (!trimmed.match(/^https?:\/\//i)) {
    return ""
  }
  
  return trimmed
}

/**
 * Sanitize email input
 */
export function sanitizeEmail(email: string): string {
  if (!email) return ""
  
  return email.toLowerCase().trim()
}
