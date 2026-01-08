import React from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { apis } from "../constants/apis";

export default function Introduction() {
  return (
    <div className="pb-24">
      <Helmet>
        <title>
          Scrape Creators API Documentation - Extract Data from TikTok,
          Instagram, YouTube & More
        </title>
        <meta
          name="description"
          content={`Complete API documentation for Scrape Creators. Extract public data from ${apis
            .slice(0, 8)
            .map((api) => api.name)
            .join(
              ", "
            )}, and more. Get started with our powerful REST API endpoints supporting ${
            apis.length
          }+ social media platforms.`}
        />
        <meta
          name="keywords"
          content={`API documentation, Scrape Creators, social media data extraction, ${apis
            .map((api) => `${api.name} API`)
            .join(
              ", "
            )}, REST API, developer documentation, web scraping API, social media scraper, public data extraction`}
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/introduction"
        />
        <meta
          property="og:title"
          content="Scrape Creators API Documentation - Extract Data from 10+ Social Media Platforms"
        />
        <meta
          property="og:description"
          content={`Complete API documentation for extracting public data from ${apis
            .slice(0, 5)
            .map((api) => api.name)
            .join(", ")} and ${
            apis.length - 5
          } more platforms. Start building with our REST API today.`}
        />
        <meta property="og:type" content="article" />
        <meta property="og:section" content="Technology" />
        <meta
          property="og:url"
          content="https://docs.scrapecreators.com/introduction"
        />
        <meta
          property="og:image"
          content="https://docs.scrapecreators.com/logo.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Scrape Creators API Documentation - Social Media Data Extraction"
        />
        <meta
          name="twitter:description"
          content={`Extract public data from ${apis
            .slice(0, 5)
            .map((api) => api.name)
            .join(
              ", "
            )} and more with our comprehensive API documentation and code examples for ${
            apis.length
          }+ platforms.`}
        />
        <meta
          name="twitter:image"
          content="https://docs.scrapecreators.com/logo.png"
        />

        {/* Article Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline:
              "Scrape Creators API Documentation - Extract Data from Social Media Platforms",
            description: `Complete API documentation for extracting public data from ${apis
              .map((api) => api.name)
              .join(", ")}.`,
            url: "https://docs.scrapecreators.com/introduction",
            datePublished: "2024-01-01",
            dateModified: "2024-01-15",
            author: {
              "@type": "Organization",
              name: "Scrape Creators",
              url: "https://scrapecreators.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Scrape Creators",
              logo: {
                "@type": "ImageObject",
                url: "https://docs.scrapecreators.com/logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://docs.scrapecreators.com/introduction",
            },
            about: {
              "@type": "SoftwareApplication",
              name: "Scrape Creators API",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Web",
              description: "API for extracting public social media data",
            },
            articleSection: "API Documentation",
            keywords:
              "API documentation, social media scraping, TikTok API, Instagram API, YouTube API, data extraction",
          })}
        </script>

        {/* Breadcrumb Structured Data - Simple flat structure */}
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
                name: "Introduction",
                item: "https://docs.scrapecreators.com/introduction",
              },
            ],
          })}
        </script>
      </Helmet>
      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold">
        API Documentation
      </div>
      <div className="flex items-center mb-8">
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
          Introduction
        </h1>
      </div>
      <div className="prose prose-gray dark:prose-invert max-w-none pb-24">
        <p className="text-lg leading-relaxed">
          Welcome to the <strong>Scrape Creators API documentation</strong>. Our
          comprehensive REST API provides powerful endpoints to extract{" "}
          <em>public data</em> from {apis.length}+ social media platforms
          including{" "}
          <strong>
            {apis
              .slice(0, 5)
              .map((api) => api.name)
              .join(", ")}
            , and more
          </strong>
          .
        </p>

        <div className="my-8 p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🚀 Quick Start Guide
          </h3>
          <p className="text-blue-800 dark:text-blue-200">
            Get started in minutes with our <strong>free API key</strong>.
            Extract profile data, posts, videos, and more from any public social
            media account.
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
          Supported Platforms
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {apis.map((api) => (
            <div
              key={api.id}
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {api.name}
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
          API Authentication
        </h2>
        <p className="mb-4">
          All API requests require authentication using an{" "}
          <strong>API key</strong>. You'll need to include your API key in the{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
            x-api-key
          </code>{" "}
          header with every request to our REST API endpoints.
        </p>
        <div className="bg-primary/10 dark:bg-primary-light/10 border border-primary/20 dark:border-primary-light/20 rounded-lg p-4 my-4">
          <p className="m-0 flex items-center gap-2">
            <span>🔑</span>
            <span>
              Don't have an API key? Get one by signing up at{" "}
              <a
                href="https://app.scrapecreators.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-primary-light font-medium"
              >
                app.scrapecreators.com
              </a>
            </span>
          </p>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
          Key Features of Our API
        </h2>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              🚀 High Performance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Fast, reliable API responses with 99.9% uptime and
              enterprise-grade infrastructure.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              📊 Real-time Data
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Extract the latest public data from social media platforms in
              real-time.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              🔧 Developer Friendly
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              RESTful API with comprehensive documentation and code examples in
              6+ languages.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              🔒 Secure & Compliant
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Only public data extraction with enterprise security and privacy
              compliance.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">
          Using the Documentation
        </h2>
        {/* <p>
          Our documentation is organized by platform (TikTok, Instagram, etc.)
          and provides detailed information about each endpoint, including:
        </p> */}
        {/* <ul className="list-disc pl-6 mt-2">
          <li>Required and optional parameters</li>
          <li>Example requests in multiple programming languages</li>
          <li>Sample responses with detailed field explanations</li>
          <li>Interactive "Try it" feature to test endpoints directly</li>
        </ul> */}

        <div className="bg-violet-50/50 dark:bg-violet-500/10 border border-violet-500/20 dark:border-violet-500/30 rounded-lg p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            LLM-Ready Prompts
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Simply click the sparkles icon and paste the generated prompt into
            ChatGPT, Claude, or your favorite AI assistant to get instant help
            with implementation.
          </p>
        </div>

        <div className="bg-sky-50/50 dark:bg-sky-500/10 border border-sky-500/20 dark:border-sky-500/30 rounded-lg p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
            <span>💡</span>
            Response Field Explanations
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            This section is to help you understand some of the fields returned
            by the social media platform.
          </p>
        </div>

        <div className="bg-emerald-50/50 dark:bg-emerald-500/10 border border-emerald-500/20 dark:border-emerald-500/30 rounded-lg p-4 mt-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white flex items-center gap-2">
            <span>🔍</span>
            JSON Path Navigation
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            In fullscreen mode, hover over any JSON key to see its complete
            path. Right-click to copy either the full path or just the key name
            - perfect for navigating complex response structures.
          </p>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
          Response Codes
        </h2>
        <p>
          Our API uses conventional HTTP response codes to indicate success or
          failure:
        </p>
        <ul className="list-none pl-0 mt-2 space-y-2">
          <li className="flex items-center gap-2">
            <span className="text-green-600 dark:text-green-400 font-mono">
              200
            </span>
            <span>Success</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-yellow-600 dark:text-yellow-400 font-mono">
              400
            </span>
            <span>
              Bad Request - Invalid parameters or missing required fields
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400 font-mono">
              401
            </span>
            <span>Unauthorized - Invalid or missing API key</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400 font-mono">
              402
            </span>
            <span>Payment Required - Gotta purchase more credits</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-red-600 dark:text-red-400 font-mono">
              500
            </span>
            <span>Server Error - Please try again later</span>
          </li>
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
          Support & Feedback
        </h2>
        <p className="mb-24">
          If you encounter any issues, have feature requests, or find bugs in
          the API or documentation, please email me at{" "}
          <a
            href="mailto:support@scrapecreators.com"
            className="text-primary dark:text-primary-light font-medium"
          >
            support@scrapecreators.com
          </a>
        </p>

        <nav className="mt-12 flex items-center justify-between border-t border-gray-200 dark:border-gray-800 pt-8">
          <div />
          <Link
            to="/v1/tiktok/profile"
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            TikTok Profile
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
        </nav>
      </div>
    </div>
  );
}
