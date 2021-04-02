import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import Adapters from 'next-auth/adapters';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Google({
      id: 'google',
      name: 'google',
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Providers.Credentials({
      id: 'signUp',
      name: 'signUp',

      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (user) {
          throw new Error('User already exists');
        }
        const hash = bcrypt.hashSync(credentials.password, 10);

        const createdUser = await prisma.user.create({
          data: {
            email: credentials.email,
            password: hash
          }
        });

        return createdUser ? createdUser : undefined;
      }
    }),
    Providers.Credentials({
      id: 'signIn',
      name: 'signIn',

      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'jsmith' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
        if (user) {
          const isCorrect = bcrypt.compareSync(
            credentials.password,
            user.password
          );
          if (!isCorrect) throw new Error('Wrong password');
          return user;
        } else {
          throw new Error('Wrong mail');
        }
      }
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma }),
  session: {
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  pages: {
    signIn: '/login'
  }
});
