import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const integrations = [
  {
    name: "MCP",
    description:
      "Model Context Protocol server for AI-powered social media scraping in Cursor, Claude, VS Code, and more.",
    path: "/integrations/mcp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" fillRule="evenodd" viewBox="0 0 24 24">
        <path d="M15.688 2.343a2.588 2.588 0 00-3.61 0l-9.626 9.44a.863.863 0 01-1.203 0 .823.823 0 010-1.18l9.626-9.44a4.313 4.313 0 016.016 0 4.116 4.116 0 011.204 3.54 4.3 4.3 0 013.609 1.18l.05.05a4.115 4.115 0 010 5.9l-8.706 8.537a.274.274 0 000 .393l1.788 1.754a.823.823 0 010 1.18.863.863 0 01-1.203 0l-1.788-1.753a1.92 1.92 0 010-2.754l8.706-8.538a2.47 2.47 0 000-3.54l-.05-.049a2.588 2.588 0 00-3.607-.003l-7.172 7.034-.002.002-.098.097a.863.863 0 01-1.204 0 .823.823 0 010-1.18l7.273-7.133a2.47 2.47 0 00-.003-3.537z" />
        <path d="M14.485 4.703a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a4.115 4.115 0 000 5.9 4.314 4.314 0 006.016 0l7.12-6.982a.823.823 0 000-1.18.863.863 0 00-1.204 0l-7.119 6.982a2.588 2.588 0 01-3.61 0 2.47 2.47 0 010-3.54l7.12-6.982z" />
      </svg>
    ),
  },
  {
    name: "Agent Skill",
    description:
      "Teach AI coding agents best practices for using ScrapeCreators APIs across 27+ social platforms.",
    path: "/integrations/agent-skill",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
  },
  {
    name: "CLI",
    description:
      "Scrape 27+ social media platforms from the terminal. 110+ endpoints, one command.",
    path: "/integrations/cli",
    npm: "https://www.npmjs.com/package/@scrapecreators/cli",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
  },
  {
    name: "n8n",
    description:
      "Open-source workflow automation tool with Scrape Creators community node.",
    path: "/integrations/n8n",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 304 160" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M272 64C257.089 64 244.561 53.8018 241.008 40H204.331C196.51 40 189.835 45.6546 188.549 53.3696L187.234 61.2608C185.985 68.7531 182.195 75.2738 176.835 80C182.195 84.7262 185.985 91.2469 187.234 98.7392L188.549 106.63C189.835 114.345 196.51 120 204.331 120H209.008C212.561 106.198 225.089 96 240 96C257.673 96 272 110.327 272 128C272 145.673 257.673 160 240 160C225.089 160 212.56 149.802 209.008 136H204.331C188.688 136 175.338 124.691 172.766 109.261L171.451 101.37C170.165 93.6546 163.49 88 155.669 88H142.992C139.44 101.802 126.911 112 112 112C97.0893 112 84.5605 101.802 81.0081 88H62.9919C59.4395 101.802 46.9107 112 32 112C14.3269 112 0 97.6731 0 80C0 62.3269 14.3269 48 32 48C46.9107 48 59.4395 58.1982 62.9919 72H81.0081C84.5605 58.1982 97.0893 48 112 48C126.911 48 139.44 58.1982 142.992 72H155.669C163.49 72 170.165 66.3454 171.451 58.6304L172.766 50.7392C175.338 35.3092 188.688 24 204.331 24L241.008 24C244.56 10.1982 257.089 0 272 0C289.673 0 304 14.3269 304 32C304 49.6731 289.673 64 272 64ZM272 48C280.837 48 288 40.8366 288 32C288 23.1634 280.837 16 272 16C263.163 16 256 23.1634 256 32C256 40.8366 263.163 48 272 48ZM32 96C40.8366 96 48 88.8366 48 80C48 71.1634 40.8366 64 32 64C23.1634 64 16 71.1634 16 80C16 88.8366 23.1634 96 32 96ZM128 80C128 88.8366 120.837 96 112 96C103.163 96 96 88.8366 96 80C96 71.1634 103.163 64 112 64C120.837 64 128 71.1634 128 80ZM256 128C256 136.837 248.837 144 240 144C231.163 144 224 136.837 224 128C224 119.163 231.163 112 240 112C248.837 112 256 119.163 256 128Z" />
      </svg>
    ),
  },
  {
    name: "Apify",
    description:
      "Cloud platform for web scraping and automation with ready-to-use Scrape Creators actors.",
    path: "/integrations/apify",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 141 141" fill="currentColor">
        <path d="M80.7834 0H138.731C139.91 0 140.866 0.955572 140.866 2.13433V90.6935C140.866 92.8147 138.107 93.6371 136.945 91.8621L78.9974 3.30296C78.0686 1.88346 79.087 0 80.7834 0Z" />
        <path d="M60.0826 0H2.13433C0.955572 0 0 0.955572 0 2.13433V90.6935C0 92.8147 2.75884 93.6371 3.92029 91.8621L61.8686 3.30296C62.7975 1.88346 61.779 0 60.0826 0Z" />
        <path d="M69.4405 70.9032L3.61107 137.228C2.27427 138.575 3.22828 140.866 5.12591 140.866H135.794C137.684 140.866 138.642 138.591 137.321 137.239L72.4815 70.9148C71.6487 70.0629 70.2797 70.0577 69.4405 70.9032Z" />
      </svg>
    ),
  },
];

export default function IntegrationsOverview() {
  return (
    <div className="pb-24">
      <Helmet>
        <title>Integrations - Scrape Creators Documentation</title>
        <meta
          name="description"
          content="Integrate Scrape Creators with your favorite tools. MCP for AI assistants, n8n for workflow automation, Apify for cloud scraping, and more."
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/integrations/overview"
        />
      </Helmet>

      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold mb-4">
        Integrations
      </div>
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200 mb-4">
        Overview
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
        Scrape Creators integrations help you easily extract data from social
        media using your preferred tools.
      </p>

      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Integrations
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrations.map((integration) => (
          <Link
            key={integration.name}
            to={integration.path}
            className="group flex flex-col gap-3 p-5 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-primary/40 dark:hover:border-primary-light/40 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-all no-underline"
          >
            <div className="flex items-center gap-3">
              <div className="text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-primary-light transition-colors">
                {integration.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {integration.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {integration.description}
            </p>
            {integration.npm && (
              <a
                href={integration.npm}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors mt-1"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 576 512" fill="currentColor">
                  <path d="M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z" />
                </svg>
                npm
              </a>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
