import React, { useState } from "react";

function Parameter({
  name,
  type,
  required,
  description,
  options,
  placeholder,
}) {
  const [copied, setCopied] = useState(false);

  const getDisplayType = (type, options) => {
    if (type === "select" && options?.length > 0) {
      const firstOption = options[0];
      const optionType = typeof firstOption;
      return `${optionType}`;
    }
    return type;
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const placeholderText =
    typeof placeholder === "string" ? placeholder : JSON.stringify(placeholder);

  return (
    <div className="py-6 border-gray-100 dark:border-gray-800 border-b last:border-b-0">
      <div className="flex font-mono text-sm group/param-head param-head">
        <div className="flex-1 flex content-start py-0.5 mr-5">
          <div className="flex items-center flex-wrap gap-2">
            <div className="font-semibold text-primary dark:text-primary-light">
              {name}
            </div>
            <div className="flex items-center space-x-2 text-xs font-medium">
              <div className="flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200 font-medium">
                <div>{getDisplayType(type, options)}</div>
              </div>
              {required && (
                <span className="px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium">
                  required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="prose prose-sm prose-gray dark:prose-invert">
          <p className="whitespace-pre-line">{description}</p>
        </div>
        {placeholder !== undefined &&
          placeholder !== null &&
          placeholder !== "" && (
            <div className="mt-4">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Example:
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 font-mono text-sm px-3 py-2 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50">
                  {placeholderText}
                </code>
                <button
                  onClick={() => copyToClipboard(placeholderText)}
                  className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <svg
                      className="w-4 h-4 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2v-2m0 0V9a2 2 0 00-2-2h-2m0 0V5a2 2 0 00-2-2H8a2 2 0 00-2 2v2m0 0h4v4"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          )}
        {type === "select" && options && (
          <div className="whitespace-pre-wrap prose-sm mt-6">
            Available options:{" "}
            {options.map((option, index) => (
              <div key={option} className="inline-block text-white">
                <code className="font-mono tracking-wider px-1 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-200">
                  {option}
                </code>
                {index !== options.length - 1 ? ", " : " "}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ParameterSection({ title, parameters }) {
  return (
    <div>
      <div className="flex items-baseline border-b pb-2.5 border-gray-100 dark:border-gray-800">
        <h4 className="flex-1 mb-0 text-gray-900 dark:text-white font-semibold">
          {title}
        </h4>
      </div>
      {parameters.map((param) => (
        <Parameter key={param.name} {...param} />
      ))}
    </div>
  );
}
