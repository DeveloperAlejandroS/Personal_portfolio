import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import githubHandler from './api/github.js'

// Serves the Vercel function locally so `pnpm dev` and `pnpm preview` behave like production.
function githubApi() {
  const mount = (server) => {
    server.middlewares.use('/api/github', githubHandler)
  }
  return { name: 'github-api', configureServer: mount, configurePreviewServer: mount }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  if (env.GITHUB_TOKEN && !process.env.GITHUB_TOKEN) process.env.GITHUB_TOKEN = env.GITHUB_TOKEN

  return {
    plugins: [react(), githubApi()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.js'],
    },
  }
})
