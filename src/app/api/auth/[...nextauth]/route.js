import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientid: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_KEY,
    }),
  ],
  async signIn({ profile }) {},
  async session({ session }) {},
});

export {handler as GET, handler as POST};


