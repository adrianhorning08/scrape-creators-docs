import React from "react";
import { useLocation } from "react-router-dom";
import { apis } from "../constants/apis";
import EndpointHeader from "./api/EndpointHeader";
import EndpointMethod from "./api/EndpointMethod";
import ParameterSection from "./api/ParameterSection";
import ResponseFields from "./api/ResponseFields";
import CodeBlock from "./CodeBlock";
import Introduction from "./Introduction";
import { Helmet } from "react-helmet-async";
import { Check, Sparkles } from "lucide-react";

export default function EndpointDocs() {
  const location = useLocation();
  const path = location.pathname;
  const [copied, setCopied] = React.useState(false);

  // Generate meta description based on endpoint data
  const getMetaDescription = (endpoint) => {
    if (!endpoint) return "";
    return `${endpoint.name} API endpoint documentation - ${endpoint.description}`;
  };

  // Show introduction for root path or /introduction
  if (path === "/" || path === "/introduction") {
    return <Introduction />;
  }

  // Find the API and endpoint that matches this exact path
  const api = apis.find((api) => api.endpoints.some((e) => e.path === path));
  const endpointData = api?.endpoints.find((e) => e.path === path);

  if (!api || !endpointData) {
    return <div>Endpoint not found: {path}</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`${endpointData.name} API Endpoint - Scrape Creators Documentation`}</title>
        <meta
          name="description"
          content={`${endpointData.description} - Complete API documentation with examples in multiple programming languages including JavaScript, Python, cURL, PHP, Go, and Java.`}
        />
        <meta
          name="keywords"
          content={`${endpointData.name}, API endpoint, Scrape Creators, ${endpointData.method}, API documentation, ${endpointData.path}`}
        />
        <link rel="canonical" href={`https://docs.scrapecreators.com${path}`} />
        <meta
          property="og:title"
          content={`${endpointData.name} API Endpoint - Scrape Creators Documentation`}
        />
        <meta
          property="og:description"
          content={`${endpointData.description} - Complete API documentation with examples in multiple programming languages.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://docs.scrapecreators.com${path}`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${endpointData.name} API Endpoint - Scrape Creators Documentation`}
        />
        <meta
          name="twitter:description"
          content={`${endpointData.description} - Complete API documentation with examples.`}
        />
      </Helmet>
      <EndpointHeader
        title={endpointData.name}
        description={endpointData.description}
      />

      <div className="mt-6 flex w-full flex-col space-y-4">
        <EndpointMethod
          method={endpointData.method}
          path={endpointData.path}
          onTryClick={() => console.log("Try endpoint")}
        />

        <div className="flex items-center gap-6 p-6 bg-primary/10 dark:bg-primary-light/10 border border-primary/20 dark:border-primary-light/20 rounded-xl">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              🤖 Why Code When AI Can Do It For You?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stop writing code like it's 1970! Let AI do the heavy lifting -
              click the sparkles to copy a perfectly formatted prompt for
              ChatGPT, Claude, or your favorite AI assistant.
            </p>
          </div>
          <button
            onClick={() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
              const prompt = `I want to make an API call to ${
                endpointData.name
              }. Here are the details:

Endpoint: ${endpointData.method} https://api.scrapecreators.com${
                endpointData.path
              }

Description: ${endpointData.description}

Required Headers:
- x-api-key: Your API key

${
  endpointData.params.length > 0
    ? `Parameters:
${endpointData.params
  .map(
    (param) =>
      `- ${param.name} (${param.type})${param.required ? " (Required)" : ""}: ${
        param.description
      }`
  )
  .join("\n")}`
    : ""
}

Example Response:
${JSON.stringify(endpointData.sampleResponse, null, 2)}

Please help me write code to make this API call and handle the response appropriately. Include error handling and best practices.`;
              navigator.clipboard.writeText(prompt);
              // You could add a toast notification here to show success
            }}
            className="group relative w-12 h-12 flex items-center justify-center rounded-xl bg-primary/5 dark:bg-primary-light/5 border border-primary/10 dark:border-primary-light/10 hover:bg-primary/10 dark:hover:bg-primary-light/10 transition-colors"
          >
            {copied ? (
              <Check className="w-6 h-6 text-green-500" />
            ) : (
              <Sparkles className="w-6 h-6 text-primary dark:text-primary-light" />
            )}
            <div className="absolute hidden group-hover:block top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg">
              {copied ? "Copied!" : "Copy for AI Assistant"}
            </div>
          </button>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 xl:hidden">
            <CodeBlock language="JavaScript" endpoint={endpointData} />
            <CodeBlock language="200" endpoint={endpointData} />
          </div>
        </div>
      </div>

      <div className="relative mt-8 prose prose-gray dark:prose-invert">
        <ParameterSection
          title="Headers"
          parameters={[
            {
              name: "x-api-key",
              type: "string",
              required: true,
              description: "Your Scrape Creators API key",
            },
          ]}
        />

        {endpointData.params.length > 0 && (
          <ParameterSection
            title="Query Parameters"
            parameters={endpointData.params}
          />
        )}

        {endpointData.responseFields?.length > 0 && (
          <ResponseFields fields={endpointData.responseFields} />
        )}
      </div>
    </>
  );
}
