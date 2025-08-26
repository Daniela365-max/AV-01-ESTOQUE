// Arquivo: app-estoque/src/screens/EditarProdutos.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';

// Lembre-se de trocar pelo seu IP local
const API_URL = 'http://172.20.10.2:3000/produtos';

export default function EditarProdutos({ route, navigation }) {
  // Recebe o ID do produto que foi passado pela tela anterior
  const { produtoId } = route.params;

  // Estados
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [loading, setLoading] = useState(true);

  // Busca os dados atuais do produto na API
  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`${API_URL}/${produtoId}`);
        setNome(response.data.nome);
        setQuantidade(response.data.quantidade.toString());
        setPreco(response.data.preco.toString());
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [produtoId]);

  // Atualizar produto
  const handleUpdate = async () => {
    if (!nome || !quantidade || !preco) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    try {
      await axios.put(`${API_URL}/${produtoId}`, {
        nome,
        quantidade: parseInt(quantidade),
        preco: parseFloat(preco),
      });
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto.');
    }
  };

  // Se ainda estiver carregando, mostra indicador
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando dados do produto...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Produto:</Text>
      <TextInput
        value={nome}
        onChangeText={setNome}
        style={styles.input}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        value={quantidade}
        onChangeText={setQuantidade}
        style={styles.input}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Preço:</Text>
      <TextInput
        value={preco}
        onChangeText={setPreco}
        style={styles.input}
        placeholder="Digite o preço"
        keyboardType="numeric"
      />

      <Button title="Salvar Alterações" onPress={handleUpdate} />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
});
