import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="absolute top-3 right-3 p-1.5 rounded-md text-gray-400 hover:text-gray-200 hover:bg-white/10 transition-colors"
      title="Copy"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

function CodeBlock({ children, copyText }) {
  return (
    <div className="relative group">
      <pre className="bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
        <code>{children}</code>
      </pre>
      <CopyButton text={copyText || children} />
    </div>
  );
}

const compatibleAgents = [
  "Claude Code",
  "Cursor",
  "OpenAI Codex",
  "GitHub Copilot",
  "Gemini CLI",
  "Windsurf",
  "VS Code",
];

export default function AgentSkillIntegration() {
  const installCmd = "npx skills add scrapecreators/agent-skills";
  const repoUrl = "https://github.com/scrapecreators/agent-skills";

  return (
    <div className="pb-24">
      <Helmet>
        <title>Agent Skill - Scrape Creators Documentation</title>
        <meta
          name="description"
          content="Give AI coding agents deep knowledge of ScrapeCreators' 110+ social media scraping APIs. Works with Claude Code, Cursor, Codex, Copilot, Gemini CLI, and more."
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/integrations/agent-skill"
        />
      </Helmet>

      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold mb-4">
        Integrations
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30">
          <svg
            className="w-5 h-5 text-purple-600 dark:text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
            />
          </svg>
        </div>
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
          Agent Skill
        </h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Give AI coding agents deep knowledge of ScrapeCreators' 110+ social
        media scraping APIs across 27+ platforms.
      </p>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Install
        </h2>
        <CodeBlock copyText={installCmd}>{installCmd}</CodeBlock>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-0">
          Or{" "}
          <a
            href={`${repoUrl}/raw/master/skills/scrapecreators-api/SKILL.md`}
            download="SKILL.md"
            className="text-primary dark:text-primary-light font-medium"
          >
            download SKILL.md
          </a>
          {" "}to upload to Claude or any AI tool manually.
        </p>

        <div className="not-prose mt-4 flex flex-wrap gap-2">
          {compatibleAgents.map((agent) => (
            <span
              key={agent}
              className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {agent}
            </span>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          What's Included
        </h2>
        <p>
          The skill teaches your AI agent how to use the ScrapeCreators API
          effectively — endpoint selection, parameter usage, pagination,
          credit costs, and platform-specific quirks for TikTok, Instagram,
          YouTube, LinkedIn, Twitter/X, Reddit, Facebook, and 20+ more
          platforms.
        </p>

        <div className="not-prose mt-4">
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800/50">
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-900 dark:text-white">
                    What you say
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-gray-900 dark:text-white">
                    What the skill does
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                    "Scrape this TikTok profile"
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    Routes to the right endpoint, handles params, paginates
                    results
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                    "Get comments from this Instagram reel"
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    Fetches the OpenAPI spec, builds the correct API call
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                    "Search TikTok Shop for shoes"
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    Knows the TikTok Shop endpoints and pagination cursors
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-gray-700 dark:text-gray-300">
                    "Get the transcript of this YouTube video"
                  </td>
                  <td className="px-4 py-2.5 text-gray-600 dark:text-gray-400">
                    Uses the transcript endpoint, warns about duration limits
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Authentication
        </h2>
        <p>
          Set your API key as an environment variable so the agent can
          authenticate requests:
        </p>
        <CodeBlock copyText="export SCRAPECREATORS_API_KEY=your-api-key">
          export SCRAPECREATORS_API_KEY=your-api-key
        </CodeBlock>
        <div className="my-6 p-4 bg-primary/10 dark:bg-primary-light/10 border border-primary/20 dark:border-primary-light/20 rounded-lg">
          <p className="m-0 flex items-center gap-2">
            <span>🔑</span>
            <span>
              Get your API key at{" "}
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

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Skill vs MCP
        </h2>
        <p>
          The{" "}
          <Link
            to="/integrations/mcp"
            className="text-primary dark:text-primary-light font-medium"
          >
            MCP server
          </Link>{" "}
          gives your AI agent direct API access — it can call ScrapeCreators
          endpoints on your behalf. The skill teaches the agent{" "}
          <em>best practices</em> for using those APIs: which endpoint to
          pick, how to handle pagination, what the credit costs are, and
          platform-specific gotchas. Use them together for the best
          experience, or independently.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Links
        </h2>
        <ul className="space-y-2">
          <li>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light font-medium inline-flex items-center gap-1.5"
            >
              GitHub Repository
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </li>
          <li>
            <Link
              to="/integrations/mcp"
              className="text-primary dark:text-primary-light font-medium"
            >
              MCP Integration
            </Link>
            {" "}<span className="text-gray-500 dark:text-gray-400">— for direct API access from your agent</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
