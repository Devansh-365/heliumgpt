import AuthForm from "@/components/forms/login-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

import Link from "next/link";
import React, { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="relative z-10 my-auto h-fit w-full max-w-sm overflow-hidden">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-2 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50">
            Login
          </h3>
        </div>
        <div className="flex flex-col space-y-3 px-4 py-6 sm:px-16">
          <Suspense fallback={<div>Loading...</div>}>
            <AuthForm />
          </Suspense>

          <Link
            href="/register"
            className="text-center text-sm underline text-gray-500"
          >
            {`Don't have an account?`}{" "}
            <span className="font-semibold text-gray-500 transition-colors hover:text-black">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
