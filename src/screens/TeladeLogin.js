import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const LoginScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        label="Senha"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={() => console.log('Login Pressionado')} style={styles.button}>
        Login
      </Button>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});
