'use server'

import { signIn } from "auth"

export async function handleSignIn() {
    "use server"
    await signIn("gitlab")
}