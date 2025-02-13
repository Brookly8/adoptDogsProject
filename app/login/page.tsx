"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Login() {
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const router = useRouter();

  const LogIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        { name: user.name, email: user.email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Login successful!", response);
        router.push("/main");
      }
    } catch (error) {
      console.error("Login Error", error);
      alert("Login Failed");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        className="bg-slate-400 min-w-[400px] min-h-[300px] flex flex-col items-center justify-center gap-14 rounded border-[1px] border-black"
        onSubmit={LogIn}
        action=""
      >
        <div className="flex flex-col gap-5">
        <input
          className="p-1 rounded"
          onChange={handleChange}
          value={user.name}
          name="name"
          type="text"
          placeholder="name"
        />
        <input
          className="p-1 rounded"
          type="email"
          name="email"
          value={user.email}
          placeholder="email"
          onChange={handleChange}
        />
        </div>
        <button
          className="bg-slate-700 px-2 py-1 rounded text-slate-200 font-semibold hover:bg-slate-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
