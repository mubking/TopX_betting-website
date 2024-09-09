import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const session = getServerSession(authOptions);
  const { email } = (await session).user;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" });
    }

    const totalDeposits = await db.transaction.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        userId: user.id,
        status: "success",
      },
    });

    return NextResponse.json({
      success: true,
      balance: totalDeposits._sum.amount || 0,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Could not get balance",
    });
  }
}
