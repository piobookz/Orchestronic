import NextAuth from "next-auth"
import GitLab from "next-auth/providers/gitlab"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  debug: true,
  providers: [GitLab]
})
