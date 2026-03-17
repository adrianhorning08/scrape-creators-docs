export function generatePageMarkdown(endpoint, api) {
  const method = endpoint.method.toLowerCase();

  let md = "";

  md += `> Full API reference: https://docs.scrapecreators.com/llms.txt\n\n`;

  md += `# ${api.name} - ${endpoint.name}\n\n`;
  md += `${endpoint.description}\n\n`;

  md += `**Base URL:** \`https://api.scrapecreators.com\`\n\n`;
  md += `**Endpoint:** \`${endpoint.method} ${endpoint.path}\`\n\n`;
  md += `**Authentication:** Pass your API key via the \`x-api-key\` header.\n\n`;

  if (endpoint.credits) {
    const cost = typeof endpoint.credits === "number" ? endpoint.credits : endpoint.credits.cost;
    md += `**Credits:** ${cost} per request\n\n`;
  }

  md += `## API Specification\n\n`;
  md += `\`\`\`\`yaml ${method} ${endpoint.path}\n`;
  md += buildOpenAPISpec(endpoint, api);
  md += `\`\`\`\`\n`;

  return md;
}

function y(s) {
  if (!s) return '""';
  return `"${String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}

export function buildOpenAPISpec(endpoint, api) {
  const method = endpoint.method.toLowerCase();
  const lines = [];

  lines.push("openapi: 3.1.0");
  lines.push("info:");
  lines.push("  title: Scrape Creators API");
  lines.push("  description: >-");
  lines.push("    The Scrape Creators API - the easiest way to scrape public social");
  lines.push("    media data at scale.");
  lines.push("  version: 1.0.0");
  lines.push("  contact:");
  lines.push("    name: Scrape Creators");
  lines.push("    url: https://scrapecreators.com");
  lines.push("servers:");
  lines.push("  - url: https://api.scrapecreators.com");
  lines.push("    description: Production server");
  lines.push("security:");
  lines.push("  - apiKeyAuth: []");
  lines.push("tags:");
  lines.push(`  - name: ${y(api.name)}`);
  lines.push(`    description: ${y(api.description)}`);
  lines.push("paths:");
  lines.push(`  ${endpoint.path}:`);
  lines.push(`    ${method}:`);
  lines.push("      tags:");
  lines.push(`        - ${y(api.name)}`);
  lines.push(`      summary: ${y(endpoint.name)}`);
  lines.push(`      description: ${y(endpoint.description)}`);

  if (endpoint.params?.length > 0) {
    lines.push("      parameters:");
    for (const param of endpoint.params) {
      lines.push(`        - name: ${param.name}`);
      lines.push("          in: query");
      lines.push(`          required: ${!!param.required}`);
      lines.push(`          description: ${y(param.description)}`);
      lines.push("          schema:");
      if (param.type === "select" && param.options) {
        lines.push("            type: string");
        lines.push("            enum:");
        for (const opt of param.options) {
          lines.push(`              - ${y(opt)}`);
        }
      } else {
        lines.push(`            type: ${param.type}`);
      }
      if (param.placeholder) {
        lines.push(`          example: ${y(param.placeholder)}`);
      }
    }
  }

  if (endpoint.bodyParams?.length > 0) {
    lines.push("      requestBody:");
    lines.push("        required: true");
    lines.push("        content:");
    lines.push("          application/json:");
    lines.push("            schema:");
    lines.push("              type: object");
    lines.push("              properties:");
    for (const param of endpoint.bodyParams) {
      lines.push(`                ${param.name}:`);
      const type = param.type === "select" ? "string" : param.type;
      lines.push(`                  type: ${type}`);
      lines.push(`                  description: ${y(param.description)}`);
      if (param.type === "select" && param.options) {
        lines.push("                  enum:");
        for (const opt of param.options) {
          lines.push(`                    - ${y(opt)}`);
        }
      }
    }
    const required = endpoint.bodyParams.filter((p) => p.required);
    if (required.length > 0) {
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

  if (endpoint.responseFields?.length > 0) {
    lines.push("              schema:");
    lines.push("                type: object");
    lines.push("                properties:");
    for (const field of endpoint.responseFields) {
      lines.push(`                  ${field.name}:`);
      lines.push(`                    type: ${field.type}`);
      lines.push(`                    description: ${y(field.description)}`);
    }
  }

  if (endpoint.sampleResponse) {
    const jsonStr = JSON.stringify(endpoint.sampleResponse, null, 2);
    lines.push("              example: |");
    for (const line of jsonStr.split("\n")) {
      lines.push(`                ${line}`);
    }
  }

  lines.push("components:");
  lines.push("  securitySchemes:");
  lines.push("    apiKeyAuth:");
  lines.push("      type: apiKey");
  lines.push("      in: header");
  lines.push("      name: x-api-key");
  lines.push("      description: Your Scrape Creators API key.");

  return lines.join("\n") + "\n";
}
