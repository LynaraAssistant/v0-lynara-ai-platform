import { NextRequest, NextResponse } from "next/server"
import { getAllCompanies } from "@/utils/firebase/admin"

export async function GET(request: NextRequest) {
  try {
    const companies = await getAllCompanies()
    return NextResponse.json({ success: true, data: companies })
  } catch (error: any) {
    console.error("[v0] Error in GET /api/admin/companies:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
