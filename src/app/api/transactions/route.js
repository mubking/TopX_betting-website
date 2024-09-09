import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { db } from "../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session)
  const { email } = session.user;

  try {
    const transaction = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        transactions: true,
      },
    });
    if (transaction) {
      return NextResponse.json({ transaction, status: 200 });
    } else {
      return NextResponse.json({
        message: "Could not get transactions",
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong", status: 500 });
  }
}
