import React, {useState, useEffect} from 'react';

import logo from '../assets/logo.png';
import {
  Platform,
  View,//div
  Text, //p
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

export default function Login({navigation}) {
  const [user, setUser] = useState("");
  useEffect(()=>{
    AsyncStorage.getItem('user').then(_id=>{
      if(_id) {
        navigation.navigate('Main', { _id });
      }
    })
  },[]);

  async function handleLogin() {
    const response = await api.post('/devs',{username: user});
    const { _id } = response.data; 
    await AsyncStorage.setItem('user', _id);
    navigation.navigate('Main', { _id });
  }

  return (
    <KeyboardAvoidingView behavior='padding' enabled={Platform.OS === 'ios'} style={styles.container}> 
      <Image source={logo} />
      <TextInput onChangeText={setUser} autoCorrect={false} autoCapitalize='none' style={styles.input} placeholder="Git user" placeholderTextColor="#999"/>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor: '#f5f5f5',
    justifyContent:  'center',
    alignItems: "center",
    padding: 30
  },
  
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4, 
    fontWeight: 'bold',
    marginTop: 20,
    paddingHorizontal: 15
  },
  
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  }

});