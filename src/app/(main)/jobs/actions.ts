"use server";

import { getJobs } from "@/rapid-api-fetch";

export async function fetchJobs(q: string) {
  return await getJobs(q);
}
