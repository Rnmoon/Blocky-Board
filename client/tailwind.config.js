/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'vt323': ['"VT323"', 'monospace'],
                'press-start': ['"Press Start 2P"', 'cursive'],
            },
            colors: {
                redstone: '#FF0000',
                diamond: '#00BFFF',
                emerald: '#00FF00',
                gold: '#FFD700',
                dirt: '#8B4513',
                stone: '#7d7d7d',
                sky: '#87CEEB',
                'minecraft-gray': '#8b8b8b',
                'minecraft-dark': '#373737',
            },
            boxShadow: {
                'voxel': '6px 6px 0px 0px rgba(0,0,0,1)',
                'voxel-sm': '3px 3px 0px 0px rgba(0,0,0,1)',
            },
            cursor: {
                'crosshair': 'crosshair',
            }
        },
    },
    plugins: [],
}
