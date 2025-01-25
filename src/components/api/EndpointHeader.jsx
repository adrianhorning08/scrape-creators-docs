import React from 'react';

export default function EndpointHeader({ title, description }) {
  return (
    <>
      <div className="flex items-center">
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
          {title}
        </h1>
      </div>
      <div className="mt-2 text-lg prose prose-gray dark:prose-invert">
        <p>{description}</p>
      </div>
    </>
  );
}