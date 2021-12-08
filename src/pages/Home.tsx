import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { api } from '../services/api';
import { ItemEstado } from '../components/itemEstado';
import { Municipio } from './Municipio';
import SearchItem from '../components/searchBar';

export interface Estado {
  id: number;
  nome: string;
  sigla: string;
  regiao: string;
}

export default function Home() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const navigation = useNavigation();

  async function loadEstados() {
    const response = await api.get('?orderBy=nome');
    setEstados(response.data);
  }

  function handleToMunicipio(item: Estado) {
    navigation.navigate('Municipio', { estado: item });
  }

  useEffect(() => {
    loadEstados();
  }, []);

  return (
    <View style={styles.container}>
      <SearchItem data={estados} setData={setEstados}/>
      <FlatList<Estado>
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        data={estados}
        keyExtractor={(estado) => String(estado.id)}
        renderItem={({ item }) => (
          <ItemEstado item={item} onPress={() => handleToMunicipio(item)} />
        )}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#caf0f8',
    padding: 20,
    justifyContent: 'center',
  }
});
