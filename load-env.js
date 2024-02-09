
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { createRequire } from 'module';

// Resolve the path to the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a require function to handle CommonJS modules
const require = createRequire(import.meta.url);

// Load environment variables from the .env file
dotenv.config({ path: resolve(__dirname, '.env') });
