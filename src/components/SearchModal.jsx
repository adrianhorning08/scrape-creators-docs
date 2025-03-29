import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { apis } from "../constants/apis";

export default function SearchModal({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Flatten all endpoints for searching
  const allEndpoints = apis.flatMap((api) =>
    api.endpoints.map((endpoint) => ({
      ...endpoint,
      apiName: api.name,
      icon: api.icon,
    }))
  );

  const search = (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = allEndpoints.flatMap((endpoint) => {
      const matches = [];
      const lowerQuery = query.toLowerCase();

      // Search in API name + endpoint name combination
      const fullName = `${endpoint.apiName} ${endpoint.name}`.toLowerCase();
      if (fullName.includes(lowerQuery)) {
        matches.push({
          type: "name",
          endpoint,
          text: `${endpoint.apiName} ${endpoint.name}`,
          highlight: `${endpoint.apiName} ${endpoint.name}`,
        });
      }

      // Search in endpoint name
      if (endpoint.name.toLowerCase().includes(lowerQuery)) {
        matches.push({
          type: "name",
          endpoint,
          text: endpoint.name,
          highlight: endpoint.name,
        });
      }

      // Search in endpoint path
      if (endpoint.path.toLowerCase().includes(lowerQuery)) {
        matches.push({
          type: "path",
          endpoint,
          text: endpoint.path,
          highlight: endpoint.path,
        });
      }

      // Search in description
      if (endpoint.description.toLowerCase().includes(lowerQuery)) {
        matches.push({
          type: "description",
          endpoint,
          text: endpoint.description,
          highlight: getHighlightedText(endpoint.description, lowerQuery),
        });
      }

      // Search in parameters
      endpoint.params.forEach((param) => {
        if (
          param.name.toLowerCase().includes(lowerQuery) ||
          param.description.toLowerCase().includes(lowerQuery)
        ) {
          matches.push({
            type: "parameter",
            endpoint,
            paramName: param.name,
            text: param.description,
            highlight: getHighlightedText(param.description, lowerQuery),
          });
        }
      });

      // Search in response example
      if (endpoint.sampleResponse) {
        const responseStr = JSON.stringify(endpoint.sampleResponse, null, 2);
        if (responseStr.toLowerCase().includes(lowerQuery)) {
          matches.push({
            type: "response",
            endpoint,
            text: "Response example",
            highlight: "Found in response data",
          });
        }
      }

      return matches;
    });

    setResults(searchResults);
    setSelectedIndex(0);
  };

  const getHighlightedText = (text, query) => {
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts
      .map((part, i) =>
        part.toLowerCase() === query.toLowerCase()
          ? `<mark class="bg-primary/20 text-primary-light">${part}</mark>`
          : part
      )
      .join("");
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + results.length) % results.length);
        break;
      case "Enter":
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  const handleSelect = (result) => {
    navigate(result.endpoint.path);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    search(searchQuery);
  }, [searchQuery]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 top-4 max-w-2xl mx-auto">
        <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl">
          <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search endpoints, parameters, responses..."
              className="flex-1 ml-3 bg-transparent border-0 outline-none text-gray-900 dark:text-white placeholder-gray-400"
              autoComplete="off"
            />
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          {results.length > 0 && (
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {results.map((result, index) => (
                <div
                  key={`${result.endpoint.path}-${result.type}-${index}`}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer ${
                    index === selectedIndex
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <result.endpoint.icon className="w-5 h-5 mt-0.5 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-1.5 py-0.5 text-xs font-medium rounded ${
                          result.endpoint.method === "GET"
                            ? "bg-green-400/20 text-green-700 dark:text-green-400"
                            : result.endpoint.method === "POST"
                            ? "bg-blue-400/20 text-blue-700 dark:text-blue-400"
                            : result.endpoint.method === "PUT"
                            ? "bg-yellow-400/20 text-yellow-700 dark:text-yellow-400"
                            : "bg-red-400/20 text-red-700 dark:text-red-400"
                        }`}
                      >
                        {result.endpoint.method}
                      </span>
                      <span className="font-medium text-gray-900 dark:text-white truncate">
                        {result.endpoint.name}
                      </span>
                    </div>
                    <div className="mt-1 text-sm">
                      {result.type === "parameter" && (
                        <span className="font-mono text-xs text-primary-light mr-1">
                          {result.paramName}:
                        </span>
                      )}
                      <span
                        className="text-gray-600 dark:text-gray-300"
                        dangerouslySetInnerHTML={{ __html: result.highlight }}
                      />
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {result.endpoint.apiName} • {result.type}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchQuery && results.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
