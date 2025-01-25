export const getPythonExample = (endpoint, formState, inModal) => {
  const apiKey = inModal && formState?.apiKey ? formState.apiKey : '<token>';
  const params = inModal && formState?.params ? formState.params : {};
  
  const queryString = Object.keys(params).length > 0 
    ? '?' + Object.entries(params)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&')
    : '';

  return `<span class="token keyword">import</span> requests

url <span class="token operator">=</span> <span class="token string">"https://api.scrapecreators.com${endpoint?.path || ''}${queryString}"</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"x-api-key"</span><span class="token punctuation">:</span> <span class="token string">"${apiKey}"</span>
<span class="token punctuation">}</span>

response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
data <span class="token operator">=</span> response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>`;
};