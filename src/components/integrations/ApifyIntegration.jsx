import React from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";

export default function ApifyIntegration() {
  return (
    <div className="pb-24">
      <Helmet>
        <title>Apify Integration - Scrape Creators Documentation</title>
        <meta
          name="description"
          content="Use Scrape Creators actors on Apify to scrape social media data at scale with cloud infrastructure and built-in scheduling."
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/integrations/apify"
        />
      </Helmet>

      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold mb-4">
        Integrations
      </div>
      <div className="mb-6">
        <img
          src="/apify-logo-black.svg"
          alt="Apify"
          className="h-7 dark:hidden"
        />
        <img
          src="/apify-logo-white.svg"
          alt="Apify"
          className="h-7 hidden dark:block"
        />
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Cloud platform for web scraping and automation with ready-to-use Scrape
        Creators actors.
      </p>

      <div className="mb-8">
        <a
          href="https://apify.com/scrape-creators"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:opacity-90 rounded-lg transition-opacity no-underline"
        >
          <ExternalLink className="w-4 h-4" />
          View on Apify Store
        </a>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Overview
        </h2>
        <p>
          Scrape Creators publishes actors on the{" "}
          <a
            href="https://apify.com/store"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-primary-light"
          >
            Apify Store
          </a>{" "}
          that let you run our scrapers on Apify's cloud infrastructure. This
          gives you built-in scheduling, webhooks, proxy management, and
          dataset storage without managing any servers.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Getting Started
        </h2>
        <ol className="space-y-3">
          <li>
            Create an{" "}
            <a
              href="https://apify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              Apify account
            </a>{" "}
          </li>
          <li>
            Browse our actors at{" "}
            <a
              href="https://apify.com/scrape-creators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              apify.com/scrape-creators
            </a>
          </li>
          <li>Click on any actor and hit <strong>Start</strong></li>
          <li>Configure the input parameters and run</li>
        </ol>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Features
        </h2>
        <div className="grid md:grid-cols-2 gap-4 not-prose">
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
              Scheduling
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Set up recurring scrapes on any schedule with Apify's built-in
              scheduler.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
              Webhooks
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get notified when a scrape completes via webhooks to your own
              endpoints.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
              Dataset Storage
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Results are stored in Apify datasets — export as JSON, CSV, or
              Excel.
            </p>
          </div>
          <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
              API Access
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Trigger actors and fetch results programmatically via the Apify
              API.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Resources
        </h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://apify.com/scrape-creators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              Scrape Creators on Apify Store
            </a>
          </li>
          <li>
            <a
              href="https://docs.apify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              Apify documentation
            </a>
          </li>
          <li>
            <a
              href="https://docs.apify.com/platform/actors/running"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              Running actors guide
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
