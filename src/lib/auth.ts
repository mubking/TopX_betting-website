import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";
import { User as PrismaUser } from "@prisma/client";

// Define the type for credentials
interface Credentials {
  username: string;
  password: string;
}

// Define the type for the user returned from the `authorize` function
interface NextAuthUser {
  id: string;
  username: string;
  email: string;
}

// Extend the session user type
interface SessionUser {
  id: string;
  username: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET, 
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", 
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "e.g johnsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Credentials): Promise<NextAuthUser | null> {
        console.log(credentials)
        if (!credentials?.username || !credentials?.password) {
          console.error("Username and password are required");
          return null;
        }

        const user = await db.user.findUnique({
          where: { username: credentials.username },
        }) as PrismaUser;

        if (!user) {
          console.error("No user found with this username");
          return null; // Return null if user is not found
        }

        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          console.error("Invalid password");
          return null; // Return null if password is incorrect
        }

        // Return user object if authentication is successful
        return {
          id: user.id.toString(), // Ensure ID is returned as a string
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as NextAuthUser).id; // Type casting for ID
        token.username = (user as NextAuthUser).username;
        token.email = (user as NextAuthUser).email;
      }
      return token;
    },
    async session({ session, token }) {
        // console.log("session, token",session, token);
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id, // Include the user's ID in the session.user object
            username: token.username,
            email: token.email,
          },
        };
      },
    }
  };