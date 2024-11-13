import Navbar from "orchestronic/app/components/navbar";
import gitlab from "../../../public/gitlab-logo-500.svg";
import Image from "next/image";

export default function Projectdetail() {
  return (
    <div>
      <Navbar></Navbar>
      {/* Project Title */}
      <p className="text-4xl font-bold mx-16 my-5">Todo List</p>
      {/* Project Details box */}
      <div className="bg-white mx-16 mt-8 text-black text-xl rounded font-normal h-dvh">
        {/* subtitle */}
        <div className="flex flex-row justify-between items-center">
          <p className="text-2xl font-medium ml-4 mt-5">Application Details</p>
          <button className="mr-4 mt-5 text-sm text-white bg-[#29B95F] rounded py-2 px-2">
            Send Request
          </button>
        </div>
        {/* Project name, description and source */}
        <div className="grid grid-rows-1 grid-flow-col gap-3 items-top mt-5">
          <div>
            <p className="text-xl font-bold mx-16 mt-5">Application name</p>
            <p className="text-lg font-normal ml-16">Todo list</p>
          </div>
          <div>
            <p className="text-xl font-bold mx-16 mt-5">Description</p>
            <p className="text-lg font-normal ml-16">Todo Application</p>
            <p></p>
          </div>
          <div>
            <p className="text-xl font-bold mx-16 mt-5">Repository</p>
            <div className="flex flex-row mx-16">
              <Image src={gitlab} width="45" height="45" alt="logo"></Image>
              <p className="text-lg font-normal flex items-center">
                example/todo-list
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
