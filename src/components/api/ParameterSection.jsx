import React from "react";

function Parameter({ name, type, required, description, options }) {
  const getDisplayType = (type, options) => {
    if (type === "select" && options?.length > 0) {
      const firstOption = options[0];
      const optionType = typeof firstOption;
      return `${optionType}`;
    }
    return type;
  };

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
