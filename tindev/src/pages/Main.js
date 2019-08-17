import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';


export default function Main({navigation}) {
  const id = navigation.getParam('_id');
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    async function loadUsers() {
      const response = await api.get('/devs',{
        headers: {
          user: id,
        }
      });
      setUsers(response.data);
    }
    loadUsers();
  },[id]);

  function renderUser(user, zIndex) {
    return (
      <View  key={user._id} style={[styles.card, {zIndex}]} >
      <Image style={styles.avatar} source={{uri: user.avatar}} />
      <View style={styles.footer} >
        <Text style={styles.name} >{user.name}</Text>
        <Text style={styles.bio} numberOfLines={3} >{user.bio}</Text>
      </View>
    </View> 
    );
  }

  async function handleLike() {
    if(users.length === 0) return;
    const { _id } = users[0]; 
    console.log(_id);
    await api.post(`/devs/${_id}/likes`, null, {headers: {user: id}});
    setUsers(users.filter(user=>user._id!==_id));
 }

  async function handleDislike() {
   if(users.length === 0) return;
   const { _id } = users[0];
   await api.post(`/devs/${_id}/dislikes`, null, {headers: {user: id}});
   setUsers(users.filter(user=>user._id!==_id));
 }  

 async function handleLogout() {
   await AsyncStorage.clear();
   navigation.navigate('Login');
 }


  return (
    <SafeAreaView style={styles.container }>
      <TouchableOpacity onPress={handleLogout} >
        <Image source={logo} style={styles.logo}/>
      </TouchableOpacity>
      <View style={styles.cardsContainer} >
        {users.length > 0 ? 
          users.map((user, index)=>renderUser(user, users.length-index)) : 
          <Text style={styles.empty}>NO CONTENT :(</Text>
        } 
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleDislike} style={styles.button} >
          <Image source={dislike} style={styles.dislike} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLike} style={styles.button} >
          <Image source={like} style={styles.like} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor: '#f5f5f5',
    justifyContent:  'space-between',
    alignItems: "center",
  },
  empty: {
    alignSelf: 'center',
    color:'#999',
    fontSize: 24,
    fontWeight: 'bold'
  },
  logo:{
    marginTop: 30,
  },
  cardsContainer: {
    flex:1,
    alignSelf: 'stretch',
    justifyContent:'center',
    maxHeight: 500,
  },
  card: {
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 8,
    margin: 30,
    overflow: 'hidden',   
    position: 'absolute',
    top: 0,
    left:0,
    right:0,
    bottom:0,
  },
  avatar: {
    flex:1,
    height: 300,
  },
  footer: {
    backgroundColor:'#FFF',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bio: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
    lineHeight: 20
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginBottom:30
  },
  button:{
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: {
      width:0,
      height:2
    }
  }

});