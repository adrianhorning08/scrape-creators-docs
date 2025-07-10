export const getJavaExample = (endpoint, formState, inModal) => {
  const apiKey =
    inModal && formState?.apiKey ? formState.apiKey : "<api_token>";
  const params = inModal && formState?.params ? formState.params : {};

  const queryString =
    Object.keys(params).length > 0
      ? "?" +
        Object.entries(params)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&")
      : "";

  return `<span class="token keyword">import</span> <span class="token import">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span>http<span class="token punctuation">.</span>HttpClient</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span>http<span class="token punctuation">.</span>HttpRequest</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span>http<span class="token punctuation">.</span>HttpResponse</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span>URI</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span>http<span class="token punctuation">.</span>HttpResponse<span class="token punctuation">.</span>BodyHandlers</span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span>String<span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> Exception <span class="token punctuation">{</span>
        HttpClient client <span class="token operator">=</span> HttpClient<span class="token punctuation">.</span><span class="token function">newHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        HttpRequest request <span class="token operator">=</span> HttpRequest<span class="token punctuation">.</span><span class="token function">newBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">uri</span><span class="token punctuation">(</span>URI<span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token string">"https://api.scrapecreators.com${
              endpoint?.path || ""
            }${queryString}"</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">header</span><span class="token punctuation">(</span><span class="token string">"x-api-key"</span><span class="token punctuation">,</span> <span class="token string">"${apiKey}"</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">GET</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        HttpResponse<span class="token operator"><</span>String<span class="token operator">></span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">send</span><span class="token punctuation">(</span>request<span class="token punctuation">,</span> BodyHandlers<span class="token punctuation">.</span><span class="token function">ofString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
        System<span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>`;
};
