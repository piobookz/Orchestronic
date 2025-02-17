import { auth } from "auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session?.user) redirect("/signin");
  
  return (
    <>
      <p className="mx-16 my-5 text-balance text-center text-5xl font-bold text-white">
        Welcome Back, {session.user.name}!
      </p>
      <h1 className="mx-16 my-5 text-balance text-4xl font-bold text-white">
        Updates
      </h1>
      {/* Updates will be shown here */}
      {/* Test */}
      
    </>
  );
}
