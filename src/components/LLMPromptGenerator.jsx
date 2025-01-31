import React, { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { generateAIPrompt } from "../utils/promptGenerator";

export default function LLMPromptGenerator({ endpoint, selectedLanguage }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(
      generateAIPrompt(endpoint, selectedLanguage)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="group relative flex items-center justify-center h-7 w-7 rounded-md backdrop-blur"
      aria-label="Copy prompt for AI assistant"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
      )}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark whitespace-nowrap">
        {copied ? "Copied!" : "Copy for AI Assistant"}
      </div>
    </button>
  );
}
