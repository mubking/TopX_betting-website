import { NextResponse } from "next/server";
import { _xX } from "../../../lib/_hjs";

export async function POST(request) {
  try {
    const { email, amount } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { message: "Email and amount are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: (amount * 100).toString(), // Convert to kobo
          callback_url: "http://localhost:3000/dashboard",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message },
        { status: response.status }
      );
    }

    const data = await response.json();
    const encrytedreference = _xX(data.data.reference);
    return NextResponse.json({
      url: data.data.authorization_url,
      reference: encrytedreference,
    });
  } catch (error) {
    console.error("Error initializing transaction:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
