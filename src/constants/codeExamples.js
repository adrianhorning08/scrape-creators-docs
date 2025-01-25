import { getNodejsExample } from './examples/nodejs';
import { getCurlExample } from './examples/curl';
import { getPythonExample } from './examples/python';
import { phpExample } from './examples/php';
import { goExample } from './examples/go';
import { javaExample } from './examples/java';

export const getLanguageExamples = (endpoint, formState, inModal) => ({
  cURL: getCurlExample(endpoint, formState, inModal),
  'Node.js': getNodejsExample(endpoint, formState, inModal),
  Python: getPythonExample(endpoint, formState, inModal),
  PHP: phpExample,
  Go: goExample,
  Java: javaExample
});