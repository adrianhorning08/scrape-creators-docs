import React, { useState, useRef, useEffect, useCallback } from "react";
import { Check, ArrowUpRight, Copy, FileText, Link, ChevronDown } from "lucide-react";
import { generatePageMarkdown } from "../../utils/markdownGenerator";

const CursorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 466.73 532.09"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
  >
    <path d="M457.43,125.94L244.42,2.96c-6.84-3.95-15.28-3.95-22.12,0L9.3,125.94c-5.75,3.32-9.3,9.46-9.3,16.11v247.99c0,6.65,3.55,12.79,9.3,16.11l213.01,122.98c6.84,3.95,15.28,3.95,22.12,0l213.01-122.98c5.75-3.32,9.3-9.46,9.3-16.11v-247.99c0-6.65-3.55-12.79-9.3-16.11h-.01ZM444.05,151.99l-205.63,356.16c-1.39,2.4-5.06,1.42-5.06-1.36v-233.21c0-4.66-2.49-8.97-6.53-11.31L24.87,145.67c-2.4-1.39-1.42-5.06,1.36-5.06h411.26c5.84,0,9.49,6.33,6.57,11.39h-.01Z" />
  </svg>
);

const VSCodeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    fill="currentColor"
    className="w-4 h-4 shrink-0"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M70.9119 99.3171C72.4869 99.9307 74.2828 99.8914 75.8725 99.1264L96.4608 89.2197C98.6242 88.1787 100 85.9892 100 83.5872V16.4133C100 14.0113 98.6243 11.8218 96.4609 10.7808L75.8725 0.873756C73.7862 -0.130129 71.3446 0.11576 69.5135 1.44695C69.252 1.63711 69.0028 1.84943 68.769 2.08341L29.3551 38.0415L12.1872 25.0096C10.589 23.7965 8.35363 23.8959 6.86933 25.2461L1.36303 30.2549C-0.452552 31.9064 -0.454633 34.7627 1.35853 36.417L16.2471 50.0001L1.35853 63.5832C-0.454633 65.2374 -0.452552 68.0938 1.36303 69.7453L6.86933 74.7541C8.35363 76.1043 10.589 76.2037 12.1872 74.9905L29.3551 61.9587L68.769 97.9167C69.3925 98.5406 70.1246 99.0104 70.9119 99.3171ZM75.0152 27.2989L45.1091 50.0001L75.0152 72.7012V27.2989Z"
    />
  </svg>
);

const OpenAIIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="w-4 h-4 shrink-0"
  >
    <path d="M14.949 6.547a3.94 3.94 0 0 0-.348-3.273 4.11 4.11 0 0 0-4.4-1.934A4.1 4.1 0 0 0 8.423.2 4.15 4.15 0 0 0 6.305.086a4.1 4.1 0 0 0-1.891.948 4.04 4.04 0 0 0-1.158 1.753 4.1 4.1 0 0 0-1.563.679A4 4 0 0 0 .554 4.72a3.99 3.99 0 0 0 .502 4.731 3.94 3.94 0 0 0 .346 3.274 4.11 4.11 0 0 0 4.402 1.933c.382.425.852.764 1.377.995.526.231 1.095.35 1.67.346 1.78.002 3.358-1.132 3.901-2.804a4.1 4.1 0 0 0 1.563-.68 4 4 0 0 0 1.14-1.253 3.99 3.99 0 0 0-.506-4.716m-6.097 8.406a3.05 3.05 0 0 1-1.945-.694l.096-.054 3.23-1.838a.53.53 0 0 0 .265-.455v-4.49l1.366.778q.02.011.025.035v3.722c-.003 1.653-1.361 2.992-3.037 2.996m-6.53-2.75a2.95 2.95 0 0 1-.36-2.01l.095.057L5.29 12.09a.53.53 0 0 0 .527 0l3.949-2.246v1.555a.05.05 0 0 1-.022.041L6.473 13.3c-1.454.826-3.311.335-4.15-1.098m-.85-6.94A3.02 3.02 0 0 1 3.07 3.949v3.785a.51.51 0 0 0 .262.451l3.93 2.237-1.366.779a.05.05 0 0 1-.048 0L2.585 9.342a2.98 2.98 0 0 1-1.113-4.094zm11.216 2.571L8.747 5.576l1.362-.776a.05.05 0 0 1 .048 0l3.265 1.86a3 3 0 0 1 1.173 1.207 2.96 2.96 0 0 1-.27 3.2 3.05 3.05 0 0 1-1.36.997V8.279a.52.52 0 0 0-.276-.445m1.36-2.015-.097-.057-3.226-1.855a.53.53 0 0 0-.53 0L6.249 6.153V4.598a.04.04 0 0 1 .019-.04L9.533 2.7a3.07 3.07 0 0 1 3.257.139c.474.325.843.778 1.066 1.303.223.526.289 1.103.191 1.664zM5.503 8.575 4.139 7.8a.05.05 0 0 1-.026-.037V4.049c0-.57.166-1.127.476-1.607s.752-.864 1.275-1.105a3.08 3.08 0 0 1 3.234.41l-.096.054-3.23 1.838a.53.53 0 0 0-.265.455zm.742-1.577 1.758-1 1.762 1v2l-1.755 1-1.762-1z" />
  </svg>
);

const AnthropicIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="w-4 h-4 shrink-0"
  >
    <path d="m3.127 10.604 3.135-1.76.053-.153-.053-.085H6.11l-.525-.032-1.791-.048-1.554-.065-1.505-.08-.38-.081L0 7.832l.036-.234.32-.214.455.04 1.009.069 1.513.105 1.097.064 1.626.17h.259l.036-.105-.089-.065-.068-.064-1.566-1.062-1.695-1.121-.887-.646-.48-.327-.243-.306-.104-.67.435-.48.585.04.15.04.593.456 1.267.981 1.654 1.218.242.202.097-.068.012-.049-.109-.181-.9-1.626-.96-1.655-.428-.686-.113-.411a2 2 0 0 1-.068-.484l.496-.674L4.446 0l.662.089.279.242.411.94.666 1.48 1.033 2.014.302.597.162.553.06.17h.105v-.097l.085-1.134.157-1.392.154-1.792.052-.504.25-.605.497-.327.387.186.319.456-.045.294-.19 1.23-.37 1.93-.243 1.29h.142l.161-.16.654-.868 1.097-1.372.484-.545.565-.601.363-.287h.686l.505.751-.226.775-.707.895-.585.759-.839 1.13-.524.904.048.072.125-.012 1.897-.403 1.024-.186 1.223-.21.553.258.06.263-.218.536-1.307.323-1.533.307-2.284.54-.028.02.032.04 1.029.098.44.024h1.077l2.005.15.525.346.315.424-.053.323-.807.411-3.631-.863-.872-.218h-.12v.073l.726.71 1.331 1.202 1.667 1.55.084.383-.214.302-.226-.032-1.464-1.101-.565-.497-1.28-1.077h-.084v.113l.295.432 1.557 2.34.08.718-.112.234-.404.141-.444-.08-.911-1.28-.94-1.44-.759-1.291-.093.053-.448 4.821-.21.246-.484.186-.403-.307-.214-.496.214-.98.258-1.28.21-1.016.19-1.263.112-.42-.008-.028-.092.012-.953 1.307-1.448 1.957-1.146 1.227-.274.109-.477-.247.045-.44.266-.39 1.586-2.018.956-1.25.617-.723-.004-.105h-.036l-4.212 2.736-.75.096-.324-.302.04-.496.154-.162 1.267-.871z" />
  </svg>
);

const PerplexityIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    viewBox="0 0 16 16"
    className="w-4 h-4 shrink-0"
  >
    <path
      fillRule="evenodd"
      d="M8 .188a.5.5 0 0 1 .503.5V4.03l3.022-2.92.059-.048a.51.51 0 0 1 .49-.054.5.5 0 0 1 .306.46v3.247h1.117l.1.01a.5.5 0 0 1 .403.49v5.558a.5.5 0 0 1-.503.5H12.38v3.258a.5.5 0 0 1-.312.462.51.51 0 0 1-.55-.11l-3.016-3.018v3.448c0 .275-.225.5-.503.5a.5.5 0 0 1-.503-.5v-3.448l-3.018 3.019a.51.51 0 0 1-.548.11.5.5 0 0 1-.312-.463v-3.258H2.503a.5.5 0 0 1-.503-.5V5.215l.01-.1c.047-.229.25-.4.493-.4H3.62V1.469l.006-.074a.5.5 0 0 1 .302-.387.51.51 0 0 1 .547.102l3.023 2.92V.687c0-.276.225-.5.503-.5M4.626 9.333v3.984l2.87-2.872v-4.01zm3.877 1.113 2.871 2.871V9.333l-2.87-2.897zm3.733-1.668a.5.5 0 0 1 .145.35v1.145h.612V5.715H9.201zm-9.23 1.495h.613V9.13c0-.131.052-.257.145-.35l3.033-3.064h-3.79zm1.62-5.558H6.76L4.626 2.652zm4.613 0h2.134V2.652z"
    />
  </svg>
);

function DropdownItem({ icon, title, subtitle, external, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-1 px-1.5 py-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer rounded-lg outline-none"
    >
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-1.5">
        {icon}
      </div>
      <div className="flex flex-col px-1 text-left">
        <div className="text-sm font-medium text-gray-800 dark:text-gray-300 flex items-center gap-1">
          {title}
          {external && (
            <ArrowUpRight className="w-3 h-3 text-gray-400 dark:text-gray-500 shrink-0" />
          )}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          {subtitle}
        </div>
      </div>
      <Check
        className={`w-3.5 h-3.5 text-primary dark:text-primary-light shrink-0 ml-auto transition-opacity ${
          checked ? "opacity-100" : "opacity-0"
        }`}
      />
    </button>
  );
}

