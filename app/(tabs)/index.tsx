import React from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useGetRestaurantsQuery} from "@/services/api";
import {Box, Button, ButtonText} from "@gluestack-ui/themed";
import useAuthorization from "@/hooks/custom/useAuthorization";
import ButtonToggleTheme from "@/components/custom/ButtonToggleTheme";

export default function HomeScreen() {
    const {currentData, error, isLoading, refetch} = useGetRestaurantsQuery();
    const {handleLogout} = useAuthorization();
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={{padding: 20}}>
                <Text style={{fontSize: 22, fontWeight: 'bold',paddingBottom:20}}>Restaurants</Text>
                {isLoading && <ActivityIndicator/>}
                {error && <Text style={{color: 'red'}}>Error: {JSON.stringify(error)}</Text>}
                {currentData?.contents?.map((restaurant: any) => (
                    <View key={restaurant.id} style={styles.card}>
                        <Text style={styles.name}>{restaurant.name}</Text>
                        <Text>{restaurant.description}</Text>
                        <Text>🍽 Cuisine: {restaurant.cuisineType}</Text>
                        <Text>📍 {restaurant.address?.city}</Text>
                        <Text>📞 {restaurant.contactInformation?.phone}</Text>
                    </View>
                ))}
                <Text style={{color: 'blue', marginTop: 10}} onPress={refetch}>🔄 Refresh</Text>
            </ScrollView>
            <Button size="md" variant="solid" action="negative" onPress={handleLogout}>
                <ButtonText>log out</ButtonText>
            </Button>
            <ButtonToggleTheme/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        marginBottom: 16,
        padding: 16,
        borderRadius: 10,
        backgroundColor: '#f1f1f1',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginVertical: 10,
    },
    refresh: {
        color: 'blue',
        marginTop: 20,
        textAlign: 'center',
    },
});