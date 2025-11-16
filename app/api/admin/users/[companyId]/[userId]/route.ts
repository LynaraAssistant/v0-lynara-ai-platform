import { NextRequest, NextResponse } from "next/server"
import { updateUserRole, deleteUser } from "@/utils/firebase/admin"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { companyId: string; userId: string } }
) {
  try {
    const body = await request.json()
    const { role, adminUserId } = body

    await updateUserRole(params.companyId, params.userId, role, adminUserId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error in PATCH /api/admin/users:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { companyId: string; userId: string } }
) {
  try {
    const body = await request.json()
    const { adminUserId } = body

    await deleteUser(params.companyId, params.userId, adminUserId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error in DELETE /api/admin/users:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
