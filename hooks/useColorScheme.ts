// hooks/useColorScheme.ts
import { useColorScheme as _useDeviceColorScheme } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'APP_COLOR_SCHEME';

export type ThemeMode = 'light' | 'dark' | 'system';

export const useColorScheme = () => {
    const systemColorScheme = _useDeviceColorScheme();
    const [theme, setTheme] = useState<ThemeMode>('system');

    const getCurrentScheme = () => {
        if (theme === 'system') return systemColorScheme ?? 'light';
        return theme;
    };

    const currentScheme = getCurrentScheme();

    const setAppTheme = useCallback(async (newTheme: ThemeMode) => {
        setTheme(newTheme);
        await AsyncStorage.setItem(STORAGE_KEY, newTheme);
    }, []);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then((savedTheme) => {
            if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
                setTheme(savedTheme);
            }
        });
    }, []);

    return {
        theme,
        currentScheme, // 'light' or 'dark' based on user/system
        setAppTheme,   // function to change theme
    };
};
