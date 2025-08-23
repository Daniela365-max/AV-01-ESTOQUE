import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert } from 'react-native';
import api from '../api';

export default function ListaProdutosScreen({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  const carregarProdutos = async () => {
    const response = await api.get('/produtos');
    setProdutos(response.data);
  };

  const deletarProduto = (id) => {
    Alert.alert(
      'Confirmação',
      'Deseja realmente excluir este produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: async () => {
            await api.delete(`/produtos/${id}`);
            carregarProdutos();
          },
        },
      ]
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button
        title="Adicionar Produto"
        onPress={() => navigation.navigate('AddProduto')}
      />
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, borderBottomWidth: 1 }}>
            <Text>Nome: {item.nome}</Text>
            <Text>Quantidade: {item.quantidade}</Text>
            <Text>Preço: R$ {item.preco}</Text>
            <Button
              title="Editar"
              onPress={() => navigation.navigate('EditProduto', { id: item.id })}
            />
            <Button
              title="Excluir"
              color="red"
              onPress={() => deletarProduto(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}