import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import api from '../api';

export default function AddProdutoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const adicionarProduto = async () => {
    await api.post('/produtos', {
      nome,
      quantidade: Number(quantidade),
      preco: Number(preco),
    });
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput
        placeholder="Quantidade"
        value={quantidade}
        onChangeText={setQuantidade}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
      />
      <Button title="Adicionar" onPress={adicionarProduto} />
    </View>
  );
}