import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: "Login with email",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "ankuar@1" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            const username = credentials?.username;
            const password = credentials?.password;

            // db request to check if the username and password are correct

            const user = {
                name: "lalith",
                id: "1",
                username:"lalith_1"
            }
            
            if(user){
                return user;
            }
            else {
                return null;
            }
          }
        }),
        GoogleProvider({
          clientId: "process.env.GOOGLE_CLIENT_ID",
          clientSecret: "process.env.GOOGLE_CLIENT_SECRET"
        })
      ],
      secret:process.env.NEXTAUTH_SECRET
})

export { handler as GET, handler as POST }