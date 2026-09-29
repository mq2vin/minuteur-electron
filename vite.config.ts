import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'
import renderer from 'vite-plugin-electron-renderer'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    electron({
      main: {
        entry: 'electron/main.ts',
        vite: {
          build: { outDir: 'dist-electron' },
        },
      },
      preload: {
        input: path.join(__dirname, 'electron/preload.ts'),
        vite: {
          build: { outDir: 'dist-electron' },
        },
      },
      renderer: {},
    }),
    renderer(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
