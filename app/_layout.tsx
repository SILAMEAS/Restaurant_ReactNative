import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import {Provider, useDispatch, useSelector} from 'react-redux'; // 👈 Redux
import {RootState, store} from '@/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {setLoading, setUserLogin} from "@/store/authSlice"; // 👈 Your store
import Toast from 'react-native-toast-message'; // Import Toast
SplashScreen.preventAutoHideAsync().then(r => r);

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync().then(r => r);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Provider store={store}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthWrapper/>
          <Toast /> {/* Add Toast component here */}
          <StatusBar style="auto" />
        </ThemeProvider>
      </Provider>
  );
}
function AuthWrapper() {
  const dispatch = useDispatch();
  const { userLogin, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (accessToken) {
        dispatch(setUserLogin({...userLogin,refreshToken,accessToken}));
      }
      dispatch(setLoading(false));
    };
    loadToken().then(r => r);
  }, [dispatch]);

  if (isLoading) {
    return null; // Optionally show a loading screen
  }

  return <Slot />;
}