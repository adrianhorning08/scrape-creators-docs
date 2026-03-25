import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const { apis } = await import("@scrape-creators/api-config");

const { buildFullOpenAPIJSON, buildEndpointOpenAPIJSON } = await import(
  path.resolve(root, "src/utils/openapi-generator.js")
);

const spec = buildFullOpenAPIJSON(apis);
const outPath = path.resolve(root, "public/openapi.json");
fs.writeFileSync(outPath, JSON.stringify(spec));
console.log(`openapi spec written to ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

// per-endpoint specs at public/{endpoint.path}/openapi.json
let endpointCount = 0;
for (const api of apis) {
  for (const ep of api.endpoints) {
    const epSpec = buildEndpointOpenAPIJSON(api, ep);
    const epDir = path.resolve(root, `public${ep.path}`);
    fs.mkdirSync(epDir, { recursive: true });
    const epPath = path.resolve(epDir, "openapi.json");
    fs.writeFileSync(epPath, JSON.stringify(epSpec));
    endpointCount++;
  }
}
console.log(`  ${endpointCount} per-endpoint specs generated`);
