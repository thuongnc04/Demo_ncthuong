import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AddBanner = () => {
    return (
        <View style={styles.container}>
            {/* <Image style={styles.bannerImage} source={{ 
                uri: 'https://i.pinimg.com/originals/1e/44/c1/1e44c180c6a7e488c1235c3b15d6e87c.jpg' }} /> */}
                <Image source={require('../../img/car01.png')} style={styles.bannerImage}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    bannerImage: {
        maxWidth: '100%',

        // width: 400,
        height: 250,
        // borderRadius: 20,
    }
})
export default AddBanner;
