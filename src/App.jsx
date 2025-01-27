import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { apis } from "./constants/apis";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import CodeBlock from "./components/CodeBlock";
import EndpointDocs from "./components/EndpointDocs";

export default function App() {
  const location = useLocation();
  const isIntroduction =
    location.pathname === "/" || location.pathname === "/introduction";

  // Find the current endpoint data
  const path = location.pathname;
  const api = apis.find((api) => api.endpoints.some((e) => e.path === path));
  const endpointData = api?.endpoints.find((e) => e.path === path);

  return (
    <main className="jsx-4145347147">
      <Helmet>
        <html lang="en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Scrape Creators Documentation" />
        <meta property="og:title" content="Scrape Creators API Documentation" />
        <meta
          property="og:description"
          content="Official API documentation for Scrape Creators - The easiest way to scrape public social media data at scale"
        />
        <meta
          property="og:image"
          content="https://scrapecreators.com/logo.png"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Scrape Creators API Documentation"
        />
        <meta
          name="twitter:description"
          content="Official API documentation for Scrape Creators - The easiest way to scrape public social media data at scale"
        />
        <meta
          name="twitter:image"
          content="https://scrapecreators.com/logo.png"
        />
      </Helmet>
      <span className="fixed inset-0 bg-background-light dark:bg-background-dark -z-10"></span>
      <div className="relative antialiased text-gray-500 dark:text-gray-400">
        <Navbar />
        <div className="max-w-8xl px-4 mx-auto lg:px-8 min-h-screen">
          <div className="flex flex-row gap-12 box-border w-full pt-40 lg:pt-10">
            <Sidebar />
            <div className="relative grow box-border flex-col w-full mx-auto px-1 lg:pl-[23.7rem] lg:-ml-12 xl:w-[calc(100%-56rem)]">
              <Routes>
                <Route path="*" element={<EndpointDocs />} />
              </Routes>
            </div>
            {!isIntroduction && (
              <div className="hidden xl:flex self-start sticky top-[calc(8rem+1.5rem)] h-[calc(100vh-8rem-1.5rem)] overflow-y-auto">
                <div className="w-[28rem] gap-6 flex flex-col">
                  {endpointData && (
                    <CodeBlock language="JavaScript" endpoint={endpointData} />
                  )}
                  {endpointData && (
                    <CodeBlock language="200" endpoint={endpointData} />
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
