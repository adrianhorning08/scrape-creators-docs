function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function formatJson(obj, indentLevel = 0) {
  const indent = '  '.repeat(indentLevel);
  
  if (obj === null) {
    return `<span class="token keyword">null</span>`;
  }
  
  if (typeof obj === 'boolean') {
    return `<span class="token boolean">${obj}</span>`;
  }
  
  if (typeof obj === 'number') {
    return `<span class="token number">${obj}</span>`;
  }
  
  if (typeof obj === 'string') {
    return `<span class="token string">"${escapeHtml(obj)}"</span>`;
  }
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) {
      return `<span class="token punctuation">[</span><span class="token punctuation">]</span>`;
    }
    
    const items = obj.map(item => 
      `\n${indent}  ${formatJson(item, indentLevel + 1)}`
    ).join(',');
    
    return `<span class="token punctuation">[</span>${items}\n${indent}<span class="token punctuation">]</span>`;
  }
  
  if (typeof obj === 'object') {
    const entries = Object.entries(obj);
    if (entries.length === 0) {
      return `<span class="token punctuation">{</span><span class="token punctuation">}</span>`;
    }
    
    const properties = entries.map(([key, value]) => 
      `\n${indent}  <span class="token property">"${escapeHtml(key)}"</span>` +
      `<span class="token operator">:</span> ${formatJson(value, indentLevel + 1)}`
    ).join(',');
    
    return `<span class="token punctuation">{</span>${properties}\n${indent}<span class="token punctuation">}</span>`;
  }
  
  return String(obj);
}