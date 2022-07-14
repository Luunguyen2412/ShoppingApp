/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import MyCart from './screens/MyCart';
import ProductInfo from './screens/ProductInfo';
import {Provider} from 'react-redux';
import {Store} from './redux/store';
import Home from './screens/Home';
import AllProducts from './screens/AllProducts';
import News from './screens/News';
import Profile from './screens/Profile';

const Tab = createBottomTabNavigator();

const mainTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="News" component={News} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="mainTab"
            component={mainTab}
          />
          {/* <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          /> */}
          <Stack.Screen
            options={{headerShown: false}}
            name="MyCart"
            component={MyCart}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ProductInfo"
            component={ProductInfo}
          />
          <Stack.Screen
            options={{headerShown: true}}
            name="AllProducts"
            component={AllProducts}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
