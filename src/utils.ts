import type { JobDetailsSchema } from "@/rapid-api-fetch";

export type JobObject = Required<Pick<Exclude<JobDetailsSchema["data"], undefined>[number], "job_id">> &
  Exclude<JobDetailsSchema["data"], undefined>[number];

export function getLikedJobObjects(): readonly JobObject[] {
  const likedJobOffersString = localStorage.getItem("likedJobs");
  return likedJobOffersString ? JSON.parse(likedJobOffersString) : [];
}

export function addLikedJobOffer(jobObject: JobObject) {
  const jobOffers = [...getLikedJobObjects()];
  jobOffers.push(jobObject);
  localStorage.setItem("likedJobs", JSON.stringify(jobOffers));
}

export function removeLikedJobOffer(jobId: string) {
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
  const userString = localStorage.getItem("user");
  return userString ? JSON.parse(userString) : null;
}

export function saveUser(email: string, name: string, desiredJobTitle: string, aboutMe: string) {
  localStorage.setItem("user", JSON.stringify({ email, name, desiredJobTitle, aboutMe }));
}

export function removeUser() {
  localStorage.removeItem("user");
}
