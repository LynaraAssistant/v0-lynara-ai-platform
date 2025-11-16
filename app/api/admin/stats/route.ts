import { NextRequest, NextResponse } from "next/server"
import { getPlatformStats } from "@/utils/firebase/admin"

export async function GET(request: NextRequest) {
  try {
    const stats = await getPlatformStats()
    return NextResponse.json({ success: true, data: stats })
  } catch (error: any) {
    console.error("[v0] Error in GET /api/admin/stats:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
