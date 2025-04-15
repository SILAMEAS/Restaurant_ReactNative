import {useColorScheme} from '@/hooks/useColorScheme';
import {Button, HStack} from '@gluestack-ui/themed';
import {Moon, Sun} from "lucide-react-native";

export default function ButtonToggleTheme() {
    const {currentScheme, theme, setAppTheme} = useColorScheme();

    const toggleTheme = () => {
        const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        setAppTheme(next).then(r => r);
    };

    return  <Button onPress={toggleTheme} style={{backgroundColor:'inherit',position:"absolute",right:0,top:80}}>
        {
            currentScheme === 'dark' ? <Moon color={'white'}/> : <Sun color={'white'}/>
        }
    </Button>
}
