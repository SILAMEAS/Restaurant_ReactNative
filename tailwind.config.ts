/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}', // Include all files in the app directory (Expo Router)
        './components/**/*.{js,ts,jsx,tsx}', // Include your components directory
        './ui/**/*.{js,ts,jsx,tsx}', // Include your ui directory
    ],
    presets: [require('nativewind/preset')], // Add this line for Nativewind v4
    theme: {
        extend: {}, // Add custom theme extensions here if needed
    },
    plugins: [],
};