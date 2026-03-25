import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");

// --- discover all routes from the shared api config ---

const { apis } = await import("@scrape-creators/api-config");

const routes = ["/", "/introduction"];
for (const api of apis) {
  for (const ep of api.endpoints) {
    routes.push(ep.path);
  }
}

console.log(`discovered ${routes.length} routes to prerender`);

// --- load the SSR bundle and HTML template ---

const { render } = await import(path.resolve(dist, "server/entry-server.js"));
const template = fs.readFileSync(path.resolve(dist, "index.html"), "utf-8");

// --- render each route to static HTML ---

let count = 0;
for (const url of routes) {
  const { html: appHtml, helmet } = render(url);

  // inject per-route openapi spec if it exists (e.g. dist/v1/tiktok/profile/openapi.json)
  let specTag = "";
  if (url !== "/" && url !== "/introduction") {
    const specPath = path.resolve(dist, url.slice(1), "openapi.json");
    if (fs.existsSync(specPath)) {
      const spec = fs.readFileSync(specPath, "utf-8");
      specTag = `<script type="application/json" id="openapi-spec">${spec}</script>\n    `;
    }
  }

  const headTags = [
    helmet.title?.toString(),
    helmet.meta?.toString(),
    helmet.link?.toString(),
    helmet.script?.toString(),
  ]
    .filter(Boolean)
    .join("\n    ");

  const page = template
    .replace("<!--ssr-head-->", specTag + headTags)
    .replace("<!--ssr-outlet-->", appHtml);

  // / -> dist/index.html, /introduction -> dist/introduction/index.html
  const filePath =
    url === "/"
      ? path.resolve(dist, "index.html")
      : path.resolve(dist, url.slice(1), "index.html");

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, page);
  count++;
}

console.log(`prerendered ${count} pages`);
