"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-[100vh] ">
      <button
        onClick={() => router.push("/login")}
        className="text-slate-200 bg-black px-4 py-1 rounded hover:bg-zinc-700"
      >
        Log In
      </button>
    </div>
  );
}
