// trim arrays to 1 item, recursively (max depth 6)
export function trimResponse(obj, depth = 0) {
  if (depth > 6) return obj;
  if (Array.isArray(obj)) {
    return obj.length ? [trimResponse(obj[0], depth + 1)] : [];
  }
  if (obj && typeof obj === "object") {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      out[k] = trimResponse(v, depth + 1);
    }
    return out;
  }
  return obj;
}

function indent(str, spaces) {
  const pad = " ".repeat(spaces);
  return str
    .split("\n")
    .map((l) => pad + l)
    .join("\n");
}

function yamlStr(s) {
  if (!s) return '""';
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

/**
 * build full OpenAPI 3.1.0 spec as a JSON object (for embedding in HTML).
 * @param {Array} apis - the apis array from constants/apis.js
 */
export function buildFullOpenAPIJSON(apis) {
  const spec = {
    openapi: "3.1.0",
    info: {
      title: "Scrape Creators API",
      description:
        "The easiest way to scrape public social media data at scale. " +
        "Extract profiles, posts, videos, comments, and more from TikTok, " +
        "Instagram, YouTube, Twitter, LinkedIn, Facebook, Reddit, and 15+ platforms.",
      version: "1.0.0",
      contact: {
        name: "Scrape Creators",
        url: "https://scrapecreators.com",
        email: "support@scrapecreators.com",
      },
    },
    servers: [
      { url: "https://api.scrapecreators.com", description: "Production server" },
    ],
    security: [{ apiKeyAuth: [] }],
    tags: apis.map((api) => ({ name: api.name, description: api.description })),
    paths: {},
    components: {
      securitySchemes: {
        apiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "Your Scrape Creators API key",
        },
      },
    },
  };

  for (const api of apis) {
    for (const ep of api.endpoints) {
      const method = ep.method.toLowerCase();
      const operation = {
        tags: [api.name],
        summary: ep.name,
        description: ep.description,
      };

      if (ep.params?.length) {
        operation.parameters = ep.params.map((p) => {
          const param = {
            name: p.name,
            in: "query",
            required: !!p.required,
            description: p.description,
            schema:
              p.type === "select" && p.options
                ? { type: "string", enum: p.options }
                : { type: p.type },
          };
          if (p.placeholder) param.example = p.placeholder;
          return param;
        });
      }

      if (ep.bodyParams?.length) {
        const properties = {};
        const required = [];
        for (const p of ep.bodyParams) {
          const prop = {
            type: p.type === "select" ? "string" : p.type,
            description: p.description,
          };
          if (p.type === "select" && p.options) prop.enum = p.options;
          properties[p.name] = prop;
          if (p.required) required.push(p.name);
        }
        operation.requestBody = {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties,
                ...(required.length ? { required } : {}),
              },
            },
          },
        };
      }

      const sample = ep.trimmedResponse || ep.sampleResponse;
      operation.responses = {
        "200": {
          description: "Successful response",
          content: {
            "application/json": {
              ...(sample ? { example: trimResponse(sample) } : {}),
            },
          },
        },
      };

      if (!spec.paths[ep.path]) spec.paths[ep.path] = {};
      spec.paths[ep.path][method] = operation;
    }
  }

  return spec;
}

/**
 * build OpenAPI 3.1.0 spec for a single platform as a JSON object.
 * @param {Object} api - single entry from the apis array
 */
export function buildPlatformOpenAPIJSON(api) {
  return buildFullOpenAPIJSON([api]);
}

/**
 * build full OpenAPI 3.1.0 spec as YAML string (for download/view buttons).
 * @param {Array} apis - the apis array from constants/apis.js
 */
export function buildFullOpenAPIYaml(apis) {
  const lines = [];

  lines.push("openapi: 3.1.0");
  lines.push("info:");
  lines.push("  title: Scrape Creators API");
  lines.push("  description: >-");
  lines.push("    The easiest way to scrape public social media data at scale.");
  lines.push(
    "    Extract profiles, posts, videos, comments, and more from TikTok,"
  );
  lines.push(
    "    Instagram, YouTube, Twitter, LinkedIn, Facebook, Reddit, and 15+ platforms."
  );
  lines.push("  version: 1.0.0");
  lines.push("  contact:");
  lines.push("    name: Scrape Creators");
  lines.push("    url: https://scrapecreators.com");
  lines.push("    email: support@scrapecreators.com");
  lines.push("servers:");
  lines.push("  - url: https://api.scrapecreators.com");
  lines.push("    description: Production server");
  lines.push("security:");
  lines.push("  - apiKeyAuth: []");

  lines.push("tags:");
  for (const api of apis) {
    lines.push(`  - name: ${yamlStr(api.name)}`);
    lines.push(`    description: ${yamlStr(api.description)}`);
  }

  lines.push("paths:");
  for (const api of apis) {
    for (const ep of api.endpoints) {
      const method = ep.method.toLowerCase();
      lines.push(`  ${ep.path}:`);
      lines.push(`    ${method}:`);
      lines.push("      tags:");
      lines.push(`        - ${yamlStr(api.name)}`);
      lines.push(`      summary: ${yamlStr(ep.name)}`);
      lines.push(`      description: ${yamlStr(ep.description)}`);

      if (ep.params?.length) {
        lines.push("      parameters:");
        for (const p of ep.params) {
          lines.push(`        - name: ${p.name}`);
          lines.push("          in: query");
          lines.push(`          required: ${!!p.required}`);
          lines.push(`          description: ${yamlStr(p.description)}`);
          lines.push("          schema:");
          if (p.type === "select" && p.options) {
            lines.push("            type: string");
            lines.push("            enum:");
            for (const opt of p.options) {
              lines.push(`              - ${opt}`);
            }
          } else {
            lines.push(`            type: ${p.type}`);
          }
          if (p.placeholder) {
            lines.push(`          example: "${p.placeholder}"`);
          }
        }
      }

      if (ep.bodyParams?.length) {
        lines.push("      requestBody:");
        lines.push("        required: true");
        lines.push("        content:");
        lines.push("          application/json:");
        lines.push("            schema:");
        lines.push("              type: object");
        lines.push("              properties:");
        for (const p of ep.bodyParams) {
          const type = p.type === "select" ? "string" : p.type;
          lines.push(`                ${p.name}:`);
          lines.push(`                  type: ${type}`);
          lines.push(`                  description: ${yamlStr(p.description)}`);
          if (p.type === "select" && p.options) {
            lines.push("                  enum:");
            for (const opt of p.options) {
              lines.push(`                    - ${yamlStr(opt)}`);
            }
          }
        }
        const required = ep.bodyParams.filter((p) => p.required);
        if (required.length) {
          lines.push("              required:");
          for (const p of required) {
            lines.push(`                - ${p.name}`);
          }
        }
      }

      lines.push("      responses:");
      lines.push("        '200':");
      lines.push("          description: Successful response");
      lines.push("          content:");
      lines.push("            application/json:");

      const sample = ep.trimmedResponse || ep.sampleResponse;
      if (sample) {
        const json = JSON.stringify(trimResponse(sample), null, 2);
        lines.push("              example:");
        lines.push(indent(json, 16));
      }
    }
  }

  lines.push("components:");
  lines.push("  securitySchemes:");
  lines.push("    apiKeyAuth:");
  lines.push("      type: apiKey");
  lines.push("      in: header");
  lines.push("      name: x-api-key");
  lines.push("      description: Your Scrape Creators API key");

  return lines.join("\n") + "\n";
}
