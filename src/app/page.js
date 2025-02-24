"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  if (!user) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <>
      <p className="mx-16 my-5 text-center text-5xl font-bold text-white">
        Welcome Back, {user.firstName}!
      </p>
      <h1 className="mx-16 my-5 text-4xl font-bold text-white">Updates</h1>
    </>
  );
}
