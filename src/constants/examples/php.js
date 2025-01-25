export const phpExample = `<span class="token php"><span class="token delimiter important">&lt;?php</span>

<span class="token variable">$curl</span> <span class="token operator">=</span> <span class="token function">curl_init</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">curl_setopt_array</span><span class="token punctuation">(</span><span class="token variable">$curl</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>
  <span class="token constant">CURLOPT_URL</span> <span class="token operator">=></span> <span class="token string">"http://sandbox.mintlify.com/plants"</span><span class="token punctuation">,</span>
  <span class="token constant">CURLOPT_RETURNTRANSFER</span> <span class="token operator">=></span> <span class="token boolean">true</span><span class="token punctuation">,</span>
  <span class="token constant">CURLOPT_HTTPHEADER</span> <span class="token operator">=></span> <span class="token punctuation">[</span>
    <span class="token string">"Authorization: Bearer &lt;token&gt;"</span>
  <span class="token punctuation">]</span>
<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">curl_exec</span><span class="token punctuation">(</span><span class="token variable">$curl</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token function">curl_close</span><span class="token punctuation">(</span><span class="token variable">$curl</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">echo</span> <span class="token variable">$response</span><span class="token punctuation">;</span></span>`;