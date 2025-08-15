import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname;

  // Don't show breadcrumbs for home page
  if (path === "/" || path === "/introduction") {
    return null;
  }

  // For API endpoints, create a simple flat structure: Home > Endpoint Name
  const breadcrumbItems = [{ name: "Home", path: "/", isActive: false }];

  // Get a user-friendly name for the current page
  let pageName = "API Documentation";

  if (path === "/introduction") {
    pageName = "Introduction";
  } else if (path.includes("/v1/")) {
    // Extract platform and endpoint from path like /v1/tiktok/profile
    const pathParts = path.split("/").filter((p) => p);
    if (pathParts.length >= 3) {
      const platform = pathParts[1]; // tiktok
      const endpoint = pathParts[2]; // profile

      // Capitalize platform name
      const platformName = platform.charAt(0).toUpperCase() + platform.slice(1);
      const endpointName =
        endpoint.charAt(0).toUpperCase() + endpoint.slice(1).replace(/-/g, " ");

      pageName = `${platformName} ${endpointName} API`;
    }
  }

  breadcrumbItems.push({
    name: pageName,
    path: path,
    isActive: true,
  });

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        {breadcrumbItems.map((item, index) => (
          <li key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight
                className="w-4 h-4 mx-2 text-gray-400"
                aria-hidden="true"
              />
            )}
            {item.isActive ? (
              <span
                className="font-medium text-gray-900 dark:text-white"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
