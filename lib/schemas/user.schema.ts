import { z } from "zod"

// Schema para datos de usuario
export const userDataSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").optional(),
  email: z.string().email("Debe ser un correo electrónico válido").optional(),
  telefono: z.string().optional(),
  cargo: z.string().optional(),
  departamento: z.string().optional(),
})

export type UserData = z.infer<typeof userDataSchema>

// Schema para actualización de perfil
export const updateProfileSchema = userDataSchema.partial()

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>
