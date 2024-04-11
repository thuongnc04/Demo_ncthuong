import { StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import AddBanner from '../component/adBanner'
import ListCarComponent from '../component/ListCarComponent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCars } from '../redux/actions/carAction'

const ListCar = ({ navigation }) => {
    const dispatch = useDispatch();
    const listCar = useSelector(state => state.listCar.listCar);
    const [scaleValue] = useState(new Animated.Value(1));

    useEffect(() => {
        dispatch(fetchCars());
    }, [dispatch])

    const handlePress = () => {
        // Bắt đầu animation khi người dùng nhấn vào nút
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.9,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start(() => {
            // Điều hướng đến màn hình thêm xe
            navigation.navigate('add');
        });
    };

    

    return (
        <View style={styles.container}>
            <AddBanner />
            <ListCarComponent navigation={navigation} cars={listCar} />
            <Animated.View style={[styles.iconAdd, { transform: [{ scale: scaleValue }] }]}>
                <TouchableOpacity onPress={handlePress}>
                    <Text style={{ fontSize: 30, color: '#fff' }}>+</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    )
}

export default ListCar

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e0036'
    },
    iconAdd: {
        width: 40,
        height: 40,
        position: 'absolute',
        backgroundColor: 'blue',
        bottom: 20,
        right: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
})
