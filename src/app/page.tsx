"use client";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>();

  return (
    <div className="flex flex-col mt-60 justify-center items-center">
      <p className="text-3xl mb-16 font-light">Look for a Threads Card</p>
      <form method="GET" action={`/${username}`} className="w-11/12 md:w-1/3 ">
        <input
          type="text"
          id="styled-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="@zuck"
          className="w-full p-4 text-2xl bg-white rounded-xl shadow-md outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-200 ease-in-out"
        />
      </form>
    </div>
  );
}
