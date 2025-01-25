import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function LLMPromptGenerator({ endpoint, selectedLanguage }) {
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const prompt = `I want to make an API call to ${endpoint.name}. Here are the details:

Endpoint: ${endpoint.method} https://api.scrapecreators.com${endpoint.path}

Description: ${endpoint.description}

Required Headers:
- x-api-key: Your API key

${endpoint.params.length > 0 ? `Parameters:
${endpoint.params.map(param => `- ${param.name} (${param.type})${param.required ? ' (Required)' : ''}: ${param.description}`).join('\n')}` : ''}

Example Response:
${JSON.stringify(endpoint.sampleResponse, null, 2)}

Please help me write code in ${selectedLanguage} to make this API call and handle the response appropriately. Include error handling and best practices.`;

    return prompt;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatePrompt());
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
        {copied ? 'Copied!' : 'Copy for AI Assistant'}
      </div>
    </button>
  );
}