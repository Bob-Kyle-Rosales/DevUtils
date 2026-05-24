"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IconBrandGoogle } from "@tabler/icons-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/");
    }
  }

  return (
    <div className="w-full max-w-sm bg-surface border border-edge rounded-xl p-8 flex flex-col gap-5">
      <div>
        <h1 className="text-lg font-semibold">Sign in</h1>
        <p className="text-xs text-muted mt-1">Welcome back to DevUtils</p>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex items-center justify-center gap-2 w-full py-2 rounded-lg border border-edge text-sm hover:bg-surface-2 transition-colors cursor-pointer"
      >
        <IconBrandGoogle size={16} />
        Continue with Google
      </button>

      <div className="flex items-center gap-2 text-xs text-subtle">
        <div className="flex-1 h-px bg-edge" />
        or
        <div className="flex-1 h-px bg-edge" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
          className="w-full px-3 py-2 text-sm rounded-lg border border-edge bg-surface text-foreground outline-none focus:border-brand"
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-brand text-white text-sm font-medium hover:bg-[#3C3489] transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <p className="text-xs text-center text-muted">
        No account?{" "}
        <Link href="/register" className="text-brand hover:underline">
          Create one
        </Link>
      </p>
    </div>
  );
}
