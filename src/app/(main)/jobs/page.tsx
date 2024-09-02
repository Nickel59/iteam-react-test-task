"use client";

import React from "react";
import useSWR from "swr";

import { fetchJobs } from "@/app/(main)/jobs/actions";
import { JobCard } from "@/components/job-card";
import { type User, getUser } from "@/utils";

interface Props {
  readonly searchParams: { readonly q?: string };
}

export default function JobsPage({ searchParams }: Props) {
  const [user, setUser] = React.useState<User>(null);
  const q = searchParams.q ?? user?.desiredJobTitle;
  const { data, isLoading, error } = useSWR(`jobs ${q}`, q ? () => fetchJobs(q) : null, {
    revalidateOnFocus: false,
    revalidateOnMount: true,
    revalidateOnReconnect: false,
    refreshWhenOffline: false,
    refreshWhenHidden: false,
    refreshInterval: 0,
  }); // this api is expensive, do not refetch;

  React.useEffect(() => {
    setUser(getUser());
  }, []);

  if (isLoading) {
    return undefined;
  }

  if (error) {
    return "Something went wrong";
  }

  if (!data?.length) {
    return <h1 className="text-lg font-semibold">Couldn't find anything</h1>;
  }

  return (
    <div className="flex flex-col gap-2">
      {user && !searchParams.q && <h1 className="text-lg font-semibold">Jobs for you</h1>}
      {data?.map((obj: Record<string, unknown>) => (
        <JobCard
          key={obj?.job_id as string}
          id={obj?.job_id as string}
          title={obj?.job_title as string}
          employer={obj?.employer_name as string}
          href="/job-details"
        />
      ))}
    </div>
  );
}
