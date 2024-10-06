"use client";

import { FormEvent, useState } from "react";
import { createShortUrl } from "./actions/items/actions";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShortenUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const shortUrl = await createShortUrl(url);
    setLoading(false);
    setShortUrl(shortUrl);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6">URL Shortener</h1>

        <form onSubmit={handleShortenUrl} className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Enter your URL"
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`p-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-gray-100 p-4 rounded-md text-center">
            <p className="text-lg">Your shortened URL:</p>
            <a
              href={url}
              className="text-indigo-600 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
