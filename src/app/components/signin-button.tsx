import { signIn } from "auth"
import gitlablogo from "public/gitlab-logo-500.svg";
 
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
