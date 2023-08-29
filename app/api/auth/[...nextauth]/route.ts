import { db } from "@/db/dbClient"
import { users } from "@/db/schema"
import origin from "@/lib/utils"
import { eq } from "drizzle-orm"
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcrypt"


export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt"
  },
  providers: [

    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      profile: async (profile) => {
        try {
          
          let user = await db.insert(users).values({
            email: profile.email,
            image: profile.avatar_url,
            bio: profile.bio,
            name: profile.name,
            socialMediaUser: true,
          }).onConflictDoUpdate({target: users.email, set: {email: profile.email}}) // Setting 'email: profile.email' To ensure user's data remain unchanged
          .returning()
  
          return {
            ...profile,
            name: user[0].name,
            image: user[0].image,
            pgUUID: user[0].uuid,
            onboarded: user[0].onboarded,
            bio: user[0].bio
          }
        } catch (error: any) {
          console.log(error.message)
        } finally {
         
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      profile: async (profile) => {
        console.log("from nextauth route google profile callback: ", {profile})
        try {
          
          let user = await db.insert(users).values({
            email: profile.email,
            image: profile.avatar_url,
            bio: profile.bio,
            name: profile.name,
            socialMediaUser: true,
          }).onConflictDoUpdate({target: users.email, set: {email: profile.email}}) // Setting 'email: profile.email' To ensure user's data remain unchanged
          .returning()
  
          return {
            ...profile,
            id: user[0].uuid,
            name: user[0].name,
            image: user[0].image,
            pgUUID: user[0].uuid,
            onboarded: user[0].onboarded,
            bio: user[0].bio
          }
          
        } catch (error: any) {
          console.log(error.message)
        } 
      },
    }),

    CredentialsProvider({
        credentials: {
            email: {}, 
            password: {},
        },
        async authorize(credentials) {

          if(!credentials?.email || !credentials?.password) return null

          const user = await db.query.users.findFirst({where: eq(users.email, credentials.email)})

          

          if(!user || !user.password) return null

          const isPasswordMatch = await bcrypt.compare(credentials.password, user?.password)

          if(!isPasswordMatch) return null

          return {...user, pgUUID: user.uuid, bio: user.bio}
        },
    })
  ],
  
  callbacks: {
    async jwt({token,user, trigger, session}) {

      if(trigger === "update" && session){
        console.log("from jwt updte: ",{token})
        token.picture = session.user.image
        return {...token, ...session.user}
      }
      
      if(user) {
        token.pgUUID = user.pgUUID
        token.onboarded = user.onboarded
        token.picture = user.image
        token.bio = user.bio
      }
      return token
    },

    async session({session,token}) {
      if(session.user && token.pgUUID) {
        session.user.pgUUID = token.pgUUID as string
        session.user.onboarded = token.onboarded as boolean
        session.user.image = token.picture
        session.user.name = token.name
        session.user.bio = token.bio as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: `${origin}login`,
    newUser: `${origin}onboarding`
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }