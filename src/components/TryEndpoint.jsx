import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import CodeMirror from "@uiw/react-codemirror";
import { githubDark } from "@uiw/codemirror-theme-github";
import { json } from "@codemirror/lang-json";
import {
  ChevronDown,
  Play,
  Triangle as TriangleExclamation,
  ChevronRight,
  Copy,
  Check,
} from "lucide-react";
import CodeBlock from "./CodeBlock";
import { apis } from "../constants/apis";

export default function TryEndpoint({
  isOpen,
  onClose,
  endpoint,
  selectedLanguage,
  setSelectedLanguage,
}) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(() => {
    const api = apis.find((api) =>
      api.endpoints.some((ep) => ep.path === endpoint.path)
    );
    const foundEndpoint = api?.endpoints.find(
      (ep) => ep.path === endpoint.path
    );
    return foundEndpoint || endpoint;
  });

  // Update selectedEndpoint when endpoint prop changes
  useEffect(() => {
    const api = apis.find((api) =>
      api.endpoints.some((ep) => ep.path === endpoint.path)
    );
    const foundEndpoint = api?.endpoints.find(
      (ep) => ep.path === endpoint.path
    );
    setSelectedEndpoint(foundEndpoint || endpoint);
  }, [endpoint]);

  const [showEndpointDropdown, setShowEndpointDropdown] = useState(false);
  const [formState, setFormState] = useState({
    apiKey: "",
    params:
      selectedEndpoint?.params?.reduce(
        (acc, param) => ({
          ...acc,
          [param.name]: "",
        }),
        {}
      ) || {},
    bodyParams:
      selectedEndpoint?.bodyParams?.reduce(
        (acc, param) => ({
          ...acc,
          [param.name]: "",
        }),
        {}
      ) || {},
  });
  const [expandedSections, setExpandedSections] = useState({
    authorization: true,
    query: true,
    body:
      (endpoint.bodyParams && endpoint.bodyParams.length > 0) ||
      (selectedEndpoint.bodyParams && selectedEndpoint.bodyParams.length > 0)
        ? true
        : false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [expandedResponse, setExpandedResponse] = useState(false);
  const formRef = useRef(null);

  const toggleSection = (e, section) => {
    e.preventDefault();
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Update form state when endpoint changes
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      params:
        selectedEndpoint?.params?.reduce(
          (acc, param) => ({
            ...acc,
            [param.name]: "",
          }),
          {}
        ) || {},
      bodyParams:
        selectedEndpoint?.bodyParams?.reduce(
          (acc, param) => ({
            ...acc,
            [param.name]: "",
          }),
          {}
        ) || {},
    }));
    setExpandedSections((prev) => ({
      ...prev,
      body:
        selectedEndpoint.bodyParams && selectedEndpoint.bodyParams.length > 0
          ? true
          : false,
    }));
  }, [selectedEndpoint]);

  const handleSend = async () => {
    setIsLoading(true);
    setError(null);
    setResponseData(null);

    // Validate required fields
    if (!formState.apiKey) {
      setError("API key is required");
      setIsLoading(false);
      return;
    }

    try {
      // Build query string
      const queryString = Object.entries(formState.params)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value?.trim())}`)
        .join("&");

      const url = `https://api.scrapecreators.com${selectedEndpoint.path}${
        queryString ? `?${queryString}` : ""
      }`;

      let fetchOptions = {
        method: selectedEndpoint.method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-api-key": formState.apiKey,
        },
      };

      // Only for the webhook endpoint, send bodyParams as JSON for POST
      if (
        selectedEndpoint.method === "POST" &&
        selectedEndpoint.path === "/v1/truthsocial/webhook" &&
        selectedEndpoint.bodyParams?.length > 0
      ) {
        fetchOptions.body = JSON.stringify(formState.bodyParams);
      }

      const response = await fetch(url, fetchOptions);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      setResponseData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSend();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={() => {
          onClose();
          setResponseData(null);
        }}
      />

      {/* Modal */}
      <div className="fixed inset-4 sm:inset-6 md:inset-8 bg-background-light dark:bg-background-dark rounded-xl shadow-2xl ring-1 ring-gray-200/5 dark:ring-gray-800/50 overflow-hidden">
        <div className="flex flex-col mx-auto max-w-screen-xl transform overflow-hidden max-h-[90vh] overflow-y-auto">
          <form ref={formRef} onKeyDown={handleKeyDown} className="p-4">
            <div className="flex items-center justify-between gap-x-2 mb-5">
              {/* Method Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowEndpointDropdown(!showEndpointDropdown)}
                  className="group bg-background-light dark:bg-background-dark disabled:pointer-events-none [&>span]:line-clamp-1 rounded-lg overflow-hidden group outline-none items-center py-0.5 gap-1 text-sm text-zinc-950/50 dark:text-white/50 group-hover:text-zinc-950/70 dark:group-hover:text-white/70 hidden lg:block"
                >
                  <div className="flex items-center gap-x-2 border-standard rounded-xl p-1.5 pr-3 min-w-80 hover:bg-gray-50 dark:hover:bg-white/5">
                    <div
                      className={`rounded-lg font-bold px-1.5 py-0.5 text-sm leading-5 dark:bg-green-400/20 dark:text-green-400 text-white bg-[#2AB673]`}
                    >
                      {selectedEndpoint.method}
                    </div>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const api = apis.find((api) =>
                          api.endpoints.some(
                            (ep) => ep.path === selectedEndpoint.path
                          )
                        );
                        if (api?.icon) {
                          const Icon = api.icon;
                          return <Icon className="w-4 h-4" />;
                        }
                        return null;
                      })()}
                      <div className="flex-1 text-left text-sm font-medium text-gray-900 dark:text-white truncate">
                        {selectedEndpoint.name}
                      </div>
                    </div>
                    <div>
                      <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                  </div>
                </button>

                {showEndpointDropdown && (
                  <div className="absolute z-50 mt-2 w-full bg-background-light dark:bg-background-dark rounded-xl border-standard shadow-lg overflow-hidden">
                    <div className="max-h-[300px] overflow-y-auto">
                      {apis.map((api) => (
                        <div key={api.id}>
                          <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 flex items-center gap-2">
                            <api.icon className="w-4 h-4" />
                            {api.name}
                          </div>
                          {api.endpoints.map((ep) => (
                            <button
                              key={ep.path}
                              onClick={() => {
                                setSelectedEndpoint(ep);
                                setShowEndpointDropdown(false);
                              }}
                              className="w-full flex items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-white/5"
                            >
                              <div
                                className={`rounded-lg font-bold px-1.5 py-0.5 text-xs leading-5 ${
                                  ep.method === "GET"
                                    ? "bg-green-400/20 text-green-700 dark:bg-green-400/20 dark:text-green-400"
                                    : ep.method === "POST"
                                    ? "bg-blue-400/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-400"
                                    : ep.method === "PUT"
                                    ? "bg-yellow-400/20 text-yellow-700 dark:bg-yellow-400/20 dark:text-yellow-400"
                                    : "bg-red-400/20 text-red-700 dark:bg-red-400/20 dark:text-red-400"
                                } mr-2`}
                              >
                                {ep.method}
                              </div>
                              <span className="text-sm text-gray-900 dark:text-white">
                                {ep.name}
                              </span>
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* URL Display */}
              <div className="relative flex-1 flex gap-2 min-w-0 rounded-xl items-center cursor-pointer p-1.5 border-standard bg-gray-50 dark:bg-white/5">
                <div
                  className={`rounded-lg font-bold px-1.5 py-0.5 text-sm leading-5 bg-green-400/20 text-green-700 dark:bg-green-400/20 dark:text-green-400`}
                >
                  {selectedEndpoint.method}
                </div>
                <div className="flex items-center space-x-2 overflow-x-auto flex-1 no-scrollbar">
                  <div className="group flex items-center flex-1 gap-0.5 font-mono">
                    <div className="text-sm text-gray-400">/</div>
                    <div className="text-sm font-medium text-gray-800 dark:text-white min-w-max">
                      {selectedEndpoint.path.slice(1)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                disabled={isLoading}
                className="flex items-center justify-center px-3 h-9 text-white font-medium rounded-xl mouse-pointer disabled:opacity-70 hover:opacity-80 gap-1.5 bg-[#2AB673] w-24"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    <span>Sending</span>
                  </div>
                ) : (
                  <>
                    <span>Send</span>
                    <Play className="w-3 h-3 text-white" />
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">
              {/* Left Column - Parameters */}
              <div>
                <div className="space-y-1">
                  <div className="prose prose-sm prose-gray dark:prose-invert text-sm text-gray-500 dark:text-gray-400">
                    <p>{selectedEndpoint.description}</p>
                  </div>
                </div>

                {/* Authorization Section */}
                <div className="space-y-2 mt-6">
                  <div>
                    <button
                      onClick={(e) => toggleSection(e, "authorization")}
                      className="flex w-full px-4 py-2.5 items-center justify-between border-standard cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 !border-b-0 border-t border-x rounded-t-2xl relative"
                    >
                      <div className="flex items-center gap-x-2.5">
                        {expandedSections.authorization ? (
                          <ChevronDown className="h-2.5 w-2.5 text-gray-400 dark:text-gray-500" />
                        ) : (
                          <ChevronRight className="h-2.5 w-2.5 text-gray-400 dark:text-gray-500" />
                        )}
                        <div className="flex-1 flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-6">
                            Headers
                          </div>
                        </div>
                      </div>
                      {expandedSections.authorization && (
                        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary dark:bg-primary-light"></div>
                      )}
                    </button>
                    {expandedSections.authorization && (
                      <div className="bg-background-light dark:bg-background-dark flex-1 px-4 rounded-b-xl border-standard !border-t-0 divide-y divide-gray-100 dark:divide-white/10">
                        <div className="flex space-x-3 items-start">
                          <div className="flex-1 grid lg:grid-cols-2 gap-x-12 gap-y-4 py-5">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between font-mono font-bold">
                                <div className="flex flex-wrap items-center gap-2 text-xs truncate">
                                  <div className="text-sm truncate">
                                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                                      x-api-key
                                    </span>
                                  </div>
                                  <div className="relative flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium">
                                    <div>string</div>
                                  </div>
                                  <span className="px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium">
                                    required
                                  </span>
                                </div>
                              </div>
                              <div className="prose prose-sm prose-gray dark:prose-invert text-gray-500 dark:text-gray-400">
                                <p className="whitespace-pre-line">
                                  Your Scrape Creators API key
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-1 w-full items-start divide-y divide-gray-50 dark:divide-white/5">
                              <input
                                className="flex-1 min-w-0 bg-transparent outline-none text-gray-900 dark:text-white px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary-light"
                                placeholder="enter api key"
                                type="text"
                                value={formState.apiKey}
                                onKeyDown={handleKeyDown}
                                onChange={(e) =>
                                  setFormState((prev) => ({
                                    ...prev,
                                    apiKey: e.target.value,
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Query Parameters Section */}
                <div className="space-y-2 mt-6">
                  <div>
                    <button
                      onClick={(e) => toggleSection(e, "query")}
                      className="flex w-full px-4 py-2.5 items-center justify-between border-standard cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 !border-b-0 border-t border-x rounded-t-2xl relative"
                    >
                      <div className="flex items-center gap-x-2.5">
                        {expandedSections.query ? (
                          <ChevronDown className="h-2.5 w-2.5 text-gray-400 dark:text-gray-500" />
                        ) : (
                          <ChevronRight className="h-2.5 w-2.5 text-gray-400 dark:text-gray-500" />
                        )}
                        <div className="flex-1 flex items-center space-x-2">
                          <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-6">
                            Query Parameters
                          </div>
                        </div>
                      </div>
                      {expandedSections.query && (
                        <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary dark:bg-primary-light"></div>
                      )}
                    </button>
                    {expandedSections.query && (
                      <div className="bg-background-light dark:bg-background-dark flex-1 px-4 rounded-b-xl border-standard !border-t-0 divide-y divide-gray-100 dark:divide-white/10">
                        {selectedEndpoint.params?.map((param) => (
                          <div
                            key={param.name}
                            className="flex space-x-3 items-start py-5"
                          >
                            <div className="flex-1 grid lg:grid-cols-2 gap-x-12 gap-y-4 py-5">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between font-mono font-bold">
                                  <div className="flex flex-wrap items-center gap-2 text-xs truncate">
                                    <div className="text-sm truncate">
                                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                                        {param.name}
                                      </span>
                                    </div>
                                    <div className="relative flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium">
                                      <div>{param.type}</div>
                                    </div>
                                    {param.required && (
                                      <span className="px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium">
                                        required
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="prose prose-sm prose-gray dark:prose-invert text-gray-500 dark:text-gray-400">
                                  <p className="whitespace-pre-line">
                                    {param.description}
                                  </p>
                                </div>
                              </div>
                              <div className="grid grid-cols-1 w-full items-start divide-y divide-gray-50 dark:divide-white/5">
                                <input
                                  className="flex-1 min-w-0 bg-transparent outline-none text-gray-900 dark:text-white px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary-light"
                                  placeholder={`enter ${param.name}`}
                                  type={
                                    param.type === "integer" ? "number" : "text"
                                  }
                                  value={formState.params[param.name] || ""}
                                  onKeyDown={handleKeyDown}
                                  onChange={(e) =>
                                    setFormState((prev) => ({
                                      ...prev,
                                      params: {
                                        ...prev.params,
                                        [param.name]: e.target.value,
                                      },
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Body Parameters Section */}
                {selectedEndpoint.method === "POST" &&
                  selectedEndpoint.path === "/v1/truthsocial/webhook" &&
                  selectedEndpoint.bodyParams?.length > 0 && (
                    <div
                      className="space-y-2 mt-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div>
                        <div className="flex w-full px-4 py-2.5 items-center border-standard border-t border-x rounded-t-2xl relative bg-gray-50 dark:bg-white/5">
                          <div className="flex items-center gap-x-2.5">
                            <div className="flex-1 flex items-center space-x-2">
                              <div className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-6">
                                Body Parameters
                              </div>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary dark:bg-primary-light"></div>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark flex-1 px-4 rounded-b-xl border-standard !border-t-0 divide-y divide-gray-100 dark:divide-white/10">
                          {selectedEndpoint.bodyParams.map((param) => (
                            <div
                              key={param.name}
                              className="flex space-x-3 items-start py-5"
                            >
                              <div className="flex-1 grid lg:grid-cols-2 gap-x-12 gap-y-4 py-5">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between font-mono font-bold">
                                    <div className="flex flex-wrap items-center gap-2 text-xs truncate">
                                      <div className="text-sm truncate">
                                        <span className="font-semibold text-gray-900 dark:text-gray-100">
                                          {param.name}
                                        </span>
                                      </div>
                                      <div className="relative flex items-center px-2 py-0.5 rounded-md bg-gray-100/50 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-medium">
                                        <div>{param.type}</div>
                                      </div>
                                      {param.required && (
                                        <span className="px-2 py-0.5 rounded-md bg-red-100/50 dark:bg-red-400/10 text-red-600 dark:text-red-300 font-medium">
                                          required
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <div className="prose prose-sm prose-gray dark:prose-invert text-gray-500 dark:text-gray-400">
                                    <p className="whitespace-pre-line">
                                      {param.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-1 w-full items-start divide-y divide-gray-50 dark:divide-white/5">
                                  <input
                                    className="flex-1 min-w-0 bg-transparent outline-none text-gray-900 dark:text-white px-2 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-primary-light"
                                    placeholder={`enter ${param.name}`}
                                    type={
                                      param.type === "integer"
                                        ? "number"
                                        : "text"
                                    }
                                    value={
                                      formState.bodyParams[param.name] || ""
                                    }
                                    onKeyDown={handleKeyDown}
                                    onChange={(e) =>
                                      setFormState((prev) => ({
                                        ...prev,
                                        bodyParams: {
                                          ...prev.bodyParams,
                                          [param.name]: e.target.value,
                                        },
                                      }))
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {/* Right Column - Code Previews */}
              <div className="space-y-6">
                {/* Response Section */}
                {(responseData || error) && (
                  <div className="overflow-hidden w-full rounded-2xl border bg-[#0F1117] dark:bg-codeblock border-gray-800/50">
                    <div className="flex w-full px-4 py-2 space-x-3 items-center border-b dark:border-white/5 rounded-t-xl border-gray-900/80">
                      <div className="flex flex-1 space-x-4 items-center">
                        <div className="flex space-x-2 items-center">
                          {error ? (
                            <>
                              <TriangleExclamation className="w-3.5 h-3.5 text-red-500" />
                              <div className="text-xs text-gray-200 font-medium">
                                Error
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <div className="text-xs text-gray-200 font-medium">
                                Response
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setExpandedResponse(!expandedResponse);
                          }}
                          className="p-1.5 hover:bg-gray-800/50 rounded-md group relative"
                        >
                          {expandedResponse ? (
                            <ChevronDown className="w-4 h-4 text-gray-400" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            navigator.clipboard.writeText(
                              JSON.stringify(responseData, null, 2)
                            );
                            setCopied(true);
                            setTimeout(() => setCopied(false), 2000);
                          }}
                          type="button"
                          className="p-1.5 hover:bg-gray-800/50 rounded-md group relative"
                        >
                          {copied ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
                          )}
                          <div className="absolute right-0 top-full mt-1 hidden group-hover:block text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                            {copied ? "Copied!" : "Copy response"}
                          </div>
                        </button>
                      </div>
                    </div>
                    <div className="bg-response-body-dark rounded-b-xl overflow-auto">
                      {error ? (
                        <div className="pb-8 pt-10 px-6 space-y-4 flex flex-col items-center">
                          <TriangleExclamation className="h-8 w-8 text-white/20" />
                          <div className="text-sm text-center text-white">
                            {error}
                          </div>
                        </div>
                      ) : (
                        <pre
                          className={`overflow-auto font-mono text-sm p-4 text-gray-200 ${
                            expandedResponse ? "max-h-[80vh]" : "max-h-[300px]"
                          }`}
                        >
                          <code>{JSON.stringify(responseData, null, 2)}</code>
                        </pre>
                      )}
                    </div>
                  </div>
                )}

                {/* Request Code Preview */}
                <CodeBlock
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  language="JavaScript"
                  endpoint={selectedEndpoint}
                  formState={formState}
                  inModal={true}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
