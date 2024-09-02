"use client";

import Link from "next/link";
import React from "react";

import { JobLikeButton } from "@/components/job-like-button";
import { type JobObject, getLikedJobObjects } from "@/utils";

export default function LikedJobs() {
  const [likedJobObjects, setLikedJobObjects] = React.useState<readonly JobObject[]>([]);

  React.useEffect(() => {
    setLikedJobObjects(getLikedJobObjects());
  }, []);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <tbody>
          {likedJobObjects.map((jobObject) => (
            <tr key={jobObject.job_id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link
                  href={`/job-details/${jobObject.job_id}`}
                  className="text-sm text-gray-500 dark:text-white hover:underline"
                >
                  {jobObject.job_title} at {jobObject.employer_name}
                </Link>
              </th>
              <td className="px-6 py-4">
                <p className="alig flex flex-row-reverse place-items-center">
                  <JobLikeButton jobObject={jobObject} />
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
