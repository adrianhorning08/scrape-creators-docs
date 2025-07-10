import React, { useState, useEffect } from "react";
import { getLanguageExamples } from "../constants/codeExamples";
import { Check, Copy, Expand, Search, Sparkles } from "lucide-react";
import Modal from "./Modal";
import { formatJson } from "../utils/jsonFormatter";
import LLMPromptGenerator from "./LLMPromptGenerator";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { createRoot } from "react-dom/client";
import CodeMirrorViewer from "./CodeMirrorViewer";

export default function CodeBlock({
  code,
  language = "JavaScript",
  endpoint,
  formState,
  inModal,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const [selectedStatus, setSelectedStatus] = useState("200");
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const searchInputRef = React.useRef(null);
  const codeRef = React.useRef(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const languageExamples = getLanguageExamples(endpoint, formState, inModal);
  const displayCode = languageExamples[selectedLanguage] || code;
  const [customResponse, setCustomResponse] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    path: "",
    key: "",
  });

  console.log("contextMenu", contextMenu);

  // Reset selectedStatus when endpoint changes
  useEffect(() => {
    setSelectedStatus("200");
  }, [endpoint]);

  // Get the response content based on the selected status code
  const getResponseContent = () => {
    if (code) return code;
    if (!endpoint?.sampleResponse)
      return JSON.stringify(statusCodes[selectedStatus].content, null, 2);

    switch (selectedStatus) {
      case "200":
        return JSON.stringify(endpoint.sampleResponse, null, 2);
      case "200 (trimmed)":
        if (!endpoint.trimmedResponse) return JSON.stringify({}, null, 2);
        return JSON.stringify(endpoint.trimmedResponse, null, 2);
      case "400":
        return JSON.stringify(
          {
            message: "Invalid request parameters",
          },
          null,
          2
        );
      case "500":
        return JSON.stringify(
          {
            message: "Internal server error",
          },
          null,
          2
        );
      default:
        return JSON.stringify(statusCodes[selectedStatus].content, null, 2);
    }
  };

  // Get formatted HTML content for inline view
  const getFormattedResponseContent = () => {
    if (code) return code;
    if (!endpoint?.sampleResponse)
      return formatJson(statusCodes[selectedStatus].content);

    switch (selectedStatus) {
      case "200":
        return formatJson(endpoint.sampleResponse);
      case "200 (trimmed)":
        if (!endpoint.trimmedResponse) return formatJson({});
        return formatJson(endpoint.trimmedResponse);
      case "400":
        return formatJson({
          message: "Invalid request parameters",
        });
      case "500":
        return formatJson({
          message: "Internal server error",
        });
      default:
        return formatJson(statusCodes[selectedStatus].content);
    }
  };

  const highlightMatches = (content, query) => {
    if (!query.trim()) return content;

    // Split content into tokens while preserving HTML tags
    const tokens = content.split(/(<[^>]+>)/);

    return tokens
      .map((token, i) => {
        // If token is an HTML tag, return it unchanged
        if (token.startsWith("<")) return token;

        // For text content, highlight matches while preserving case
        return token.replace(
          new RegExp(escapeRegExp(query), "gi"),
          (match) => `<mark class="bg-yellow-400/50 text-white">${match}</mark>`
        );
      })
      .join("");
  };

  const isResponseExample = language === "200" || language === "400";

  // Utility to decode HTML entities
  function decodeHtmlEntities(str) {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  }

  const handleCopy = async () => {
    let textToCopy;
    if (isResponseExample) {
      const responseData =
        endpoint?.sampleResponse || statusCodes[selectedStatus].content;
      textToCopy = JSON.stringify(responseData, null, 2);
    } else {
      console.log("displayCode before processing:", displayCode); // DEBUG
      // Use DOM to extract text content, preserving all inner text
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = displayCode;
      textToCopy = tempDiv.textContent || tempDiv.innerText || "";
      // textToCopy = displayCode.replace(/<[^>]+>/g, "");
      // textToCopy = decodeHtmlEntities(textToCopy); // decode HTML entities
      console.log("textToCopy after processing:", textToCopy); // DEBUG
    }
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    if (isFullscreen) {
      // For CodeMirror, we'll let it handle search internally
      return;
    }

    const content = isResponseExample
      ? getFormattedResponseContent()
      : displayCode;
    const text = content.replace(/<[^>]+>/g, "");
    const regex = new RegExp(escapeRegExp(query), "gi");
    const matches = Array.from(text.matchAll(regex), (match) => ({
      index: match.index,
      text: match[0],
    }));
    setSearchResults(matches);
    setCurrentMatchIndex(0);

    // Auto-scroll to first match after a short delay to allow for DOM update
    if (matches.length > 0) {
      setTimeout(() => {
        const marks = codeRef.current?.getElementsByTagName("mark");
        if (marks?.[0]) {
          marks[0].scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  const navigateMatches = (direction) => {
    const newIndex =
      direction === "next"
        ? (currentMatchIndex + 1) % searchResults.length
        : (currentMatchIndex - 1 + searchResults.length) % searchResults.length;

    setCurrentMatchIndex(newIndex);

    const marks = codeRef.current?.getElementsByTagName("mark");
    if (marks?.[newIndex]) {
      marks[newIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setSearchQuery("");
    setSearchResults([]);
  };

  const statusCodes = {
    200: {
      code: "200",
      color: "text-[#2AB673]",
    },
    ...(endpoint?.trimmedResponse
      ? {
          "200 (trimmed)": {
            code: "200 (trimmed)",
            color: "text-[#2AB673]",
          },
        }
      : {}),
    400: {
      code: "400",
      color: "text-[#F59E0B]",
      content: formatJson({
        message: "<string>",
      }),
    },
    500: {
      code: "500",
      color: "text-[#EF4444]",
      content: formatJson({
        message: "<string>",
      }),
    },
  };

  const handleContextMenu = (e, path, key) => {
    e.preventDefault();
    console.log("Context menu triggered", { path, key }); // Debug log
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      path: path, // Use the path that was passed in from the Tippy component
      key: key,
    });
  };

  const handleMouseOver = (e) => {
    if (!isFullscreen) return;

    const path = e.target.getAttribute("data-path");
    if (path) {
      console.log("JSON path:", path);

      const element = e.target;
      if (!element._tippy) {
        const TippyComponent = () => (
          <Tippy
            content={path.split(".").join(".\u200B")}
            placement="top"
            arrow={true}
            delay={[200, 0]}
            className="max-w-xs px-4 py-2 rounded-lg text-sm break-words whitespace-pre-wrap"
          >
            <span
              className={element.className}
              dangerouslySetInnerHTML={{ __html: element.innerHTML }}
              onContextMenu={(e) => {
                e.preventDefault();
                handleContextMenu(
                  e,
                  path,
                  element.textContent.replace(/['"]/g, "")
                );
              }}
            />
          </Tippy>
        );

        const wrapper = document.createElement("span");
        element.parentNode.insertBefore(wrapper, element);
        const root = createRoot(wrapper);
        root.render(<TippyComponent />);
        element.remove();
      }
    }
  };

  const handleCopyFromContextMenu = async (text) => {
    await navigator.clipboard.writeText(text);
    setContextMenu({ ...contextMenu, visible: false });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      } else if ((e.metaKey || e.ctrlKey) && e.key === "f" && isFullscreen) {
        e.preventDefault();
        setIsSearchOpen(true);
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isFullscreen]);

  // Close context menu when clicking outside
  useEffect(() => {
    const handleClick = () =>
      setContextMenu({ ...contextMenu, visible: false });
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className="flex flex-col not-prose relative overflow-hidden rounded-2xl ring-1 ring-gray-200 dark:ring-gray-800/50 bg-[#0F1117] dark:bg-codeblock text-gray-50 codeblock-dark">
        <div className="relative border-b border-gray-900/80 bg-[#0F1117] dark:bg-codeblock">
          <div
            className="text-xs leading-6 rounded-t-xl flex overflow-x-auto overflow-y-hidden mr-12 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25"
            role="tablist"
            aria-orientation="horizontal"
          >
            {isResponseExample
              ? Object.values(statusCodes)
                  .sort((a, b) => {
                    return a.code.localeCompare(b.code);
                  })
                  .map((status) => (
                    <button
                      key={status.code}
                      onClick={() => setSelectedStatus(status.code)}
                      className={`group flex items-center relative px-2 pt-2.5 pb-2 outline-none whitespace-nowrap font-medium ${
                        selectedStatus === status.code
                          ? status.color
                          : "text-gray-400"
                      }`}
                      role="tab"
                      aria-selected={selectedStatus === status.code}
                      tabIndex={selectedStatus === status.code ? 0 : -1}
                    >
                      <div
                        className={`px-2 rounded-lg z-10 group-hover:bg-gray-700/60`}
                      >
                        {status.code}
                      </div>
                      {selectedStatus === status.code && (
                        <div
                          className={`absolute inset-0 border-b pointer-events-none ${status.color}`}
                        ></div>
                      )}
                    </button>
                  ))
              : Object.keys(languageExamples).map((lang) => {
                  return (
                    <button
                      key={lang}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedLanguage(lang);
                      }}
                      className={`group flex items-center relative px-2 pt-2.5 pb-2 outline-none whitespace-nowrap font-medium ${
                        selectedLanguage === lang
                          ? "text-primary-light"
                          : "text-gray-400"
                      }`}
                      role="tab"
                      aria-selected={selectedLanguage === lang}
                      tabIndex={selectedLanguage === lang ? 0 : -1}
                    >
                      <div
                        className={`px-2 rounded-lg z-10 group-hover:bg-gray-700/60 group-hover:text-primary-light`}
                      >
                        {lang}
                      </div>
                      {selectedLanguage === lang && (
                        <div className="absolute inset-0 border-b pointer-events-none border-primary dark:border-primary-light"></div>
                      )}
                    </button>
                  );
                })}
          </div>
          <div className="flex h-full absolute top-0 right-0 rounded-tr z-10 items-center gap-2 pr-4">
            <div className="flex items-center justify-center h-[42px]">
              <div className="group z-10 relative">
                <button
                  type="button"
                  className={`h-7 w-7 flex items-center justify-center rounded-md backdrop-blur ${
                    isFullscreen ? "mr-8" : ""
                  }`}
                  data-testid="copy-code-button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleCopy();
                  }}
                  aria-label="Copy the contents from the code block"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                  )}
                </button>
                <div className="absolute top-11 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block text-white rounded-lg px-1.5 py-0.5 text-xs bg-primary-dark">
                  {copied ? "Copied!" : "Copy"}
                </div>
              </div>
            </div>
            {!isResponseExample && endpoint && (
              <div className="flex items-center justify-center h-[42px]">
                <LLMPromptGenerator
                  endpoint={endpoint}
                  selectedLanguage={selectedLanguage}
                />
              </div>
            )}
            {isResponseExample && (
              <div className="flex items-center justify-center h-[42px]">
                <div className="group z-10 relative">
                  <button
                    className="h-7 w-7 flex items-center justify-center rounded-md backdrop-blur"
                    onClick={toggleFullscreen}
                    aria-label="Toggle fullscreen"
                  >
                    <Expand className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className={`p-5 min-w-full overflow-x-auto w-full scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-white/20 dark:scrollbar-thumb-white/20 hover:scrollbar-thumb-white/25 dark:hover:scrollbar-thumb-white/25 active:scrollbar-thumb-white/25 dark:active:scrollbar-thumb-white/25 text-xs leading-[1.35rem] ${
            isResponseExample ? "h-[300px]" : "h-[180px]"
          }`}
          style={{ fontVariantLigatures: "none" }}
          onMouseOver={handleMouseOver}
        >
          <div className="relative">
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: isResponseExample
                    ? searchQuery
                      ? getFormattedResponseContent().replace(
                          new RegExp(searchQuery, "gi"),
                          (match) =>
                            `<mark class="bg-yellow-400/50 text-white">${match}</mark>`
                        )
                      : getFormattedResponseContent()
                    : searchQuery
                    ? displayCode.replace(
                        new RegExp(searchQuery, "gi"),
                        (match) =>
                          `<mark class="bg-yellow-400/50 text-white">${match}</mark>`
                      )
                    : displayCode,
                }}
              />
            </pre>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isFullscreen}
        onClose={() => {
          setIsFullscreen(false);
        }}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      >
        <div className="h-full flex flex-col">
          <div className="flex-none p-4 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {isResponseExample ? (
                  <div className="flex space-x-2">
                    {Object.values(statusCodes)
                      .sort((a, b) => {
                        return a.code.localeCompare(b.code);
                      })
                      .map((status) => (
                        <button
                          key={status.code}
                          onClick={() => setSelectedStatus(status.code)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                            selectedStatus === status.code
                              ? `${status.color} bg-gray-800`
                              : "text-gray-400 hover:text-gray-300"
                          }`}
                        >
                          {status.code}
                        </button>
                      ))}
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    {Object.keys(languageExamples).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setSelectedLanguage(lang)}
                        className={`px-3 py-1.5 rounded-md text-sm font-medium ${
                          selectedLanguage === lang
                            ? "text-primary-light bg-gray-800"
                            : "text-gray-400 hover:text-gray-300"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Press Cmd+F to search
                </div>
                <button
                  className="p-1.5 text-gray-400 hover:text-gray-300 rounded-md hover:bg-gray-800 mr-12"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-6">
            {isResponseExample ? (
              <CodeMirrorViewer
                value={getResponseContent()}
                height="100%"
                className="h-full"
              />
            ) : (
              <CodeMirrorViewer
                value={displayCode}
                height="100%"
                className="h-full"
              />
            )}
          </div>
          {contextMenu.visible && (
            <div
              className="fixed z-50 bg-gray-900 rounded-lg shadow-lg py-1 min-w-[160px] border border-gray-800"
              style={{
                left: contextMenu.x,
                top: contextMenu.y,
              }}
            >
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                onClick={() => handleCopyFromContextMenu(contextMenu.path)}
              >
                <Copy className="h-4 w-4" />
                Copy Path
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-800 flex items-center gap-2"
                onClick={() => handleCopyFromContextMenu(contextMenu.key)}
              >
                <Copy className="h-4 w-4" />
                Copy Key
              </button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
