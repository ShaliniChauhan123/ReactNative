/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {useMutation} from 'react-query';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

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

  const [inputVal, setInputVal] = useState('');
  return (
    <View style={styles.MainContainer}>
      <Section title="My Todo App" />
      <TextInput
        value={inputVal}
        onChangeText={newText => setInputVal(newText)}
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          width: '100%',
          borderRadius: 50,
          padding: 20,
        }}
        placeholder="Add your Todo..."></TextInput>

      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            console.log('first', inputVal);
            mutate({
              description: inputVal,
            });
          }}
          style={styles.touchableOpacityStyle}>
          <Image
            source={{
              uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            style={styles.floatingButtonStyle}
          />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text>hhh</Text>
        <Text>hhh</Text>
        <Text>hhh</Text>
        <Text>hhh</Text>
      </ScrollView>
    </View>
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
