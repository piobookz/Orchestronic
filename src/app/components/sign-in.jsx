"use client";

import { handleSignIn } from './actions'

export default function SignInButton() {
  return (
      <button onClick={() => handleSignIn()}>Signin with GitLab</button>
  )
}