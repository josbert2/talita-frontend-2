import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"
import { hash } from "bcrypt";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credencials) {
                const API_URL = 'http://localhost:3001/api/'
                
            
                const response = await fetch(API_URL + 'auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credencials)
                })

                console.log(response)
                return credencials

                const user = await response.json()
                if (!user) {
                    throw new Error('No user found, Invalid credencials')
                }
                const passwrodMatch = await hash.compare(credencials.password, user.password)
                if (!passwrodMatch) {
                    throw new Error('Invalid credencials')
                }

                console.log(user)


                return user 
            }
        })
    ],
    callbacks: {
        jwt({ token, user, account, profile, session }) {
            if (user) return token.user = user
            return token;
        },
        session({
            session, token
        }) {
            session.user = token.user
            return session
        }
    }

})

export { handler as GET, handler as POST } 