export default function CopyPageDropdown({ endpoint, api }) {
  const [isOpen, setIsOpen] = useState(false);
  const [checkedItem, setCheckedItem] = useState(null);
  const dropdownRef = useRef(null);

  const showCheck = useCallback((id) => {
    setCheckedItem(id);
    setTimeout(() => setCheckedItem(null), 2000);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const escHandler = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("keydown", escHandler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("keydown", escHandler);
    };
  }, []);

  const markdown = generatePageMarkdown(endpoint, api);
  const pageUrl = `https://docs.scrapecreators.com${endpoint.path}`;

  const handleCopyPage = async () => {
    await navigator.clipboard.writeText(markdown);
    showCheck("copy");
  };

  const handleViewMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setIsOpen(false);
  };

  const handleCopyMcp = async () => {
    await navigator.clipboard.writeText(
      `npx @anthropic-ai/create-mcp --url ${pageUrl}`
    );
    showCheck("mcp");
  };

  const handleOpenAITool = async (toolName, url) => {
    await navigator.clipboard.writeText(markdown);
    window.open(url, "_blank");
    showCheck(toolName);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative hidden sm:inline-flex shrink-0">
      <button
        onClick={handleCopyPage}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-white/5 rounded-l-xl border-r-0 transition-colors"
      >
        {checkedItem === "copy" ? (
          <Check className="w-4 h-4 text-primary dark:text-primary-light" />
        ) : (
          <Copy className="w-4 h-4" />
        )}
        <span>{checkedItem === "copy" ? "Copied!" : "Copy page"}</span>
      </button>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center px-2 py-1.5 border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark hover:bg-gray-50 dark:hover:bg-white/5 rounded-r-xl transition-colors"
        aria-label="More actions"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1 z-50 min-w-[280px] max-h-[420px] overflow-y-auto rounded-2xl border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-background-dark shadow-xl shadow-gray-500/5 dark:shadow-none p-1 flex flex-col animate-in fade-in-0 zoom-in-95">
          <DropdownItem
            icon={<Copy className="w-4 h-4" />}
            title="Copy page"
            subtitle="Copy page as Markdown for LLMs"
            checked={checkedItem === "copy"}
            onClick={handleCopyPage}
          />
          <DropdownItem
            icon={<FileText className="w-4 h-4" />}
            title="View as Markdown"
            subtitle="View this page as plain text"
            external
            checked={false}
            onClick={handleViewMarkdown}
          />
          {/* <DropdownItem
            icon={<Link className="w-4 h-4" />}
            title="Copy MCP Server"
            subtitle="Copy MCP Server URL to clipboard"
            checked={checkedItem === "mcp"}
            onClick={handleCopyMcp}
          />
          <DropdownItem
            icon={<CursorIcon />}
            title="Connect to Cursor"
            subtitle="Install MCP Server on Cursor"
            external
            checked={false}
            onClick={() => {
              window.open(
                `cursor://anysphere.cursor-deeplink/mcp/install?name=scrapecreators&config=${encodeURIComponent(JSON.stringify({ url: pageUrl }))}`,
                "_blank"
              );
              setIsOpen(false);
            }}
          />
          <DropdownItem
            icon={<VSCodeIcon />}
            title="Connect to VS Code"
            subtitle="Install MCP Server on VS Code"
            external
            checked={false}
            onClick={() => {
              window.open(
                `vscode://ms-vscode.mcp/install?name=scrapecreators&config=${encodeURIComponent(JSON.stringify({ url: pageUrl }))}`,
                "_blank"
              );
              setIsOpen(false);
            }}
          /> */}
          <DropdownItem
            icon={<OpenAIIcon />}
            title="Open in ChatGPT"
            subtitle="Ask questions about this page"
            external
            checked={checkedItem === "chatgpt"}
            onClick={() =>
              handleOpenAITool(
                "chatgpt",
                `https://chatgpt.com/?q=${encodeURIComponent(`Read this API documentation and help me use it:\n${pageUrl}`)}`
              )
            }
          />
          <DropdownItem
            icon={<AnthropicIcon />}
            title="Open in Claude"
            subtitle="Ask questions about this page"
            external
            checked={checkedItem === "claude"}
            onClick={() =>
              handleOpenAITool("claude", "https://claude.ai/new")
            }
          />
          <DropdownItem
            icon={<PerplexityIcon />}
            title="Open in Perplexity"
            subtitle="Ask questions about this page"
            external
            checked={checkedItem === "perplexity"}
            onClick={() =>
              handleOpenAITool(
                "perplexity",
                `https://www.perplexity.ai/search?q=${encodeURIComponent(`Explain this API endpoint: ${pageUrl}`)}`
              )
            }
          />
        </div>
      )}
    </div>
  );
}
