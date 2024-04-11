import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux'
import { deleteCarAPI } from '../redux/actions/carAction';
import { useEffect } from 'react';
import { useRef } from 'react';


const ListCarComponent = ({ navigation, cars }) => {
    const dispatch = useDispatch();
    const translateY = useRef(new Animated.Value(100)).current;

    useEffect(() => {
        Animated.timing(
            translateY,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }, [translateY]);

    const handleDeleteCar = (id) => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc muốn xóa ?',
            [
                {
                    text: 'hủy',
                    onPress: () => console.log("ko xoa")
                },
                {
                    text: 'xác nhận',
                    onPress: () => {
                        dispatch(deleteCarAPI(id))
                            .then((res) => {
                                Alert.alert('Thông báo', 'Xóa thành công')
                            })
                            .catch((err) => {
                                Alert.alert('Thông báo', 'Xóa không thành công')

                            })
                    }
                }
            ]
        )
    }

    const renderCarItem = ({ item }) => (
        <Animated.View style={[styles.productItem, { transform: [{ translateY: translateY }] }]}>
            <Image style={{ width: 100, height: 100, borderRadius: 20 }} source={{ uri: item.hinh_anh_ph31749 }} />
            <View style={{ padding: 10 }}>
                <Text style={styles.txt}>name:{item.ten_xe_ph31749}</Text>
                <Text style={styles.txt}>color:  {item.mau_sac_ph31749}</Text>
                <Text style={styles.txt}>price: {item.gia_ban_ph31749}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('update', { carsss: item })}>
                {/* <AntDesign name="edit" size={30} color="#000" /> */}
                <Image source={require('../../img/ic_edit.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteCar(item.id)}>
                {/* <MaterialCommunityIcons name="delete" size={30} color='#F30000' /> */}
                <Image source={require('../../img/ic_delete.png')} style={{ width: 28, height: 28 }} />

            </TouchableOpacity>
        </Animated.View>
    )

    return (
        <FlatList
            data={cars}
            renderItem={renderCarItem}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
        />
    )
}

export default ListCarComponent

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        marginBottom: 20,
        marginHorizontal: 10,
        marginTop: 20,
        paddingBottom: 20
    },
    productItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 15,
        width: '100%',
        borderRadius: 20,
        backgroundColor: 'pink',
        marginBottom: 20
    },
    txt: {
        color: '#000'
    }
})
