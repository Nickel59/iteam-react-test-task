import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export interface JobCardProps {
  readonly id: string;
  readonly title: string;
  readonly employer: string;
  readonly href: Url;
}

export function JobCard({ id, title, employer, href }: JobCardProps) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{employer}</p>
      <Link
        href={`${href}/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Details
        <DoubleArrowRightIcon className="rtl:rotate-180 w-3.5 h-3.5 ms-2" />
      </Link>
    </div>
  );
}
