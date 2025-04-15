import {useState} from "react"
import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native"
import {Box, HStack, Text, VStack} from "@gluestack-ui/themed"
import useAuthorization from "@/hooks/custom/useAuthorization";

export default function LoginScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {handleLogin} = useAuthorization();

    return <Box style={styles.container}>
        <Box style={styles.content}>
            <VStack space="md">
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue to your account</Text>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Email*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="example@gmail.com"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.formGroup}>
                    <Text style={styles.label}>Password*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="***"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                    />
                </View>

                <HStack justifyContent="flex-end">
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                    </TouchableOpacity>
                </HStack>

                <TouchableOpacity style={styles.signInButton} onPress={() => handleLogin(email, password)}>
                    <Text style={styles.signInText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.orText}>Or continue with</Text>

                <HStack space="md" style={styles.socialButtons}>
                    <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
                        <Text style={styles.socialButtonText}>Google</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.socialButton, styles.appleButton]}>
                        <Text style={styles.socialButtonText}>Apple</Text>
                    </TouchableOpacity>
                </HStack>

                <HStack justifyContent="center" style={styles.signUpContainer}>
                    <Text style={styles.noAccountText}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.signUpText}>Sign Up</Text>
                    </TouchableOpacity>
                </HStack>
            </VStack>
        </Box>
    </Box>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: 'center'

    },
    content: {
        padding: 16
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20,
    },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 4,
        fontSize: 14,
    },
    forgotPassword: {
        fontSize: 14,
        color: "#000",
        textAlign: "right",
        textDecorationLine: "underline",
    },
    signInButton: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10,
    },
    signInText: {
        fontSize: 14,
        fontWeight: "500",
    },
    orText: {
        textAlign: "center",
        fontSize: 14,
        marginVertical: 10,
    },
    socialButtons: {
        justifyContent: "space-between",
    },
    socialButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 4,
        alignItems: "center",
    },
    googleButton: {
        marginRight: 5,
    },
    appleButton: {
        marginLeft: 5,
    },
    socialButtonText: {
        fontSize: 14,
    },
    signUpContainer: {
        marginTop: 20,
    },
    noAccountText: {
        fontSize: 14,
    },
    signUpText: {
        fontSize: 14,
        fontWeight: "500",
        textDecorationLine: "underline",
    },
})
