"use client";

import React, { useState } from "react";
import { getTextSummary, getTrascript } from "@/lib/actions";
import Loader from "@/components/Loader";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [summarized, setSummarized] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSummarized(false);
    setError(null);
    try {
      const data = await getTrascript(url);
      setData(data.data);
    } catch (error: any) {
      const { message } = JSON.parse(error.message);
      setError(message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    try {
      setLoading(true);
      const result = await getTextSummary(data || "");
      setData(result.data);
      setSummarized(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen w-8/12 mx-auto flex flex-col items-center justify-center gap-10">
      <h1 className="mt-10 text-center text-4xl font-semibold">
        Youtube Trascript Extractor
      </h1>

      <form className="w-8/12" onSubmit={handleSubmit}>
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

      <div className="w-full overflow-auto relative h-full text-justify border border-gray-500/20 rounded-lg shadow-sm flex flex-col justify-between mb-3">
        <div className="overflow-scroll my-3 leading-7 first-letter:capitalize px-8 h-full">
          {loading ? <Loader /> : <p>{data}</p>}
        </div>
        {!summarized && (
          <button
            className="p-2 w-full bg-green-600/90 text-white shadow-sm disabled:bg-slate-400/50 disabled:cursor-not-allowed"
            disabled={data ? false : true}
            onClick={handleSummarize}
          >
            Summarize
          </button>
        )}
      </div>
    </main>
  );
}
