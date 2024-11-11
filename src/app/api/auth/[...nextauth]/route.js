// import NextAuth from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// import User from '@/models/user';
// import { connectToDB } from '@/utils/db';
// import bcrypt from 'bcryptjs';

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: { label: 'Email', type: 'email' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         try {
//           // Connect to the database
//           await connectToDB();

//           // Find the user by email
//           const user = await User.findOne({ email: credentials.email });

//           // If no user or invalid password, return null
//           if (!user) {
//             throw new Error('No user found with that email.');
//           }

//           // Compare the entered password with the hashed password stored in the DB
//           const isValidPassword = await bcrypt.compare(credentials.password, user.password);

//           if (!isValidPassword) {
//             throw new Error('Incorrect password.');
//           }

//           // Return the user object if credentials are valid
//           return { id: user._id.toString(), email: user.email, username: user.username };
//         } catch (error) {
//           console.error('Error during authorization:', error.message);
//           return null;
//         }
//       },
//     })
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       // Attach user ID to the session
//       const sessionUser = await User.findById(user.id);
//       session.user.id = sessionUser._id.toString();
//       session.user.username = sessionUser.username;
//       return session;
//     },
//     async jwt({ token, user }) {
//       // If a user object is available, add user data to the JWT token
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//       }
//       return token;
//     }
//   },
//   pages: {
//     signIn: '/auth/signin', // Customize the login page URL if needed
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET, // Ensure you have a secret in your .env file
// });

// export { handler as GET, handler as POST };
