/**
 * Client-Side Rate Limiting
 * 
 * Prevents abuse by limiting login attempts and other actions
 */

interface RateLimitConfig {
  maxAttempts: number
  windowMs: number
  blockDurationMs: number
}

const DEFAULT_CONFIG: RateLimitConfig = {
  maxAttempts: 5,
  windowMs: 60000, // 1 minute
  blockDurationMs: 300000, // 5 minutes
}

/**
 * Rate limiter class
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map()
  private blocked: Map<string, number> = new Map()

  /**
   * Check if action is allowed
   */
  isAllowed(key: string, config: Partial<RateLimitConfig> = {}): boolean {
    const cfg = { ...DEFAULT_CONFIG, ...config }
    const now = Date.now()

    // Check if blocked
    const blockedUntil = this.blocked.get(key)
    if (blockedUntil && now < blockedUntil) {
      return false
    }

    // Clean old attempts
    const attempts = this.attempts.get(key) || []
    const recentAttempts = attempts.filter((time) => now - time < cfg.windowMs)

    // Check if exceeded
    if (recentAttempts.length >= cfg.maxAttempts) {
      this.blocked.set(key, now + cfg.blockDurationMs)
      return false
    }

    return true
  }

  /**
   * Record an attempt
   */
  recordAttempt(key: string): void {
    const now = Date.now()
    const attempts = this.attempts.get(key) || []
    attempts.push(now)
    this.attempts.set(key, attempts)
  }

  /**
   * Get remaining time until unblocked (in seconds)
   */
  getBlockedTime(key: string): number {
    const blockedUntil = this.blocked.get(key)
    if (!blockedUntil) return 0

    const remaining = Math.ceil((blockedUntil - Date.now()) / 1000)
    return Math.max(0, remaining)
  }

  /**
   * Reset attempts for a key
   */
  reset(key: string): void {
    this.attempts.delete(key)
    this.blocked.delete(key)
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter()
