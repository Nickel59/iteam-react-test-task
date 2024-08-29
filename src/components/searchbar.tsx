"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import type { Url } from "next/dist/shared/lib/router/router";
import { useSearchParams } from "next/navigation";
import React from "react";

export interface SearchbarProps {
  readonly href: Url;
}

export function Searchbar({ href }: SearchbarProps) {
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("q") ?? "");

  const q = value.trim();

  return (
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <MagnifyingGlassIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <span className="sr-only">Search icon</span>
      </div>
      <input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        onKeyUp={(event) => {
          if (q && event.key === "Enter") {
            window.history.pushState(null, "", `${href}?${new URLSearchParams({ q }).toString()}`);
            window.location.reload();
          }
        }}
        type="text"
        className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Search..."
      />
    </div>
  );
}
