/**
 * Testing Utilities
 * 
 * Mock functions for testing authentication and Firestore data
 */

import type { User } from "firebase/auth"

/**
 * Mock authenticated user for testing
 */
export function mockAuthUser(overrides?: Partial<User>): User {
  const defaultUser = {
    uid: "test-user-id",
    email: "test@example.com",
    emailVerified: true,
    displayName: "Test User",
    photoURL: null,
    phoneNumber: null,
    isAnonymous: false,
    tenantId: null,
    providerData: [],
    metadata: {
      creationTime: new Date().toISOString(),
      lastSignInTime: new Date().toISOString(),
    },
    refreshToken: "mock-refresh-token",
    providerId: "firebase",
    delete: async () => {},
    getIdToken: async () => "mock-id-token",
    getIdTokenResult: async () => ({
      token: "mock-id-token",
      claims: {},
      authTime: new Date().toISOString(),
      issuedAtTime: new Date().toISOString(),
      expirationTime: new Date(Date.now() + 3600000).toISOString(),
      signInProvider: "password",
      signInSecondFactor: null,
    }),
    reload: async () => {},
    toJSON: () => ({}),
  } as unknown as User

  return { ...defaultUser, ...overrides } as User
}

/**
 * Mock Firestore company data for testing
 */
export function mockCompanyData(overrides?: Record<string, any>) {
  return {
    businessName: "Test Company",
    sector: "Technology",
    communicationTone: "Professional",
    brandStyle: "Modern",
    serviceType: "B2B SaaS",
    teamSize: "1-10",
    businessDescription: "Test business description",
    businessHours: "9:00 - 18:00",
    timezone: "UTC",
    country: "Spain",
    city: "Madrid",
    websiteUrl: "https://test.com",
    customerTypes: "Small businesses",
    additionalContext: "Test context",
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

/**
 * Mock Firestore user data for testing
 */
export function mockUserData(overrides?: Record<string, any>) {
  return {
    fullName: "Test User",
    email: "test@example.com",
    phone: "+34600000000",
    country: "Spain",
    city: "Madrid",
    language: "es",
    role: "user",
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}

/**
 * Mock Firestore operational data for testing
 */
export function mockOperationalData(overrides?: Record<string, any>) {
  return {
    totalConversations: 0,
    activeAutomations: 0,
    lastActivity: new Date().toISOString(),
    ...overrides,
  }
}
