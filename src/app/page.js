"use client";

import Navbar from "orchestronic/app/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <p className="mx-16 my-5 text-balance text-center text-5xl font-bold text-white">
        Welcome Back, Alex!
      </p>
      <h1 className="mx-16 my-5 text-balance text-4xl font-bold text-white">
        Updates
      </h1>
      {/* Updates will be shown here */}
    </>
  );
}
