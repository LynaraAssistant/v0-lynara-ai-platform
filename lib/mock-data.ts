// Mock data for admin panel - replace with Firestore queries in production
export const mockCompanies = [
  { id: "1", name: "Tech Startup Inc", plan: "pro", status: "active", domain: "techstartup.com" },
  { id: "2", name: "Digital Solutions Co", plan: "enterprise", status: "active", domain: "digitalsol.com" },
  { id: "3", name: "Creative Agency", plan: "starter", status: "suspended", domain: "creativeatr.com" },
]

export const mockUsers = [
  { id: "1", name: "Juan Pérez", email: "juan@techstartup.com", role: "admin", company: "Tech Startup Inc" },
  { id: "2", name: "María García", email: "maria@digitalsol.com", role: "user", company: "Digital Solutions Co" },
  { id: "3", name: "Carlos López", email: "carlos@creativeatr.com", role: "user", company: "Creative Agency" },
  { id: "4", name: "Ana Martínez", email: "ana@techstartup.com", role: "user", company: "Tech Startup Inc" },
]

export const mockAutomations = [
  {
    id: "1",
    name: "Email Campaign",
    company: "Tech Startup Inc",
    status: "running",
    lastExecution: "2024-11-07 10:30",
  },
  {
    id: "2",
    name: "Data Sync",
    company: "Digital Solutions Co",
    status: "completed",
    lastExecution: "2024-11-07 09:15",
  },
  { id: "3", name: "Report Generator", company: "Creative Agency", status: "error", lastExecution: "2024-11-07 08:00" },
]
