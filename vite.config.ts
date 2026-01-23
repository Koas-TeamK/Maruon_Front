//vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), tailwindcss(), svgr()],
    resolve: { 
      alias: { 
        '@': fileURLToPath(new URL('./src', import.meta.url)), 
      } 
    },
    css: {
      modules: {
        scopeBehaviour: 'local',
      },
      postcss: './postcss.config.cjs',
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:8080",
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
});
