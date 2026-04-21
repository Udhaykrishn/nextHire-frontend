"use client";

import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

export default function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Resetting password", { token, password });
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 shadow-xl border border-slate-100 dark:border-zinc-800">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black italic tracking-tighter text-slate-800 dark:text-white uppercase mb-2">
          New Password
        </h2>
        <p className="text-slate-500 dark:text-zinc-400 font-medium text-sm">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-bold text-slate-700 dark:text-zinc-300"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full h-14 px-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="confirm-password"
            className="text-sm font-bold text-slate-700 dark:text-zinc-300"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            className="w-full h-14 px-4 bg-slate-50 dark:bg-zinc-800 border-none rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full h-14 bg-cyan-400 hover:bg-cyan-500 text-white font-black uppercase tracking-widest rounded-xl transition-colors mt-4"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
