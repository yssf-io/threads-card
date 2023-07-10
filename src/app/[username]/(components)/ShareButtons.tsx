"use client";
import { useState } from "react";

const ShareButtons = ({ username }: { username: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(
      `https://threads-card.vercel.app/@${username}`
    );
    setCopied(true);
  };

  return (
    <div>
      <p className="text-2xl">Share this Card</p>
      <div className="flex justify-between w-fit">
        <p className="text-xl mt-4 px-4 py-2 rounded-md bg-blue-500 text-white w-fit cursor-pointer">
          <a
            href={`https://twitter.com/intent/tweet?&url=http://threads-card.vercel.app/@${username}`}
          >
            Tweet
          </a>
        </p>
        <p
          onClick={copy}
          className="text-xl mt-4 ml-2 px-4 py-2 rounded-md bg-orange-500 text-white w-fit cursor-pointer"
        >
          {copied ? "Copied!" : "Copy Link"}
        </p>
      </div>
    </div>
  );
};

export default ShareButtons;
