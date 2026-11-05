import { defineConfig } from 'vite';
export default defineConfig({ base: '/globo-observatorio/', build: { outDir: 'docs', emptyOutDir: true, rollupOptions: { output: { manualChunks: { charts: ['recharts'], geography: ['d3-geo','topojson-client','world-atlas/countries-110m.json'] } } } } });
