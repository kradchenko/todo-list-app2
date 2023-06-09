import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr()],
    resolve: {
        alias: {
            src: path.resolve(__dirname, './src'),
            assets: path.resolve(__dirname, './src/assets'),
            components: path.resolve(__dirname, './src/components'),
            context: path.resolve(__dirname, './src/context'),
            pages: path.resolve(__dirname, './src/pages'),
            utils: path.resolve(__dirname, './src/utils'),
            hooks: path.resolve(__dirname, './src/utils/hooks'),
        },
    },
});
