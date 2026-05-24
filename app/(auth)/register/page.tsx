"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/app/actions/register";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await register(new FormData(e.currentTarget));

    setLoading(false);

    if (result && "error" in result) {
      setError(result.error);
    } else {
      router.push("/login");
    }
  }

  return (
    <div className="w-full max-w-sm bg-surface border border-edge rounded-xl p-8 flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold">Create account</h1>
        <p className="text-xs text-muted mt-1">Start using DevUtils for free</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          className="w-full px-3 py-2 text-sm rounded-lg border border-edge bg-surface text-foreground outline-none focus:border-brand"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 text-sm rounded-lg border border-edge bg-surface text-foreground outline-none focus:border-brand"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={8}
          className="w-full px-3 py-2 text-sm rounded-lg border border-edge bg-surface text-foreground outline-none focus:border-brand"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-[#3C3489] transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-xs text-center text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
