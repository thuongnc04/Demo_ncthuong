import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCarAPI } from '../redux/actions/carAction';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'react-native-image-picker';

const UpdateCarScreen = ({ navigation }) => {
    const route = useRoute();
    const { carsss } = route.params;

    const dispatch = useDispatch();
    const [name, setName] = useState(carsss.ten_xe_ph31749);
    const [colorCar, setColorCar] = useState(carsss.mau_sac_ph31749);
    const [price, setPrice] = useState(carsss.gia_ban_ph31749);
    const [description, setDescription] = useState(carsss.mo_ta_ph31749);
    const [anhChon, setAnhChon] = useState(null);
    const [isImageSelected, setIsImageSelected] = useState(false);

    const chonAnh = useCallback(() => {
        let options = {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
            includeExtra: true,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.assets.length > 0) {
                setAnhChon(response);
                setIsImageSelected(true);
            }
        });
    }, []);

    const handleAddCar = () => {
        let newData = {
            "ten_xe_ph31749": name,
            "mau_sac_ph31749": colorCar,
            "gia_ban_ph31749": Number(price),
            "mo_ta_ph31749": description,
            "hinh_anh_ph31749": isImageSelected ? anhChon.assets[0].uri : carsss.hinh_anh_ph31749
        };

        dispatch(updateCarAPI({ id: carsss.id, data: newData }))
            .then((result) => {
                Alert.alert('Thông báo', 'Sửa thành công');
                navigation.goBack();
            })
            .catch((err) => console.log(err));
    };

    return (
        <View>
            <TextInput
                placeholder='Name car'
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
            />
            <TextInput
                placeholder='color car'
                style={styles.input}
                onChangeText={(text) => setColorCar(text)}
                value={colorCar}
            />
            <TextInput
                placeholder='price car'
                style={styles.input}
                onChangeText={(text) => setPrice(text)}
                value={"" + price}
            />
            <TextInput
                placeholder='description car'
                style={styles.input}
                onChangeText={(text) => setDescription(text)}
                value={description}
            />

            <TouchableOpacity onPress={chonAnh} style={styles.button}>
                <Text style={{ color: '#FFF', textAlign: 'center' }}>Chọn ảnh</Text>
            </TouchableOpacity>

            <View style={{ margin: 10 }}></View>
            {anhChon === null || (anhChon.assets && anhChon.assets.length === 0) ? <Image style={{ width: 150, height: 150, alignSelf: 'center' }} source={{ uri: carsss.hinh_anh_ph31749 }} /> : null}

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

            <TouchableOpacity onPress={handleAddCar} style={styles.submitButton}>
                <Text style={{ color: '#FFF', textAlign: 'center' }}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

export default UpdateCarScreen;

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
    button: {
        backgroundColor: 'blue',
        alignSelf: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        width: '90%'
    },
    submitButton: {
        backgroundColor: 'darkblue',
        alignSelf: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        width: '90%'
    }
});
