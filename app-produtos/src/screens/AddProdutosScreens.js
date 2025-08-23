// Arquivo: app-estoque/src/screens/AddProdutos.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

// Troque SEU_IP_LOCAL pelo IP da sua máquina
const API_URL = 'http://172.20.10.2:3000/produtos';

export default function AddProdutos({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const handleAddProduto = async () => {
    if (!nome || !quantidade || !preco) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      await axios.post(API_URL, {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
      });
      navigation.goBack(); // Volta para a tela anterior após sucesso
    } catch (error) {
      alert('Erro ao adicionar produto.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome do Produto"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Salvar Produto" onPress={handleAddProduto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
