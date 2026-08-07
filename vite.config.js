import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// `base: './'` produces relative asset URLs so the build works on GitHub Pages
// project sites (https://<user>.github.io/<repo>/) regardless of the repo name,
// as well as on user/custom-domain sites — no reconfiguration required.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
