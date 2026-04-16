import React from "react";
import { Helmet } from "react-helmet-async";
import { ExternalLink } from "lucide-react";

export default function CliIntegration() {
  return (
    <div className="pb-24">
      <Helmet>
        <title>CLI Integration - Scrape Creators Documentation</title>
        <meta
          name="description"
          content="Install the Scrape Creators CLI to scrape 27+ social media platforms from the terminal. 110+ endpoints, one command."
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/integrations/cli"
        />
      </Helmet>

      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold mb-4">
        Integrations
      </div>
      <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200 mb-4">
        CLI
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        CLI for the ScrapeCreators API — scrape 27+ social media platforms from
        the terminal or as an MCP server for AI agents. 110+ endpoints. One
        command.
      </p>

      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href="https://www.npmjs.com/package/@scrapecreators/cli"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary hover:opacity-90 rounded-lg transition-opacity no-underline"
        >
          <ExternalLink className="w-4 h-4" />
          View on npm
        </a>
        <a
          href="https://github.com/ScrapeCreators/scrapecreators-cli"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors no-underline"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        {/* Install */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Install
        </h2>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">npm install -g @scrapecreators/cli</code>
        </pre>
        <p>Or run without installing:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            npx @scrapecreators/cli tiktok profile --handle charlidamelio
            --api-key YOUR_KEY
          </code>
        </pre>

        {/* Quick Start */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Quick Start
        </h2>
        <ol className="space-y-3">
          <li>
            Get your API key at{" "}
            <a
              href="https://app.scrapecreators.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary dark:text-primary-light"
            >
              app.scrapecreators.com
            </a>
          </li>
          <li>
            Authenticate:
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mt-2">
              <code className="text-sm">scrapecreators auth login</code>
            </pre>
          </li>
          <li>
            Make your first request:
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mt-2">
              <code className="text-sm">
                scrapecreators tiktok profile --handle charlidamelio
              </code>
            </pre>
          </li>
          <li>
            Explore what's available:
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto mt-2">
              <code className="text-sm">scrapecreators list</code>
            </pre>
          </li>
        </ol>

        {/* Authentication */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Authentication
        </h2>
        <p>Three ways to authenticate, in priority order:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left pr-4 py-2">Priority</th>
                <th className="text-left pr-4 py-2">Method</th>
                <th className="text-left py-2">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pr-4 py-2">1</td>
                <td className="pr-4 py-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    --api-key
                  </code>{" "}
                  flag
                </td>
                <td className="py-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    scrapecreators tiktok profile --handle x --api-key YOUR_KEY
                  </code>
                </td>
              </tr>
              <tr>
                <td className="pr-4 py-2">2</td>
                <td className="pr-4 py-2">Stored config</td>
                <td className="py-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    scrapecreators auth login
                  </code>{" "}
                  (saves to{" "}
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    ~/.config/scrapecreators/
                  </code>
                  )
                </td>
              </tr>
              <tr>
                <td className="pr-4 py-2">3</td>
                <td className="pr-4 py-2">Environment variable</td>
                <td className="py-2">
                  <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                    export SCRAPECREATORS_API_KEY=YOUR_KEY
                  </code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-900 dark:text-yellow-100 m-0">
            <strong>Security note:</strong> The{" "}
            <code className="bg-yellow-100 dark:bg-yellow-800 px-1.5 py-0.5 rounded text-sm">
              --api-key
            </code>{" "}
            flag is visible in shell history and process lists. For persistent
            use, prefer{" "}
            <code className="bg-yellow-100 dark:bg-yellow-800 px-1.5 py-0.5 rounded text-sm">
              scrapecreators auth login
            </code>{" "}
            or the environment variable. In CI/automated pipelines, always use
            the environment variable.
          </p>
        </div>

        {/* Usage */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Usage
        </h2>
        <p>Every API endpoint is a subcommand under its platform:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {"scrapecreators <platform> <action> [--params]"}
          </code>
        </pre>
        <p>Examples:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {[
              "# profiles",
              "scrapecreators instagram profile --handle jane",
              "scrapecreators tiktok profile --handle charlidamelio",
              "scrapecreators youtube channel --handle ThePatMcAfeeShow",
              "",
              "# content feeds",
              "scrapecreators tiktok profile-videos --handle charlidamelio --sort-by popular",
              "scrapecreators instagram user-posts --handle jane",
              "scrapecreators instagram user-reels --handle jane",
              "",
              "# single post/video",
              'scrapecreators instagram post --url "https://www.instagram.com/reel/DOq6eV6iIgD"',
              'scrapecreators tiktok video --url "https://www.tiktok.com/@user/video/123"',
              "",
              "# search",
              'scrapecreators youtube search --query "tutorials"',
              'scrapecreators instagram reels-search --query "dogs"',
              'scrapecreators reddit search --query "best programming languages"',
            ].join("\n")}
          </code>
        </pre>

        {/* Discover Endpoints */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Discover Endpoints
        </h3>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {[
              "# list all platforms",
              "scrapecreators list",
              "",
              "# list endpoints for a specific platform",
              "scrapecreators list tiktok",
              "",
              "# see full help for any endpoint",
              "scrapecreators tiktok profile --help",
            ].join("\n")}
          </code>
        </pre>

        {/* Interactive Mode */}
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Interactive Mode
        </h3>
        <p>Run with no arguments to get a guided walkthrough:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">scrapecreators</code>
        </pre>
        <p>
          Walks you through: pick platform → pick action → fill params →
          execute.
        </p>

        {/* Commands Reference */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Commands Reference
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left pr-4 py-2">Command</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["scrapecreators <platform> <action>", "Call any API endpoint"],
                [
                  "scrapecreators list [platform]",
                  "List available platforms or endpoints",
                ],
                [
                  "scrapecreators auth login",
                  "Set your API key (interactive)",
                ],
                ["scrapecreators auth status", "Show current auth status"],
                ["scrapecreators auth logout", "Remove stored API key"],
                ["scrapecreators balance", "Check credit balance"],
                [
                  "scrapecreators config set <key> <value>",
                  "Set a config value",
                ],
                ["scrapecreators config get <key>", "Get a config value"],
                ["scrapecreators config list", "Show all config values"],
                [
                  "scrapecreators agent add <target>",
                  "Write MCP config into an agent (cursor, claude, codex)",
                ],
              ].map(([cmd, desc]) => (
                <tr key={cmd}>
                  <td className="pr-4 py-2">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
                      {cmd}
                    </code>
                  </td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Run any command with{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
            --help
          </code>{" "}
          for full usage details.
        </p>

        {/* Output & Options */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Output & Options
        </h2>
        <p>
          The CLI auto-detects whether output goes to a terminal or a pipe:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {[
              "# default: compact JSON",
              "scrapecreators tiktok profile --handle charlidamelio",
              "",
              "# pretty-printed JSON",
              "scrapecreators tiktok profile --handle charlidamelio --pretty",
              "",
              "# pipe to jq",
              "scrapecreators tiktok profile --handle charlidamelio | jq '.stats'",
              "",
              "# table format",
              "scrapecreators tiktok profile --handle charlidamelio --format table",
              "",
              "# csv (full dump — all fields)",
              "scrapecreators tiktok profile --handle charlidamelio --format csv > output.csv",
              "",
              "# csv clean (noisy fields removed — spreadsheet-friendly)",
              "scrapecreators tiktok profile --handle charlidamelio --format csv --clean > output.csv",
              "",
              "# clean json (strips booleans, empty values, settings)",
              "scrapecreators tiktok profile --handle charlidamelio --clean",
              "",
              "# save to file, print only the file path",
              "scrapecreators tiktok profile-videos --handle charlidamelio --output ./data.json",
            ].join("\n")}
          </code>
        </pre>
        <p>
          All status messages (spinners, warnings) go to <strong>stderr</strong>
          . Data goes to <strong>stdout</strong>. Safe for piping.
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="text-left pr-4 py-2">Flag</th>
                <th className="text-left py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["--api-key <key>", "Override API key for this request"],
                [
                  "--format <fmt>",
                  "Output format: json, table, csv, markdown",
                ],
                ["--json", "Compact JSON (default)"],
                ["--pretty", "Pretty-print JSON with indentation"],
                ["--output <path>", "Save response to file, print only the path"],
                [
                  "--clean",
                  "Strip noisy fields (booleans, empty values, settings). Works with any format",
                ],
                ["--no-color", "Disable ANSI colors"],
                ["--verbose", "Show request URL, timing, status code"],
              ].map(([flag, desc]) => (
                <tr key={flag}>
                  <td className="pr-4 py-2">
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm whitespace-nowrap">
                      {flag}
                    </code>
                  </td>
                  <td className="py-2">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Agent Integration */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          AI Agent Integration
        </h2>
        <p>
          The CLI is designed agent-first. All 110+ endpoints are also available
          as an MCP server — no CLI installation required for agents.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">
          MCP Server
        </h3>
        <p>Add to your agent's MCP config manually:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {JSON.stringify(
              {
                mcpServers: {
                  scrapecreators: {
                    url: "https://api.scrapecreators.com/mcp",
                    headers: { "x-api-key": "your-key-here" },
                  },
                },
              },
              null,
              2,
            )}
          </code>
        </pre>
        <p>Or auto-configure with the CLI:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {[
              "scrapecreators agent add cursor    # writes .cursor/mcp.json",
              "scrapecreators agent add claude    # writes ~/.claude/claude_desktop_config.json",
              "scrapecreators agent add codex     # writes ~/.codex/mcp.json",
            ].join("\n")}
          </code>
        </pre>
        <p>
          Merges into existing config without overwriting other MCP servers.
          Prompts for API key if not already stored.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Agent Skill
        </h3>
        <p>
          Install the ScrapeCreators agent skill to teach agents how to pick the
          right endpoint, handle pagination, and manage credits:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            npx skills add scrapecreators/agent-skills
          </code>
        </pre>
        <p>
          Works with Cursor, Claude Code, Codex, GitHub Copilot, Gemini CLI,
          Windsurf, and 40+ other agents.
        </p>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Agent-Optimized Output
        </h3>
        <p>
          The default output is already compact JSON — no extra flags needed. To
          reduce further:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {[
              "# --clean: strip booleans, empty values, settings (keeps urls and stats)",
              "scrapecreators tiktok profile --handle x --clean",
              "",
              "# --output: save to file, return only the path",
              "scrapecreators tiktok profile-videos --handle x --clean --output ./data.json",
              "# stdout: ./data.json",
            ].join("\n")}
          </code>
        </pre>
        <p>Structured errors for agents:</p>
        <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className="text-sm">
            {JSON.stringify(
              {
                error: true,
                code: "HTTP_401",
                message: "...",
                suggestion: "Run 'scrapecreators auth login'...",
              },
              null,
              2,
            )}
          </code>
        </pre>

        {/* Known Limitations */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Known Limitations
        </h2>
        <ul className="space-y-2">
          <li>
            <strong>Handles</strong>: pass without{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              @
            </code>
            . Use{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              charlidamelio
            </code>{" "}
            not{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              @charlidamelio
            </code>
          </li>
          <li>
            <strong>Hashtags</strong>: pass without{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              #
            </code>
            . Use{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              fyp
            </code>{" "}
            not{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              #fyp
            </code>
          </li>
          <li>
            <strong>Transcripts</strong>: video must be under 2 minutes
          </li>
        </ul>
      </div>
    </div>
  );
}
