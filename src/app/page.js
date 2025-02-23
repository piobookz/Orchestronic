import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Sign in to view this page</div>;
  }

  const user = await currentUser();

  return (
    <>
      <p className="mx-16 my-5 text-balance text-center text-5xl font-bold text-white">
        Welcome Back, {user.firstName}!
      </p>
      <h1 className="mx-16 my-5 text-balance text-4xl font-bold text-white">
        Updates
      </h1>
      {/* Updates will be shown here */}
    </>
  );
}
