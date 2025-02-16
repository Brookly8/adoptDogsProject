"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LogIn } from "../lib/loginApi";
import Image from "next/image";

export default function Login() {
  const [user, setUser] = useState<{ name: string; email: string }>({
    name: "",
    email: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <form
        className="bg-black min-w-[90%] md:min-w-[400px] min-h-[300px] flex flex-col items-center
         justify-center gap-14 rounded border-[3px] border-white p-5"
        onSubmit={(e) => LogIn(e, user, router)}
        action=""
      >
        <Image
          className="mt-5"
          src={"/favicon.png"}
          alt="logo"
          width={100}
          height={100}
        />
        <p className="text-white text-3xl">LOG IN</p>
        <div className="flex flex-col gap-10">
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
          className="bg-black border-[1px] border-white px-2 py-1
           rounded text-slate-200 font-semibold hover:bg-slate-600 w-[30%] mb-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
