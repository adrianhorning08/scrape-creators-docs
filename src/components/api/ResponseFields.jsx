import React from "react";
import { Info } from "lucide-react";

export default function ResponseFields({ fields }) {
  if (!fields || fields.length === 0) return null;

  return (
    <div className="mt-8 mb-16">
      <div className="flex items-baseline border-b pb-2.5 border-gray-100 dark:border-gray-800">
        <h4 className="flex-1 mb-0 text-gray-900 dark:text-white font-semibold">
          Response Field Explanations
        </h4>
      </div>
      <div className="mt-4 space-y-4">
        {fields.map((field, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50"
          >
            <Info className="w-5 h-5 text-primary dark:text-primary-light mt-0.5" />
            <div>
              <div className="font-mono text-sm text-gray-900 dark:text-white break-all">
                {field.path}
              </div>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {field.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
