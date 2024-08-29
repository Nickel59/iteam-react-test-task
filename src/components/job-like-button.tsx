"use client";

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import React from "react";

import { type JobObject, addLikedJobOffer, getLikedJobObjects, removeLikedJobOffer } from "@/utils";

export interface JobOfferLikeButtonProps {
  readonly jobObject: JobObject;
}

export function JobLikeButton({ jobObject }: JobOfferLikeButtonProps) {
  const [liked, setLiked] = React.useState(
    getLikedJobObjects().some((likedJobObject) => likedJobObject.job_id === jobObject.job_id),
  );

  return (
    <button
      type="button"
      onClick={() => {
        setLiked(!liked);
        liked ? removeLikedJobOffer(jobObject.job_id) : addLikedJobOffer(jobObject);
      }}
    >
      {liked ? <StarFilledIcon /> : <StarIcon />}
    </button>
  );
}
