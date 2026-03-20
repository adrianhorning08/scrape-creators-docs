import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as esbuild from "esbuild";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const dist = path.resolve(root, "dist");

// --- discover all routes from apis.js (reuse esbuild stub pattern) ---

const stubContents = [
  "const noop = () => null;",
  "export default noop;",
  ...[
    "SiYoutube", "SiTwitch", "SiThreads", "SiPinterest", "SiGoogle",
    "SiTiktok", "SiInstagram", "SiLinkedin", "SiFacebook", "SiX",
    "SiReddit", "SiKick", "SiPersonio", "SiSnapchat", "SiBluesky",
    "SiAmazon", "SiLinktree", "MdPerson",
    "TruthSocialIcon", "KomiIcon", "PillarIcon", "LinkBioIcon", "LinkmeIcon",
    "ScrapeCreatorsIcon",
  ].map((n) => `export const ${n} = noop;`),
].join("\n");

const result = await esbuild.build({
  entryPoints: [path.resolve(root, "src/constants/apis.js")],
  bundle: true,
  format: "esm",
  write: false,
  platform: "node",
  plugins: [
    {
      name: "stub-icons",
      setup(build) {
        build.onResolve({ filter: /^react-icons\// }, (args) => ({
          path: args.path, namespace: "icon-stub",
        }));
        build.onResolve({ filter: /\.(jsx|tsx)$/ }, (args) => ({
          path: args.path, namespace: "icon-stub",
        }));
        build.onResolve({ filter: /ScrapeCreatorsIcon/ }, (args) => ({
          path: args.path, namespace: "icon-stub",
        }));
        build.onLoad({ filter: /.*/, namespace: "icon-stub" }, () => ({
          contents: stubContents, loader: "js",
        }));
      },
    },
  ],
});

const cacheDir = path.resolve(root, "node_modules/.cache");
fs.mkdirSync(cacheDir, { recursive: true });
const tmpFile = path.resolve(cacheDir, "apis-routes.mjs");
fs.writeFileSync(tmpFile, result.outputFiles[0].text);
const { apis } = await import(tmpFile);

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
