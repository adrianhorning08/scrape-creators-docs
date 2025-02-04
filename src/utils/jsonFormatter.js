function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Memoize formatted results
const formatCache = new Map();

// Break up large strings into chunks for processing
function processInChunks(str, chunkSize = 10000) {
  const chunks = [];
  for (let i = 0; i < str.length; i += chunkSize) {
    chunks.push(str.slice(i, i + chunkSize));
  }
  return chunks;
}

export function formatJson(obj, indentLevel = 0, path = "") {
  // Generate cache key
  const cacheKey = JSON.stringify(obj) + indentLevel;
  if (formatCache.has(cacheKey)) {
    return formatCache.get(cacheKey);
  }

  const indent = "  ".repeat(indentLevel);

  if (obj === null) {
    return `<span class="token keyword">null</span>`;
  }

  if (typeof obj === "boolean") {
    return `<span class="token boolean">${obj}</span>`;
  }

  if (typeof obj === "number") {
    return `<span class="token number">${obj}</span>`;
  }

  if (typeof obj === "string") {
    return `<span class="token string">"${escapeHtml(obj)}"</span>`;
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return `<span class="token punctuation" data-path="${path}">[</span><span class="token punctuation">]</span>`;
    }

    const items = obj
      .map(
        (item, index) =>
          `\n${indent}  ${formatJson(
            item,
            indentLevel + 1,
            `${path}[${index}]`
          )}`
      )
      .join(",");

    return `<span class="token punctuation">[</span>${items}\n${indent}<span class="token punctuation">]</span>`;
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return `<span class="token punctuation" data-path="${path}">{</span><span class="token punctuation">}</span>`;
    }

    // For large objects, process properties in chunks
    if (entries.length > 100) {
      const result = entries.reduce((acc, [key, value], index) => {
        const currentPath = path ? `${path}.${key}` : key;
        return (
          acc +
          (index === 0 ? "" : ",") +
          `\n${indent}  <span class="token property" data-path="${currentPath}">"${escapeHtml(
            key
          )}"</span>` +
          `<span class="token operator">:</span> ${formatJson(
            value,
            indentLevel + 1,
            currentPath
          )}`
        );
      }, "");
      return `<span class="token punctuation">{</span>${result}\n${indent}<span class="token punctuation">}</span>`;
    }

    const properties = entries
      .map(
        ([key, value]) =>
          `\n${indent}  <span class="token property" data-path="${
            path ? `${path}.${key}` : key
          }">"${escapeHtml(key)}"</span>` +
          `<span class="token operator">:</span> ${formatJson(
            value,
            indentLevel + 1,
            path ? `${path}.${key}` : key
          )}`
      )
      .join(",");

    return `<span class="token punctuation" data-path="${path}">{</span>${properties}\n${indent}<span class="token punctuation">}</span>`;
  }

  const result = String(obj);

  // Cache the result
  formatCache.set(cacheKey, result);

  return result;
}
