import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from '@mdx-js/rollup';
import fs from 'fs';
import path from 'path';

function injectOpenAPISpec() {
  return {
    name: 'inject-openapi-spec',
    transformIndexHtml(html) {
      const specPath = path.resolve('public/openapi-spec.json');
      if (!fs.existsSync(specPath)) return html;

      const spec = fs.readFileSync(specPath, 'utf-8');
      return html.replace(
        '</head>',
        `  <script type="application/json" id="openapi-spec">${spec}</script>\n  </head>`
      );
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {enforce: 'pre', ...mdx()},
    react(),
    injectOpenAPISpec(),
  ],
  optimizeDeps: {
    include: ['@mdx-js/react']
  }
});