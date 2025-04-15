import {logout, setUserLogin} from "@/store/authSlice";
import Toast from "react-native-toast-message";
import {useLoginMutation} from "@/services/authApi";
import {useDispatch} from "react-redux";
import {useRouter} from "expo-router";

const useAuthorization = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const router = useRouter();
    const handleLogin = async (email:string|null,password:string|null) => {
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
    const handleLogout = () => {
        dispatch(logout());
        Toast.show({
            type: 'info',
            text1: 'Your account has been logout'
        });
        router.replace('/(auth)/login');
    };
    return {handleLogin,handleLogout,isLoading}
};

export default useAuthorization;