import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    introspection: {
      type: 'url',
      url: 'http://localhost:4000',
    },
    website: {
      template: 'carbon-multi-page',
      staticAssets: path.join(__dirname, 'assets'),
      siteRoot: 'https://jdalphond.github.io/MagidocTest/',
    },
  }