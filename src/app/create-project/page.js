import Link from "next/link";
import Image from "next/image";
import gitlab from "../../../public/gitlab-logo-500.svg";

export default function CreateProject() {
  return (
    <>
      <h1 className="mx-16 my-10 text-4xl font-bold dark:text-white">
        Create a New Project
      </h1>

      <section className="mx-16 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold capitalize text-gray-700 dark:text-white">
          General Information
        </h2>

        <form className="space-y-8">
          {/* Git Repository Section */}
          <div>
            <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col items-center space-x-4">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Git Repository
                </label>
                {/* GitLab Logo */}
                <div className="inline-flex justify-center items-center">
                  <Image
                    src={gitlab}
                    width="45"
                    height="45"
                    alt="GitLab logo"
                  />
                  <span className="text-black">GitLab</span>
                </div>
              </div>

              {/* Repository Selection */}
              <div>
                <label
                  htmlFor="repository"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Select Repository
                </label>
                <select
                  id="repository"
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  <option value="">Please select</option>
                  <option value="repo1">Repo 1</option>
                  <option value="repo2">Repo 2</option>
                </select>
              </div>
            </div>
          </div>

          {/* Branch and Root Application Path Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Branch Selection */}
            <div>
              <label
                htmlFor="branch"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Branch
              </label>
              <select
                id="branch"
                className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="main">Main</option>
                <option value="develop">Develop</option>
                <option value="feature">Feature</option>
              </select>
            </div>

            {/* Root Application Path */}
            <div>
              <label
                htmlFor="rootPath"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Root Application Path
              </label>
              <input
                id="rootPath"
                type="text"
                placeholder="/"
                className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              />
            </div>
          </div>

          {/* Application Details Section */}
          <div>
            <label
              htmlFor="applicationName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Application Name
            </label>
            <input
              id="applicationName"
              type="text"
              placeholder="Example-Application"
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Example application"
              className="mt-2 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-400 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
              rows="4"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            {/* Cancel Button */}
            <button
              type="button"
              className="rounded-md bg-gray-200 px-7 py-2 text-sm font-medium text-black transition hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-200 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            {/* Save Button */}
            <button
              type="submit"
              className="rounded-md bg-green-500 px-8 py-2 text-sm font-medium text-white transition hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
