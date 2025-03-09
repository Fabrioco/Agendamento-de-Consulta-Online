"use client";

import Link from "next/link";
import React from "react";

export default function Login() {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-between border border-gray-400 rounded-lg w-full max-w-[400px] h-[500px] py-4">
      <h1 className="text-center my-5 text-3xl font-bold">LOGIN</h1>
      <form className="flex flex-col gap-5">
        <div className="flex flex-col relative group">
          <label
            htmlFor="email"
            className={`absolute left-2 ${
              email.length ? "top-1 text-xs" : "top-[15px]"
            }  group-focus-within:top-1 group-focus-within:text-xs transition-all duration-200 ease-in-out cursor-pointer group-focus-within:text-gray-500 `}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-4 border border-black rounded-2xl focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50 cursor-pointer"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col relative group">
          <label
            htmlFor="password"
            className={`absolute left-2 ${
              password.length ? "top-1 text-xs" : "top-[15px]"
            }  group-focus-within:top-1 group-focus-within:text-xs transition-all duration-200 ease-in-out cursor-pointer group-focus-within:text-gray-500`}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-4 border border-black rounded-2xl focus:outline-none focus:ring focus:ring-black focus:ring-opacity-50 cursor-pointer"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button
          type="submit"
          className="bg-black text-white p-4 rounded-2xl cursor-pointer hover:bg-gray-800 active:bg-gray-900"
        >
          Login
        </button>
      </form>
      <div className="flex flex-col gap-2">
        <Link href="/register">Não tem uma conta? Cadastre-se</Link>
        <Link href={""}>Esqueceu a senha?</Link>
      </div>
    </div>
  );
}
