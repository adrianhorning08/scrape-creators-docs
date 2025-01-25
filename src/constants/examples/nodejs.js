export const getNodejsExample = (endpoint, formState, inModal) => {
  const apiKey = inModal && formState?.apiKey ? formState.apiKey : '<token>';
  const params = inModal && formState?.params ? formState.params : {};
  
  const queryString = Object.keys(params).length > 0 
    ? '?' + Object.entries(params)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  return `<span class="token keyword">import</span> axios <span class="token keyword">from</span> <span class="token string">'axios'</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> <span class="token punctuation">{</span> data <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token keyword">await</span> axios<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>
  <span class="token string">'https://api.scrapecreators.com${endpoint?.path || ''}${queryString}'</span><span class="token punctuation">,</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">headers</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string">'x-api-key'</span><span class="token operator">:</span> <span class="token string">'${apiKey}'</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>`;
};