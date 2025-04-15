import {StyleSheet} from 'react-native';
import {Button} from "@gluestack-ui/themed";
import useAuthorization from "@/hooks/custom/useAuthorization";

export default function TabTwoScreen() {
    const {handleLogout} = useAuthorization();
    return <Button onPress={handleLogout}>Log out</Button>
}

const styles = StyleSheet.create({
    headerImage: {
        color: '#808080',
        bottom: -90,
        left: -35,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        gap: 8,
    },
});
