"use client";

import type { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

import { type User, getUser, removeUser } from "@/utils";

export interface AuthBlockProps {
  readonly loginHref: Url;
  readonly signupHref: Url;
}

export function AuthBlock({ loginHref, signupHref }: AuthBlockProps) {
  const [user, setUser] = React.useState<User>(null);

  React.useEffect(() => {
    setUser(getUser());
  }, []);

  return user ? (
    <>
      <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
        <span className="font-medium text-gray-600 dark:text-gray-300">{user.name[0]?.toUpperCase()}</span>
      </div>
      <button
        type="button"
        onClick={() => {
          removeUser();
          window.location.reload();
        }}
        className="text-sm  text-blue-600 dark:text-blue-500 hover:underline"
      >
        Log Out
      </button>
    </>
  ) : (
    <>
      <Link href={loginHref} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
        Log In
      </Link>
      <Link href={signupHref} className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
        Sign Up
      </Link>
    </>
  );
}
