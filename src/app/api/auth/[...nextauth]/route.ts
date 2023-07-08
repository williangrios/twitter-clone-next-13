import { createUser } from "@/utils/functions";
import GoogleProvider from "next-auth/providers/google";
import NextAuth, { DefaultSession } from "next-auth";
import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

interface CustomUser extends DefaultSession {
  user: {
    username?: string | undefined;
    name?: string | undefined | null;
    image?: string | undefined | null;
    email?: string | undefined | null;
    uid?: string | undefined;
  };
  expires: string;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.SECRET,
  callbacks: {
    async session({
      session,
      token,
      user,
    }: {
      session: Session;
      token: JWT;
      user: AdapterUser;
    }): Promise<Session | DefaultSession> {
      const mountedUser: CustomUser = createUser(
        token.sub,
        session.user?.name?.split(" ").join("").toLocaleLowerCase(),
        session.user?.email || "",
        session.user?.image || "",
        session.user?.email || "",
        session.expires
      );
      return mountedUser;
    },
  },
});

export { handler as GET, handler as POST };
