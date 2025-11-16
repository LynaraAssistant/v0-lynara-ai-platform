import { NextRequest, NextResponse } from "next/server"
import { updateCompanyPlan, deleteCompany } from "@/utils/firebase/admin"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { plan, status, adminUserId } = body

    await updateCompanyPlan(params.id, plan, status, adminUserId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error in PATCH /api/admin/companies:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { adminUserId } = body

    await deleteCompany(params.id, adminUserId)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[v0] Error in DELETE /api/admin/companies:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
