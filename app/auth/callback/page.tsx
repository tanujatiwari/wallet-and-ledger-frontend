"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { setCookie } from "@/app/utils/cookies";
import { showToast } from "@/app/components/ToastMessage";
import { getUserProfile } from "@/app/apis";

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const error = searchParams.get("error");

    if (accessToken && refreshToken) {
      setCookie("accessToken", accessToken);
      setCookie("refreshToken", refreshToken);

      const fetchProfileAndRedirect = async () => {
        try {
          const profile = await getUserProfile();
          showToast({
            type: "success",
            title: "Login Successful",
            subtitle: `Welcome to Ledger Pro, ${profile?.displayName || "User"}!`,
          });

          if (profile?.wallets && profile.wallets.length > 0) {
            router.push("/dashboard");
          } else {
            router.push("/setup");
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          showToast({
            type: "error",
            title: "Login Error",
            subtitle: "Failed to retrieve your profile. Please try again.",
          });
          router.push("/login");
        }
      };

      fetchProfileAndRedirect();
    } else if (error) {
      showToast({
        type: "error",
        title: "Authentication Failed",
        subtitle: decodeURIComponent(error) || "Unable to authenticate with Google.",
      });
      router.push("/login");
    } else if (searchParams.toString()) {
      showToast({
        type: "error",
        title: "Authentication Failed",
        subtitle: "Missing security tokens. Please try again.",
      });
      router.push("/login");
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
