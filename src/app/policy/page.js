import Link from "next/link";
import Navbar from "../components/navbar";

export default function PolicyDetails() {
    return (
        <div>
            <Navbar />
            {/* Details box */}
            <div className="bg-white mx-16 my-8 py-8 text-black text-x1 rounded font-normal">

                {/* Subtitle */}
                <div className="flex flex-row justify-between items-center">
                    <p className="text-3xl font-semibold ml-4">
                        Resource Allocation Terms and Policies
                    </p>
                    <Link className="mr-4 py-2 px-10 text-sm text-black bg-[#E3E3E3] rounded" href="/policyedit">
                        Edit
                    </Link>
                </div>

                {/* Policy details */}
                <div>
                    
                </div>
            </div>
        </div>
    );
}