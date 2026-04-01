import React from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";

export default function N8nIntegration() {
  return (
    <div className="pb-24">
      <Helmet>
        <title>n8n Integration - Scrape Creators Documentation</title>
        <meta
          name="description"
          content="Install the Scrape Creators community node for n8n to automate social media data extraction in your workflows."
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/integrations/n8n"
        />
      </Helmet>

      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold mb-4">
        Integrations
      </div>
      <div className="mb-6">
        <img
          src="/n8n-logo-black.svg"
          alt="n8n"
          className="h-8 dark:hidden"
        />
        <img
          src="/n8n-logo-white.svg"
          alt="n8n"
          className="h-8 hidden dark:block"
        />
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Open-source workflow automation with Scrape Creators community node.
      </p>

      <div className="mb-8">
        <a
          href="https://www.npmjs.com/package/n8n-nodes-scrape-creators"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:opacity-90 rounded-lg transition-opacity no-underline"
        >
          <ExternalLink className="w-4 h-4" />
          View on npm
        </a>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Installation
        </h2>
        <p>
          For n8n version 0.187 and later, you can install this node through the
          Community Nodes panel:
        </p>
        <ol className="space-y-3">
          <li>
            Go to <strong>Settings {">"} Community Nodes</strong>
          </li>
          <li>
            Select <strong>Install</strong>
          </li>
          <li>
            Enter{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              n8n-nodes-scrape-creators
            </code>{" "}
            in <strong>Enter npm package name</strong>
          </li>
          <li>
            Agree to the{" "}
            <a
              href="https://docs.n8n.io/integrations/community-nodes/risks/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              risks
            </a>{" "}
            of using community nodes
          </li>
          <li>
            Select <strong>Install</strong>
          </li>
        </ol>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Credentials
        </h2>
        <p>
          To use this node, you will need to authenticate with the Scrape
          Creators API.
        </p>
        <ol className="space-y-3">
          <li>
            Sign up for a{" "}
            <a
              href="https://app.scrapecreators.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              Scrape Creators account
            </a>
          </li>
          <li>Copy API Token</li>
          <li>
            Create new credential in n8n
            <ul className="mt-2 space-y-1">
              <li>Use the Scrape Creators node</li>
              <li>
                Under <strong>Credential to connect with</strong>, click{" "}
                <strong>Create New Credential</strong>
              </li>
              <li>Paste API Key</li>
            </ul>
          </li>
        </ol>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Usage
        </h2>
        <p>
          Once installed and authenticated, the Scrape Creators node gives you
          access to all our API endpoints directly in your n8n workflows. You
          can extract profiles, posts, comments, and more from platforms like
          TikTok, Instagram, Twitter, LinkedIn, Reddit, and others.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Resources
        </h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://www.npmjs.com/package/n8n-nodes-scrape-creators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              npm package
            </a>
          </li>
          <li>
            <a
              href="https://github.com/adrianhorning08/n8n-nodes-scrape-creators"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              GitHub repository
            </a>
          </li>
          <li>
            <a
              href="https://docs.n8n.io/integrations/community-nodes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              n8n community nodes documentation
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
