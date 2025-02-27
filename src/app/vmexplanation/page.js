"use client";

import Link from "next/link";

export default function vmexplanation() {
  return (
    <div>
      {/* Details box */}
      <div className="bg-white mx-16 my-8 py-8 text-black text-x1 font-normal rounded">
        {/* Subtitle */}
        <div className="flex flex-row justify-between items-center">
          <div className="flex-grow flex justify-center">
            <p className="text-3xl font-semibold ml-4">
              Azure Virtual Machine families
            </p>
          </div>
        </div>

        {/* Policy details */}
        <div className="mx-4 my-8">
          <p>
            To ensure efficient use of infrastructure and prevent resource
            over-allocation, all resource requests through the Internal
            Developer Platform (IDP) must comply with the limits and policies.
          </p>
          <ul className="mt-5 ml-4 ">
            <li className="font-semibold">
              A Family{" "}
              <Link
                className="text-blue-500 font-light"
                href={
                  "https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/a-family"
                }
              >
                more information
              </Link>
            </li>
            <ul className="list-disc ml-6">
              The A-series VMs are designed for entry-level workloads. They are
              perfect for development and testing environments, small to
              medium-sized databases, and low-traffic web servers.
            </ul>
            <br />
            <li className="font-semibold">
              B Family{" "}
              <Link
                className="text-blue-500 font-light"
                href={
                  "https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/b-family"
                }
              >
                more information
              </Link>
            </li>
            <ul className="list-disc ml-6">
              The B-series VMs are ideal for workloads with variable performance
              needs. These VMs use a credit-based system, accumulating CPU
              credits during idle times to handle occasional performance bursts.
              They are best suited for small applications, testing, and
              workloads that do not require continuous high CPU usage.
            </ul>
            <br />
            <li className="font-semibold">
              D Family{" "}
              <Link
                className="text-blue-500 font-light"
                href={
                  "https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/general-purpose/d-family?tabs=dpsv6%2Cdpdsv6%2Cdasv6%2Cdalsv6%2Cdv5%2Cddv5%2Cdasv5%2Cdpsv5%2Cdplsv5%2Cdlsv5%2Cdv4%2Cdav4%2Cddv4%2Cdv3%2Cdv2"
                }
              >
                more information
              </Link>
            </li>
            <ul className="list-disc ml-6">
              The D-series VMs are optimized for demanding workloads. With
              faster processors and more memory per core, these VMs are
              well-suited for enterprise-grade applications, moderate to
              high-traffic web servers, and data-intensive tasks.
            </ul>
          </ul>
          <h2 className="font-semibold mt-5 text-red-600">
            For detailed guidance on selecting the appropriate virtual machine
            for your project, please click on `&quot;`more information`&quot;`
            next to each family.
          </h2>
        </div>
      </div>
    </div>
  );
}
