import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
// import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';
import {useMutation} from 'react-query';
// type RootStackParamList = {
//   Login: undefined;
//   SignUp: undefined;
// };
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const LoginScreen = ({navigation}: RouterProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {mutate} = useMutation(
    ['signin'],
    async (options: {username: string; password: string}) => {
      const res = await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        body: JSON.stringify({
          username: options.username,
          password: options.password,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(res => res.json());

      storeData(res.token.split(' ')[1]);
      console.log('### res', res.token.split(' ')[1]);
      return res;
    },
  );
  const storeData = async (value: string) => {
    try {
      await AsyncStorage.setItem('storage_token', value);
    } catch (e) {
      console.log('error', e);
    }
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 25}}>
        <View
          style={{padding: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: '100%', height: 200}}
            source={require('../images/Login.jpg')}
          />
          <Text
            style={{
              fontSize: 20,
              paddingTop: 20,
            }}>
            Login
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <TextInput
            placeholder={'Email ID'}
            value={username}
            keyboardType="email-address"
            onChangeText={text => setUsername(text)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <TextInput
            placeholder={'Password'}
            value={password}
            onChangeText={text => setPassword(text)}
            keyboardType="default"
            style={{flex: 1, paddingVertical: 0}}
            secureTextEntry={true}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            backgroundColor: '#FFEE55',
            borderRadius: 32,
            padding: 12,
          }}>
          <TouchableOpacity onPress={() => mutate({username, password})}>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
              }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 12,
          }}>
          <Text>
            New here?
            <Text
              onPress={() => navigation.navigate('SignUp')}
              style={{fontWeight: '700'}}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

//export default LoginScreen;
