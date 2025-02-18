import React from "react";
import { useLocation, Link } from "react-router-dom";
import { apis } from "../constants/apis";
import EndpointHeader from "./api/EndpointHeader";
import EndpointMethod from "./api/EndpointMethod";
import ParameterSection from "./api/ParameterSection";
import ResponseFields from "./api/ResponseFields";
import CodeBlock from "./CodeBlock";
import Introduction from "./Introduction";
import { Helmet } from "react-helmet-async";
import { Check, Sparkles } from "lucide-react";
import { generateAIPrompt } from "../utils/promptGenerator";

export default function EndpointDocs({
  selectedLanguage,
  setSelectedLanguage,
}) {
  const location = useLocation();
  const path = location.pathname;
  const [copied, setCopied] = React.useState(false);

  // Add function to get previous and next endpoints
  const getNavigation = () => {
    // Find current API and endpoint index
    let currentApiIndex = apis.findIndex((api) =>
      api.endpoints.some((e) => e.path === path)
    );
    if (currentApiIndex === -1) return { prev: null, next: null };

    const currentApi = apis[currentApiIndex];
    const currentEndpointIndex = currentApi.endpoints.findIndex(
      (e) => e.path === path
    );

    let prev = null;
    let next = null;

    // Check for previous endpoint
    if (currentEndpointIndex > 0) {
      // Previous endpoint in same API
      prev = currentApi.endpoints[currentEndpointIndex - 1];
    } else if (currentApiIndex > 0) {
      // Last endpoint of previous API
      const previousApi = apis[currentApiIndex - 1];
      prev = previousApi.endpoints[previousApi.endpoints.length - 1];
    }

    // Check for next endpoint
    if (currentEndpointIndex < currentApi.endpoints.length - 1) {
      // Next endpoint in same API
      next = currentApi.endpoints[currentEndpointIndex + 1];
    } else if (currentApiIndex < apis.length - 1) {
      // First endpoint of next API
      const nextApi = apis[currentApiIndex + 1];
      next = nextApi.endpoints[0];
    }

    return { prev, next };
  };

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

  const { prev, next } = getNavigation();

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
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
        />

        {/* Add YouTube video section if video ID exists */}
        {endpointData.youtubeId && (
          <div className="w-full aspect-video rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${endpointData.youtubeId}`}
              title={`${endpointData.name} API Demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="flex items-center gap-6 p-6 bg-primary/10 dark:bg-primary-light/10 border border-primary/20 dark:border-primary-light/20 rounded-xl">
          <div className="flex flex-col w-full gap-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              🤖 Why Code When AI Can Do It For You?
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Stop writing code like it's 1970! Let AI do the heavy lifting -
              click the sparkles to copy a perfectly formatted prompt for
              ChatGPT, Claude, or your favorite AI assistant.
            </p>
            <button
              onClick={() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                navigator.clipboard.writeText(
                  generateAIPrompt(endpointData, selectedLanguage)
                );
              }}
              className="self-start flex items-center gap-2 px-4 py-2 font-medium text-white rounded-lg bg-primary hover:opacity-90 transition-opacity"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Copy for AI
                </>
              )}
            </button>
          </div>
        </div>

        {/* These code blocks are for mobile view */}

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6 xl:hidden">
            <CodeBlock
              language="JavaScript"
              endpoint={endpointData}
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
            />
            <CodeBlock
              language="200"
              endpoint={endpointData}
              setSelectedLanguage={() => null}
            />
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

      {/* Add navigation section with bottom padding */}
      <nav className="mt-12 mb-24 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-8">
        {prev ? (
          <Link
            to={prev.path}
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            {prev.name}
          </Link>
        ) : (
          <div />
        )}

        {next ? (
          <Link
            to={next.path}
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {next.name}
            <svg
              className="ml-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </>
  );
}
