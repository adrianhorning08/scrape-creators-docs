export const getCurlExample = (endpoint, formState, inModal) => {
  const apiKey = inModal && formState?.apiKey ? formState.apiKey : "<token>";
  const params = inModal && formState?.params ? formState.params : {};

  const queryString =
    Object.keys(params).length > 0
      ? "?" +
        Object.entries(params)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join("&")
      : "";

  return `<span class="token function">curl</span> <span class="token string">"https://api.scrapecreators.com${
    endpoint?.path || ""
  }${queryString}"</span> <span class="token punctuation">\\</span>
  <span class="token parameter">-H</span> <span class="token string">"x-api-key: ${apiKey}"</span>`;
};
