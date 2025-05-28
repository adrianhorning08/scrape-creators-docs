import React from "react";

const wrapLinksInText = (text) => {
  // URL regex pattern
  const urlPattern = /(https?:\/\/[^\s]+)/g;

  // Split the text by URLs and map through the parts
  const parts = text.split(urlPattern);

  return parts.map((part, index) => {
    // If the part matches a URL, wrap it in an anchor tag
    if (part.match(urlPattern)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default function EndpointHeader({ title, description }) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
          {title}
        </h1>
      </div>
      <div className="mt-2 text-lg prose prose-gray dark:prose-invert">
        <p>{wrapLinksInText(description)}</p>
      </div>
    </>
  );
}
