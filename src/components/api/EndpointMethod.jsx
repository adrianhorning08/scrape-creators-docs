import React from "react";
import { Check, Copy, Play } from "lucide-react";
import TryEndpoint from "../TryEndpoint";

const methodColors = {
  GET: "bg-green-400/20 text-green-700 dark:bg-green-400/20 dark:text-green-400",
  POST: "bg-blue-400/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-400",
  PUT: "bg-yellow-400/20 text-yellow-700 dark:bg-yellow-400/20 dark:text-yellow-400",
  DELETE: "bg-red-400/20 text-red-700 dark:bg-red-400/20 dark:text-red-400",
};

export default function EndpointMethod({
  method,
  path,
  onTryClick,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const [copied, setCopied] = React.useState(false);
  const [showTryEndpoint, setShowTryEndpoint] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      `https://api.scrapecreators.com${path}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex w-full flex-col bg-background-light dark:bg-background-dark rounded-2xl p-1.5 overflow-hidden border border-gray-200 dark:border-gray-800">
      <div className="flex items-center space-x-1.5">
        <div className="relative flex-1 flex gap-2 min-w-0 rounded-xl items-center cursor-pointer p-1.5 whitespace-nowrap bg-background-light dark:bg-background-dark border border-gray-200 dark:border-gray-800">
          <div
            className={`rounded-lg font-bold px-1.5 py-0.5 text-sm leading-5 ${methodColors[method]}`}
          >
            {method}
          </div>
          <div className="flex items-center space-x-2 overflow-x-auto flex-1 no-scrollbar relative">
            <div
              className="group flex items-center flex-1 gap-0.5 font-mono cursor-pointer"
              onClick={handleCopy}
            >
              {copied ? (
                <div className="absolute right-0 p-2">
                  <Check className="w-4 h-4 text-green-400" />
                </div>
              ) : (
                <div className="absolute right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="w-4 h-4 text-gray-400 dark:text-white/30" />
                </div>
              )}
              <div className="text-sm font-medium text-gray-800 dark:text-white min-w-max">
                {path}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowTryEndpoint(true)}
          className="flex items-center justify-center px-3 h-9 text-white font-medium rounded-xl mouse-pointer disabled:opacity-70 hover:opacity-80 gap-1.5 bg-[#2AB673]"
        >
          <span>Try it</span>
          <Play className="w-3 h-3" />
        </button>
      </div>
      <TryEndpoint
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        isOpen={showTryEndpoint}
        onClose={() => setShowTryEndpoint(false)}
        endpoint={{
          method,
          path,
          params: [
            {
              name: "handle",
              type: "string",
              required: true,
              description:
                "The TikTok username to fetch profile information for",
            },
          ],
        }}
      />
    </div>
  );
}
