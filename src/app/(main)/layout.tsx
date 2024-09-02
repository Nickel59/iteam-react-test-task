import { HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import type React from "react";
import { Suspense } from "react";

import { AuthBlock } from "@/components/auth-block";
import { Searchbar } from "@/components/searchbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center gap-1">
            <Link href="/">
              <HomeIcon className="w-8 h-8 mr-2" />
            </Link>
            <Suspense>
              <Searchbar href="/jobs" />
            </Suspense>
          </div>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Link href="/liked" className="text-sm text-gray-500 dark:text-white hover:underline">
              Liked
            </Link>
            <AuthBlock loginHref="/login" signupHref="/create-profile" />
          </div>
        </div>
      </nav>
      <main className="p-2">{children}</main>
    </>
  );
}
