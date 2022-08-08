import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        chunkSizeWarningLimit: 2000,
    },
    // server: {
    //     host: '0.0.0.0'
    // }
})