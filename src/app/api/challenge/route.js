import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export async function GET() {
  try {
    // const session = await getServerSession();

    // if (!session) {
    //   return NextResponse.json(
    //     { message: "Unauthorized please login" },
    //     { status: 401 }
    //   );
    // }

    const challenges = await db.challenge.findMany({
      include: {
        user: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ data: challenges }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        { message: "Please check your internet connection" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
