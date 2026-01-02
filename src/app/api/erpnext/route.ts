import { NextResponse } from "next/server";
import { testConnection, getSalesInvoices, getInvoiceStats } from "@/lib/erpnext";
import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  const session = await auth();
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "test") {
      const result = await testConnection();
      return NextResponse.json(result);
    }

    if (action === "stats") {
      const stats = await getInvoiceStats();
      return NextResponse.json(stats);
    }

    const limit = parseInt(searchParams.get("limit") || "20");
    const invoices = await getSalesInvoices(limit);
    return NextResponse.json({ data: invoices });
  } catch (error) {
    console.error("ERPNext API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch from ERPNext" },
      { status: 500 }
    );
  }
}
