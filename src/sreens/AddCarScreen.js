import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCarAPI } from '../redux/actions/carAction';
import * as ImagePicker from 'react-native-image-picker';


const AddCarScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [colorCar, setColorCar] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageCar, setImageCar] = useState('');
    const [anhChon, setAnhChon] = useState(null);


    const handleAddCar = () => {

        let newData = {
            "ten_xe_ph31749": name,
            "mau_sac_ph31749": colorCar,
            "gia_ban_ph31749": Number(price),
            "mo_ta_ph31749": description,
            "hinh_anh_ph31749": anhChon.assets[0].uri
        }
        dispatch(addCarAPI(newData))
            .then((result) => {
                Alert.alert('Thông báo', 'Thêm thành công');
                navigation.goBack();
            }).catch((err) => console.log(err))

    }

    const bamChup = useCallback(() => {
        //Định nghĩa option lựa chọn hình thức sử dụng camera
        //1.Chụp ảnh
        let options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        };
        ImagePicker.launchCamera(options, setAnhChon);

    }, [])

    const chonAnh = useCallback(() => {
        //Định nghĩa option lựa chọn hình thức sử dụng camera
        //1.Chụp ảnh
        let options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        };
        ImagePicker.launchImageLibrary(options, setAnhChon);

    }, []);

    useEffect(() => {
        console.log(anhChon);

    }, [anhChon])



    return (
        <View>
            <TextInput
                placeholder='Name car'
                style={styles.input}
                onChangeText={(text) => setName(text)}

            />
            <TextInput
                placeholder='Color car'
                style={styles.input}
                onChangeText={(text) => setColorCar(text)}

            />
            <TextInput
                placeholder='Price car'
                style={styles.input}
                onChangeText={(text) => setPrice(text)}

            />
            <TextInput
                placeholder='Description car'
                style={styles.input}
                onChangeText={(text) => setDescription(text)}

            />

            <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, }}>
                <Button title='Chụp ảnh' onPress={bamChup} />
            </View>

            <View style={{ width: '90%', alignSelf: 'center', marginVertical: 10 }}>
                <Button title='Chọn ảnh' onPress={chonAnh} />
            </View>

            {
                (typeof (anhChon?.assets) != 'undefined') ?
                    anhChon?.assets.map((objImage, index) => {
                        return (
                            <View key={index}>
                                <Image key={index}
                                    source={{ uri: objImage.uri }}
                                    style={{ width: 150, height: 150, alignSelf: 'center' }}
                                />
                            </View>
                        )
                    })
                    : ''
            }

            <TouchableOpacity onPress={() => handleAddCar()} style={{ backgroundColor: 'darkblue', alignSelf: 'center', marginTop: 10, padding: 10, borderRadius: 10, width: '90%'}}>
                <Text style={{ color: '#FFF', textAlign: 'center'}}>Submit</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AddCarScreen

const styles = StyleSheet.create({
    input: {
        width: '90%',
        height: 44,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        paddingVertical: 10,
        marginTop: 20,
        marginHorizontal: 20
    },
})