import Link from "next/link";
import Navbar from "orchestronic/app/components/navbar";
import { Container } from "postcss";

export default function Projects() {
  return (
    <>
      <Navbar />
      <p className="mx-16 my-5 text-balance text-center text-5xl font-bold text-white">
        Welcome Back, Alex!
      </p>

      <div className="mx-16 my-5 flex items-center justify-between gap-x-16">
        <div className="flex items-center gap-x-8">
          <h1 className="text-balance text-4xl font-bold text-white">
            Projects
          </h1>
          <Link
            type="button"
            className="inline-flex flex-none items-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            href={"/create-project"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-500"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            New Project
          </Link>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="rounded-full bg-white px-6 py-2 text-gray-800 placeholder-gray-400"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </div>
      </div>

      <div className="mx-16 mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="h-32 rounded-lg bg-gray-200">
          <h2 className="ml-4 mt-4 text-2xl font-semibold text-black">
            To-do Lists
          </h2>
        </div>
        <div className="h-32 rounded-lg bg-gray-200"></div>
        <div className="h-32 rounded-lg bg-gray-200"></div>
        <div className="h-32 rounded-lg bg-gray-200"></div>
      </div>
    </>
  );
}
