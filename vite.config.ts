import path from "path";

import react from "@vitejs/plugin-react";

import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";

/**
 * Prefix for environment variables to be loaded into the Vite app.
 * Only variables starting with this prefix will be available in the client.
 * Example: REACT_APP_API_URL
 */
const ENV_PREFIX = "REACT_APP_";

/**
 * Vite configuration
 *
 * @param {{ mode: string }} config - Vite config object provided by the CLI
 * @returns {import('vite').UserConfigExport} Vite configuration object
 */
export default defineConfig(({ mode }) => {
  /**
   * Load environment variables for the current mode (development, production, etc.)
   */
  const env = loadEnv(mode, process.cwd(), ENV_PREFIX);

  return {
    /**
     * Array of Vite plugins.
     * @see https://vitejs.dev/plugins/
     */
    plugins: [
      react(),
      tailwindcss(),

      /**
       * Custom middleware to serve PDF files inline in the browser
       */
      {
        name: "serve-pdf",
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url?.endsWith(".pdf")) {
              res.setHeader("Content-Type", "application/pdf");
              res.setHeader("Content-Disposition", "inline");
            }
            next();
          });
        },
      },
    ],

    /**
     * Module resolution settings
     *
     * We only use `~` as an alias for `src` directory to simplify imports:
     * Examples:
     * import MyComponent from '~/components/MyComponent'
     *
     * We use path aliases to simplify imports:
     * Examples:
     *    import globalStyles from '@styles/global.scss'
     */
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"), // General alias for src
      },
    },

    /**
     * Development server configuration
     * @see https://vitejs.dev/config/server-options.html
     */
    server: {
      port: 3005, // Local dev server port
      open: env.SERVER_OPEN_BROWSER === "true", // Auto-open browser if env var is true
      strictPort: true, // Fail if port is already in use
    },

    /**
     * Build configuration for production
     * @see https://vitejs.dev/config/build-options.html
     */
    build: {
      outDir: "dist", // Output directory
      sourcemap: mode === "production", // Generate sourcemaps only in production
      rollupOptions: {
        output: {
          manualChunks: {
            /**
             * Separate vendor bundle for React for better caching
             */
            react: ["react", "react-dom"],
          },
        },
      },
    },

    /**
     * Environment variable prefix
     */
    envPrefix: ENV_PREFIX,

    /**
     * Define global constants
     * Makes process.env variables available to the client
     */
    define: {
      "process.env": env,
    },

    /**
     * Pre-bundling configuration to optimize dependencies in dev mode.
     *
     * Vite uses esbuild to pre-bundle these libraries into faster ESM modules,
     * reducing the number of network requests and improving dev server startup.
     * Including 'react' and 'react-dom' ensures faster HMR and initial load.
     *
     * @see https://vitejs.dev/config/dep-optimization-options.html
     */
    optimizeDeps: {
      include: ["react", "react-dom"],
    },

    /**
     * Preview server configuration for `vite preview`
     */
    preview: {
      port: 5000, // Different from dev port
      strictPort: true,
    },
  };
});
