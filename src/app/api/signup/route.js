import { db } from "../../../lib/db";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const payload = await request.json();
    const { username, email, password } = payload;

    console.log("Received payload:", payload); // Debugging log

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    } else if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    } else if (!password) {
      return NextResponse.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const usernameExist = await db.user.findUnique({
      where: { username: username },
    });

    if (usernameExist) {
      return NextResponse.json(
        { user: null, message: "User with this Username already exists" },
        { status: 400 }
      );
    }

    const emailExist = await db.user.findUnique({
      where: { email: email },
    });

    if (emailExist) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        username: username,
        email: email,
        password: hashPassword,
      },
    });

    console.log("New user created:", newUser); // Debugging log

    return NextResponse.json(
      { user: newUser, message: "User Successfully Registered" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during registration:", error); // Debugging log
    return NextResponse.json(
      { message: "Registration Failed" },
      { status: 500 }
    );
  }
}
