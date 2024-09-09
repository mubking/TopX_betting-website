import axios from "axios";
import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";

export async function POST(req) {
  const payload = await req.json();
  const session = await getServerSession(authOptions);
  console.log(session)
  const { email } = session.user;
  console.log(payload);
  const { reference } = payload;

  console.log(reference);

  if (!payload) {
    return NextResponse.json({ error: "reference is required" });
  }

  const config = {
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      config
    );

    console.log(response);

    if (response.data.status && response.data.data.status === "success") {
      const amount = response.data.data.amount / 100;

      console.log({ amount, email });
      
      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json({ success: false }, { status: 404 });
      }

       // Step 3: Record the transaction in the Transaction table
       await db.transaction.create({
        data: {
          userId: user.id,
          amount,
          reference,
          status: 'success',  // Mark the transaction as successful
        },
      });

       // Step 4: Update the user's balance
       const updatedUser = await db.user.update({
        where: { email },
        data: {
          balance: {
            increment: amount,  
          },
        },
      });

      
      return NextResponse.json(
        {
          success: true,
          message: "Transaction successful and balance updated",
          balance: updatedUser.balance,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Transaction verification failed or incomplete",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
