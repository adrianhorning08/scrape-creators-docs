import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Check, Copy } from "lucide-react";

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
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
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

function CursorIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M50 0L93.3 25V75L50 100L6.7 75V25L50 0Z" fill="currentColor" />
      <path d="M50 20L75 35V65L50 80L25 65V35L50 20Z" fill="white" fillOpacity="0.3" />
    </svg>
  );
}

function VSCodeIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
        <path fillRule="evenodd" clipRule="evenodd" d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5871V16.4133C100 14.0112 98.6243 11.8217 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7452L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z" fill="white" />
      </mask>
      <g mask="url(#mask0)">
        <path d="M96.4614 10.7962L75.8577 0.875542C73.4373 -0.272773 70.6007 0.211611 68.75 2.08333L1.29858 63.5765C-0.515693 65.2318 -0.## 68.0902 1.30191 69.7428L6.81279 74.7545C8.29875 76.1064 10.536 76.2057 12.1357 74.9914L93.3134 13.1564C95.2697 11.6498 98 13.0456 98 15.5091V15.4035C98 14.0051 98.6246 11.8186 96.4614 10.7962Z" fill="#0065A9" />
        <g filter="url(#filter0_d)"><path d="M96.4614 89.2038L75.8577 99.1245C73.4373 100.273 70.6007 99.7884 68.75 97.9167L1.29858 36.4235C-0.515693 34.7682 -0.515693 31.9098 1.30191 30.2572L6.81279 25.2455C8.29875 23.8936 10.536 23.7943 12.1357 25.0086L93.3134 86.8436C95.2697 88.3502 98 86.9544 98 84.4909V84.5765C98 85.9949 98.6246 88.1814 96.4614 89.2038Z" fill="#007ACC" /></g>
        <g filter="url(#filter1_d)"><path d="M75.8578 99.1263C73.4387 100.274 70.6 99.7885 68.75 97.9166C71.0837 100.252 75 98.6248 75 95.3134V4.68658C75 1.37524 71.0837 -0.252235 68.75 2.08334C70.6 0.211553 73.4387 -0.273772 75.8578 0.87367L96.4587 10.7807C98.6234 11.8217 100 14.0112 100 16.4132V83.587C100 85.9891 98.6234 88.1786 96.4587 89.2196L75.8578 99.1263Z" fill="#1F9CF0" /></g>
        <path fillRule="evenodd" clipRule="evenodd" d="M70.8511 99.3171C72.4261 99.9306 74.2221 99.8913 75.8117 99.1264L96.4 89.2197C98.5634 88.1787 99.9392 85.9892 99.9392 83.587V16.4133C99.9392 14.0112 98.5635 11.8217 96.4001 10.7808L75.8117 0.873756C73.7255 -0.130129 71.2838 0.11576 69.4527 1.44695C69.1912 1.63711 68.942 1.84943 68.7082 2.08341L29.2943 38.0415L12.1264 25.0096C10.5283 23.7965 8.29285 23.8959 6.80855 25.2461L1.30225 30.2549C-0.513334 31.9064 -0.515765 34.7627 1.29775 36.417L16.1863 50.0001L1.29775 63.5832C-0.515765 65.2374 -0.513334 68.0938 1.30225 69.7452L6.80855 74.7541C8.29285 76.1043 10.5283 76.2037 12.1264 74.9905L29.2943 61.9587L68.7082 97.9167C69.3317 98.5406 70.0638 99.0104 70.8511 99.3171ZM74.9544 27.2989L45.0483 50.0001L74.9544 72.7012V27.2989Z" fill="url(#paint0_linear)" fillOpacity="0.25" />
      </g>
      <defs>
        <filter id="filter0_d"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4.16667" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter>
        <filter id="filter1_d"><feFlood floodOpacity="0" result="BackgroundImageFix" /><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" /><feOffset /><feGaussianBlur stdDeviation="4.16667" /><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" /><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" /><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" /></filter>
        <linearGradient id="paint0_linear" x1="49.9392" y1="0.257812" x2="49.9392" y2="99.7423" gradientUnits="userSpaceOnUse"><stop stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" /></linearGradient>
      </defs>
    </svg>
  );
}

