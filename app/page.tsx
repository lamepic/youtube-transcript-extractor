"use client";

import React, { useState } from "react";
import { getTrascript } from "@/lib/actions";
import Loader from "@/components/Loader";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getTrascript(url);
      setData(data.data);
    } catch (error: any) {
      const { message } = JSON.parse(error.message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-7/12 mx-auto flex flex-col items-center justify-center gap-10">
      <h1 className="mt-16 text-center text-4xl font-semibold">
        Youtube Trascript Extractor
      </h1>

      <form className="w-10/12" onSubmit={handleSubmit}>
        <div className="border flex items-center overflow-hidden rounded-md">
          <label htmlFor="url" className="p-3 bg-slate-50 border-r">
            URL
          </label>
          <input
            name="url"
            type="text"
            className="w-full outline-1 outline-slate-400 py-3 pl-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=abc"
          />
          <button
            className="py-3 px-5 border-l bg-green-600 text-white"
            disabled={loading}
            type="submit"
          >
            Submit
          </button>
        </div>
        {error ? (
          <div className="text-red-600 text-sm mt-1">{error}</div>
        ) : null}
      </form>

      <div className="mt-2 w-full text-justify p-2 mb-3 px-10 h-full overflow-scroll leading-7 first-letter:capitalize">
        {loading ? <Loader /> : data}
      </div>
    </main>
  );
}
