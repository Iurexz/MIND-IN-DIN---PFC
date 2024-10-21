import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/screens/Loading/TeladeCarregamento';
import LoginScreen from './src/screens/Login/TeladeLogin';
import SignUpScreen from './src/screens/Registro/TelaCadastro';
import ForgetPassScreen from './src/screens/ResetPassword/TelaEsqueciSenha';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false, // Desativa os cabeçalhos das telas
          gestureEnabled: false, // Desativa o gesto de voltar se necessário
        }}
      >
        {/* Tela de Carregamento */}
        <Stack.Screen name="Loading" component={LoadingScreen} />

        {/* Tela de Login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Tela de Cadastro */}
        <Stack.Screen name="SignUp" component={SignUpScreen} />

        {/* Esqueci a senha */}
        <Stack.Screen name="ForgetPass" component={ForgetPassScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
