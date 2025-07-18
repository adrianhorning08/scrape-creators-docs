import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { apis } from "../constants/apis";

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;
  const activeEndpointRef = useRef(null);
  const isUserClick = useRef(false);

  useEffect(() => {
    // Reset the user click flag after a short delay
    const timeoutId = setTimeout(() => {
      isUserClick.current = false;
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [currentPath]);

  useEffect(() => {
    if (!isUserClick.current && activeEndpointRef.current) {
      activeEndpointRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentPath]);

  const handleLinkClick = () => {
    isUserClick.current = true;
  };

  return (
    <div className="z-20 hidden lg:block fixed bottom-0 right-auto w-[18rem] top-[7.1rem]">
      <div className="absolute inset-0 z-10 stable-scrollbar-gutter overflow-auto pr-8 pb-10">
        <div className="relative lg:text-sm lg:leading-6">
          <div className="sticky top-0 h-8 bg-gradient-to-b from-background-light dark:from-background-dark"></div>
          <div id="navigation-items">
            {/* <li className="list-none">
              <a href="https://mintlify.com/docs" target="_blank" rel="noreferrer" className="pl-4 group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                <div className="mr-4 rounded-md p-1 zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-gray-950/5 dark:ring-gray-700/40">
                  <svg className="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-gray-400 dark:bg-gray-500" style={{WebkitMaskImage: 'url(https://mintlify.b-cdn.net/v6.6.0/duotone/book-open-cover.svg)', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center'}}></svg>
                </div>
                Documentation
              </a>
            </li> */}
            {/* <li className="list-none">
              <a href="https://mintlify.com/community" target="_blank" rel="noreferrer" className="pl-4 group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                <div className="mr-4 rounded-md p-1 zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-gray-950/5 dark:ring-gray-700/40">
                  <svg className="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-gray-400 dark:bg-gray-500" style={{WebkitMaskImage: 'url(https://mintlify.b-cdn.net/v6.6.0/brands/slack.svg)', WebkitMaskRepeat: 'no-repeat', WebkitMaskPosition: 'center'}}></svg>
                </div>
                Community
              </a>
            </li> */}
            {/* <li className="list-none">
              <a
                href="https://scrapecreators.com/blog"
                target="_blank"
                rel="noreferrer"
                className="pl-4 group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4 font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <div className="mr-4 rounded-md p-1 zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-gray-950/5 dark:ring-gray-700/40">
                  <svg
                    className="h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white bg-gray-400 dark:bg-gray-500"
                    style={{
                      WebkitMaskImage:
                        "url(https://mintlify.b-cdn.net/v6.6.0/duotone/newspaper.svg)",
                      WebkitMaskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                    }}
                  ></svg>
                </div>
                Blog
              </a>
            </li> */}
            <div className="mt-12 lg:mt-8">
              <h5 className="pl-4 mb-3.5 lg:mb-2.5 font-semibold text-gray-900 dark:text-gray-200">
                API Documentation
              </h5>
              <ul>
                <li className="scroll-m-4 first:scroll-m-20">
                  <Link
                    to="/introduction"
                    className={`group mt-2 lg:mt-0 flex items-center pr-3 py-1.5 cursor-pointer focus:outline-primary dark:focus:outline-primary-light space-x-3 rounded-xl ${
                      currentPath === "/introduction" || currentPath === "/"
                        ? "bg-primary/10 text-primary font-semibold dark:text-primary-light dark:bg-primary-light/10"
                        : "hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                    }`}
                    style={{ paddingLeft: "1rem" }}
                  >
                    <div className="flex-1 flex items-center space-x-2.5">
                      <div>Introduction</div>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-12 lg:mt-8">
              {apis.map((api) => (
                <div key={api.id} className="mb-8">
                  <div className="flex items-center gap-2 pl-4 mb-3.5 lg:mb-2.5">
                    <api.icon className="w-4 h-4" />
                    <h5 className="font-semibold text-gray-900 dark:text-gray-200">
                      {api.name}
                    </h5>
                  </div>
                  <ul>
                    {api.endpoints.map((endpoint) => (
                      <li key={endpoint.path}>
                        <Link
                          to={endpoint.path}
                          onClick={handleLinkClick}
                          ref={
                            currentPath === endpoint.path
                              ? activeEndpointRef
                              : null
                          }
                          className={`group mt-2 lg:mt-0 flex items-center pr-3 py-1.5 cursor-pointer focus:outline-primary dark:focus:outline-primary-light rounded-xl relative ${
                            currentPath === endpoint.path
                              ? endpoint.method === "POST"
                                ? "bg-blue-100/80 text-blue-700 font-semibold dark:bg-blue-400/10 dark:text-blue-400"
                                : "bg-primary/10 text-primary font-semibold dark:text-primary-light dark:bg-primary-light/10"
                              : "hover:bg-gray-600/5 dark:hover:bg-gray-200/5 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          }`}
                          style={{ paddingLeft: "1rem" }}
                        >
                          <div className="flex items-center min-w-0 gap-3">
                            <span className="w-8 flex-shrink-0">
                              <span
                                className={`px-1 py-0.5 rounded-md text-[0.55rem] leading-tight font-bold ${
                                  endpoint.method === "GET"
                                    ? "bg-green-400/20 text-green-700 dark:bg-green-400/20 dark:text-green-400"
                                    : endpoint.method === "POST"
                                    ? "bg-blue-400/20 text-blue-700 dark:bg-blue-400/20 dark:text-blue-400"
                                    : endpoint.method === "PUT"
                                    ? "bg-yellow-400/20 text-yellow-700 dark:bg-yellow-400/20 dark:text-yellow-400"
                                    : "bg-red-400/20 text-red-700 dark:bg-red-400/20 dark:text-red-400"
                                }`}
                              >
                                {endpoint.method}
                              </span>
                            </span>
                            <div
                              className={`truncate ${
                                currentPath === endpoint.path &&
                                endpoint.method === "POST"
                                  ? "text-blue-700 dark:text-blue-400"
                                  : ""
                              }`}
                            >
                              {endpoint.name}
                            </div>
                          </div>
                          {endpoint.creditCost > 1 && (
                            <span className="absolute right-3 h-2 w-2 rounded-full bg-purple-800 dark:bg-purple-800" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
