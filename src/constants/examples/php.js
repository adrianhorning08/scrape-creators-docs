export const getPhpExample = (endpoint, formState, inModal) => {
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

  return `<span class="token php"><span class="token delimiter important">&lt;?php</span>

<span class="token variable">$url</span> <span class="token operator">=</span> <span class="token string">"https://api.scrapecreators.com${
    endpoint?.path || ""
  }${queryString}"</span><span class="token punctuation">;</span>

<span class="token variable">$curl</span> <span class="token operator">=</span> <span class="token function">curl_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">curl_setopt_array</span><span class="token punctuation">(</span><span class="token variable">$curl</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
  <span class="token constant">CURLOPT_URL</span> <span class="token operator">=></span> <span class="token variable">$url</span><span class="token punctuation">,</span>
  <span class="token constant">CURLOPT_RETURNTRANSFER</span> <span class="token operator">=></span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token constant">CURLOPT_HTTPHEADER</span> <span class="token operator">=></span> <span class="token punctuation">[</span>
    <span class="token string">"x-api-key: ${apiKey}"</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">curl_exec</span><span class="token punctuation">(</span><span class="token variable">$curl</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_close</span><span class="token punctuation">(</span><span class="token variable">$curl</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$data</span> <span class="token operator">=</span> <span class="token function">json_decode</span><span class="token punctuation">(</span><span class="token variable">$response</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$data</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>`;
};
