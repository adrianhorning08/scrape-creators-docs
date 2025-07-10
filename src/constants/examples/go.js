export const getGoExample = (endpoint, formState, inModal) => {
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

  return `<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">"encoding/json"</span>
  <span class="token string">"fmt"</span>
  <span class="token string">"io"</span>
  <span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  url <span class="token operator">:=</span> <span class="token string">"https://api.scrapecreators.com${
    endpoint?.path || ""
  }${queryString}"</span>
  
  req<span class="token punctuation">,</span> err <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> url<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"x-api-key"</span><span class="token punctuation">,</span> <span class="token string">"${apiKey}"</span><span class="token punctuation">)</span>
  
  client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
  resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">defer</span> resp<span class="token punctuation">.</span>Body<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  
  body<span class="token punctuation">,</span> err <span class="token operator">:=</span> io<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
  <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
    <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">var</span> result <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{}</span><br>
&nbsp;&nbsp;<span class="token namespace">json</span><span class="token punctuation">.</span><span class="token function">Unmarshal</span><span class="token punctuation">(</span><span class="token variable">body</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span><span class="token variable">result</span><span class="token punctuation">)</span><br>
&nbsp;&nbsp;<span class="token namespace">fmt</span><span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%+v"</span><span class="token punctuation">,</span> <span class="token variable">result</span><span class="token punctuation">)</span><br>
<span class="token punctuation">}</span>`;
};
