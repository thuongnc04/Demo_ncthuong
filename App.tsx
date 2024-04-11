// import { StatusBar, StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationContainer } from '@react-navigation/native';


// import Welcome from './src2/screens2/Welcome';
// import Home from './src2/screens2/Home';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Welcome" component={Welcome} />
//         <Stack.Screen name="Home" component={Home} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ListCar from './src/sreens/ListCar';
import { TransitionPresets } from '@react-navigation/stack';
import AddCarScreen from './src/sreens/AddCarScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import UpdateCarScreen from './src/sreens/UpdateCarScreen';
import Welcome from './src/sreens/Welcome';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar translucent backgroundColor='rgba(0, 0, 0, 0.54)' />
        <Stack.Navigator
          initialRouteName="welcome"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',

          }}
        >
          <Stack.Screen name='welcome' component={Welcome} options={{ headerShown: false, title: 'Welcome' }} />
          <Stack.Screen name='list' component={ListCar} options={{ headerShown: false, title: 'List' }} />
          <Stack.Screen name='add' component={AddCarScreen} options={{ headerShown: true, title: 'add car' }} />
          <Stack.Screen name='update' component={UpdateCarScreen} options={{ headerShown: true, title: 'Update car' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({

})
