import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, CheckBox } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Aqui se valida con yup
const loginSchema = Yup.object().shape({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'Mínimo 6 caracteres').required('La contraseña es obligatoria'),
});

// Se guarda la sesión aquí
const saveSession = async (token) => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error al guardar la sesión:', error);
  }
};

// Aquí se obtiene la sesión del usuario
const getSession = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error('Error al obtener la sesión:', error);
  }
};

// Aquí se elimina la sesión del usuario
const removeSession = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.error('Error al eliminar la sesión:', error);
  }
};

const LoginScreen = ({ navigation }) => {
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Verifica si ya existe una sesión activa
    const checkSession = async () => {
      const token = await getSession();
      if (token) {
        console.log('Sesión detectada, redirigiendo a Home...');
        navigation.replace('Home'); // Manda a home si ya existe una sesión
      }
    };
    checkSession();
  }, [navigation]);

  const handleLogin = async (values) => {
    const { email, password } = values;

    // Aquí se hace una simulación de autenticación
    if (email === 'jimmy.avina.23s@utzmg.edu.mx' && password === '123456') {
      const fakeToken = 'abc123'; // Este es un token ficticio
      if (rememberMe) {
        await saveSession(fakeToken);
      }
      Alert.alert('Éxito', 'Sesión iniciada correctamente');
      console.log('Redirigiendo a Home...');
      navigation.replace('Home'); 
    } else {
      Alert.alert('Error', 'Credenciales incorrectas');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign in</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <View style={styles.row}>
              <TouchableOpacity style={styles.checkboxContainer} onPress={() => setRememberMe(!rememberMe)}>
                <CheckBox value={rememberMe} onValueChange={setRememberMe} />
                <Text style={styles.rememberText}>Remember me</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Log in</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default LoginScreen;

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdf5e6', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0056b3',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    marginBottom: 10,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#0056b3',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
