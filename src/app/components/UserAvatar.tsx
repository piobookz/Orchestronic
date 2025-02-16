import { auth } from "auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
      <img src={session.user.image} alt="User Avatar" className="h-10 w-10 rounded-full mr-4 hover:ring" />
  )
}