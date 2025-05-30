import {Redirect, Tabs} from 'expo-router';
import React from 'react';
import {Platform} from 'react-native';

import {HapticTab} from '@/components/HapticTab';
import {IconSymbol} from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {useSelector} from "react-redux";
import {RootState} from "@/store";

export default function TabLayout() {
    const {theme} = useColorScheme();
    const {userLogin: {accessToken}} = useSelector((state: RootState) => state.auth);

    if (!accessToken) {
        return <Redirect href="/(auth)/login"/>;
    }
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[theme]?.tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="house.fill" color={color}/>,
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({color}) => <IconSymbol size={28} name="paperplane.fill" color={color}/>,
                }}
            />
        </Tabs>
    );
}
