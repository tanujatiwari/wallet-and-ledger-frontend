"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/app/utils/cookies";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (accessToken && refreshToken) {
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);
      router.push("/dashboard");
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 text-sm font-semibold text-gray-500">
      Authenticating with Google...
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950 text-sm font-semibold text-gray-500">
          Loading authentication...
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
