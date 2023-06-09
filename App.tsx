/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import {Platform, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useMutation} from 'react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from './components/screens/LoginScreen';
import {RegisterScreen} from './components/screens/RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from './components/screens/HomeScreen';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const {mutate} = useMutation(
    ['addTodo'],
    async (options: {description: string}) => {
      console.log(
        'addTodo',
        JSON.stringify({
          title: 'newtitle',
          technologies: 'technologies1',
          description: options.description,
          budget: 90.9,
          contact_email: 'shalinic@gluelabs.com',
        }),
      );
      const res = await fetch('http://localhost:3000/api/tech', {
        method: 'POST',
        body: JSON.stringify({
          title: 'newtitle',
          technologies: 'technologies1',
          description: options.description,
          budget: 90.9,
          contact_email: 'shalinic@gluelabs.com',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization:
            'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtdWgubnVyYWxpNDNAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkMkxIaEE2RXVuU21ockgwV3hZclFOLm13dVRHbWMzMjZ4aW0zR0xjdlUyazUzcXZHWEY5Z1ciLCJjcmVhdGVkQXQiOiIyMDIzLTA0LTI4VDEwOjMwOjAyLjg1N1oiLCJ1cGRhdGVkQXQiOiIyMDIzLTA0LTI4VDEwOjMwOjAyLjg1N1oiLCJpYXQiOjE2ODI2NzkzNTcsImV4cCI6MTY4NTI3MTM1N30.dyhVSu6OHxENID0e0a8xQwaTeCz8OUXFIvdiXJu8hKw',
        },
      });
      console.log('### res', res);
      return res;
    },
  );
  const Stack = createNativeStackNavigator();

  const [inputVal, setInputVal] = useState('');
  //const Stack = createStackNavigator();
  const getToken = () => AsyncStorage.getItem('storage_token');
  var token = getToken();
  return (
    <NavigationContainer>
      {token !== null ? (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },

  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
    padding: 20,
  },

  bottomView: {
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0,
  },

  textStyle: {
    color: '#fff',
    fontSize: 22,
  },
});

export default App;
