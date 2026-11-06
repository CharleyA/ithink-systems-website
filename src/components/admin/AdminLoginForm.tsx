"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/layout/Logo";

export function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(params.get("error") === "forbidden" ? "That account cannot open the admin area." : "");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const result = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (result?.code === "rate_limited" || result?.error === "rate_limited") {
      setError("Too many attempts. Wait a few minutes and try again.");
      return;
    }
    if (result?.error) {
      setError("Invalid email or password");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <h1 className="text-center text-2xl font-bold text-[#1A1A1A]">Content admin</h1>
      <p className="mt-2 text-center text-sm text-[#5F5F5F]">Staff sign-in for the blog and product catalogue.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <label className="block text-sm font-semibold">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            autoComplete="username"
          />
        </label>
        <label className="block text-sm font-semibold">
          Password
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            autoComplete="current-password"
          />
        </label>
        <button type="submit" disabled={loading} className="w-full rounded-xl bg-[#EC5A24] px-4 py-3 font-semibold text-white">
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
