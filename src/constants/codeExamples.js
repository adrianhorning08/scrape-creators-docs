import { getNodejsExample } from "./examples/nodejs";
import { getCurlExample } from "./examples/curl";
import { getPythonExample } from "./examples/python";
import { getPhpExample } from "./examples/php";
import { getGoExample } from "./examples/go";
import { getJavaExample } from "./examples/java";

export const getLanguageExamples = (endpoint, formState, inModal) => ({
  cURL: getCurlExample(endpoint, formState, inModal),
  "Node.js": getNodejsExample(endpoint, formState, inModal),
  Python: getPythonExample(endpoint, formState, inModal),
  PHP: getPhpExample(endpoint, formState, inModal),
  Go: getGoExample(endpoint, formState, inModal),
  Java: getJavaExample(endpoint, formState, inModal),
});
