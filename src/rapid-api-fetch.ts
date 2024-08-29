import axios from "axios";

export interface JobSearchSchema {
  status?: string;
  request_id?: string;
  parameters?: {
    query?: string;
    page?: number;
    num_pages?: number;
    [k: string]: unknown;
  };
  data?: {
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

export interface JobDetailsSchema {
  status?: string;
  request_id?: string;
  parameters?: {
    job_id?: string;
    extended_publisher_details?: boolean;
    [k: string]: unknown;
  };
  data?: {
    employer_name?: string;
    employer_logo?: string;
    employer_website?: string;
    employer_company_type?: string;
    job_publisher?: string;
    job_id?: string;
    job_employment_type?: string;
    job_title?: string;
    job_apply_link?: string;
    job_apply_is_direct?: boolean;
    job_apply_quality_score?: number;
    job_description?: string;
    job_is_remote?: boolean;
    job_posted_at_timestamp?: number;
    job_posted_at_datetime_utc?: string;
    job_city?: string;
    job_state?: string;
    job_country?: string;
    job_latitude?: number;
    job_longitude?: number;
    job_benefits?: null;
    job_google_link?: string;
    job_offer_expiration_datetime_utc?: null;
    job_offer_expiration_timestamp?: null;
    job_required_experience?: {
      no_experience_required?: boolean;
      required_experience_in_months?: number;
      experience_mentioned?: boolean;
      experience_preferred?: boolean;
      [k: string]: unknown;
    };
    job_required_skills?: string[];
    job_required_education?: {
      postgraduate_degree?: boolean;
      professional_certification?: boolean;
      high_school?: boolean;
      associates_degree?: boolean;
      bachelors_degree?: boolean;
      degree_mentioned?: boolean;
      degree_preferred?: boolean;
      professional_certification_mentioned?: boolean;
      [k: string]: unknown;
    };
    job_experience_in_place_of_education?: boolean;
    job_min_salary?: null;
    job_max_salary?: null;
    job_salary_currency?: null;
    job_salary_period?: null;
    job_highlights?: {
      Qualifications?: string[];
      [k: string]: unknown;
    };
    job_job_title?: null;
    job_posting_language?: string;
    job_onet_soc?: string;
    job_onet_job_zone?: string;
    job_occupational_categories?: string[];
    job_naics_code?: string;
    job_naics_name?: string;
    estimated_salaries?: unknown[];
    apply_options?: unknown[];
    employer_reviews?: {
      publisher?: string;
      employer_name?: string;
      score?: number;
      num_stars?: number;
      review_count?: number;
      max_score?: number;
      reviews_link?: string;
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}

const rapidApiHeaders = {
  "x-rapidapi-key": process.env.RAPID_API_KEY,
  "x-rapidapi-host": "jsearch.p.rapidapi.com",
} as const;

export async function getJobDetails(jobId: string) {
  return (
    (
      await axios.get("https://jsearch.p.rapidapi.com/job-details", {
        // biome-ignore lint/style/useNamingConvention: API call
        params: { job_id: decodeURIComponent(jobId) },
        headers: rapidApiHeaders,
      })
    ).data as JobDetailsSchema
  ).data?.[0];
}

export async function getJobs(q: string) {
  return (
    (
      await axios.get("https://jsearch.p.rapidapi.com/search", {
        params: { query: q },
        headers: rapidApiHeaders,
      })
    ).data as JobSearchSchema
  ).data;
}
