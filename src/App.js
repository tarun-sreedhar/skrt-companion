import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {BarcodeView} from './pages/BarcodeView';
import {SignInPage} from './pages/SignInPage';
import {Cart, useForceUpdate} from './pages/Cart';
import {Profile} from './pages/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { isLoggedIn } from './pages/SignInPage';
import {Payment} from "./pages/Payment";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Confirmation } from './pages/Confirmation';
const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export default function App() {
  return (
  <NavigationContainer>
    <AuthStack.Navigator>
      {isLoggedIn ? (
          <>
            <AuthStack.Screen name="SKRT" component={TabManager} options={{headerShown: false}}/>
            <AuthStack.Screen name="Payment" component={Payment}/>
            <AuthStack.Screen name="Confirmation" component={Confirmation}/>
          </>
        ) : (
          <>
            <AuthStack.Screen name="SignIn" component={SignInPage} options={{headerShown: false}}/>
            <AuthStack.Screen name="SKRT" component={TabManager} options={{headerShown: false}}/>
            <AuthStack.Screen name="Payment" component={Payment}/>
            <AuthStack.Screen name="Confirmation" component={Confirmation}/>


          </>
        )}
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

export const TabManager = ({ navigation }) => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Scan"
        component={BarcodeView}
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="camera" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});