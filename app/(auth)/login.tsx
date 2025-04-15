import { View, Text, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '@/store/authSlice';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {useLoginMutation} from "@/services/authApi";
import Toast from 'react-native-toast-message'; // Import Toast
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Toast.show({
                type: 'error',
                text1: 'Validation Error',
                text2: 'Please enter both email and password',
            });
            return;
        }
        try {

            const data = await login({ email, password }).unwrap();
            dispatch(setUserLogin(data));
            Toast.show({
                type: 'success',
                text1: 'Login Success',
                text2: email,
            });
            router.replace('/(tabs)'); // Redirect to tabs after login

        } catch (error:any) {
            const errorMessage = error?.data?.message || 'An error occurred during login';
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: errorMessage,
            });
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Login</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{ borderWidth: 1, marginVertical: 10, padding: 5 }}
            />
            <Button title={isLoading ? 'Logging in...' : 'Login'} onPress={handleLogin} />
            <Button title="Go to Signup" onPress={() => router.push('/(auth)/signup')} />
        </View>
    );
}