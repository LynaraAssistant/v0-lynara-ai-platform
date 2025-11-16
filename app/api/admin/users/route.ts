import { NextRequest, NextResponse } from "next/server"
import { getAllUsers } from "@/utils/firebase/admin"

export async function GET(request: NextRequest) {
  try {
    const users = await getAllUsers()
    return NextResponse.json({ success: true, data: users })
  } catch (error: any) {
    console.error("[v0] Error in GET /api/admin/users:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
