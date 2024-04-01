"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { getCurrentUser } from "@/lib/session";
import { UserAccountNav } from "./user-account-nav";
import { useSession } from "next-auth/react";

export function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 border-b h-14 shrink-0 bg-background backdrop-blur-xl">
      <span className="inline-flex items-center home-links whitespace-nowrap">
        <Link href="/" className="flex items-center">
          <svg width="45" height="45" viewBox="0 0 32 32">
            <defs>
              <clipPath id="clip-icon">
                <rect width="100%" height="100%" rx="0" x="0" y="0"></rect>
              </clipPath>
            </defs>
            <rect
              opacity="0"
              fill="#000000"
              width="100%"
              height="100%"
              rx="0"
            ></rect>
            <g transform="rotate(0 16 16)" clipPath="url(#clip-icon)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                viewBox="0 0 32 32"
                strokeWidth="0"
                stroke="#FFFFFF"
                height="16"
                width="16"
                x="8"
                y="8"
              >
                <path d="M16 0C7.19 0 0 7.19 0 16s7.19 16 16 16 16-7.19 16-16S24.81 0 16 0M4.47 16c0-3.304 1.425-6.348 3.692-8.421.907-.842 2.461-.583 3.11.518l4.015 6.931a1.99 1.99 0 0 1 0 2.073l-4.016 6.931c-.648 1.166-2.202 1.36-3.174.454C5.895 22.283 4.47 19.304 4.47 16m16.259 7.903-4.017-6.931a1.99 1.99 0 0 1 0-2.073l4.017-6.931a2.05 2.05 0 0 1 3.11-.519 11.44 11.44 0 0 1 3.691 8.421 11.44 11.44 0 0 1-3.692 8.421c-.972 1.037-2.462.778-3.11-.388Z"></path>
              </svg>
            </g>
          </svg>
          <span className="text-lg font-semibold">HeliumGPT</span>
        </Link>
      </span>
      {status === "authenticated" ? (
        <>
          <UserAccountNav
            user={{
              name: session?.user?.name,
              image: session?.user?.image,
              email: session?.user?.email,
            }}
          />
        </>
      ) : (
        <div className="flex items-center justify-end space-x-2">
          <Link
            href="/register"
            className={buttonVariants({ variant: "outline" })}
          >
            Register
          </Link>
          <Link href="/login" className={buttonVariants({})}>
            Login
          </Link>
        </div>
      )}
    </header>
  );
}
