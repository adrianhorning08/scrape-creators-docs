import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import SearchModal from "./SearchModal";
import { apis } from "../constants/apis";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <div id="navbar" className="z-30 fixed lg:sticky top-0 w-full">
      <div className="absolute w-full h-full backdrop-blur flex-none transition-colors duration-500 border-b border-gray-500/5 dark:border-gray-300/[0.06] supports-backdrop-blur:bg-background-light/60 dark:bg-transparent"></div>
      <div className="max-w-8xl mx-auto relative">
        <div className="">
          <div className="relative">
            <div className="flex items-center lg:px-12 h-16 min-w-0 mx-4 lg:mx-0">
              <div className="h-full relative flex-1 flex items-center gap-x-4 min-w-0 border-b border-gray-500/5 dark:border-gray-300/[0.06]">
                <div className="flex-1 flex items-center gap-x-4">
                  <Link to="/" className="flex items-center">
                    <span className="sr-only">
                      Scrape Creators Documentation
                    </span>
                    <div className="flex items-center gap-3">
                      <img
                        className="w-auto h-7 relative object-contain"
                        src="https://scrapecreators.com/logo.png"
                        alt="Scrape Creators logo"
                      />
                      <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        Documentation
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="hidden lg:block mx-px relative flex-1 bg-white dark:bg-gray-900 pointer-events-auto rounded-xl min-w-0">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="w-full flex items-center text-sm leading-6 rounded-xl py-1.5 pl-3.5 pr-3 shadow-sm text-gray-400 dark:text-white/50 bg-background-light dark:bg-background-dark dark:brightness-[1.1] dark:ring-1 dark:hover:brightness-[1.25] ring-1 ring-gray-400/20 hover:ring-gray-600/25 dark:ring-gray-600/30 dark:hover:ring-gray-500/30 focus:outline-primary justify-between truncate gap-2 min-w-[43px]"
                  >
                    <div className="flex items-center gap-3 min-w-[42px]">
                      <Search className="min-w-4 flex-none text-gray-700 hover:text-gray-800 dark:text-gray-300 hover:dark:text-gray-200" />
                      <div className="truncate min-w-0">Search or ask...</div>
                    </div>
                    <span className="flex-none text-xs font-semibold">⌘K</span>
                  </button>
                </div>
                <div className="flex-1 relative hidden lg:flex items-center ml-auto justify-end space-x-4">
                  <nav className="text-sm">
                    <ul className="flex space-x-6 items-center">
                      {/* <li>
                        <a href="mailto:support@scrapecreators.com" className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300" target="_blank">Support</a>
                      </li> */}
                      <li className="block lg:hidden">
                        <a
                          className="whitespace-nowrap font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300"
                          href="https://app.scrapecreators.com"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li
                        className="whitespace-nowrap hidden lg:flex"
                        id="topbar-cta-button"
                      >
                        <a
                          target="_blank"
                          className="group px-4 py-1.5 relative inline-flex items-center text-sm font-medium"
                          href="https://app.scrapecreators.com"
                        >
                          <span className="absolute inset-0 bg-primary-dark rounded-full group-hover:opacity-[0.9]"></span>
                          <div className="mr-0.5 space-x-2.5 flex items-center">
                            <span className="z-10 text-white">Dashboard</span>
                            <svg
                              width="3"
                              height="24"
                              viewBox="0 -9 3 24"
                              className="h-5 rotate-0 overflow-visible text-white/90"
                            >
                              <path
                                d="M0 0L3 3L0 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </nav>
                  <button
                    className="group p-2 flex items-center justify-center"
                    aria-label="Toggle dark mode"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400" />
                    ) : (
                      <Moon className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400" />
                    )}
                  </button>
                </div>
                <div className="flex lg:hidden items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(true)}
                    className="text-gray-500 w-8 h-8 flex items-center justify-center hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    id="search-bar-entry-mobile"
                  >
                    <span className="sr-only">Search...</span>
                    <Search className="h-4 w-4" />
                  </button>
                  <button
                    aria-label="Toggle mobile menu"
                    className="h-7 w-5 flex items-center justify-end"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <Menu className="h-4 w-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:flex px-12 h-12">
          <div className="h-full flex text-sm space-x-6">
            <a
              className="group relative h-full flex items-center text-gray-800 dark:text-gray-200 font-semibold"
              href="/api-reference/introduction"
            >
              API Reference
              <div className="absolute bottom-0 h-[1.5px] w-full bg-primary dark:bg-primary-light"></div>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          isMenuOpen ? "" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Mobile Menu Panel */}
        <div
          className={`fixed top-0 bottom-0 right-0 w-full max-w-xs bg-background-light dark:bg-background-dark shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="h-full overflow-y-auto">
            <div className="px-6 pt-6 pb-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  className="flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <img
                    className="w-auto h-7"
                    src="https://scrapecreators.com/logo.png"
                    alt="Scrape Creators logo"
                  />
                </Link>
                <button
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-4">
              <Link
                to="/introduction"
                className="block py-2 text-base font-medium text-gray-900 dark:text-white hover:text-primary dark:hover:text-primary-light"
                onClick={() => setIsMenuOpen(false)}
              >
                Introduction
              </Link>
              {apis.map((api) => (
                <div key={api.id} className="mt-6">
                  <div className="flex items-center gap-2 mb-2">
                    <api.icon className="w-4 h-4" />
                    <h5 className="font-semibold text-gray-900 dark:text-gray-200">
                      {api.name}
                    </h5>
                  </div>
                  {api.endpoints.map((endpoint) => (
                    <Link
                      key={endpoint.path}
                      to={endpoint.path}
                      className="block py-2 pl-6 text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className={`px-1 py-0.5 rounded-md text-[0.6rem] leading-tight font-bold mr-2 ${
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
                      {endpoint.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
