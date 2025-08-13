import React from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Introduction() {
  return (
    <div className="pb-24">
      <Helmet>
        <title>
          Scrape Creators API Documentation - Extract Data from Social Media
          Platforms
        </title>
        <meta
          name="description"
          content="Comprehensive API documentation for Scrape Creators. Learn how to extract data from TikTok, Instagram, YouTube and other social media platforms with our powerful API endpoints."
        />
        <meta
          name="keywords"
          content="API documentation, Scrape Creators, social media data, TikTok API, Instagram API, YouTube API, data extraction"
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/introduction"
        />
        <meta
          property="og:title"
          content="Scrape Creators API Documentation - Extract Data from Social Media Platforms"
        />
        <meta
          property="og:description"
          content="Comprehensive API documentation for Scrape Creators. Learn how to extract data from social media platforms."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://docs.scrapecreators.com/introduction"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Scrape Creators API Documentation"
        />
        <meta
          name="twitter:description"
          content="Extract data from social media platforms with our comprehensive API documentation."
        />
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
        <p className="text-lg">
          Welcome to the Scrape Creators API documentation. Our API provides
          powerful endpoints to extract *public* data from various social media
          platforms including TikTok, Instagram, YouTube, and more.
        </p>

        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
          Authentication
        </h2>
        <p>
          All API requests require authentication using an API key. You'll need
          to include your API key in the <code>x-api-key</code> header with
          every request.
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

        <h2 className="text-xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
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
            href="mailto:adrian@thewebscrapingguy.com"
            className="text-primary dark:text-primary-light font-medium"
          >
            adrian@thewebscrapingguy.com
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
