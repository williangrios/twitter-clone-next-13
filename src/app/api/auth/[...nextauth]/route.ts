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
  // secret: process.env.SECRET,
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
      const mountedUser: CustomUser = {
        user: {
          username: session.user?.name?.split(" ").join("").toLocaleLowerCase(),
          email: session.user?.email,
          name: session.user?.name,
          image: session.user?.image,
          uid: token.sub,
        }, 
        expires: session.expires,
      };

      return mountedUser;
    },
  },
});

export { handler as GET, handler as POST };
