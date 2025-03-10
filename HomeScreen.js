import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    Alert.alert('Sesión cerrada');
    navigation.replace('Login'); 
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Hello World Profesor Edgar</Text>
      <TouchableOpacity onPress={handleLogout} style={{ backgroundColor: 'red', padding: 10, marginTop: 20 }}>
        <Text style={{ color: 'white' }}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

