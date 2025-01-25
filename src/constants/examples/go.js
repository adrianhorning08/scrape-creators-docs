export const goExample = `<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
  <span class="token string">"fmt"</span>
  <span class="token string">"io/ioutil"</span>
  <span class="token string">"net/http"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
  req<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> http<span class="token punctuation">.</span>NewRequest<span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> <span class="token string">"http://sandbox.mintlify.com/plants"</span><span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
  
  req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span>Add<span class="token punctuation">(</span><span class="token string">"Authorization"</span><span class="token punctuation">,</span> <span class="token string">"Bearer &lt;token&gt;"</span><span class="token punctuation">)</span>
  resp<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> client<span class="token punctuation">.</span>Do<span class="token punctuation">(</span>req<span class="token punctuation">)</span>
  
  body<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span>ReadAll<span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
  fmt<span class="token punctuation">.</span>Println<span class="token punctuation">(</span>string<span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>`;