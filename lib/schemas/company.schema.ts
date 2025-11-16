import { z } from "zod"

// Schema para datos de empresa
export const companyDataSchema = z.object({
  nombre_empresa: z.string().min(2, "El nombre de la empresa es requerido").optional(),
  sector: z.string().optional(),
  sitio_web: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
  descripcion_servicios: z.string().max(1000, "Máximo 1000 caracteres").optional(),
  tono_comunicacion: z.enum(["formal", "casual", "mixto", ""]).optional(),
  idioma_principal: z.string().optional(),
  tipo_clientes: z.string().max(500, "Máximo 500 caracteres").optional(),
  contexto_adicional: z.string().max(2000, "Máximo 2000 caracteres").optional(),
})

export type CompanyData = z.infer<typeof companyDataSchema>

// Schema para actualización de empresa
export const updateCompanySchema = companyDataSchema.partial()

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>
