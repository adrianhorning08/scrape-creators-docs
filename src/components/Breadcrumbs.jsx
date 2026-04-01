import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const path = location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/" || path === "/introduction") {
    return null;
  }

  const breadcrumbItems = [{ name: "Home", path: "/", isActive: false }];

  const integrationNames = {
    "/integrations/overview": "Overview",
    "/integrations/mcp": "MCP",
    "/integrations/n8n": "n8n",
    "/integrations/apify": "Apify",
  };

  let pageName = "API Documentation";

  if (integrationNames[path]) {
    breadcrumbItems.push({
      name: "Integrations",
      path: "/integrations/overview",
      isActive: false,
    });
    pageName = integrationNames[path];
  } else if (path.includes("/v1/") || path.includes("/v2/") || path.includes("/v3/")) {
    const pathParts = path.split("/").filter((p) => p);
    if (pathParts.length >= 3) {
      const platform = pathParts[1];
      const endpoint = pathParts[2];
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
