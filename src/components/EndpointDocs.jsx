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
import { Check, Sparkles, Coins } from "lucide-react";
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

  // Get credit cost information from endpoint
  const getCreditCost = (endpoint) => {
    // First check if there's a structured credits field
    if (endpoint?.credits !== undefined) {
      if (typeof endpoint.credits === "number") {
        return { type: "fixed", cost: endpoint.credits };
      }
      if (typeof endpoint.credits === "object") {
        return endpoint.credits; // e.g., { type: "per_item", cost: 1, per: 10 }
      }
    }

    // Default to 1 credit if not specified
    return { type: "fixed", cost: 1 };
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
  const creditCost = getCreditCost(endpointData);

  return (
    <>
      <Helmet>
        <title>{`${api.name} ${endpointData.name} API - ${endpointData.description} | Scrape Creators`}</title>
        <meta
          name="description"
          content={`${api.name} ${endpointData.name} API endpoint: ${
            endpointData.description
          }. Complete REST API documentation with code examples in JavaScript, Python, cURL, PHP, Go, and Java. Get your free API key and start extracting ${api.name.toLowerCase()} data today.`}
        />
        <meta
          name="keywords"
          content={`${api.name} API, ${
            endpointData.name
          }, ${api.name.toLowerCase()} ${endpointData.name.toLowerCase()}, social media API, ${api.name.toLowerCase()} scraping, ${
            endpointData.method
          } request, REST API, ${api.name.toLowerCase()} data extraction, API documentation, Scrape Creators`}
        />
        <link rel="canonical" href={`https://docs.scrapecreators.com${path}`} />
        <meta
          property="og:title"
          content={`${api.name} ${endpointData.name} API - Extract ${api.name} Data | Scrape Creators`}
        />
        <meta
          property="og:description"
          content={`${api.name} ${endpointData.name} API: ${endpointData.description}. Complete documentation with code examples in multiple languages.`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:section" content="API Documentation" />
        <meta
          property="og:image"
          content="https://docs.scrapecreators.com/logo.png"
        />
        <meta
          property="og:url"
          content={`https://docs.scrapecreators.com${path}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={`${api.name} ${endpointData.name} API - Scrape Creators`}
        />
        <meta
          name="twitter:description"
          content={`Extract ${api.name.toLowerCase()} data with our ${endpointData.name.toLowerCase()} API endpoint. Complete documentation with code examples.`}
        />
        <meta
          name="twitter:image"
          content="https://docs.scrapecreators.com/logo.png"
        />

        {/* API Endpoint Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "APIReference",
            name: `${api.name} ${endpointData.name} API`,
            description: `${endpointData.description} - Extract public data from ${api.name} using our REST API endpoint.`,
            url: `https://docs.scrapecreators.com${path}`,
            provider: {
              "@type": "Organization",
              name: "Scrape Creators",
              url: "https://scrapecreators.com",
            },
            documentation: `https://docs.scrapecreators.com${path}`,
            programmingModel: "REST",
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            serviceType: "API",
            potentialAction: {
              "@type": "ConsumeAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `https://api.scrapecreators.com${path}`,
                httpMethod: endpointData.method,
                contentType: "application/json",
              },
            },
            about: {
              "@type": "Thing",
              name: api.name,
              description: `${api.name} social media platform`,
            },
          })}
        </script>

        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://docs.scrapecreators.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: `${api.name} ${endpointData.name} API`,
                item: `https://docs.scrapecreators.com${path}`,
              },
            ],
          })}
        </script>
      </Helmet>
      <EndpointHeader
        title={endpointData.name}
        description={endpointData.description}
      />

      {/* Credit Cost Display */}
      <div className="mt-4 flex items-center gap-2">
        <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <Coins className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          <span className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
            <span className="font-semibold">
              {creditCost.type === "fixed"
                ? `${creditCost.cost} credit${creditCost.cost !== 1 ? "s" : ""}`
                : creditCost.type === "per_item"
                ? `1 credit per ${creditCost.per} item${
                    creditCost.per !== 1 ? "s" : ""
                  } returned`
                : `${creditCost.cost} credit${
                    creditCost.cost !== 1 ? "s" : ""
                  }`}
            </span>
            {creditCost.type !== "per_item" && (
              <span className="text-yellow-700 dark:text-yellow-300 ml-1">
                per request
              </span>
            )}
          </span>
        </div>
      </div>

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
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-video rounded-xl overflow-hidden">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${endpointData.youtubeId}`}
                title={`${endpointData.name} API Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <a
              href={endpointData.codeExample}
              target="_blank"
              rel="noopener noreferrer"
              className="self-start flex items-center gap-2 px-4 py-2 font-medium text-white rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Code on GitHub
            </a>
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
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                  navigator.clipboard.writeText(
                    generateAIPrompt(endpointData, selectedLanguage)
                  );
                }}
                className="flex items-center gap-2 px-4 py-2 font-medium text-white rounded-lg bg-primary hover:opacity-90 transition-opacity"
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

        {endpointData?.params?.length > 0 && (
          <ParameterSection
            title="Query Parameters"
            parameters={endpointData?.params}
          />
        )}

        {endpointData?.bodyParams?.length > 0 && (
          <ParameterSection
            title="Body Parameters"
            parameters={endpointData?.bodyParams}
          />
        )}

        {endpointData?.responseFields?.length > 0 && (
          <ResponseFields fields={endpointData?.responseFields} />
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
