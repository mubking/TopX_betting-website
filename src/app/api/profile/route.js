import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  console.log("session", { session });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized, please login" });
  }

  try {
    const userInfo = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (userInfo) {
      return NextResponse.json(
        {
          data: userInfo,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "something went wrong",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const payload = await request.json();
  const {username, email} = payload;

  console.log("session", { payload });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized, please login" });
  }

  const usernameExist = await db.user.findUnique({
    where: { username: username },
  });

  if (usernameExist) {
    return NextResponse.json(
      { message: "User with this Username already exist" },
      { status: 400 }
    );
  }

  const emailExist = await db.user.findUnique({
    where: { email: email },
  });

  if (emailExist) {
    return NextResponse.json(
      { message: "User with this email already exist" },
      { status: 400 }
    );
  }

  try {
    const profile = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email
      }
    });
    if (profile) {
      return NextResponse.json(
        {
          message: "Profile successfully updated!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "something went wrong",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
