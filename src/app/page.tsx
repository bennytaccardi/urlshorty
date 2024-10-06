"use client";

import { FormEvent, useState } from "react";
import { createShortUrl } from "./actions/items/actions";
import { SocialButtons } from "@/components/ui/social-buttons";
import { ClipboardBtn } from "@/components/ui/clipboard-btn";

export default function Home() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShortenUrl = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Show loading spinner while shortening URL
    const shortUrl = await createShortUrl(url);
    setShortUrl(shortUrl);
    setLoading(false); // Remove loading spinner after shortening
  };

  const handleCopyToClipboard = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-indigo-100 to-indigo-300 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-700">
          URL Shortener
        </h1>

        <form onSubmit={handleShortenUrl} className="flex flex-col gap-4">
          <input
            type="url"
            placeholder="Paste your URL here"
            className="border border-gray-300 p-4 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full placeholder-gray-500"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />

          <button
            type="submit"
            className={`py-4 px-6 rounded-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors w-full ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loader spinner-border animate-spin inline-block w-5 h-5 border-2 rounded-full"></span>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 bg-gray-100 p-6 rounded-lg text-center shadow-md">
            <p className="text-xl font-semibold text-gray-700">
              Shortened URL:
            </p>
            <div className="flex items-center justify-center mt-3">
              <a
                href={shortUrl}
                className="text-indigo-600 font-medium hover:underline break-all text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shortUrl}
              </a>

              <ClipboardBtn handleCopyToClipboard={handleCopyToClipboard} />
            </div>

            {/* Copied message */}
            {copied && (
              <p className="text-green-500 mt-2 animate-pulse">
                Copied to clipboard!
              </p>
            )}

            {/* Social Sharing Buttons */}
            <div className="mt-6 flex justify-center gap-6">
              <SocialButtons shortUrl={shortUrl} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
