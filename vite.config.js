import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], build: {target: 'safari14', cssTarget: 'safari14'}, server: {port: 5174, strictPort: true} });
