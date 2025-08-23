import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';

// Use o IP da sua máquina na rede local, não 'localhost'
// Exemplo: 'http://192.168.1.10:3000/produtos'
const API_URL = 'http://172.20.10.2:3000/produtos';

export default function ListaProdutos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(API_URL);
      setProdutos(response.data);
    } catch (err) {
      setError('Não foi possível carregar a lista de produtos.');
      console.error("Erro ao buscar produtos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProdutos();
    });
    return unsubscribe;
  }, [navigation]);

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/${id}`);
              fetchProdutos();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir o produto.');
              console.error("Erro ao excluir produto:", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={fetchProdutos} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddProdutos')}
      >
        <Text style={styles.addButtonText}>Adicionar Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemName}>{item.nome}</Text>
              <Text style={styles.itemArea}>Preço: R$ {item.preco.toFixed(2)}</Text>
              <Text style={styles.itemArea}>Quantidade: {item.quantidade}</Text>
            </View>
            <View style={styles.itemButtonContainer}>
              <Button title="Excluir" color="red" onPress={() => handleDelete(item.id)} />
              <Button
                title="Editar"
                onPress={() => navigation.navigate('EditarProdutos', { produtoId: item.id })}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 10, backgroundColor: '#f5f5f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 16, marginBottom: 10 },
  addButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, margin: 10, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  itemContainer: { backgroundColor: '#fff', padding: 15, marginVertical: 5, borderRadius: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2.22 },
  itemTextContainer: { flex: 1 },
  itemName: { fontSize: 18, fontWeight: '500' },
  itemArea: { fontSize: 14, color: 'gray', marginTop: 5 },
  itemButtonContainer: { flexDirection: 'row' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' }
});
