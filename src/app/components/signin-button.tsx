import { signIn } from "auth"
 
export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("gitlab", { redirectTo: "/" })
      }}
    >
      <button type="submit">Sign in with GitLab</button>
    </form>
  )
}
