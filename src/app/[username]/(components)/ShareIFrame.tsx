import { useState } from "react";

const ShareIFrame = ({ username }: { username: string }) => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="http://threads-card.vercel.app/${username}/card" width="770" height="500" />`;

  const copy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
  };

  return (
    <div className="flex flex-col items-center p-2">
      <h2 className="text-xl mb-4">Copy the code below to embed the card:</h2>
      <textarea
        className="mb-4 w-full p-2 border-none bg-gray-200 text-gray-700 font-mono text-sm"
        value={embedCode}
        readOnly
      />

      <p className="mb-4">Adjust `height` and `witdh` accordingly</p>

      <p
        onClick={copy}
        className="text-xl my-2 ml-2 px-4 py-2 rounded-md bg-orange-500 text-white w-fit cursor-pointer"
      >
        {copied ? "Copied!" : "Copy Link"}
      </p>
    </div>
  );
};

export default ShareIFrame;
