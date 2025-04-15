import {Button, Text, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserLogin} from '@/store/authSlice';
import {useRouter} from 'expo-router';
import {useState} from 'react';
import {useSignupMutation} from "@/services/authApi";

export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signup, {isLoading}] = useSignupMutation();
    const dispatch = useDispatch();
    const router = useRouter();

    const handleSignup = async () => {
        try {
            const data = await signup({name, email, password}).unwrap();
            dispatch(setUserLogin(data));
            router.replace('/(tabs)'); // Redirect to tabs after signup
        } catch (error) {
            console.error('Signup failed:', error);
        }
    };

    return (
        <View style={{padding: 20}}>
            <Text>Signup</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={{borderWidth: 1, marginVertical: 10, padding: 5}}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={{borderWidth: 1, marginVertical: 10, padding: 5}}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={{borderWidth: 1, marginVertical: 10, padding: 5}}
            />
            <Button title={isLoading ? 'Signing up...' : 'Signup'} onPress={handleSignup}/>
            <Button title="Go to Login" onPress={() => router.push('/(auth)/login')}/>
        </View>
    );
}