import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import api from '../api';

export default function EditProdutoScreen({ route, navigation }) {
  const { id } = route.params;
  const [nome, setNome] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  useEffect(() => {
    const carregarProduto = async () => {
      const response = await api.get(`/produtos/${id}`);
      const produto = response.data;
      setNome(produto.nome);
      setQuantidade(produto.quantidade.toString());
      setPreco(produto.preco.toString());
    };
    carregarProduto();
  }, [id]);

  const atualizarProduto = async () => {
    await api.put(`/produtos/${id}`, {
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
      <Button title="Atualizar" onPress={atualizarProduto} />
    </View>
  );
}