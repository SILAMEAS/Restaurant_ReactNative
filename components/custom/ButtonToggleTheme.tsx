import { useColorScheme } from '@/hooks/useColorScheme';
import { Box, Button, Text } from '@gluestack-ui/themed';

export default function ButtonToggleTheme() {
    const { currentScheme, theme, setAppTheme } = useColorScheme();

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        setAppTheme(next).then(r => r);
    };

    return (
        <Box flex={1} bg={currentScheme === 'dark' ? '$backgroundDark0' : '$backgroundLight0'} justifyContent="center" alignItems="center">
            <Text size="lg" mb="$4">Current Mode: {currentScheme}</Text>
            <Button onPress={toggleTheme}>Toggle Theme</Button>
        </Box>
    );
}
