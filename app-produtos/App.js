// app-produtos/App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Importando telas de Produtos
import ListaProdutos from './src/screens/ListaProdutos';
import AddProdutos from './src/screens/AddProdutos';
import EditarProdutos from './src/screens/EditarProdutos';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListaProdutos">
        <Stack.Screen 
          name="ListaProdutos" 
          component={ListaProdutos} 
          options={{ title: 'Produtos Disponíveis' }} 
        />
        <Stack.Screen 
          name="AddProdutos" 
          component={AddProdutos} 
          options={{ title: 'Adicionar Novo Produto' }} 
        />
        <Stack.Screen 
          name="EditarProdutos" 
          component={EditarProdutos} 
          options={{ title: 'Editar Produto' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
