const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // Primary brand color with shades
                primary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                // Surface colors for backgrounds
                surface: {
                    white: '#ffffff',
                    light: '#f8fafc',
                    DEFAULT: '#f1f5f9',
                    dark: '#e2e8f0',
                },
                // Background colors
                background: {
                    light: '#ffffff',
                    DEFAULT: '#f8fafc',
                    dark: '#1e293b',
                    darker: '#0f172a',
                },
                // Border colors
                border: {
                    light: '#e2e8f0',
                    DEFAULT: '#cbd5e1',
                    dark: '#475569',
                },
                // Text colors
                content: {
                    lighter: '#94a3b8',
                    light: '#64748b',
                    DEFAULT: '#475569',
                    dark: '#1e293b',
                    white: '#f8fafc',
                },
            },
            // Custom shadow definitions
            boxShadow: {
                'soft-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
                'soft': '0 2px 4px rgba(0, 0, 0, 0.06)',
                'soft-md': '0 4px 6px rgba(0, 0, 0, 0.08)',
                'soft-lg': '0 8px 16px rgba(0, 0, 0, 0.08)',
            },
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
