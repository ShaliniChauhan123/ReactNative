import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
interface RouterProps {
  navigation: NavigationProp<any, any>;
}

export const RegisterScreen = ({navigation}: RouterProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: 25}}>
        <View
          style={{padding: 40, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{width: '100%', height: 200}}
            source={require('../images/SignUp.jpg')}
          />
          <Text
            style={{
              fontSize: 20,
              paddingTop: 20,
            }}>
            SignUp
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
          <TextInput placeholder={'Email ID'} keyboardType="email-address" />
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
          <TouchableOpacity>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
              }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 12,
          }}>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{fontWeight: '700'}}>
            Login here
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
