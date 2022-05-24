import { StatusBar } from 'expo-status-bar';
import { useContext, useState } from 'react';
import { Platform, StyleSheet, TextInput, Button } from 'react-native';
import { authApi } from '../api/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { GlobalContext } from '../context/globalContext';
import Toast from 'react-native-toast-message';

const validateEmail = (email = '') => email.length >= 1;
const validatePassword = (passwd = '') => passwd.length >= 1;

export default function AuthScreen({ navigation }) {

  const [, setAuthenticated] = useContext(GlobalContext).authenticated;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    const isValid = validateEmail(username) && validatePassword(password);

    if (isValid) {
      try {
        const res = authApi.post(username, password);
        await AsyncStorage.setItem('token', res.token);
        await AsyncStorage.setItem('role', res.role);
        await AsyncStorage.setItem('userId', res.userId);
        await AsyncStorage.setItem('userName', res.userName);
        navigation.navigate('Root')
        setAuthenticated(true);
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Usuário ou senha inválida'
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder={'E-mail'}></TextInput>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholder={'Senha'}></TextInput>
        <Button onPress={handleSubmit} title={'Continuar'} />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text>Logar com: user=cliente1, passwd=1234.</Text>
      <Text>ou: user=cliente2, password=1234</Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    backgroundColor: "white",
    height: 54,
    marginBottom: 10,
  },
  formContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around'
  }
});
