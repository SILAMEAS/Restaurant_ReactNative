import { config as defaultConfig } from '@gluestack-ui/config';
import {vars} from "nativewind";

export const gluestackConfig = {
    ...defaultConfig,
    tokens: {
        colors: {
            primary: '#1E90FF', // Example: Replace with your primary color from Colors.ts
            secondary: '#FF6347', // Example: Replace with your secondary color
        },
    },
    light: vars({
        '--color-primary': '51 51 51',
    }),
    dark: vars({
        '--color-primary': '240 240 240',
    }),
    theme: {
        breakpoints: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 992,
            xl: 1280,
        },
    },
};