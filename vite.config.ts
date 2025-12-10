import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Properly stringify the API key for replacement during build
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
      // Polyfill process.env to avoid "process is not defined" crashes in browser
      'process.env': JSON.stringify({})
    }
  };
});