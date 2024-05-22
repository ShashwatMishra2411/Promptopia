import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import {connectToDB} from "@/utils/db";
import User from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientid: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET_KEY,
    }),
  ],
  async signIn({ profile }) {
    try {
      await connectToDB();
      // check whether the user already exists in the database
      const userExists = await User.findOne({email: profile.email});
      // if not, create a new user
      if(!userExists){
        const newUser = new User({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image: profile.picture,
        });
        await newUser.save();
      }
    } catch (error) {
      console.log(error);
    }
  },
  async session({ session }) {
    const sessionUser = await User.findOne({email: session.user.email});
    session.user.id = sessionUser._id.toString();
    return session;
  },
});

export { handler as GET, handler as POST };