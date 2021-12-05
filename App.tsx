import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/pages/Home';
import { Municipio } from './src/pages/Municipio';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#00b4d8'},
          headerTintColor: 'white'
        }}
      >
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Municipio" component={Municipio}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}

/* const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caf0f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
 */