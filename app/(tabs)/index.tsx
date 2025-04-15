import React from 'react';
import {Text, StyleSheet, ActivityIndicator, ScrollView, View} from 'react-native';
import {useGetRestaurantsQuery} from "@/services/api";
import {Box} from "@gluestack-ui/themed";

export default function HomeScreen() {
    const { currentData, error, isLoading, refetch } = useGetRestaurantsQuery();
    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <Box flex={1} justifyContent="center" alignItems="center" bg="$primary">
                <Text color="white" fontSize="$xl">
                    Welcome to Gluestack-UI!
                </Text>
            </Box>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Restaurants</Text>
            {isLoading && <ActivityIndicator />}
            {error && <Text style={{ color: 'red' }}>Error: {JSON.stringify(error)}</Text>}
            {currentData?.contents?.map((restaurant: any) => (
                <View key={restaurant.id} style={styles.card}>
                    <Text style={styles.name}>{restaurant.name}</Text>
                    <Text>{restaurant.description}</Text>
                    <Text>🍽 Cuisine: {restaurant.cuisineType}</Text>
                    <Text>📍 {restaurant.address?.city}</Text>
                    <Text>📞 {restaurant.contactInformation?.phone}</Text>
                </View>
            ))}
            <Text style={{ color: 'blue', marginTop: 10 }} onPress={refetch}>🔄 Refresh</Text>
        </ScrollView>
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