import { Image, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';

const Welcome = () => {

    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            // Navigate to LoginScreen after 3 seconds
            navigation.navigate('list');
        }, 3000);

        // Clear the timer when the component is unmounted
        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            <Image source={require('../../img/welcome.jpg')} style={{ maxWidth: '100%', maxHeight: '100%' }} />
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({})