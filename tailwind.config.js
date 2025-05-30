/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './ui/**/*.{js,ts,jsx,tsx}',
    ],
    presets: [require('nativewind/preset')], // Add this line
    theme: {
        extend: {},
    },
    plugins: [],
};