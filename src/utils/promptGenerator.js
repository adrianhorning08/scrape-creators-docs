export function generateAIPrompt(endpoint, selectedLanguage = null) {
  const languageSpecific =
    selectedLanguage && selectedLanguage !== "200" && selectedLanguage !== "400"
      ? `\nPlease write the code in ${selectedLanguage}.`
      : "";

  const prompt = `I want to make an API call to https://api.scrapecreators.com${
    endpoint.path
  }. 

  Please help me write code to make this API call and handle the response appropriately. Include error handling and best practices.

  Please write the code in ${selectedLanguage}.
  
  Here are the details:
  
  Endpoint: ${endpoint.method} https://api.scrapecreators.com${endpoint.path}
  
  Description: ${endpoint.description}
  
  Required Headers:
  - x-api-key: Your API key
  
  ${
    endpoint.params.length > 0
      ? `Parameters:
  ${endpoint.params
    .map(
      (param) =>
        `- ${param.name} (${param.type})${
          param.required ? " (Required)" : ""
        }: ${param.description}`
    )
    .join("\n")}`
      : ""
  }
  
  Example Response:
  ${JSON.stringify(endpoint.sampleResponse, null, 2)}
  
  `;

  return prompt;
}
