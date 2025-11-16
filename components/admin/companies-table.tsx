"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Search, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

interface CompaniesTableProps {
  onStatsUpdate: () => void
}

export default function CompaniesTable({ onStatsUpdate }: CompaniesTableProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [companies, setCompanies] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingCompany, setEditingCompany] = useState<any | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  useEffect(() => {
    loadCompanies()
  }, [])

  const loadCompanies = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/companies")
      const result = await response.json()
      
      if (result.success) {
        setCompanies(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }


  const filteredCompanies = companies.filter(
    (c) =>
      c.nombre_empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveEdit = async () => {
    if (!editingCompany || !user) return

    try {
      const response = await fetch(`/api/admin/companies/${editingCompany.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: editingCompany.plan,
          status: editingCompany.status,
          adminUserId: user.uid,
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Éxito",
          description: "Empresa actualizada correctamente",
        })

        await loadCompanies()
        await onStatsUpdate()
        setEditingCompany(null)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (companyId: string) => {
    if (!user) return

    try {
      const response = await fetch(`/api/admin/companies/${companyId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminUserId: user.uid }),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "Éxito",
          description: "Empresa eliminada correctamente",
        })

        await loadCompanies()
        await onStatsUpdate()
        setDeleteConfirm(null)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const planColors: Record<string, string> = {
    free: "bg-gray-500/20 text-gray-300",
    starter: "bg-blue-500/20 text-blue-300",
    pro: "bg-emerald-500/20 text-emerald-300",
    enterprise: "bg-purple-500/20 text-purple-300",
  }

  const statusColors: Record<string, string> = {
    active: "bg-emerald-500/20 text-emerald-300",
    suspended: "bg-red-500/20 text-red-300",
    inactive: "bg-gray-500/20 text-gray-300",
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-primary text-4xl mb-4">⏳</div>
        <p className="text-muted-foreground">Cargando empresas...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar empresas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Empresa
              </th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Plan
              </th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Estado
              </th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Fecha
              </th>
              <th className="text-right px-4 py-3 text-muted-foreground font-semibold text-sm">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCompanies.map((company) => (
              <tr
                key={company.id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {company.nombre_empresa || "Sin nombre"}
                    </p>
                    <p className="text-xs text-muted-foreground">{company.id}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      planColors[company.plan] || planColors.free
                    }`}
                  >
                    {company.plan || "free"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      statusColors[company.status] || statusColors.inactive
                    }`}
                  >
                    {company.status || "inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-sm">
                  {company.createdAt
                    ? new Date(company.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingCompany(company)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDeleteConfirm(company.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron empresas</p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editingCompany} onOpenChange={() => setEditingCompany(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Empresa</DialogTitle>
          </DialogHeader>
          {editingCompany && (
            <div className="space-y-4">
              <div>
                <Label>Nombre de la empresa</Label>
                <Input
                  value={editingCompany.nombre_empresa || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
              <div>
                <Label>Plan</Label>
                <Select
                  value={editingCompany.plan}
                  onValueChange={(value) =>
                    setEditingCompany({ ...editingCompany, plan: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Estado</Label>
                <Select
                  value={editingCompany.status}
                  onValueChange={(value) =>
                    setEditingCompany({ ...editingCompany, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Activo</SelectItem>
                    <SelectItem value="suspended">Suspendido</SelectItem>
                    <SelectItem value="inactive">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCompany(null)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>
              Esta acción eliminará permanentemente la empresa y todos sus datos,
              incluyendo usuarios y configuraciones. Esta acción no se puede deshacer.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
            >
              Eliminar permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