export default function McpIntegration() {
  const mcpUrl = "https://api.scrapecreators.com/mcp";
  const mcpInstall = { name: "ScrapeCreators", url: mcpUrl };
  const mcpConfig = btoa(JSON.stringify(mcpInstall));

  const cursorConfig = JSON.stringify(
    {
      mcpServers: {
        "scrape-creators": {
          url: mcpUrl,
        },
      },
    },
    null,
    2
  );

  const claudeDesktopConfig = JSON.stringify(
    {
      mcpServers: {
        "scrape-creators": {
          url: mcpUrl,
          headers: {
            "x-api-key": "your-api-key",
          },
        },
      },
    },
    null,
    2
  );

  return (
    <div className="pb-24">
      <Helmet>
        <title>MCP Integration - Scrape Creators Documentation</title>
        <meta
          name="description"
          content="Set up the Scrape Creators MCP server in Cursor, Claude Desktop, VS Code, and other AI tools. Model Context Protocol for AI-powered social media scraping."
        />
        <link
          rel="canonical"
          href="https://docs.scrapecreators.com/integrations/mcp"
        />
      </Helmet>

      <div className="eyebrow h-5 text-primary dark:text-primary-light text-sm font-semibold mb-4">
        Integrations
      </div>
      <div className="flex items-center gap-3 mb-6">
        <img src="/mcp-logo.svg" alt="MCP" className="h-8 dark:invert" />
        <h1 className="inline-block text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight dark:text-gray-200">
          MCP
        </h1>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Model Context Protocol server for AI-powered social media scraping.
      </p>

      <div className="prose prose-gray dark:prose-invert max-w-none">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
          Overview
        </h2>
        <p>
          The Scrape Creators MCP server lets AI assistants like Cursor, Claude,
          and VS Code Copilot directly call our API to extract public social
          media data. It supports OAuth authentication (for Cursor, Claude) and
          direct API key authentication (for Claude Desktop and other clients).
        </p>

         <div className="my-6 p-4 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p className="m-0 text-gray-700 dark:text-gray-300 text-sm">
            <strong>MCP Server URL:</strong>{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
              {mcpUrl}
            </code>
          </p>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Quick Install
        </h2>
        <div className="not-prose flex flex-wrap gap-3">
          <a
            href={`cursor://anysphere.cursor-deeplink/mcp/install?name=ScrapeCreators&config=${encodeURIComponent(mcpConfig)}`}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-900 dark:text-white no-underline"
          >
            <CursorIcon />
            Install in Cursor
          </a>
          <a
            href={`vscode:mcp/install?${encodeURIComponent(JSON.stringify(mcpInstall))}`}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-gray-900 dark:text-white no-underline"
          >
            <VSCodeIcon />
            Install in VS Code
          </a>
        </div>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Cursor
        </h2>
        <ol className="space-y-2">
          <li>Open <strong>Cursor Settings</strong></li>
          <li>Go to <strong>Tools & MCP</strong></li>
          <li>Click <strong>+ Add new MCP server</strong></li>
          <li>Paste the following configuration:</li>
        </ol>
        <CodeBlock copyText={cursorConfig}>{cursorConfig}</CodeBlock>
        <ol start={5} className="space-y-2 mt-4">
          <li><strong>Save</strong> and go back to <strong>Tools & MCP</strong></li>
          <li>
            When prompted, click <strong>Connect</strong> to complete the
            OAuth flow — you'll enter your Scrape Creators API key in the
            browser
          </li>
        </ol>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Claude / Claude Code
        </h2>
        <p>
          Connect directly from Claude without manually configuring an API key:
        </p>
        <ol className="space-y-2">
          <li>Go to <strong>Settings → Connectors</strong></li>
          <li>
            Click <strong>Add custom connector</strong>, enter{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
              Scrape Creators
            </code>{" "}
            as the name and{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
              {mcpUrl}
            </code>{" "}
            as the URL
          </li>
          <li>
            Click <strong>Authorize</strong> when prompted to complete the OAuth
            flow
          </li>
        </ol>

        <p className="mt-4">For <strong>Claude Code</strong>, run:</p>
        <CodeBlock copyText={`claude mcp add --transport http scrape-creators ${mcpUrl}`}>
          {`claude mcp add --transport http scrape-creators ${mcpUrl}`}
        </CodeBlock>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Then run{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
            /mcp
          </code>{" "}
          and select <strong>Authenticate</strong> for Scrape Creators to
          complete the OAuth flow.
        </p>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          VS Code
        </h2>
        <p>
          Add the following to your VS Code{" "}
          <code className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-sm">
            settings.json
          </code>:
        </p>
        <CodeBlock
          copyText={JSON.stringify(
            {
              "mcp": {
                "servers": {
                  "scrape-creators": {
                    "url": mcpUrl,
                  },
                },
              },
            },
            null,
            2
          )}
        >
          {JSON.stringify(
            {
              "mcp": {
                "servers": {
                  "scrape-creators": {
                    "url": mcpUrl,
                  },
                },
              },
            },
            null,
            2
          )}
        </CodeBlock>

        <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-10 mb-4">
          Authentication
        </h2>
        <p>
          The MCP server supports two authentication methods:
        </p>
        <ul className="space-y-2">
          <li>
            <strong>OAuth (recommended)</strong> — Used by Cursor, Claude, and
            VS Code. You'll be redirected to enter your API key in the browser
            during setup.
          </li>
          <li>
            <strong>Direct API key</strong> — For Claude Desktop and other
            clients that support custom headers. Pass your key via the{" "}
            <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs">
              x-api-key
            </code>{" "}
            header.
          </li>
        </ul>

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
      </div>
    </div>
  );
}
