import { JobLikeButton } from "@/components/job-like-button";
import { getJobDetails } from "@/rapid-api-fetch";
import type { JobObject } from "@/utils";

interface Props {
  readonly params: { readonly id: string };
}

export default async function JobDetails({ params }: Props) {
  const data = await getJobDetails(params.id).catch(() => null);

  if (!data) {
    return "Unknown error";
  }
  data.job_id ??= "";

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">{data.job_title}</h1>
        <JobLikeButton jobObject={data as JobObject} />
      </div>
      <dl className="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
        {(
          [
            ["Employer", data.employer_name],
            ["City", data.job_city],
            ["Country", data.job_country],
            ["Type", data.job_employment_type],
          ] as const
        ).map(([name, value]) => (
          <DataListEntry key={name} name={name} value={value} />
        ))}
      </dl>
    </>
  );
}

function DataListEntry({ name, value }: { readonly name: string; readonly value: string | undefined }) {
  return (
    value && (
      <div className="flex flex-col py-3">
        <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">{name}</dt>
        <dd className="text-lg font-semibold">{value}</dd>
      </div>
    )
  );
}
