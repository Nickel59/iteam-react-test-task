import type { JobDetailsSchema } from "@/rapid-api-fetch";

export type JobObject = Required<Pick<Exclude<JobDetailsSchema["data"], undefined>[number], "job_id">> &
  Exclude<JobDetailsSchema["data"], undefined>[number];

export function getLikedJobObjects(): readonly JobObject[] {
  if (localStorageUndefined()) {
    return [];
  }
  const likedJobOffersString = localStorage.getItem("likedJobs");
  return likedJobOffersString ? JSON.parse(likedJobOffersString) : [];
}

export function addLikedJobOffer(jobObject: JobObject) {
  if (localStorageUndefined()) {
    return;
  }
  const jobOffers = [...getLikedJobObjects()];
  jobOffers.push(jobObject);
  localStorage.setItem("likedJobs", JSON.stringify(jobOffers));
}

export function removeLikedJobOffer(jobId: string) {
  if (localStorageUndefined()) {
    return;
  }
  localStorage.setItem(
    "likedJobs",
    JSON.stringify([...getLikedJobObjects()].filter((jobObject) => jobObject.job_id !== jobId)),
  );
}

export function getUser(): {
  readonly email: string;
  readonly name: string;
  readonly desiredJobTitle: string;
  readonly aboutMe: string;
} | null {
  if (localStorageUndefined()) {
    return null;
  }
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
}

export function saveUser(email: string, name: string, desiredJobTitle: string, aboutMe: string) {
  if (localStorageUndefined()) {
    return;
  }
  localStorage.setItem("user", JSON.stringify({ email, name, desiredJobTitle, aboutMe }));
}

export function removeUser() {
  if (localStorageUndefined()) {
    return;
  }
  localStorage.removeItem("user");
}

function localStorageUndefined() {
  return typeof window !== "undefined";
}
