"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, Search, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllUsers, updateUserRole, deleteUser } from "@/utils/firebase/admin"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/hooks/use-toast"

export default function UsersTable() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingUser, setEditingUser] = useState<any | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ companyId: string; userId: string } | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await getAllUsers()
      setUsers(data)
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

  const filteredUsers = users.filter(
    (u) =>
      u.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.companyName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSaveEdit = async () => {
    if (!editingUser || !user) return

    try {
      await updateUserRole(
        editingUser.companyId,
        editingUser.id,
        editingUser.role,
        user.uid
      )

      toast({
        title: "Éxito",
        description: "Usuario actualizado correctamente",
      })

      await loadUsers()
      setEditingUser(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!deleteConfirm || !user) return

    try {
      await deleteUser(deleteConfirm.companyId, deleteConfirm.userId, user.uid)

      toast({
        title: "Éxito",
        description: "Usuario eliminado correctamente",
      })

      await loadUsers()
      setDeleteConfirm(null)
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  const roleColors: Record<string, string> = {
    admin: "bg-purple-500/20 text-purple-300",
    user: "bg-blue-500/20 text-blue-300",
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin text-primary text-4xl mb-4">⏳</div>
        <p className="text-muted-foreground">Cargando usuarios...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="flex-1 max-w-sm relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Usuario
              </th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Rol
              </th>
              <th className="text-left px-4 py-3 text-muted-foreground font-semibold text-sm">
                Empresa
              </th>
              <th className="text-right px-4 py-3 text-muted-foreground font-semibold text-sm">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((userItem) => (
              <tr
                key={`${userItem.companyId}-${userItem.id}`}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {userItem.nombre || "Sin nombre"}
                    </p>
                    <p className="text-xs text-muted-foreground">{userItem.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      roleColors[userItem.role] || roleColors.user
                    }`}
                  >
                    {userItem.role || "user"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground text-sm">
                  {userItem.companyName}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingUser(userItem)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        setDeleteConfirm({
                          companyId: userItem.companyId,
                          userId: userItem.id,
                        })
                      }
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

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron usuarios</p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuario</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <div className="space-y-4">
              <div>
                <Label>Nombre</Label>
                <Input value={editingUser.nombre || ""} disabled className="bg-muted" />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={editingUser.email || ""} disabled className="bg-muted" />
              </div>
              <div>
                <Label>Rol</Label>
                <Select
                  value={editingUser.role}
                  onValueChange={(value) =>
                    setEditingUser({ ...editingUser, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Usuario</SelectItem>
                    <SelectItem value="admin">Administrador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Empresa</Label>
                <Input
                  value={editingUser.companyName || ""}
                  disabled
                  className="bg-muted"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingUser(null)}>
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
              Esta acción eliminará permanentemente el usuario y todos sus datos. Esta
              acción no se puede deshacer.
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Eliminar permanentemente
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
