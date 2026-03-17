import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

// stub module that satisfies all icon/component imports from apis.js
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
          path: args.path,
          namespace: "icon-stub",
        }));
        build.onResolve({ filter: /\.(jsx|tsx)$/ }, (args) => ({
          path: args.path,
          namespace: "icon-stub",
        }));
        build.onResolve({ filter: /ScrapeCreatorsIcon/ }, (args) => ({
          path: args.path,
          namespace: "icon-stub",
        }));
        build.onLoad({ filter: /.*/, namespace: "icon-stub" }, () => ({
          contents: stubContents,
          loader: "js",
        }));
      },
    },
  ],
});

// write bundled apis.js to a temp file and import it
const cacheDir = path.resolve(root, "node_modules/.cache");
fs.mkdirSync(cacheDir, { recursive: true });
const tmpFile = path.resolve(cacheDir, "apis-bundled.mjs");
fs.writeFileSync(tmpFile, result.outputFiles[0].text);

const { apis } = await import(tmpFile);

// import the shared generator (works because project is type: module)
const { buildFullOpenAPIJSON, buildPlatformOpenAPIJSON } = await import(
  path.resolve(root, "src/utils/openapi-generator.js")
);

const spec = buildFullOpenAPIJSON(apis);
const outPath = path.resolve(root, "public/openapi-spec.json");
fs.writeFileSync(outPath, JSON.stringify(spec));
console.log(`openapi spec written to ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(1)} KB)`);

for (const api of apis) {
  const platformSpec = buildPlatformOpenAPIJSON(api);
  const platformPath = path.resolve(root, `public/openapi-spec-${api.id}.json`);
  fs.writeFileSync(platformPath, JSON.stringify(platformSpec));
  console.log(`  ${api.id} spec → ${(fs.statSync(platformPath).size / 1024).toFixed(1)} KB`);
}
